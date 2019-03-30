# vue-modal-dialog-plugin

[![Version](https://img.shields.io/npm/v/vue-modal-dialog-plugin.svg)](https://www.npmjs.com/package/vue-modal-dialog-plugin)
[![Downloads](https://img.shields.io/npm/dm/vue-modal-dialog-plugin.svg)](https://npmcharts.com/compare/vue-modal-dialog-plugin?minimal=true)
[![Issues](https://img.shields.io/github/issues/valesdev/vue-modal-dialog-plugin.svg)](https://github.com/valesdev/vue-modal-dialog-plugin/issues)
[![License](https://img.shields.io/npm/l/vue-modal-dialog-plugin.svg)](https://www.npmjs.com/package/vue-modal-dialog-plugin)

A modal dialog plugin for mobile, integrated with Vue.js and Vuex.

[Live demo](https://open.vales.io/vue-modal-dialog-plugin/demo.html)

## Features

- Only 9.7KB minified while 2.8KB gzipped
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

## API

### `Vue.use(vueModalDialogPlugin, options)`

Integrate Vue Modal Dialog Plugin into current Vue runtime.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `options.store` | `Vuex.Store` | A Vuex Store instance. | |
| `options.okButtonLabel` | string&#124;Function | Default label for the "OK" button. | `'OK'` |
| `options.cancelButtonLabel` | string&#124;Function | Default label for the "Cancel" button. | `'Cancel'` |
| `options.yesButtonLabel` | string&#124;Function | Default label for the "Yes" button. | `'Yes'` |
| `options.noButtonLabel` | string&#124;Function | Default label for the "No" button. | `'No'` |

### `vueModalDialogPlugin.alert(message, title, options)`

Perform an alert dialog with an "OK" button.

The returned `Promise` instance will be resolved when user clicks "OK" button, or rejected when user clicks the background area.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `message` | string&#124;Error | The message. | `''` |
| `title` | string | The title. | `null` |
| `options` | object | Additional options (see `open()`). | `{}` |

### `vueModalDialogPlugin.confirm(message, title, options)`

Perform an confirm dialog with "Yes" and "No" button.

The returned `Promise` instance will be resolved when user clicks "Yes" button, or rejected when user clicks the "No" button or the background area.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `message` | string&#124;Error | The message. | `''` |
| `title` | string | The title. | `null` |
| `options` | object | Additional options (see `open()`). | `{}` |

### `vueModalDialogPlugin.prompt(message, title, options)`

Perform an prompt dialog with "OK" and "Cancel" button.

A single text input will be placed below the dialog content.

The returned `Promise` instance will be resolved with the values of inputs when user clicks "OK" button, or rejected when user clicks the background area.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `message` | string&#124;Error | The message. | `''` |
| `title` | string | The title. | `null` |
| `options` | object | Additional options (see `open()`). | `{}` |

### `vueModalDialogPlugin.open(options)`

Perform a dialog using custom options.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `options` | object | | |
| `options.message` | string&#124;Error | The message. | `''` |
| `options.title` | string | The title. | `null` |
| `options.inputs` | string | HTML code below the title and message.<br />If specified, the returned `Promise` instance will be resolved with the values of all inputs (including `<input>`, `<textarea>` and `<select>`) when user clicks a button with `'ok'` value set. | `null` |
| `options.buttons` | array | The buttons. | `[]` |
| `options.buttons[].value` | string | The value of this button. | `[]` |
| `options.buttons[].label` | string | The label of this button. | `[]` |
| `options.buttons[].secondary` | boolean | If set to true, a `secondary` class will be added to the button node. | `[]` |
| `options.buttons[].reject` | boolean | If set to true, the returned `Promise` instance will be rejected with the value of the button when user clicks the button. | `[]` |
| `options.html` | boolean | Set to true to disable HTML escaping for title and message. | `false` |

### `vueModalDialogPlugin.close(options)`

Close a dialog with specified ID.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `options` | object | | |
| `options.id` | string | The unique ID of the dialog. | |

## License

[MIT](http://opensource.org/licenses/MIT)
