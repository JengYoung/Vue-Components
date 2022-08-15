<template>
  <!-- :class="sidebarClosed ? 'sidebar--closed' : ''" -->
  <aside class="sidebar" :style="sidebarStyle" :class="sidebarClosed ? 'closed' : ''" />
</template>

<script lang="ts">
import { defineComponent, StyleValue, computed, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  props: {
    width: [String, Number],
    padding: [String, Number],
    backgroundColor: String,
    border: String,
    headerHeight: [String, Number],
    sidebarClosed: Boolean,
    delay: Number,
    isClickAway: Boolean,
  },
  emits: ['update:closed'],
  setup(props, { emit }) {
    const sidebarStyle = computed(() => ({
      /* eslint-disable no-nested-ternary */
      '--width': `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      '--padding': `${typeof props.padding === 'number' ? `${props.padding}rem` : props.padding}`,
      '--background-color': props.backgroundColor,
      '--border': props.border,
      '--header-height': `${
        typeof props.headerHeight === 'number' ? `${props.headerHeight}rem` : props.headerHeight
      }`,
      '--delay': `${props.delay}s`,
    })) as StyleValue;

    const handleBodyClick = (e: Event) => {
      const $sidebar = (e.target as HTMLElement).closest('.sidebar');
      if (!$sidebar && props.isClickAway && !props.sidebarClosed) {
        emit('update:closed', true);
      } else {
        emit('update:closed', props.sidebarClosed);
      }
    };
    onMounted(() => {
      if (props.isClickAway) {
        document.body.addEventListener('click', handleBodyClick);
      }
    });

    onUnmounted(() => {
      if (props.isClickAway) {
        document.body.removeEventListener('click', handleBodyClick);
      }
    });

    return {
      sidebarStyle,
    };
  },
});
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
  transition: all var(--delay);
  overflow: hidden;
}
.closed {
  transition: all var(--delay);
  transform: translate3d(calc(-1 * var(--width)), 0, 0);
}
</style>
