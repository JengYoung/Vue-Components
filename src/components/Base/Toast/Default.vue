<template>
  <div class="toast">
    <div class="toast__inner">
      <DefaultIcon src="http://placeimg.com/640/480/animals"></DefaultIcon>
      <div class="toast__content">{{ content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultIcon from '@components/Base/Icon/Default.vue';
import globalCSS from '@utils/globalCSS';

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
      default: '',
      required: true,
    },
    showTime: {
      type: Number,
      default: 5,
    },
  },
  setup() {
    return {
      globalCSS,
    };
  },
});
</script>

<style lang="scss" scoped>
.toast {
  min-width: 18.5rem;
  max-width: 30rem;
  min-height: 2.5rem;
  border: 1px solid v-bind('globalCSS.color.sub');
  border-radius: v-bind('globalCSS.borderRadius.soft');
  box-shadow: 0.125rem 0.125rem 0.125rem 0.125rem rgba(0, 0, 0, 0.2);
  .toast__inner {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    .toast__content {
      margin-left: 0.5rem;
      font-size: v-bind('globalCSS.fontSize.sm');
    }
  }
}
</style>
