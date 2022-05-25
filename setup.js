const esbuild = require('esbuild');

function bundleDependency(entrypoint, outname, externals=[]) {
  return esbuild.build({
    entryPoints: [`./node_modules/${entrypoint}`],
    bundle: true,
    format: 'esm',
    external: externals,
    outfile: `./public/vendor/${outname}.js`,
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

bundleDependency('preact/src/index.js',                 'preact')
bundleDependency('preact/hooks/src/index.js',           'preact-hooks',           ['preact'])
bundleDependency('preact/compat/src/index.js',          'preact-compat',          ['preact'])
bundleDependency('preact-jsx-runtime/jsx-runtime.js',   'preact-jsx-runtime',     ['preact'])
bundleDependency('htm/src/index.mjs',                   'htm')
bundleDependency('preact-custom-element/src/index.js',  'preact-custom-element',  ['preact'])
bundleDependency('@mui/material/Button/index.js', 'material-ui-button', ['react', 'react-dom', 'react/jsx-runtime'])
bundleDependency('@mui/material/Slider/index.js', 'material-ui-slider', ['react', 'react-dom', 'react/jsx-runtime'])
