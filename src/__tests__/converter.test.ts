import { convertCommandToNpm, convertCommandToYarn } from '../converters';

describe('convertCommandToNpm', (): void => {
  test('nyarm', (): void => {
    const commands = [''];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install');
  });
  test('nyarm add', (): void => {
    const commands = ['add'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install');
  });
  test('nyarm install', (): void => {
    const commands = ['install'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install');
  });
  test('nyarm i', (): void => {
    const commands = ['i'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install');
  });
  test('nyarm add foo', (): void => {
    const commands = ['add', 'foo'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install foo');
  });
  test('nyarm add foo bar', (): void => {
    const commands = ['add', 'foo', 'bar'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install foo bar');
  });
  test('nyarm install --save foo', (): void => {
    const commands = ['install', '--save', 'foo'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install --save foo');
  });
  test('nyarm install foo -S', (): void => {
    const commands = ['install', 'foo', '-S'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install foo -S');
  });
  test('nyarm i --dev foo', (): void => {
    const commands = ['i', '--dev', 'foo'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install --dev foo');
  });
  test('nyarm i foo -D', (): void => {
    const commands = ['i', 'foo', '-D'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('install foo -D');
  });
  test('nyarm uninstall', (): void => {
    const commands = ['uninstall', 'foo'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('uninstall foo');
  });
  test('nyarm remove foo', (): void => {
    const commands = ['remove', 'foo'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('uninstall foo');
  });
  test('nyarm run foo', (): void => {
    const commands = ['run', 'foo'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('run foo');
  });
  test('nyarm other_command', (): void => {
    const commands = ['other_command'];
    const result: string = convertCommandToNpm(commands);
    expect(result).toBe('other_command');
  });
});

describe('convertCommandToYarn', (): void => {
  test('nyarm', (): void => {
    const commands = [''];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('install');
  });
  test('nyarm add', (): void => {
    const commands = ['add'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('install');
  });
  test('nyarm install', (): void => {
    const commands = ['install'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('install');
  });
  test('nyarm i', (): void => {
    const commands = ['i'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('install');
  });
  test('nyarm add foo', (): void => {
    const commands = ['add', 'foo'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('add foo');
  });
  test('nyarm add foo bar', (): void => {
    const commands = ['add', 'foo', 'bar'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('add foo bar');
  });
  test('nyarm install --save foo', (): void => {
    const commands = ['install', '--save', 'foo'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('add foo');
  });
  test('nyarm install foo -S', (): void => {
    const commands = ['install', 'foo', '-S'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('add foo');
  });
  test('nyarm i --dev foo', (): void => {
    const commands = ['i', '--dev', 'foo'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('add --dev foo');
  });
  test('nyarm i foo -D', (): void => {
    const commands = ['i', 'foo', '-D'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('add foo -D');
  });
  test('nyarm uninstall foo', (): void => {
    const commands = ['uninstall', 'foo'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('remove foo');
  });
  test('nyarm remove foo', (): void => {
    const commands = ['remove', 'foo'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('remove foo');
  });
  test('nyarm run foo', (): void => {
    const commands = ['run', 'foo'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('foo');
  });
  test('nyarm other_command', (): void => {
    const commands = ['other_command'];
    const result: string = convertCommandToYarn(commands);
    expect(result).toBe('other_command');
  });
});
