<template>
  <div class="VueDialogHolder">

    <transition-group
      name="vue-dialog"
      tag="div"
    >

      <div
        v-for="(item, index) in $store.getters.vueDialogItems"
        :key="`dialog-${index}`"
        class="dialog-wraper"
      >

        <div class="dialog-background" @click="onClickBackground(item)"/>

        <div class="dialog-frame">

          <div class="dialog-content">

            <div v-if="item.title" class="dialog-title">{{ item.title }}</div>

            <template v-if="item.message">

              <template v-if="!item.html">
                <div class="dialog-message">{{ item.message }}</div>
              </template>

              <template v-else>
                <div class="dialog-message" v-html="item.message" />
              </template>

            </template>

            <div v-if="item.inputs" class="dialog-inputs" v-html="item.inputs" />

          </div>

          <div v-if="item.buttons.length > 0" class="dialog-buttons">

            <a
              v-for="(button, index) in item.buttons"
              :key="`dialog-button-${index}`"
              :class="{ 'secondary': button.secondary }"
              href="javascript:void(0);"
              @click="onClickButton(item, button)"
            >{{ button.label }}</a>

          </div>

        </div>

      </div>

    </transition-group>

  </div>
</template>

<script>
export default {
  name: 'VueDialogHolder',
  methods: {
    onClickBackground (item) {
      // reject
      item.rejectCallback(new Error())

      // close dialog
      return this.$dialog.close({ id: item._id })
    },
    onClickButton (item, button) {
      let value = button.value

      if (!button.reject) {

        // if using inputs
        if (item.inputs) {

          // to retrieve values from inputs
          value = []
          const inputs = this.$el.querySelectorAll('.dialog-inputs input, .dialog-inputs textarea, .dialog-inputs select')
          for (let i = 0; i < inputs.length; i++) {
            switch (button.value) {
              case 'ok':
                value.push(inputs[i].value)
                break
              default:
                value.push(null)
            }
          }

        }

        // resolve with value
        item.resolveCallback(value)

      } else {

        // reject with value
        item.rejectCallback(value)

      }

      // close dialog
      return this.$dialog.close({ id: item._id })
    }
  }
}
</script>

<style lang="scss">
.VueDialogHolder {
  // structure
  .dialog-wraper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
  }
  .dialog-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }
  .dialog-frame {
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;
  }

  // theme
  .dialog-wraper {
  }
  .dialog-background {
    background-color: rgba(0, 0, 0, .4);
  }
  .dialog-frame {
    min-width: 270px;
    max-width: 80vw;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
  }
  .dialog-content {
    padding-top: 16px;
    padding-bottom: 16px;
    img, svg {
      max-width: 100%;
      height: auto;
    }
  }
  .dialog-title {
    padding-left: 16px;
    padding-right: 16px;
    font-family: sans-serif;
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    color: #000000;
    text-align: center;
    word-break: break-word;
  }
  .dialog-message {
    padding-left: 16px;
    padding-right: 16px;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
    text-align: center;
    word-break: break-word;
  }
  .dialog-inputs {
    padding-left: 16px;
    padding-right: 16px;
    font-family: sans-serif;
    font-size: 12px;
    line-height: 17px;
    color: #444444;
    text-align: center;
    word-break: break-word;
    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="number"],
    input[type="tel"],
    textarea,
    select {
      display: block;
      width: 100%;
      padding: 2px 6px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      border-radius: 0;
      box-sizing: border-box;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
      color: inherit;
      letter-spacing: inherit;
      text-decoration: inherit;
      &::placeholder {
        color: #eeeeee;
      }
    }
  }
  .dialog-title + .dialog-message {
    margin-top: 6px;
  }
  .dialog-title + .dialog-inputs {
    margin-top: 10px;
  }
  .dialog-message + .dialog-inputs {
    margin-top: 10px;
  }
  .dialog-buttons {
    border-top: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    a {
      display: block;
      flex-grow: 1;
      flex-shrink: 1;
      width: 1%;
      padding: 12px 8px;
      background-color: #ffffff;
      font-family: sans-serif;
      font-size: 16px;
      line-height: 22px;
      font-weight: 500;
      color: #444444;
      text-decoration: none;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.secondary {
        color: #888888;
      }
      & + a {
        border-left: 1px solid #eeeeee;
      }
      &:active {
        background-color: #eeeeee;
      }
    }
  }
  .vue-dialog-enter-active, .vue-dialog-leave-active {
    transition-property: visibility, opacity;
    transition-duration: .25s;
    .dialog-frame {
      transition-property: transform;
      transition-duration: .25s;
      transition-timing-function: ease-in-out;
    }
  }
  .vue-dialog-enter {
    opacity: 0;
    visibility: hidden;
    .dialog-frame {
      transform: scale(1.1);
    }
  }
  .vue-dialog-leave-to {
    opacity: 0;
    visibility: hidden;
    .dialog-frame {
      transform: scale(.9);
    }
  }
  .vue-dialog-leave, .vue-dialog-enter-to {
    opacity: 1;
    visibility: visible;
    .dialog-frame {
      transform: scale(1);
    }
  }
}
</style>
