<template>
  <button
    class="button"
    :style="buttonCSS"
    @click="() => handleClick && handleClick()"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DefaultButton',
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
      '--width': `${
        typeof props.width === 'number' ? `${props.width}rem` : props.width
      }`,
      '--height': `${
        typeof props.height === 'number' ? `${props.height}rem` : props.height
      }`,
      '--padding': `${
        typeof props.padding === 'number'
          ? `${props.padding}rem`
          : props.padding
      }`,
      '--font-size': `${
        typeof props.fontSize === 'number'
          ? `${props.fontSize}rem`
          : props.fontSize
      }`,
      '--color': props.color,
      '--border': props.border,
      '--border-radius': `${
        typeof props.borderRadius === 'number'
          ? `${props.borderRadius}px`
          : props.borderRadius
      }`,
      '--border-color': props.borderColor,
      '--is-hover': `${!!props.hoverColor}`,
      '--hover-color': props.hoverColor,
      '--hover-scale': `${
        props.hoverScale ? `scale(${props.hoverScale})` : ''
      }`,

      ...(props.outline
        ? {
            '--background-color': 'transparent',
            '--border-color': props.color,
          }
        : {}),
    }));

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
  align-items: center;
  justify-content: center;
  width: var(--width);
  height: var(--height);
  padding: var(--padding);
  font-size: var(--font-size);
  color: var(--color);

  background-color: var(--background-color);
  border: var(--border);
  border-color: var(--border-color);
  border-radius: var(--border-radius);

  &:hover {
    background-color: var(--hover-color);
    transition: all 0.3s;
    transform: var(--hover-scale);
  }
}
</style>
