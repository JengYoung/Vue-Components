<template>
  <aside class="sidebar" :style="sidebarStyle">
    Test
  </aside>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from 'vue'

export default defineComponent({
  props: {
    width: [String, Number],
    padding: [String, Number],
    backgroundColor: String,
    border: String,
    headerHeight: [String, Number],
  },
  setup (props) {
    const sidebarStyle = {
      '--width': `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      '--padding': `${typeof props.padding === 'number' ? `${props.padding}rem` : props.padding}`,
      '--background-color': props.backgroundColor,
      '--border': props.border,
      '--header-height': `${typeof props.headerHeight === 'number' ? `${props.headerHeight}rem` : props.headerHeight}`,
    } as StyleValue

    return {
      sidebarStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--background-color);
  width: var(--width);
  height: calc(100% - #{var(--header-height)});
  border: 1px solid #{var(--border)};

  transition: all 0.3s;
  &--closed {
    transform: transform3d(#{var(--width)})
  }
}
</style>
