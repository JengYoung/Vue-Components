<template>
  <button @click="onToggle">
    Toggle!{{ toggled }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    sidebarClosed : Boolean
  },
  setup (props) {
    const toggled = ref(props.sidebarClosed);
    const onToggle = () => {
      toggled.value = !toggled.value
    };

    return { onToggle, toggled };
  }
})
</script>

<style scoped>

</style>
