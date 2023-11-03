import { Client, GatewayIntentBits, Collection } from 'discord.js';

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
});
import { Command } from './types';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';
config();

client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
	if (!handler.endsWith('.js')) return;
	require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);
