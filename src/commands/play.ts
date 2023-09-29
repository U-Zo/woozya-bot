import { QueueRepeatMode, useMainPlayer } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { client } from '@/app';
import { Command } from '@/commands/Command';

export const play = new Command(
  new SlashCommandBuilder()
    .setName('play')
    .addStringOption((option) =>
      option.setName('query').setDescription('노래 제목').setRequired(true)
    )
    .setDescription('노래를 재생해요'),
  async (interaction) => {
    const player = useMainPlayer();
    if (!player) {
      return;
    }

    const channel = client.guilds.cache
      .get(interaction.guildId!)
      ?.members.cache.get(interaction.member!.user.id!)?.voice.channel;

    if (!channel) {
      await interaction.reply('음성 채널에 입장해주세요');
      return;
    }

    const query = interaction.options.getString('query', true);

    try {
      await interaction.deferReply();

      const { track } = await player.play(channel, query, {
        nodeOptions: {
          metadata: interaction,
          volume: 2,
          leaveOnEmptyCooldown: 300000,
          leaveOnEndCooldown: 300000,
          leaveOnEmpty: true,
          leaveOnEnd: false,
          leaveOnStop: false,
          leaveOnStopCooldown: 600000,
          bufferingTimeout: 3000,
          connectionTimeout: 20000,
          repeatMode: QueueRepeatMode.AUTOPLAY,
        },
      });

      await interaction.followUp({
        content: `**${track.title} [${track.duration}]** 노래를 재생 목록에 추가할게요`,
      });
    } catch (e) {
      await interaction.followUp(`알 수 없는 오류가 발생했어요 ${e}`);
    }
  }
);
