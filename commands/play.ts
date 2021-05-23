import { Guild, Message } from 'discord.js';
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import { Song, SongQueue } from '../types/songTypes';

const videoPlayer = async (
  guild: Guild,
  song: Song,
  queue: Map<string, SongQueue>
) => {
  const songQueue = queue.get(guild.id);

  if (!song) {
    songQueue?.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const stream = ytdl(song.url, { filter: 'audioonly' });
  songQueue?.connection
    .play(stream, { seek: 0, volume: 0.075 })
    .on('finish', () => {
      songQueue.songs.shift();
      videoPlayer(guild, songQueue.songs[0], queue);
    });
};

const play = async (
  message: Message,
  args: string[],
  queue: Map<string, SongQueue>
): Promise<void> => {
  const voiceChannel = message.member?.voice.channel;
  if (!voiceChannel) {
    message.channel.send('`음성 채널 참가해야 한다!`');
    return;
  }

  if (!message.client.user) {
    return;
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions?.has('CONNECT') || !permissions.has('SPEAK')) {
    message.channel.send('`너는 권한 없다!`');
    return;
  }

  if (!args.length) {
    message.channel.send('`음악 정해라!`');
    return;
  }

  if (message.channel.type !== 'text' || !message.guild) {
    message.channel.send('`오류 발생했다!`');
    return;
  }

  const serverQueue = queue.get(message.guild.id);

  const connection = serverQueue?.connection
    ? serverQueue.connection
    : await voiceChannel.join();

  const videoFinder = async (query: string) => {
    const result = await yts(query);

    return result.videos.length > 1 ? result.videos[0] : null;
  };

  const video = await videoFinder(args.join(' '));
  if (!video) {
    message.channel.send('`음악 찾을 수 없다!`');
    return;
  }

  const song: Song = {
    title: video.title,
    url: video.url,
  };

  if (!serverQueue) {
    const queueConstructor: SongQueue = {
      voiceChannel,
      textChannel: message.channel,
      connection,
      songs: [],
    };

    queue.set(message.guild.id, queueConstructor);
    queueConstructor.songs.push(song);
    message.channel.send(`\`🎶 재생 중이다! ${video.title} ✨\``);
    videoPlayer(message.guild, song, queue);
  } else {
    serverQueue.songs.push(song);
    message.channel.send(`\`😎 재생 목록 추가했다! ${video.title} ✨\``);
  }
};

export default play;
