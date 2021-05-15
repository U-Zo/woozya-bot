import { Message } from 'discord.js';

const ping = (message: Message): void => {
  message.channel.send('말!');
};

export default ping;
