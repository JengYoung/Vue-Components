<template>
  <input
    ref="inputElement"
    @input="onInput"
    @change="cacheSelectionRange"
    @focus="cacheSelectionRange"
    @select="cacheSelectionRange"
    @keydown="cacheSelectionRange"
    @keyup="cacheSelectionRange"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';

const getDelemeterCount = (value: string, delimeter: string) => {
  let cnt = 0;

  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === delimeter) cnt += 1;
  }

  return cnt;
};

const reassignDelemeter = (nowValue: string, blocks: number[], delimeter: string) => {
  let result = '';
  let blocksIndex = 0;

  for (let i = 0; i < nowValue.length; i += 1) {
    result += nowValue[i];

    if (i === blocks[blocksIndex] - 1 && i < nowValue.length - 1) {
      result += delimeter;
      blocksIndex += 1;
    }
  }

  return result;
};

const getRefinedBlocks = (blocks: number[]) => {
  const arr: number[] = [];

  blocks.forEach((val, idx) => {
    arr.push(val + (idx ? arr[idx - 1] : 0));
  });

  return arr;
};

const getOriginalValue = (value: string, options: { number: boolean; maxValue: number }) => {
  let regex = '';

  if (options.number) {
    if (regex.length) {
      regex += '|';
    }
    regex += '[^0-9]';
  }

  const resultRegex = new RegExp(regex, 'g');

  return value.replace(resultRegex, '').slice(0, options.maxValue);
};

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    blocks: {
      type: Array as PropType<number[]>,
      required: true,
    },
    delimeter: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: '',
    },
    number: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const inputElement = ref<HTMLInputElement | null>(null);
    const refinedBlocks = ref<number[]>([]);

    const arr = ref<string[]>([]);
    const cachedSelectionStart = ref(0);
    const cachedSelectionEnd = ref(0);

    const cacheSelectionRange = () => {
      if (!inputElement.value) return;
      cachedSelectionStart.value = inputElement.value.selectionStart ?? 0;
      cachedSelectionEnd.value = inputElement.value.selectionEnd ?? 0;
    };

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
      const { value } = inputElement.value;
      let selectionStart = inputElement.value.selectionStart ?? 0;
      let selectionEnd = inputElement.value.selectionEnd ?? 0;

      let inputValue = value;

      const options = {
        number: props.number,
        maxValue: refinedBlocks.value[refinedBlocks.value.length - 1],
        prefix: props.prefix,
      };

      const beforeDelimeterCount = getDelemeterCount(
        inputValue.slice(0, selectionStart),
        props.delimeter
      );

      const isDeletedValueDelimeter = () => {
        const reassginedNowValue = reassignDelemeter(
          // inputValue.replace(/[^0-9]/g, '').slice(0, 11),
          getOriginalValue(inputValue, options),
          refinedBlocks.value,
          props.delimeter
        );
        const reassginedModelValue = reassignDelemeter(
          getOriginalValue(props.modelValue, options),
          refinedBlocks.value,
          props.delimeter
        );

        return (
          inputValue.length === props.modelValue.length - 1 &&
          props.modelValue[selectionStart] === props.delimeter &&
          reassginedNowValue === reassginedModelValue
        );
      };

      if (isDeletedValueDelimeter()) {
        const headValue = inputValue.slice(0, (selectionStart ?? 0) - 1);
        const taiiValue = inputValue.slice(selectionStart ?? 0);

        inputValue = headValue + taiiValue;

        selectionStart -= 1;
        selectionEnd -= 1;
      }

      const refinedValue = getOriginalValue(inputValue, options);

      result = reassignDelemeter(refinedValue, refinedBlocks.value, props.delimeter);
      const afterDelimeterCount = getDelemeterCount(
        result.slice(0, selectionStart),
        props.delimeter
      );

      const delimeterCountDiff = afterDelimeterCount - beforeDelimeterCount;

      cachedSelectionStart.value = (selectionStart ?? 0) + delimeterCountDiff;
      cachedSelectionEnd.value = (selectionEnd ?? 0) + delimeterCountDiff;

      inputElement.value.value = result;
      inputElement.value.selectionStart = cachedSelectionStart.value;
      inputElement.value.selectionEnd = cachedSelectionEnd.value;

      emit('update:modelValue', result);
    };

    watch(
      () => [props.blocks],
      () => {
        if (JSON.stringify(refinedBlocks.value) === JSON.stringify(getRefinedBlocks(props.blocks)))
          return;
        refinedBlocks.value = getRefinedBlocks(props.blocks);
        onInput();
      },
      { immediate: true }
    );

    onMounted(() => {
      if (!inputElement.value) return;
      if (props.autoFocus) inputElement.value.focus();
    });

    return {
      inputElement,
      arr,
      cachedSelectionStart,
      cachedSelectionEnd,
      refinedBlocks,
      onInput,
      cacheSelectionRange,
    };
  },
});
</script>

<style scoped></style>
