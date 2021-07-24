interface CommandName {
  name: string;
  aliases: string[];
}

export const commandNames: CommandName[] = [
  {
    name: 'ping',
    aliases: ['말'],
  },
  {
    name: 'help',
    aliases: ['명령어', '도움'],
  },
  {
    name: 'clean',
    aliases: ['c', '청소'],
  },
  {
    name: 'play',
    aliases: ['p', '플레이', '재생'],
  },
  {
    name: 'stop',
    aliases: ['st', '정지', '중지'],
  },
  {
    name: 'skip',
    aliases: ['sk', '스킵', '다음'],
  },
  {
    name: 'volume',
    aliases: ['v', '볼륨'],
  },
  {
    name: 'list',
    aliases: ['목록'],
  },
];
