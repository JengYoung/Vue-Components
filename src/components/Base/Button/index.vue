<template>
  <button class="button" :style="buttonCSS">{{ children }}</button>
</template>

<script lang="ts">
import { computed, defineComponent, StyleValue } from 'vue';

export default defineComponent({
  props: {
    children: String,
    backgroundColor: {
      type: String,
      required: true,
      default: '#fff',
    },
    width: {
      type: String || Number,
      required: true,
      default: 'auto'
    },
    height: {
      type: String || Number,
      required: true,
      default: 'auto'
    },
    padding: {
      type: String || Number,
      required: true,
      default: 'auto'
    },
    fontSize: {
      type: String || Number,
      required: true,
      default: 1
    },
    border: String,
    color: String,
    borderRadius: {
      type: String || Number,
      required: true,
      default: 0
    },
    outline: {
      type: Boolean,
      required: true,
      default: false
    },
    borderColor: {
      type: String,
      required: true,
      default: '#fff'
    },
  },
  setup(props) {
    const buttonCSS = computed(() => ({
      '--background-color': props.backgroundColor,
      '--width': `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      '--height': `${typeof props.height === 'number' ? `${props.height}rem` : props.height}`,
      '--padding': `${typeof props.padding === 'number' ? `${props.padding}rem` : props.padding}`,
      '--font-size': `${typeof props.fontSize === 'number' ? `${props.fontSize}rem` : props.fontSize}`,
      '--color': props.color,
      '--border': props.border,
      '--border-radius': `${
        typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius
      }`,
      '--border-color': props.borderColor,

      ...(props.outline
        ? {
            '--background-color': 'transparent',
            '--border-color': props.color,
          }
        : {}),
    })) as StyleValue;

    return {
      buttonCSS,
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

  $color: var(--background-color);

  &:hover {
    transition: all 0.3s;
    background-color: darken(#364434, 0.9);
  }
}
</style>
