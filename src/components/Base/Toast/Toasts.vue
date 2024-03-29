<template>
  <Teleport to="body">
    <ul id="toasts" :class="!isTransition ? 'toasts--no-transition' : ''">
      <template v-for="(item, idx) in items" :key="item.id">
        <Transition v-if="isTransition" name="toast">
          <DefaultToast
            :isTransition="isTransition"
            :order="idx"
            :width="width"
            :height="height"
            :toastType="item.type"
            :content="item.content"
            :toastStyle="toastStyle"
            :reversed="direction.includes('bottom')"
            :item="item"
          ></DefaultToast>
        </Transition>
        <DefaultToast
          v-else
          :isTransition="isTransition"
          :order="idx"
          :width="width"
          :height="height"
          :toastType="item.type"
          :content="item.content"
          :toastStyle="toastStyle"
          :reversed="direction.includes('bottom')"
          :item="item"
        ></DefaultToast>
      </template>
    </ul>
  </Teleport>
</template>

<script lang="ts">
import { useToastStore } from '@/store/useToastStore';
import { computed } from '@vue/reactivity';
import { defineComponent, PropType } from 'vue';
import DefaultToast from './Default.vue';
import { defaultToastsProps } from './defaultProps';

export default defineComponent({
  name: 'ToastsContainer',
  components: { DefaultToast },
  props: {
    direction: {
      type: String,
      default: defaultToastsProps.direction,
    },
    gap: {
      type: String,
      default: defaultToastsProps.gap,
    },
    isTransition: {
      type: Boolean,
      default: defaultToastsProps.isTransition,
    },
    toastStyle: {
      type: String as PropType<'float' | 'block'>,
      required: true,
      default: defaultToastsProps.toastStyle,
    },
    width: {
      type: String,
      default: defaultToastsProps.width,
    },
    height: {
      type: String,
      default: defaultToastsProps.height,
    },
  },
  setup(props) {
    const directions = computed(() => {
      const dArr = props.direction.split(' ');

      if (dArr.length === 1) {
        const d = dArr[0];
        const isRight = d === 'right';
        const isBottom = d === 'bottom';
        const isTop = d === 'top';

        return {
          top: isTop || isBottom ? 'auto' : '50%',
          left: isTop || isBottom ? '50%' : 'auto',
          bottom: isBottom ? props.gap : 'auto',
          right: isRight ? props.gap : 'auto',
          transform:
            isTop || isBottom ? 'translateX(-50%)' : 'translateY(-50%)',
          flexDirection: isBottom ? 'column-reverse' : 'column',
        };
      } else {
        const d = dArr[0];
        const isBottom = d === 'bottom';

        const res = {
          top: 'auto',
          left: 'auto',
          bottom: 'auto',
          right: 'auto',
          transform: 'none',
          flexDirection: isBottom ? 'column-reverse' : 'column',
        };

        dArr.forEach((d) => (res[d] = props.gap));

        return res;
      }
    });

    const toastStore = useToastStore();

    const items = computed(() => toastStore.items);

    return { directions, items };
  },
});
</script>

<style lang="scss" scoped>
#toasts {
  position: fixed;
  top: v-bind('directions.top');
  right: v-bind('directions.right');
  bottom: v-bind('directions.bottom');
  left: v-bind('directions.left');

  display: flex;
  flex-direction: v-bind('directions.flexDirection');

  width: v-bind('width');
  height: v-bind('height');

  &:not(&.toasts--no-transition) {
    transition: all 1s;
  }

  transform: v-bind('directions.transform');
}
</style>
