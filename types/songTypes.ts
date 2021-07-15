import { TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';

export interface Song {
  title: string;
  url: string;
}

export interface SongQueue {
  voiceChannel: VoiceChannel;
  textChannel: TextChannel;
  connection: VoiceConnection;
  songs: Song[];
  volume: number;
}

export type GlobalQueue = Map<string, SongQueue>;
