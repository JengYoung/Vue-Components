<template>
  <aside class="sidebar" :class="sidebarClosed ? 'sidebar--closed' : ''">
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import { defaultSidebarProps } from './defaultProps';

export default defineComponent({
  name: 'DefaultSidebar',
  props: {
    width: {
      type: [String, Number],
      default: defaultSidebarProps.width,
    },
    padding: {
      type: [String, Number],
      default: defaultSidebarProps.padding,
    },
    bgColor: {
      type: String,
      deafult: defaultSidebarProps.bgColor,
    },
    border: {
      type: String,
      default: defaultSidebarProps.border,
    },
    headerHeight: {
      type: [String, Number],
      default: defaultSidebarProps.headerHeight,
    },
    sidebarClosed: {
      type: Boolean,
      default: defaultSidebarProps.sidebarClosed,
    },
    duration: {
      type: Number,
      default: defaultSidebarProps.duration,
    },
    isClickAway: {
      type: Boolean,
      default: defaultSidebarProps.isClickAway,
    },
  },
  emits: ['update:closed'],
  setup(props, { emit }) {
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

    const transitionDuration = computed(() => props.duration + 's');

    return {
      transitionDuration,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: v-bind('headerHeight');
  bottom: 0;

  box-sizing: border-box;

  width: v-bind('width');
  height: calc(100vh - #{v-bind('headerHeight')});
  padding: v-bind('padding');

  overflow: hidden;

  background-color: v-bind('bgColor');

  border-right: v-bind('border');

  transition: all v-bind('transitionDuration');

  &--closed {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
