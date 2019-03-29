const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const buble = require('rollup-plugin-buble')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const terser = require('rollup-plugin-terser').terser
const pkg = require('./package.json')

const banner =
  `/*!\n` +
  ` * ${pkg.name} v${pkg.version}\n` +
  ` * @link ${pkg.homepage}\n` +
  ` */`

rollup.rollup({
  input: 'src/index.js',
  plugins: [
    vue({ css: false }),
    postcss({ minimize: true, extract: true }),
    buble(),
    terser({ output: { comments: /^!/ } }),
    commonjs()
  ]
})
  .then(bundle => {
    return bundle.write({
      format: 'umd',
      name: 'vueModalDialogPlugin',
      file: `dist/${pkg.name}.min.js`,
      banner
    })
  })
  .catch(error => {
    console.error(error)
  })
