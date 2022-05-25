const path = require('path');
const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild.build({
  entryPoints: ['./public/index.js'],
  bundle: true,
  minify: true,
  outfile: './public/index.bundle.js',
  plugins: [
    alias({
      'react':              path.resolve(__dirname, './public/vendor/preact-compat.js'),
      'react-dom':          path.resolve(__dirname, './public/vendor/preact-compat.js'),
      'react/jsx-runtime':  path.resolve(__dirname, './public/vendor/preact-jsx-runtime.js'),
      'preact':             path.resolve(__dirname, './public/vendor/preact.js'),
      'preact/hooks':       path.resolve(__dirname, './public/vendor/preact-hooks.js'),
    }),
  ],
}).catch(err => {
    console.error(err);
    process.exit(1);
});
