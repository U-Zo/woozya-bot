import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/Command';

export const stop = new Command(
  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('노래 재생을 멈춰요'),
  async (interaction) => {
    const queue = useQueue(interaction.guildId!);
    if (queue?.currentTrack == null) {
      await interaction.reply('현재 재생 중인 노래가 없어요');
      return;
    }

    queue.delete();

    await interaction.reply('노래 재생을 멈출게요');
  }
);
