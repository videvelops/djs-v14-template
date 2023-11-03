import {
	SlashCommandBuilder,
	CommandInteraction,
	Collection,
	PermissionResolvable,
	Message,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
} from 'discord.js';
import mongoose from 'mongoose';

export interface Command {
	command: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	cooldown?: number; // in seconds
}

export interface BotEvent {
	name: string;
	once?: boolean | false;
	execute: (...args) => void;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			CLIENT_ID: string;
			MONGODB_URI: string;
		}
	}
}

declare module 'discord.js' {
	export interface Client {
		commands: Collection<string, Command>;
		cooldowns: Collection<string, number>;
	}
}
