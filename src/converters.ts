const convertCommandToNpm = (commands: string[]): string => {
  const com = commands[0];
  const op = commands.slice(1);
  // nyarm
  // nyarm install
  if (!com || (op.length === 0 && (com === 'install' || com === 'i' || com === 'add'))) {
    return 'install';
  }
  // nyarm install {foo}
  // nyarm add {foo}
  if (com === 'install' || com === 'i' || com === 'add') {
    return `install ${op.join(' ')}`;
  }
  // nyarm uninstall {foo}
  // nyarm remove {foo}
  if (com === 'uninstall' || com === 'remove') {
    return `uninstall ${op.join(' ')}`;
  }
  // nyarm run {foo}
  if (com === 'run') {
    return `run ${op.join(' ')}`;
  }
  // TODO read scripts in package.json and if there is {com} script, run it.
  // nyarm {...commands}
  return commands.join(' ');
};

const convertCommandToYarn = (commands: string[]): string => {
  const com = commands[0];
  const op = commands.slice(1);
  // nyarm
  // nyarm install
  if (op.length === 0 && (!com || com === 'install' || com === 'i' || com === 'add')) {
    return 'install';
  }
  // nyarm install {foo}
  // nyarm add {foo}
  if (com === 'install' || com === 'i' || com === 'add') {
    if (op.includes('-S')) {
      const index = op.indexOf('-S');
      op.splice(index, 1);
    }
    if (op.includes('--save')) {
      const index = op.indexOf('--save');
      op.splice(index, 1);
    }
    return `add ${op.join(' ')}`;
  }
  // nyarm uninstall {foo}
  // nyarm remove {foo}
  if (com === 'uninstall' || com === 'remove') {
    return `remove ${op.join(' ')}`;
  }
  // nyarm run {foo}
  if (com === 'run') {
    return `${op.join(' ')}`;
  }
  // nyarm {...commands}
  return commands.join(' ');
};

export { convertCommandToNpm, convertCommandToYarn };
