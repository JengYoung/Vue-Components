<template>
  <div v-show="visible" class="toast" :class="toastClass">
    <div class="toast__inner">
      <DefaultIcon src="http://placeimg.com/640/480/animals"></DefaultIcon>
      <div class="toast__content">{{ content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';

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
  },
  setup(props) {
    const visible = ref(false);
    const zIndex = computed(() => 10000 + props.order);

    const toastClass = ref<string[]>([]);

    onMounted(() => {
      if (props.toastStyle === 'float') {
        toastClass.value = [...toastClass.value, 'toast--float'];
      }
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

  border: 1px solid v-bind('globalCSS.color.sub');
  border-radius: v-bind('globalCSS.borderRadius.soft');

  box-shadow: 0.125rem 0.125rem 0.125rem 0.125rem rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  &:not(.toast--float) {
    transform: $translate-block-visible;
  }
  .toast__inner {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    transition: all 0.5s;

    .toast__content {
      margin-left: 0.5rem;
      font-size: v-bind('globalCSS.fontSize.sm');
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
