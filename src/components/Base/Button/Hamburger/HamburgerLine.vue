<template>
  <svg
    class="hamburger__line"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="1"
      y1="1"
      :x2="getNumber(width)"
      y2="1"
      :stroke="strokeColor"
      :stroke-width="getNumber(height)"
      stroke-linecap="round"
    />
  </svg>
</template>

<script lang="ts">
import globalCSS from '@/utils/globalCSS';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'HamburgerLine',
  props: {
    strokeColor: {
      type: String,
      default: globalCSS.color.textsub,
    },
    width: {
      type: String,
      default: '24px',
    },
    height: {
      type: String,
      default: '3px',
    },
  },
  setup(props) {
    const getNumber = (str) => str.replace(/[^\.0-9]/g, '');
    const viewBox = computed(() => `0 0 ${props.width} ${props.height}`);
    return {
      globalCSS,
      viewBox,
      getNumber,
    };
  },
});
</script>

<style lang="scss" scoped>
.hamburger__line {
  display: block;
}
</style>
