const {
  FuseBox,
  Sparky,
  SVGPlugin,
  CSSPlugin,
  BabelPlugin,
  JSONPlugin,
  UglifyJSPlugin,
  SassPlugin,
  WebIndexPlugin
} = require('fuse-box');
const rimraf = require('rimraf');

const isProduction = process.env.NODE_ENV === 'production';
const CSSPath = './dist';

/**
 * Fuse options
 */
const fuse = new FuseBox({
  homeDir: 'src/',
  sourceMaps: !isProduction,
  output: 'dist/$name.js',
  log: isProduction,
  hash: isProduction,
  cache: !isProduction,
  plugins: [
    WebIndexPlugin({
      title: 'IniZio',
      template: 'src/tpl.html'
    }),
    [
      SassPlugin(),
      CSSPlugin({
        outFile: file => `${CSSPath}/${file.replace('scss', 'css')}`,
        inject: file => `${file.replace('scss', 'css')}`
      })
    ],
    CSSPlugin({
      outFile: file => `${CSSPath}/${file}`,
      inject: file => `${file}`
    }),
    BabelPlugin({}),
    JSONPlugin(),
    ...(isProduction
      ? [UglifyJSPlugin({ comments: false, mangle: true, drop_console: true })]
      : [])
  ]
});

/**
 * Task Runners
 */
Sparky.task(
  'remove-dist',
  () =>
    new Promise((resolve, reject) => {
      rimraf('dist', () => resolve());
    })
);

Sparky.task('default', ['dev'], () => {});

Sparky.task('dev', () => {
  fuse.dev({ port: 8080 });
  fuse.bundle('app').watch().hmr().instructions('> index.js');
  fuse.run();
});

Sparky.task('build', ['remove-dist'], () => {
  fuse.bundle('vendor').instructions('~ index.js');
  fuse.bundle('app').instructions('!> [index.js]');
  fuse.run();
});
