<template>
  <input @input="changeInputValue">
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    blocks: {
      type: Array as PropType<number[]>,
      required: true
    },
    delimeter: {
      type: String
    },
    prefix: {
      type: String
    }
  },
  setup (props, { emit }) {
    const changeInputValue = (e: Event) => {
      emit('update:inputValue', (e.target as HTMLInputElement).value); // 이전에는 `this.$emit('input', title)`
    }

    return {
      changeInputValue
    }
  }
})
</script>

<style scoped>

</style>
