import { Client, Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { readdirSync } from 'fs';
import { join } from 'path';
import { color } from '../functions';
import { Command } from '../types';

module.exports = (client: Client) => {
	const commands: SlashCommandBuilder[] = [];

	let commandsDir = join(__dirname, '../commands');

	readdirSync(commandsDir).forEach((file) => {
		if (!file.endsWith('.js')) return;
		let command: Command = require(`${commandsDir}/${file}`).default;
		commands.push(command.command);
		client.commands.set(command.command.name, command);
	});

	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
		body: commands.map((command) => command.toJSON()),
	})
		.then((data: any) => {
			console.log(color('text', `🔥 Successfully loaded ${color('variable', data.length)} slash command(s)`));
		})
		.catch((e) => {
			console.log(e);
		});
};
