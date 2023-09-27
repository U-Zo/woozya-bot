import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/Command';

export const skip = new Command(
  new SlashCommandBuilder()
    .setName('skip')
    .setDescription('다음 노래로 넘어가요'),
  async (interaction) => {
    const queue = useQueue(interaction.guildId!);
    if (queue?.currentTrack == null) {
      await interaction.reply('현재 재생 중인 노래가 없어요');
      return;
    }

    queue.node.skip();
    await interaction.reply('다음 노래로 넘어갈게요');
  }
);
