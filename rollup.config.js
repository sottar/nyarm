import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    dir: 'lib',
  },
  plugins: [typescript(), json(), terser()],
};
