import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import childProcess from 'child_process';

const run = (command: string): Promise<void> => {
  const spawn = childProcess.spawn;
  return new Promise(resolve => {
    const child = spawn(command, { shell: true });
    child.stdout.on('data', (data: Buffer) => {
      let output = data.toString();
      if (output.slice(-1) === '\n') {
        output = output.substring(0, output.length - 1);
      }
      console.log(chalk(output));
    });
    child.stderr.on('data', (data: Buffer) => {
      let output = data.toString();
      if (output.slice(-1) === '\n') {
        output = output.substring(0, output.length - 1);
      }
      console.log(chalk(output));
    });
    child.on('close', () => {
      resolve();
    });
  });
};

const convertCommandToYarn = (command: string, options: Array<string>): string => {
  // nyarm
  // nyarm install
  if ((!command && options.length === 0) || (command === 'install' && options.length === 0)) {
    return 'install';
  }

  // nyarm install {foo}
  // nyarm add {foo}
  if ((command === 'install' && options.length > 0) || (command === 'add' && options.length > 0)) {
    return 'add';
  }

  // nyarm uninstall {foo}
  // nyarm remove {foo}
  if (command === 'uninstall' || command === 'remove') {
    return 'remove';
  }
  // nyarm {command}
  return command;
};

const convertCommandToNpm = (command: string): string => {
  // nyarm
  // nyarm install
  // nyarm install {foo}
  // nyarm add {foo}
  if (!command || command === 'install' || command === 'add') {
    return 'install';
  }

  // nyarm uninstall {foo}
  // nyarm remove {foo}
  if (command === 'uninstall' || command === 'remove') {
    return 'uninstall';
  }

  // nyarm {command}
  return 'run';
};

const initInstall = async (): Promise<void> => {
  const answer = await inquirer.prompt({
    type: 'confirm',
    name: 'create',
    message: `Could not find a npm/yarn lockfile. Do you want to install packages?`,
    default: false,
  });

  if (!answer.create) {
    return;
  }

  const answer2 = await inquirer.prompt({
    type: 'rawlist',
    name: 'manager',
    message: `Which manager do you want to use?`,
    choices: ['npm', 'yarn'],
  });

  if (answer2.manager === 'npm') {
    console.log('');
    console.log(chalk.gray('> npm install'));
    await run('npm install');
  }

  if (answer2.manager === 'yarn') {
    console.log('');
    console.log(chalk.gray('> yarn install'));

    await run('yarn install');
  }
};

const showVersion = async (): Promise<void> => {
  const pkg = await import('../package.json');

  console.log(`v${pkg.version}`);
};

const showHelp = (): void => {
  console.log(
    chalk.bold(`
nyarm read your current project and judge using npm or yarn.
you can use just nyarm command instead of npm or yarn command.`),
  );
  console.log(`
  $ nyarm {install | add}
  # npm project => npm install
  # yarn project => yarn install

  $ nyarm {install | add} foobar
  # npm project => npm install foobar
  # yarn project => yarn add foobar

  $ nyarm {uninstall | remove} foobar
  # npm project => npm uninstall foobar
  # yarn project => yarn remove foobar
  `);
};

(async (): Promise<void> => {
  const options = process.argv.slice(3);
  const command = process.argv[2];

  switch (command) {
    case '-v':
    case '--version':
      await showVersion();
      return;
    case '-h':
    case '--help':
      showHelp();
      return;
  }

  const npmLockFile = 'package-lock.json';
  const yarnLockFile = 'yarn.lock';
  const isNpmExisted = fs.existsSync(npmLockFile);
  const isYarnExisted = fs.existsSync(yarnLockFile);
  if (!isNpmExisted && !isYarnExisted) {
    await initInstall();
  }
  if (isNpmExisted && isYarnExisted) {
    console.log(chalk.red('Both of package-lock.json and yarn.lock are existed. Please confirm project config.'));
    process.exit(0);
  }

  if (isNpmExisted) {
    console.log(chalk.green('package-lock.json is found, use npm...'));

    const npmCommand = convertCommandToNpm(command);

    console.log('');
    console.log(chalk.gray(`> npm ${npmCommand} ${options.join(' ')}`));
    await run(`npm ${npmCommand} ${options.join(' ')}`);
  }
  if (isYarnExisted) {
    console.log(chalk.green('yarn.lock is found, use yarn...'));

    const yarnCommand = convertCommandToYarn(command, options);
    console.log('');
    console.log(chalk.green(`> yarn ${yarnCommand} ${options.join(' ')}`));

    await run(`yarn ${yarnCommand} ${options.join(' ')}`);
  }
})();
