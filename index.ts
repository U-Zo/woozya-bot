import Discord, { Message } from 'discord.js';
import dotenv from 'dotenv';
import { prefix } from './config';
import commands from './commands';
dotenv.config();
const { DISCORD_TOKEN } = process.env;

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Woozya bot is online');
});

client.on('message', (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift()?.toLowerCase();

  if (!command) {
    return;
  }

  switch (command) {
    case '말':
      commands.ping(message);
      break;
    case 'help':
      commands.help(message);
      break;
    default:
      message.channel.send('`명령어 없다! !help 확인해라!`');
  }
});

client.login(DISCORD_TOKEN);
