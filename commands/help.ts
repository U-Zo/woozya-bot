import Discord from 'discord.js';
import { Message } from 'discord.js';

const help = (message: Message): void => {
  const newEmbed = new Discord.MessageEmbed()
    .setColor('#304281')
    .setTitle('명령어 목록')
    .setDescription('명령어는 !로 시작한다. 아래는 명령어 목록이다. 잘 봐라.')
    .addFields({
      name: '말',
      value: '말! 한다.',
    });

  message.channel.send(newEmbed);
};

export default help;
