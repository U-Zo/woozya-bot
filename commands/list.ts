import Discord, { Message } from 'discord.js';
import { GlobalQueue } from '../types/songTypes';

const list = (message: Message, queue: GlobalQueue): void => {
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
    message.channel.send('`재생 목록 없다!`');
    return;
  }

  const songs = serverQueue.songs.map((s, i) => ({
    name: i === 0 ? `재생 중` : `${i}`,
    value: s.title,
  }));

  const newEmbed = new Discord.MessageEmbed()
    .setColor('#304281')
    .setTitle('재생 목록')
    .addFields(songs);

  message.channel.send(newEmbed);
};

export default list;
