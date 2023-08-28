import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import {defineConfig} from 'rollup';
import fs from 'fs';
import meta from './meta.js';

const production = !process.env.ROLLUP_WATCH;

export default defineConfig({
  input: './src/index.ts',
  treeshake: 'recommended',
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      sourceMap: production,
      inlineSources: false
    }),
    production && terser(),
    insertMeta(meta)
  ],
  output: [
    {
      file: 'dist/bundle.user.js',
      format: 'iife',
      name: 'app',
      sourcemap: false,
    },
    !production && genProxy(meta)
  ],
  watch: {
		clearScreen: false
	}
});

function genProxy(meta) {
  return {
    file: 'dist/bundle.proxy.user.js',
    plugins: [
      {
        name: 'GenProxy',
        renderChunk: async () => {
          return {code: meta + '\n\n\n' + fs.readFileSync('./proxy.js').toString('utf-8')};
        },
      },
    ],
  }
}

function insertMeta(meta) {
  return {
    name: 'Insert meta',
    renderChunk: (code) => {
      return {code: meta + '\n\n\n' + code}
    }
  }
}