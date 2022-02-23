<template>
  <button class="button" :style="buttonCSS">{{ children }}</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    children: String,
    backgroundColor: String,
    width: String || Number,
    height: String || Number,
    padding: String || Number,
    fontSize: Number,
    border: String,
    color: String,
    borderRadius: String || Number,
    outline: Boolean,
    borderColor: String,
  },
  setup(props) {
    const buttonCSS = computed(() => ({
      '--background-color': props.backgroundColor,
      '--width': `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      '--height': `${typeof props.height === 'number' ? `${props.height}rem` : props.height}`,
      '--padding': `${typeof props.padding === 'number' ? `${props.padding}rem` : props.padding}`,
      '--font-size': `${props.fontSize}rem`,
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
    }));

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
