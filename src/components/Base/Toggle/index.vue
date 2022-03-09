<template>
  <div :style="toggleStyle" class="toggle">
    <div class="toggle__button" :style="toggleButtonStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: [String, Number],
      default: '6.25rem'
    },
    height: {
      type: [String, Number],
      default: '3rem'
    },
    backgroundColor: String,
    buttonColor: String,
    isToggle: Boolean,
    border: {
      type: [String, Number],
      default: '1px solid lightgray'
    }
  },
  setup (props) {
    const toggleStyle = {
      backgroundColor: props.backgroundColor,
      width: typeof props.width === 'string' ? props.width : `${props.width}rem`,
      height: typeof props.height === 'string' ? props.height : `${props.height}rem`,
      border: props.border
    }
    const toggleButtonStyle = {
      backgroundColor: props.buttonColor
    }

    return {
      toggleStyle,
      toggleButtonStyle
    }
  }
})
</script>

<style scoped>

</style>