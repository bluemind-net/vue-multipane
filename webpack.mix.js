const mix = require('laravel-mix');
const argv = require('yargs').argv;
const path = require('path')

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve('./'),
    },
  },
})

if (argv.env === 'src') {
  mix
    .js(
      'src/index.js',
      mix.inProduction() ?
          'dist/vue-multipane.min.js' :
          'dist/vue-multipane.js'
    )
    .extract([
      'vue'
    ])
    .options({
      webpackConfig: {
        output: {
          library: 'Multipane',
          libraryTarget: 'umd',
          umdNamedDefine: true
        }
      }
    });
}

if (argv.env === 'demo') {

  // Demo files
  mix
    .js('demo/src/main.js', 'demo/main.js')
    .copy('demo/src/index.html', 'demo/index.html')
    .vue();

  if (process.env.NODE_ENV === 'development') {
    console.log('and here')

    const port = 8012;
    const publicPath = `http://localhost:${port}/`;

    mix.webpackConfig({
      output: {
        publicPath: publicPath
      },
      devServer: {
        port: port,
        public: `localhost:${port}`,
        open: true,
        overlay: {
          warnings: true,
          errors: true
        }
      }
    });
  }
}
