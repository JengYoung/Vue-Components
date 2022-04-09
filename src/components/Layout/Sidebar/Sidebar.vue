<template>
  <!-- :class="sidebarClosed ? 'sidebar--closed' : ''" -->
  <aside
    class="sidebar"
    :style="sidebarStyle"
    :class="sidebarClosed ? 'closed' : ''"
  />

</template>

<script lang="ts">
import { defineComponent, StyleValue, computed } from 'vue'

export default defineComponent({
  props: {
    width: [String, Number],
    padding: [String, Number],
    backgroundColor: String,
    border: String,
    headerHeight: [String, Number],
    sidebarClosed: Boolean
  },
  setup (props) {
    const sidebarStyle = computed(() => ({
      /* eslint-disable no-nested-ternary */
      '--width': `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      '--padding': `${typeof props.padding === 'number' ? `${props.padding}rem` : props.padding}`,
      '--background-color': props.backgroundColor,
      '--border': props.border,
      '--header-height': `${typeof props.headerHeight === 'number' ? `${props.headerHeight}rem` : props.headerHeight}`,
    })) as StyleValue


    return {
      sidebarStyle,
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: var(--header-height);
  background-color: var(--background-color);
  width: var(--width);
  height: calc(100vh - #{var(--header-height)});
  padding: var(--padding);
  border: 1px solid #{var(--border)};
  transition: all 0.3s;
  overflow: hidden;
}
.closed {
  transition: all 0.3s;
  transform: translate3d(calc(-1 * var(--width)), 0, 0);
}
</style>
