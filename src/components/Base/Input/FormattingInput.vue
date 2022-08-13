<template>
  <input ref="inputElement" @input="onInput">
  <div>prefix: {{ prefix }}</div>
  <div>blocks: {{ blocks }}</div>
  <div>delimeter: {{ delimeter }}</div>
  <div>modelValue: {{ modelValue }}</div>
  <div>now inputValue: {{ value }}</div>
  <div>arr: {{ JSON.stringify(arr) }}</div>
  <div>inputDirection: {{ inputDirection }}</div>
  <div>selectionStart: {{ selectionStart}}</div>
  <div>selectionEnd: {{ selectionEnd }}</div>
  <br/>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

enum InputDirectionEnum {
  PLUS = 'plus',
  MINUS = 'minus'
}

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
    const inputElement = ref<HTMLInputElement | null>(null);
    const value = ref('');
    const computedModelValue = computed(() => props.modelValue);
    const computedBlocks = computed(() => props.blocks);
    const arr = ref<string[]>([]);
    const inputDirection = ref<InputDirectionEnum>(InputDirectionEnum.PLUS);
    const selectionStart = ref(0);
    const selectionEnd = ref(0);

    const onInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }


    return {
      inputElement,
      value,
      arr,
      inputDirection,
      selectionStart,
      selectionEnd,
      onInput
    }
  }
})
</script>

<style scoped>

</style>
