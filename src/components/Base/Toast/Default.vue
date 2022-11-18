<template>
  <div class="toast">
    <div class="toast__inner">
      <DefaultIcon></DefaultIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultIcon from '@components/Base/Icon/Default.vue';
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
    isTransition: {
      type: Boolean,
      default: true,
    },
    transitionDuration: {
      type: Number,
      default: 0.3,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.toast {
  min-width: 18.5rem;
  max-width: 30rem;
  min-height: 2.5rem;
}
</style>
