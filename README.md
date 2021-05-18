# Woozya Discord bot

Discord bot for playing music and several features

## Installation

```
yarn install
```

- For configuration

```env
DISCORD_TOKEN=your-discord-bot-token
YOUTUBE_API=your-youtube-api
```

- For prefix

```ts
// config.ts

export const prefix = '!'; // prefix character what you want
```

## Commands

- help: Explain bot commands to discord chat
- ping: Test command to check discord bot is online

## Develop environment

- Node.js
- typescript
- eslint

## Libraries

- discord.js
- @discordjs/opus
- dotenv
- ffmpeg-static
- ytdl-core
