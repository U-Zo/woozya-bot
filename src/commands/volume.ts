import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/Command';

export const volume = new Command(
  new SlashCommandBuilder()
    .setName('volume')
    .addNumberOption((option) =>
      option
        .setName('percentage')
        .setDescription('소리 크기')
        .setMinValue(0)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDescription('소리 크기를 조절해요'),
  async (interaction) => {
    const queue = useQueue(interaction.guildId!)!;
    const volume = interaction.options.getNumber('percentage', true);

    try {
      await interaction.deferReply();
      queue.node.setVolume(volume);

      await interaction.followUp(`소리 크기를 **${volume}%**로 조절했어요`);
    } catch (e) {
      await interaction.followUp(`알 수 없는 오류가 발생했어요 ${e}`);
    }
  }
);
