import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/Command';

export const ping = new Command(
  new SlashCommandBuilder().setName('ping').setDescription('ping'),
  async (interaction) => {
    await interaction.reply('Pong!');
  }
);
