import { Message } from 'discord.js';
import { GlobalQueue } from '../types/songTypes';

const skip = (message: Message, queue: GlobalQueue): void => {
  if (!message.member?.voice.channel) {
    message.channel.send('`음성 채널 참가해야 한다!`');
    return;
  }

  if (!message.guild) {
    message.channel.send('`오류 발생했다!`');
    return;
  }

  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) {
    message.channel.send('`재생 안 하고 있다!`');
    return;
  }

  if (!serverQueue.songs[1]) {
    message.channel.send('`다음 곡 없다! 중지한다!`');
  } else {
    message.channel.send(
      `\`넘어간다! 다음 곡은 ${serverQueue.songs[1].title}다! \``
    );
  }

  serverQueue.connection.dispatcher.end();
};

export default skip;
