import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { ExecException } from 'child_process';

const exec = require('child_process').exec;

const convertCommandToYarn = (command: string, options: Array<string>): string => {
  if (!command) {
    return 'install';
  }

  if (command === 'install' && options.length > 0) {
    return 'add';
  }
  if (command === 'uninstall') {
    return 'remove';
  }
  return command;
};

const convertCommandToNpm = (command: string): string => {
  if (!command || command === 'add') {
    return 'install';
  }
  if (command === 'remove') {
    return 'uninstall';
  }
  return `run ${command}`;
};

((): void => {
  const npmLockFile = 'package-lock.json';
  const yarnLockFile = 'yarn.lock';
  const isNpmExisted = fs.existsSync(npmLockFile);
  const isYarnExisted = fs.existsSync(yarnLockFile);
  if (isNpmExisted && isYarnExisted) {
    console.log(chalk.red('Both of package-lock.json and yarn.lock are existed. Please confirm project config.'));
    process.exit(0);
  }

  const options = process.argv.slice(3);
  const command = process.argv[2];

  if (isNpmExisted) {
    console.log(chalk.green('package-lock.json is found, use npm...'));

    const npmCommand = convertCommandToNpm(command);

    console.log('');
    console.log(chalk.gray(`> npm ${npmCommand} ${options.join(' ')}`));

    exec(`npm ${npmCommand} ${options.join(' ')}`, (err: ExecException, stdout: string, stderr: string) => {
      if (err) {
        console.log(err.message);
      }
      console.log(stderr);
      console.log(stdout);
    });
  }
  if (isYarnExisted) {
    console.log(chalk.green('yarn.lock is found, use yarn...'));

    const yarnCommand = convertCommandToYarn(command, options);
    console.log('');
    console.log(chalk.green(`> yarn ${yarnCommand} ${options.join(' ')}`));

    exec(`yarn ${yarnCommand} ${options.join(' ')}`, (err: ExecException, stdout: string, stderr: string) => {
      if (err) {
        console.log(err.message);
      }
      console.log(stderr);
      console.log(stdout);
    });
  }
})();
