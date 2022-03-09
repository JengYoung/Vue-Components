<template>
  <div :style="toggleStyle" class="toggle">
    <div class="toggle__button"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: String || Number,
    height: String || Number,
    backgroundColor: String,
    buttonColor: String,
    isToggle: Boolean,
    border: {
      type: String || Number,
      default: '1px solid lightgray'
    }
  },
  setup (props) {
    const toggleStyle = {
      backgroundColor: props.backgroundColor,
      width: props.width,
      height: props.height,
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