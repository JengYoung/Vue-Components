<template>
  <button class="button" :style="buttonCSS" @click="() => handleClick && handleClick()">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, StyleValue } from 'vue';

export default defineComponent({
  props: {
    backgroundColor: {
      type: String,
      required: true,
      default: '#fff',
    },
    width: {
      type: [String, Number],
      default: 'auto',
    },
    height: {
      type: [String, Number],
      default: 'auto',
    },
    padding: {
      type: [String, Number],
      default: 'auto',
    },
    fontSize: {
      type: [String, Number],
      default: 1,
    },
    border: String,
    color: String,
    borderRadius: {
      type: [String, Number],
      default: 0,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: '#fff',
    },
    hoverColor: {
      type: String,
    },
    hoverScale: {
      type: Number,
    },
    onClick: {
      type: Function,
    },
  },
  setup(props) {
    const buttonCSS = computed(() => ({
      '--background-color': props.backgroundColor,
      '--width': `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      '--height': `${typeof props.height === 'number' ? `${props.height}rem` : props.height}`,
      '--padding': `${typeof props.padding === 'number' ? `${props.padding}rem` : props.padding}`,
      '--font-size': `${
        typeof props.fontSize === 'number' ? `${props.fontSize}rem` : props.fontSize
      }`,
      '--color': props.color,
      '--border': props.border,
      '--border-radius': `${
        typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius
      }`,
      '--border-color': props.borderColor,
      '--is-hover': `${!!props.hoverColor}`,
      '--hover-color': props.hoverColor,
      '--hover-scale': `${props.hoverScale ? `scale(${props.hoverScale})` : ''}`,

      ...(props.outline
        ? {
            '--background-color': 'transparent',
            '--border-color': props.color,
          }
        : {}),
    })) as StyleValue;

    return {
      buttonCSS,
      handleClick: props.onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@function hextorgb($hex) {
  @return red($hex), green($hex), blue($hex);
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--background-color);
  width: var(--width);
  height: var(--height);
  padding: var(--padding);
  color: var(--color);
  font-size: var(--font-size);
  border: var(--border);
  border-radius: var(--border-radius);
  border-color: var(--border-color);

  &:hover {
    transition: all 0.3s;
    background-color: var(--hover-color);
    transform: var(--hover-scale);
  }
}
</style>
