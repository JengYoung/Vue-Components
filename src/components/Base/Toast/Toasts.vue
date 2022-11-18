<template>
  <Teleport to="body">
    <ul id="toasts">
      <template v-for="item in items" :key="item.id">
        <DefaultToast :content="item.id"></DefaultToast>
      </template>
    </ul>
  </Teleport>
</template>

<script lang="ts">
import { useToastStore } from '@/store/useToastStore';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import DefaultToast from './Default.vue';

export default defineComponent({
  name: 'ToastsContainer',
  components: { DefaultToast },
  props: {
    direction: {
      type: String,
      default: 'top right',
    },
    gap: {
      type: String,
      default: '2rem',
    },
    isTransition: {
      type: Boolean,
      default: true,
    },
    transitionDuration: {
      type: Number,
      default: 0.3,
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

    const toastStore = useToastStore();

    const items = computed(() => toastStore.items);

    return { directions, items };
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
