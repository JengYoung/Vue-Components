<template>
  <component :is="tag" :style="headerTextCSS">Text</component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tag: String,
    centered: Boolean,
    color: {
      type: String,
      default: 'black'
    }
  },
  setup (props) {
    const headerTextCSS = {
      ...(props.centered ? { textAlign: 'center' } : {}),
      color: props.color
    }

    return { headerTextCSS }
  }
})
</script>

<style lang="scss" scoped></style>
