<template>
  <button class="button" :style="buttonCSS">{{ children }}</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    children: String,
    backgroundColor: String,
    width: String,
    height: String,
    padding: String,
  },
  setup(props) {
    const buttonCSS = computed(() => ({
      backgroundColor: props.backgroundColor,
      width: props.width,
      height: props.height,
      padding: props.padding,
    }));
    return {
      buttonCSS,
    };
  },
});
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
