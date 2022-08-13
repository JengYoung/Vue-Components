<template>
  <input ref="inputElement" @input="changeInputValue">
  <div>prefix: {{ prefix }}</div>
  <div>blocks: {{ blocks }}</div>
  <div>delimeter: {{ delimeter }}</div>
  <div>modelValue: {{ modelValue.length }}</div>
  <div>now inputValue: {{ value }}</div>
  <div>arr: {{ arr }}</div>
  <div>inputDirection: {{ inputDirection }}</div>
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

    // ['a', 'b', 'c-']
    const changeInputValue = (e: Event) => {
      const nowValue = (e.target as HTMLInputElement).value;
      inputDirection.value = nowValue.length > computedModelValue.value.length
        ? InputDirectionEnum.PLUS
        : InputDirectionEnum.MINUS;
      emit('update:inputValue', nowValue); // 이전에는 `this.$emit('input', title)`
    }

    watch([computedModelValue], () => {
      if (!inputElement.value) return;
      const input = inputElement.value;

      value.value = input.value.replace(/[^0-9]/g, '');

      let cnt = 0;
      arr.value = [];

      if (input.value[input.value.length - 1] === props.delimeter) {
        input.value = input.value.slice(0, Math.max(0, input.value.length - 1))
        return;
      }

      for (let i = 0; i < computedBlocks.value.length; i += 1) {
        const nowBlockLength = props.blocks[i];

        for (let j = cnt; j < cnt + nowBlockLength; j += 1) {
          arr.value = [...arr.value, value.value[j] || '']
        }

        const lastBlockStr: string = arr.value[cnt + nowBlockLength - 1];
        arr.value[cnt + nowBlockLength - 1] += lastBlockStr && (i !== computedBlocks.value.length - 1)
          ? props.delimeter
          : '';

        cnt += nowBlockLength
      }

      emit('update:inputValue', arr.value.join(''));
      input.value = arr.value.join('');
    })

    return {
      inputElement,
      value,
      changeInputValue,
      arr,
      inputDirection
    }
  }
})
</script>

<style scoped>

</style>
