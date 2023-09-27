import 'dotenv/config';
import { Player } from 'discord-player';
import { Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import { commands } from '@/commands';

export const client = new Client({
  intents: ['GuildVoiceStates', GatewayIntentBits.Guilds],
});
export const player = new Player(client);

const initialize = async () => {
  client.once(Events.ClientReady, (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  });

  await player.extractors.loadDefault((ext) => ext === 'YouTubeExtractor');

  player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send({
      content: '**노래를 재생할게요**',
      embeds: [
        new EmbedBuilder()
          .setTitle(track.title)
          .setAuthor({
            name: track.author,
          })
          .setThumbnail(track.thumbnail)
          .setFields([
            {
              name: '재생 시간',
              value: track.duration,
            },
          ]),
      ],
    });
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (e) {
      console.error(e);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
        return;
      }

      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};

initialize().catch((e) => {
  console.error(e);
});
