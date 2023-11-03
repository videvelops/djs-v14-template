import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../types';

const command: Command = {
	command: new SlashCommandBuilder().setName('example').setDescription('Example command'),
	execute: (interaction) => {
		interaction.reply({ content: 'Example command', ephemeral: true });
	},
	cooldown: 10,
};

export default command;
