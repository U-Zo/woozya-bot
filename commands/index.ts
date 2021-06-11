import { Message } from 'discord.js';
import { prefix } from '../config';
import { GlobalQueue } from '../types/songTypes';
import ping from './ping';
import help from './help';
import clean from './clean';
import play from './play';
import stop from './stop';
import skip from './skip';

const commands = (message: Message, globalQueue: GlobalQueue): void => {
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
      ping(message);
      break;
    case 'help':
      help(message);
      break;
    case 'clean':
      clean(message);
      break;
    case 'play':
      play(message, args, globalQueue);
      break;
    case 'stop':
      stop(message, globalQueue);
      break;
    case 'skip':
      skip(message, globalQueue);
      break;
    default:
      message.channel.send('`명령어 없다! !help 확인해라!`');
  }
};

export default commands;
