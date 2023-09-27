import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class Command {
  constructor(
    public data: SlashCommandBuilder,
    public execute: (interaction: ChatInputCommandInteraction) => Promise<void>
  ) {}
}
