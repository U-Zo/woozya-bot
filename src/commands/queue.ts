import { useQueue } from 'discord-player';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/Command';

export const queue = new Command(
  new SlashCommandBuilder()
    .setName('queue')
    .setDescription('현재 재생 중인 노래와 재생 목록을 출력해요'),
  async (interaction) => {
    const queue = useQueue(interaction.guildId!)!;

    try {
      await interaction.deferReply();

      const { currentTrack } = queue;
      if (!currentTrack) {
        return;
      }

      const tracks = queue.tracks.toArray();

      await interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setTitle(`재생 중: **${currentTrack.title}**`)
            .setAuthor({
              name: currentTrack.author,
            })
            .setThumbnail(currentTrack.thumbnail)
            .setFields({
              name: '재생 시간',
              value: currentTrack.duration,
            })
            .setColor('Aqua')
            .setDescription(
              `${
                tracks.length > 0
                  ? tracks
                      .map(
                        (track, index) =>
                          `${index + 2}. ${track.title} [${track.duration}]`
                      )
                      .join('\n')
                  : '다음 곡을 추가해보세요'
              }`
            ),
        ],
      });
    } catch (e) {
      interaction.followUp(`알 수 없는 오류가 발생했어요 ${e}`);
    }
  }
);
