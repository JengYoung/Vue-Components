<template>
  <div class="toast">
    <div class="toast__inner">
      <DefaultIcon src="http://placeimg.com/640/480/animals"></DefaultIcon>
      <div class="toast__content">{{ content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

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
  },
  setup(props) {
    const position = computed(() =>
      props.toastStyle === defaultToastProps.toastStyle ? 'absolute' : 'block'
    );

    return {
      position,
      globalCSS,
    };
  },
});
</script>

<style lang="scss" scoped>
.toast {
  position: v-bind('position');
  right: 0;

  width: v-bind('width');
  height: v-bind('height');

  margin-bottom: 1rem;

  background-color: v-bind('globalCSS.color.white');

  border: 1px solid v-bind('globalCSS.color.sub');
  border-radius: v-bind('globalCSS.borderRadius.soft');

  box-shadow: 0.125rem 0.125rem 0.125rem 0.125rem rgba(0, 0, 0, 0.2);
  .toast__inner {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    transition: all 0.3s;

    .toast__content {
      margin-left: 0.5rem;
      font-size: v-bind('globalCSS.fontSize.sm');
    }
  }
}
</style>
