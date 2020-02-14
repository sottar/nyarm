import fs from 'fs';
import chalk from 'chalk';
import { ExecException } from 'child_process';

const exec = require('child_process').exec;

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
