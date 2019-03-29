import vueDialogStoreModule from './vueDialogStoreModule'
import VueDialogHolderComponent from './VueDialogHolderComponent.vue'

const vueModalDialogPlugin = {
  install (Vue, options = {}) {
    Vue.prototype.$dialog = this

    this.store = options.store
    this.okButtonLabel = options.okButtonLabel || 'OK'
    this.cancelButtonLabel = options.cancelButtonLabel || 'Cancel'
    this.yesButtonLabel = options.yesButtonLabel || 'Yes'
    this.noButtonLabel = options.noButtonLabel || 'No'

    this.store.registerModule('vueDialog', vueDialogStoreModule)

    Vue.component(VueDialogHolderComponent.name, VueDialogHolderComponent)
  },

  open ({ message, title = null, inputs = null, buttons = [], html = false }) {
    return new Promise((resolve, reject) => {
      this.store.dispatch('vueDialogOpen', {
        message,
        title,
        inputs,
        buttons,
        html,
        resolveCallback: resolve,
        rejectCallback: reject
      })
    })
  },

  close ({ id }) {
    return this.store.dispatch('vueDialogClose', { id })
  },

  alert (message, title = null, options = {}) {
    return this.open(Object.assign({
      message,
      title,
      buttons: [
        { value: 'ok', label: this.okButtonLabel }
      ]
    }, options))
  },

  confirm (message, title = null, options = {}) {
    return this.open(Object.assign({
      message,
      title,
      buttons: [
        { value: 'no', label: this.noButtonLabel, secondary: true },
        { value: 'yes', label: this.yesButtonLabel }
      ]
    }, options))
  },

  prompt (message, title = null, options = {}) {
    return this.open(Object.assign({
      message,
      title,
      inputs: '<input type="text">',
      buttons: [
        { value: 'cancel', label: this.cancelButtonLabel, secondary: true },
        { value: 'ok', label: this.okButtonLabel }
      ]
    }, options))
  }
}

export default vueModalDialogPlugin
