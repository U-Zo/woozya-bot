import { Message } from 'discord.js';
import { GlobalQueue } from '../types/songTypes';

const stop = async (message: Message, queue: GlobalQueue): Promise<void> => {
  const voiceChannel = message.member?.voice.channel;

  if (!voiceChannel) {
    message.channel.send('`음성 채널 참가해야 한다!`');
    return;
  }

  if (!message.guild) {
    message.channel.send('`오류 발생했다!`');
    return;
  }

  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) {
    message.channel.send('`오류 발생했다!`');
    return;
  }

  message.channel.send('`⛔ 재생 중지!`');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
};

export default stop;
