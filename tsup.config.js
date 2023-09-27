import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/app.ts', 'src/scripts/deploy-commands.ts'],
  target: 'node18',
  minify: !options.watch,
  clean: true,
}));
