import Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN } = process.env;

const client = new Discord.Client();
client.login(DISCORD_TOKEN);

client.once('ready', () => {
  console.log('ready');
});
