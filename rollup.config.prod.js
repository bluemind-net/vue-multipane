import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vue-multipane.min.js',
    format: 'umd',
    sourcemap: false
  },
  plugins: [
    alias({
      '@': './',
    }),
    vue({
      css: true,
      sourceRoot: "/vue-multipane/",
      template: {
        isProduction: true
      }
    }),
    buble(),
    nodeResolve({ browser: true, jsnext: true, main: true }),
    commonjs(),
    terser(),
  ],
};
