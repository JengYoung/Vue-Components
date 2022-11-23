<template>
  <img class="img" ref="imageRef" :src="loaded ? src : defaultSrc" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useIntsersectionObserver from '@hooks/useIntersectionObserver';
import { defaultImageProps } from './defaultProps';

export default defineComponent({
  name: 'DefaultImage',
  props: {
    display: {
      type: String,
      default: defaultImageProps.display,
    },
    lazy: {
      type: Boolean,
      default: defaultImageProps.lazy,
    },
    threshold: {
      type: Number,
      default: defaultImageProps.threshold,
    },
    src: {
      type: String,
      default: defaultImageProps.src,
    },
    alt: {
      type: String,
      default: defaultImageProps.alt,
    },
    width: {
      type: [String, Number],
      default: defaultImageProps.objectFit,
    },
    height: {
      type: [String, Number],
      default: defaultImageProps.objectFit,
    },
    defaultSrc: {
      type: String,
      default: defaultImageProps.objectFit,
    },
    objectFit: {
      type: String,
      default: defaultImageProps.objectFit,
    },
  },
  setup(props) {
    const { loaded, $ref: imageRef } = useIntsersectionObserver({
      type: 'image',
      lazy: props.lazy,
      threshold: props.threshold,
    });

    const imageCSS = {
      display: props.display,
      width: `${
        typeof props.width === 'number' ? `${props.width}px` : props.width
      }`,
      height: `${
        typeof props.height === 'number' ? `${props.height}px` : props.height
      }`,
      objectFit: props.objectFit,
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
  display: v-bind('imageCSS.display');

  width: v-bind('imageCSS.width');
  height: v-bind('imageCSS.height');

  object-fit: v-bind('imageCSS.objectFit');
  background-position: 50% 50%;
}
</style>
