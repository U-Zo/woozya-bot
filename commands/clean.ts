import { Message } from 'discord.js';
import { prefix } from '../config';

const clean = async (message: Message): Promise<void> => {
  if (message.channel.type === 'dm') {
    return;
  }

  const messages = await message.channel.messages.fetch({ limit: 100 });
  const botMessages = messages.filter(
    (m) =>
      m.author.id === process.env.DISCORD_ID || !!m.content.startsWith(prefix)
  );

  const messageLength = botMessages.array().length;
  if (!messageLength) {
    const toDeleteMessage = await message.channel.send('`삭제할 메시지 없다!`');
    toDeleteMessage.delete({ timeout: 3000 });
    return;
  }

  await message.channel.bulkDelete(botMessages);
  const toDeleteMessage = await message.channel.send(
    `\`${messageLength}개 메시지 삭제했다!\``
  );

  toDeleteMessage.delete({ timeout: 3000 });
};

export default clean;
