<template>
  <aside
    ref="sidebarRef"
    class="sidebar"
    :class="isActive ? 'sidebar--closed' : ''"
  >
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
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
    const sidebarRef = ref(null);
    const isActive = computed(() => props.sidebarClosed);

    const onClickAway = (e: Event) => {
      if (!props.isClickAway || !sidebarRef.value) return;

      if (!props.sidebarClosed) {
        emit('update:closed', true);
      } else {
        emit('update:closed', props.sidebarClosed);
      }
    };

    onMounted(() => {
      if (props.isClickAway) {
        document.body.addEventListener('click', onClickAway);
      }
    });

    onUnmounted(() => {
      if (props.isClickAway) {
        document.body.removeEventListener('click', onClickAway);
      }
    });

    const transitionDuration = computed(() => props.duration + 's');

    return {
      isActive,
      sidebarRef,
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
