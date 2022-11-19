<template>
  <div v-show="visible" class="toast" :class="toastClass">
    <div class="toast__inner">
      <DefaultIcon
        class="toast__icon"
        :src="require(`@/assets/${toastType}-icon.png`)"
      ></DefaultIcon>
      <div class="toast__content">{{ content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, PropType } from 'vue';

import DefaultIcon from '@components/Base/Icon/Default.vue';

import globalCSS from '@utils/globalCSS';

import { defaultToastProps } from './defaultProps';

export default defineComponent({
  name: 'DefaultToast',
  components: { DefaultIcon },
  /**
   * @inner
   * 시간 단위는 second로 한다.
   */
  props: {
    toastType: {
      type: String as PropType<'info' | 'error' | 'warning' | 'success'>,
      required: true,
      default: 'info',
    },
    order: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: defaultToastProps.content,
      required: true,
    },
    showTime: {
      type: Number,
      default: defaultToastProps.showTime,
    },
    toastStyle: {
      type: String,
      default: defaultToastProps.toastStyle,
    },
    width: {
      type: String,
      default: '20rem',
    },
    height: {
      type: String,
      default: '3rem',
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    isTransition: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const visible = ref(false);
    const zIndex = computed(() => 10000 + props.order);

    const toastClass = ref<string[]>([]);

    onMounted(() => {
      toastClass.value = [
        ...toastClass.value,
        ...(props.toastStyle === 'float' ? ['toast--float'] : []),
        ...(!props.isTransition ? ['toast-no-transition'] : []),
      ];

      visible.value = true;
      if (props.toastStyle === 'float') {
        new Promise(() =>
          setTimeout(() => {
            visible.value = false;
          }, props.showTime * 1000 - 1000)
        );
      }
    });

    const toastDirection = computed(() => {
      return props.reversed ? -1 : 1;
    });

    const toastPositionY = computed(() => {
      return props.reversed ? props.order * toastDirection.value : props.order;
    });

    return {
      visible,
      zIndex,
      globalCSS,
      toastClass,
      toastDirection,
      toastPositionY,
    };
  },
});
</script>

<style lang="scss" scoped>
/* prettier-ignore */
$translate-block-invisible: translateY(calc(v-bind('toastPositionY') * 100% - v-bind('toastPositionY') * 10px - 20px)) scale(0.5);

$translate-block-visible: translateY(
  calc(v-bind('toastPositionY') * 100% + v-bind('toastPositionY') * 10px)
);

.toast {
  position: absolute;

  right: 0;

  width: v-bind('width');
  height: v-bind('height');

  background: white;

  background-color: v-bind('globalCSS.color.white');

  border: 1px solid v-bind('globalCSS.color[toastStyle]');
  border-radius: v-bind('globalCSS.borderRadius.soft');

  box-shadow: 0.125rem 0.125rem 0.125rem 0.125rem
    v-bind('globalCSS.color[toastType]');

  &:not(.toast--no-transition) {
    transition: all 0.3s;
  }

  &:not(.toast--float) {
    transform: $translate-block-visible;
  }
  .toast__inner {
    display: flex;
    align-items: center;
    height: 2rem;
    padding: 0.5rem;

    .toast__icon {
      align-self: flex-start;
    }
    .toast__content {
      display: -webkit-box;

      width: 100%;
      height: 2rem;

      margin-left: 0.5rem;
      overflow: hidden;
      font-size: v-bind('globalCSS.fontSize.sm');
      line-height: 1.25;

      color: v-bind('globalCSS.color.textsub');

      word-break: keep-all;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &.toast-enter-active,
  &.toast-leave-active {
    transition: all 0.5s;
  }
  &.toast-enter-from {
    &.toast--float {
      opacity: 1;
    }
  }

  &.toast-enter-from,
  &.toast-leave-to {
    opacity: 0;
    transform: translateY(calc(-20px * v-bind('toastDirection')));

    &:not(.toast--float) {
      transform: $translate-block-invisible;
    }
  }

  &.toast-enter-to,
  &.toast-leave-from {
    opacity: 1;
  }
}
</style>
