import Discord, { Message } from 'discord.js';
import dotenv from 'dotenv';
import { prefix } from './config';
import commands from './commands';
import { GlobalQueue, SongQueue } from './types/songTypes';

dotenv.config();
const { DISCORD_TOKEN } = process.env;

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Woozya bot is online');
});

const globalQueue: GlobalQueue = new Map<string, SongQueue>();

client.on('message', (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  commands(message, globalQueue);
});

client.login(DISCORD_TOKEN);
