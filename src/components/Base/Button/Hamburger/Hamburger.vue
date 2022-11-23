<template>
  <div
    class="hamburger"
    :class="{
      'hamburger--active': !isActive,
      'hamburger--fixed': fixed,
    }"
    @click="onClick"
  >
    <HamburgerLine
      :width="width"
      :height="lineHeight"
      :strokeColor="strokeColor"
    />
    <HamburgerLine
      :width="width"
      :height="lineHeight"
      :strokeColor="strokeColor"
    />
    <HamburgerLine
      :width="width"
      :height="lineHeight"
      :strokeColor="strokeColor"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { defaultHamburgerProps } from './defaultProps';
import HamburgerLine from './HamburgerLine.vue';
export default defineComponent({
  emits: ['update:hamburger'],
  name: 'HamburgerButton',
  components: { HamburgerLine },
  props: {
    width: {
      type: String,
      default: defaultHamburgerProps.width,
    },
    height: {
      type: String,
      default: defaultHamburgerProps.height,
    },
    margin: {
      type: String,
      default: defaultHamburgerProps.margin,
    },
    lineHeight: {
      type: String,
      default: defaultHamburgerProps.lineHeight,
    },
    strokeColor: {
      type: String,
      default: defaultHamburgerProps.strokeColor,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const isActive = ref(false);

    const onClick = () => {
      isActive.value = !isActive.value;
      console.log(isActive.value);
      emit('update:hamburger', isActive.value);
    };

    return {
      isActive,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.hamburger {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: v-bind('width');
  height: v-bind('height');

  margin: v-bind('margin');

  cursor: pointer;
  transition: all 0.2s;

  &:deep(.hamburger__line) {
    position: absolute;
    transition: all 0.2s;
    &:first-of-type {
      top: 0;
    }
    &:last-of-type {
      bottom: 0;
    }
  }

  &--fixed {
    position: fixed;
    z-index: 9999;
  }

  &--active {
    &:deep(.hamburger__line) {
      position: absolute;
      &:first-of-type {
        top: 0;
        transform: rotate(45deg);
        transform-origin: top left;
      }
      &:nth-of-type(2) {
        opacity: 0;
      }
      &:last-of-type {
        bottom: 0;
        transform: rotate(-45deg);
        transform-origin: bottom left;
      }
    }
  }
}
</style>
