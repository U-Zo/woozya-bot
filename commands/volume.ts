import { Message } from 'discord.js';
import { GlobalQueue } from '../types/songTypes';

const volume = (message: Message, queue: GlobalQueue, args: string[]): void => {
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

  const volume = Number(args[0]);
  if (volume > 100 || volume < 1) {
    message.channel.send('`소리 크기 범위 이상하다!`');
    return;
  }

  const volumeRate = Number(args[0]) / 100;

  serverQueue.connection.dispatcher.setVolume(volumeRate);

  let volumeIcon;
  if (volumeRate > 0.7) {
    volumeIcon = '🔊';
  } else if (volumeRate > 0.3) {
    volumeIcon = '🔉';
  } else {
    volumeIcon = '🔈';
  }

  message.channel.send(`\`소리 크기 조정했다! ${volumeIcon}: ${args[0]}%\``);
};

export default volume;
