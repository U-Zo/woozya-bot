import { Collection } from 'discord.js';
import { ping } from '@/commands/ping';
import { play } from '@/commands/play';
import { queue } from '@/commands/queue';
import { skip } from '@/commands/skip';
import { stop } from '@/commands/stop';
import { volume } from '@/commands/volume';
import type { Command } from '@/commands/Command';

export const commands = new Collection<string, Command>();

commands.set(ping.data.name, ping);
commands.set(play.data.name, play);
commands.set(volume.data.name, volume);
commands.set(queue.data.name, queue);
commands.set(skip.data.name, skip);
commands.set(stop.data.name, stop);
