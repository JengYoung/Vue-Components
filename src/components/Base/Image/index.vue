<template>
  <img class="img" ref="imageRef" :src="loaded ? src : defaultSrc" :alt="alt" :style="imageCSS" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useIntsersectionObserver from '@hooks/useIntersectionObserver';

export default defineComponent({
  props: {
    display: String,
    lazy: Boolean,
    threshold: Number,
    src: String,
    alt: String,
    width: {
      type: [String, Number],
      default: 'auto',
    },
    height: {
      type: [String, Number],
      default: 'auto',
    },
    defaultSrc: {
      type: String,
      default: 'https://picsum.photos/200',
    },
    objectFit: {
      type: String,
      default: 'cover',
    },
  },
  setup(props) {
    const { loaded, $ref: imageRef } = useIntsersectionObserver({
      type: 'image',
      lazy: props.lazy,
      threshold: 1,
    });

    const imageCSS = {
      display: props.display,
      width: `${typeof props.width === 'number' ? `${props.width}rem` : props.width}`,
      height: `${typeof props.height === 'number' ? `${props.height}rem` : props.height}`,
      'object-fit': props.objectFit,
    };

    return {
      loaded,
      imageRef,
      imageCSS,
    };
  },
});
</script>

<style lang="scss" scoped>
.img {
  background-position: 50% 50%;
}
</style>
