<template>
  <i class="icon">
    <img :src="src" :alt="alt" class="icon__image" />
  </i>
</template>

<script lang="ts">
import globalCSS from '@/utils/globalCSS';
import { computed, defineComponent } from 'vue';
import { defaultIconProps } from './defaultProps';

export default defineComponent({
  name: 'DefaultIcon',
  props: {
    src: {
      type: String,
      default: defaultIconProps.src,
      required: true,
    },
    alt: {
      type: String,
      default: defaultIconProps.alt,
      required: true,
    },
    size: {
      type: String,
      default: defaultIconProps.size,
      required: true,
    },
    strokeWidth: {
      type: String,
      default: defaultIconProps.strokeWidth,
    },
    strokeColor: {
      type: String,
      default: defaultIconProps.strokeColor,
    },
    round: {
      type: Boolean,
      default: defaultIconProps.round,
    },
  },

  setup(props) {
    const borderRadius = computed(() => {
      return props.round
        ? globalCSS.borderRadius.round
        : globalCSS.borderRadius.default;
    });

    return {
      borderRadius,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;

  width: v-bind('size');
  height: v-bind('size');
  overflow: hidden;

  border-radius: v-bind('borderRadius');
  stroke: v-bind('strokeColor');

  stroke-width: v-bind('strokeWidth');

  .icon__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: 50% 50%;
  }
}
</style>
