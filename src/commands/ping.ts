import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getThemeColors } from '../functions';
import { Command } from '../types';

const command: Command = {
	command: new SlashCommandBuilder().setName('ping').setDescription("Shows the bot's ping"),
	execute: (interaction) => {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Pong!')
					.setDescription(`Bot Latency: ${Date.now() - interaction.createdTimestamp}ms\nAPI Latency: ${Math.round(interaction.client.ws.ping)}ms`)
					.setColor(getThemeColors('text')),
			],
		});
	},
	cooldown: 10,
};

export default command;
