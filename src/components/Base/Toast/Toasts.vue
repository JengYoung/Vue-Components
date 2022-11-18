<template>
  <Teleport to="body">
    <ul id="toasts"></ul>
  </Teleport>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToastsContainer',
  props: {
    direction: {
      type: String,
      default: 'top right',
    },
    gap: {
      type: String,
      default: '2rem',
    },
  },
  setup(props) {
    const directions = computed(() => {
      const dArr = props.direction.split(' ');
      const res = {
        top: 'auto',
        left: 'auto',
        bottom: 'auto',
        right: 'auto',
      };

      dArr.forEach((d) => (res[d] = props.gap));

      return res;
    });

    return { directions };
  },
});
</script>

<style lang="scss" scoped>
#toasts {
  position: absolute;

  top: v-bind('directions.top');
  right: v-bind('directions.right');
  bottom: v-bind('directions.bottom');
  left: v-bind('directions.left');
}
</style>
