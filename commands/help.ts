import Discord from 'discord.js';
import { Message } from 'discord.js';

const help = (message: Message): void => {
  const newEmbed = new Discord.MessageEmbed()
    .setColor('#304281')
    .setTitle('명령어 목록')
    .setDescription('명령어 목록이다!')
    .addFields(
      {
        name: '!말',
        value: '말! 한다.',
      },
      {
        name: '!clean',
        value: '노래 넘어간다!',
      },
      {
        name: '!play [노래 이름]',
        value: '노래 이름으로 재생한다!',
      },
      {
        name: '!stop',
        value: '노래 중지한다!',
      },
      {
        name: '!skip',
        value: '지금 노래 넘어간다!',
      },
      {
        name: '!volume [1 ~ 100]',
        value: '소리 크기 조정한다!',
      }
    );

  message.channel.send(newEmbed);
};

export default help;
