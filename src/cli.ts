import meow from 'meow';
import { config } from './config';

export async function run(): Promise<void> {
  const subcommand = process.argv[2];
  const argv = process.argv.slice(3);
  switch (subcommand) {
    case 'rename':
      return runRename(argv);
    case 'rename-class':
      return runRenameClass(argv);
    default:
      return runHelp(argv);
  }
}

async function runHelp(argv: string[]) {
  const cli = meow(
    `
Usage
  $ ${config.name}
`,
    { argv }
  );
  cli.showHelp();
}

async function runRename(argv: string[]) {
  const cli = meow(
    `
Usage
  $ ${config.name} rename
`,
    { argv }
  );

  if (cli.input.length <= 1) {
    cli.showHelp();
    return;
  }

  throw new Error('Not Implemented');
}

async function runRenameClass(argv: string[]) {
  const cli = meow(
    `
Usage
  $ ${config.name} rename-class
`,
    { argv }
  );

  if (cli.input.length <= 1) {
    cli.showHelp();
    return;
  }

  throw new Error('Not Implemented');
}
