const MUTATION_TYPE_VUE_DIALOG_OPEN = 'vueDialog/OPEN'
const MUTATION_TYPE_VUE_DIALOG_CLOSE = 'vueDialog/CLOSE'

const generateID = function () {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let value = ''
  for (let i = 0; i < 16; i++) {
    value += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return value
}

export default {
  state: {
    items: []
  },
  getters: {
    vueDialogItems (state) {
      return state.items
    }
  },
  actions: {
    vueDialogOpen (context, payload) {
      // unique id
      const id = generateID()

      // commit to open
      context.commit(MUTATION_TYPE_VUE_DIALOG_OPEN, Object.assign({ _id: id }, payload))
    },

    vueDialogClose (context, payload) {
      context.commit(MUTATION_TYPE_VUE_DIALOG_CLOSE, payload)
    }
  },
  mutations: {
    [MUTATION_TYPE_VUE_DIALOG_OPEN] (state, payload) {
      state.items.push(payload)
    },

    [MUTATION_TYPE_VUE_DIALOG_CLOSE] (state, payload) {
      if (state.items.length <= 0) return

      if (typeof payload === 'object' && payload !== null && 'id' in payload && payload.id > 0) {
        // specified id to close
        const id = payload.id

        // find that item
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i]._id === id) {
            // delete item
            state.items.splice(i, 1)
          }
        }
      } else {
        // delete the last item
        state.items.pop()
      }
    }
  }
}
