<template>
  <input ref="inputElement" @input="onInput">
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref } from 'vue'

const getDelemeterCount = (value: string, delimeter: string) => {
  let cnt = 0;

  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === delimeter) cnt += 1;
  }

  return cnt;
}

const reassignDelemeter = (nowValue: string, blocks: number[], delimeter: string) => {
  let result = '';
  let blocksIndex = 0;

  for (let i = 0;  i < nowValue.length; i += 1) {
    result += nowValue[i];

    if (i === blocks[blocksIndex] - 1 && i < nowValue.length - 1) {
      result += delimeter;
      blocksIndex += 1;
    }
  }

  return result
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
      type: String,
      required: true
    },
    prefix: {
      type: String
    }
  },
  setup (props, { emit }) {
    const inputElement = ref<HTMLInputElement | null>(null);
    const refinedBlocks = computed(() => {
      // eslint-disable-next-line
      const arr: any[] = [];

      nextTick(() => {
        props.blocks.forEach((val, idx) => {
          arr.push(val + (idx ? arr[idx - 1] : 0))
        })
      })

      return arr;
    })

    const arr = ref<string[]>([]);
    const selectionStart = ref(0);
    const selectionEnd = ref(0);

    /**
     *
     * 1. selectionStart를 구한다.
     * 2. selectionStart의 업데이트 값을 구한다.
     *
     * 결국 2번에 대한 방법을 찾아야 함.
     * 1. 이전의 selectionStart값 앞에 있는 `-` 개수를 찾는다.
     * 2. 이후의 selectionStart값 앞에 있는 `-` 개수를 찾는다.
     * 만약 `-` 개수가 변화되었다면 그 개수만큼 업데이트를 해준다.
     * 이를 함수화하여, 좀 더 선언적으로 관리한다.
     *
     * 문제 발생 - delimeter을 지워야 하는 상황에서는 이전과 현재 값이 같아버리는 현상
     * 해결 방법 - 만약 다시 delimeter을 refine하는 상황에서 값이 같아버리고, 실제로 길이가 더 짧아졌으면, -를 지웠다는 것으로 해석.
     */

    const onInput = () => {
      if (!inputElement.value) return;

      let result = '';

      /* eslint-disable @typescript-eslint/no-shadow */
      const {value} = inputElement.value;
      let selectionStart = inputElement.value.selectionStart ?? 0;
      let selectionEnd = inputElement.value.selectionEnd ?? 0;
      let inputValue = value;

      const beforeDelimeterCount = getDelemeterCount(inputValue.slice(0, selectionStart), props.delimeter);
      const isDeletedValueDelimeter = () => (
        inputValue.length === props.modelValue.length - 1 &&
        props.modelValue[selectionStart] === props.delimeter &&
        reassignDelemeter(inputValue.replace(/[^0-9]/g, '').slice(0, 11), refinedBlocks.value, props.delimeter) === reassignDelemeter(props.modelValue.replace(/[^0-9]/g, '').slice(0, 11), refinedBlocks.value, props.delimeter)
      )
      if (isDeletedValueDelimeter()) {
        inputValue = inputValue.slice(0, (selectionStart ?? 0) - 1) + inputValue.slice((selectionStart ?? 0))
        selectionStart -= 1;
        selectionEnd -= 1;
      }

      const refinedValue = inputValue.replace(/[^0-9]/g, '').slice(0, 11);

      result = reassignDelemeter(refinedValue, refinedBlocks.value, props.delimeter);
      const afterDelimeterCount = getDelemeterCount(result.slice(0, selectionStart), props.delimeter);
      const delimeterCountDiff = afterDelimeterCount - beforeDelimeterCount;

      inputElement.value.value = result;
      inputElement.value.selectionStart = (selectionStart ?? 0) + delimeterCountDiff;
      inputElement.value.selectionEnd = (selectionEnd ?? 0) + delimeterCountDiff;

      emit('update:modelValue', result)
    }


    return {
      inputElement,
      arr,
      selectionStart,
      selectionEnd,
      onInput
    }
  }
})
</script>

<style scoped>

</style>
