<template>
  <input @input="changeInputValue">
  <div>prefix: {{ prefix }}</div>
  <div>blocks: {{ blocks }}</div>
  <div>delimeter: {{ delimeter }}</div>
  <div>modelValue: {{ modelValue }}</div>
  <div>now inputValue: {{ value }}</div>
  <div>arr: {{ arr }}</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

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
    const value = ref('');
    const computedModelValue = computed(() => props.modelValue);

    const arr = ref<string[][]>([]);
    arr.value = props.blocks.map(blockLength => new Array(blockLength).fill(''))

    // ['a', 'b', 'c-']
    const changeInputValue = (e: Event) => {
      const input = e.target as HTMLInputElement;

      const originSelectionStart = input.selectionStart;
      const originSelectionEnd = input.selectionEnd;

      value.value = input.value;

      for (let i = 0; i < arr.value.length; i += 1) {
        const nowArr = arr.value[i];

        for (let j = 0; j < nowArr.length; j += 1) {
          const [nowValue, ...remainder] = value.value;
          console.log('nowValue: ', nowValue)
          if (nowValue) {
            arr.value[i][j] = nowValue;

            console.log('re: ', remainder, )
          } else {
            arr.value[i][j] = '';
          }
          value.value = remainder.join('') ?? '';
        }

        if (i !== arr.value.length - 1 && arr.value[i][arr.value[i].length - 1] !== '') {
          arr.value[i][arr.value[i].length - 1] += props.delimeter;
        }
      }

      console.log(
        value.value,
        computedModelValue.value,
        input.selectionStart,
        input.selectionEnd
      );
      emit('update:inputValue', (e.target as HTMLInputElement).value); // 이전에는 `this.$emit('input', title)`
    }

    return {
      value,
      changeInputValue,
      arr,
    }
  }
})
</script>

<style scoped>

</style>
