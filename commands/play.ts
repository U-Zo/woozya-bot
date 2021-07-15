import { Guild, Message } from 'discord.js';
import ytdl from 'ytdl-core';
import search from 'youtube-search';
import { Song, SongQueue } from '../types/songTypes';
import { decode } from 'html-entities';

const videoFinder = async (query: string) => {
  const response = await search(query, {
    key: process.env.YOUTUBE_API,
    maxResults: 1,
  });

  const videos = response.results;

  return videos.length > 0 ? videos[0] : null;
};

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

  const stream = ytdl(song.url, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });

  songQueue?.connection
    .play(stream, { seek: 0, volume: songQueue.volume })
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

  const video = await videoFinder(args.join(' '));
  if (!video) {
    message.channel.send('`음악 찾을 수 없다!`');
    return;
  }

  const song: Song = {
    title: decode(video.title),
    url: video.link,
  };

  if (!serverQueue) {
    const queueConstructor: SongQueue = {
      voiceChannel,
      textChannel: message.channel,
      connection,
      songs: [],
      volume: 0.05,
    };

    queue.set(message.guild.id, queueConstructor);
    queueConstructor.songs.push(song);
    message.channel.send(`\`🎶 재생한다! ${song.title} ✨\``);
    videoPlayer(message.guild, song, queue);
  } else {
    serverQueue.songs.push(song);
    message.channel.send(`\`😎 재생 목록 추가했다! ${song.title} ✨\``);
  }
};

export default play;
