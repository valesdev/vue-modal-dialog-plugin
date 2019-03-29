# vue-modal-dialog-plugin

[![Version](https://img.shields.io/npm/v/vue-modal-dialog-plugin.svg)](https://www.npmjs.com/package/vue-modal-dialog-plugin)
[![Downloads](https://img.shields.io/npm/dm/vue-modal-dialog-plugin.svg)](https://npmcharts.com/compare/vue-modal-dialog-plugin?minimal=true)
[![Issues](https://img.shields.io/github/issues/valesdev/vue-modal-dialog-plugin.svg)](https://github.com/valesdev/vue-modal-dialog-plugin/issues)
[![License](https://img.shields.io/npm/l/vue-modal-dialog-plugin.svg)](https://www.npmjs.com/package/vue-modal-dialog-plugin)

A modal dialog plugin for mobile, integrated with Vue.js and Vuex.

[Live demo](https://open.vales.io/vue-modal-dialog-plugin/demo.html)

## Features

- Only 9.5KB minified while 2.8KB gzipped
- Integrated with Vue.js as a plugin
- Show multiple dialogs meanwhile
- Able to customize buttons and message with HTML supported
- API interaction via `Promise`

## Usage

Register the plugin first.

```js
import Vue from 'vue'
import Vuex from 'vuex'
import vueModalDialogPlugin from 'vue-modal-dialog-plugin'

const store = new Vuex.Store({ strict: true })

Vue.use(vueModalDialogPlugin, { store })

new Vue({ store })
```

Then include plugin css and add the holder tag to your root Vue node.

```vue
<template>
  <div id="app">
    <vue-dialog-holder />
  </div>
</template>

<style>
@import '~vue-modal-dialog-plugin/dist/vue-modal-dialog-plugin.min.css';
</style>
```

Finally, use it anywhere.

```js
Vue.extend({
  mounted () {
    this.$dialog.alert('Hello dialog!')
  }
})
```

## License

[MIT](http://opensource.org/licenses/MIT)
