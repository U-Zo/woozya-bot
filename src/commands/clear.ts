import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/commands/Command';
import type { TextChannel } from 'discord.js';

export const clear = new Command(
  new SlashCommandBuilder()
    .setName('clear')
    .setDescription('시스템 메시지를 청소해요'),
  async (interaction) => {
    const channel = interaction.channel as TextChannel;
    if (channel == null) {
      interaction.reply('채널에 참여해야해요');
      return;
    }

    let timeout;

    try {
      const messages = await channel.messages.fetch({ limit: 20 });
      const botMessages = messages.filter(
        (message) => message.member?.id === process.env.CLIENT_ID
      );

      channel.bulkDelete(botMessages, true);
      const message = await interaction.reply('메시지를 청소했어요');
      timeout = setTimeout(async () => {
        await message.delete();
      }, 3000);
    } catch (e) {
      interaction.reply(`알 수 없는 오류가 발생했어요 ${e}`);
      clearTimeout(timeout);
    }
  }
);
