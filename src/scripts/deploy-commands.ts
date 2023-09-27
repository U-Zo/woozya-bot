import { REST, Routes } from 'discord.js';
import { commands as _commands } from '@/commands';
import 'dotenv/config';

(async () => {
  const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

  if (DISCORD_TOKEN == null || CLIENT_ID == null || GUILD_ID == null) {
    throw new Error('Cannot find discordToken, clientId, guildId');
  }

  const rest = new REST().setToken(DISCORD_TOKEN);
  const commands = _commands.map((command) => command.data.toJSON());

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    )) as string[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
