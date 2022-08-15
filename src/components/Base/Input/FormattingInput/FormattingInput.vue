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
  <div>{{ modelValue }}</div>
  <div>{{ refinedBlocks }}</div>
</template>

<script lang="ts">
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
 *
 *
 * ---------------------------------------------------------------------
 *
 * prefix 추가 시 정책
 * 1. prefix에 있는 값을 삭제했을 때에는 selectionRange는 흐름을 방해하지 않도록 현재 위치 그대로 반영한다.
 * 2. 그러나 prefix를 변동시켰기 때문에 기존 캐시된 결과물을 반환하며, 다른 값들이 변하는 것을 막는다.
 */
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import {
  getDelemeterCount,
  getOriginalValue,
  getRefinedBlocks,
  isPrefixChanged,
  reassignDelemeter,
} from './utils';

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

    const options = computed(() => ({
      number: props.number,
      maxValue: refinedBlocks.value[refinedBlocks.value.length - 1] - props.prefix.length,
      prefix: props.prefix,
    }));

    const cacheSelectionRange = () => {
      if (!inputElement.value) return;
      cachedSelectionStart.value = inputElement.value.selectionStart ?? 0;
      cachedSelectionEnd.value = inputElement.value.selectionEnd ?? 0;
    };

    const onInput = () => {
      if (!inputElement.value) return;

      let result = '';

      /* eslint-disable @typescript-eslint/no-shadow */
      const { value } = inputElement.value;
      let selectionStart = inputElement.value.selectionStart ?? 0;
      let selectionEnd = inputElement.value.selectionEnd ?? 0;

      // 접두사를 바꿀 경우 바뀌지 않는 로직 추가.
      if (isPrefixChanged(value, props.prefix)) {
        inputElement.value.value = props.modelValue;
        inputElement.value.selectionStart = cachedSelectionEnd.value;
        inputElement.value.selectionEnd = cachedSelectionEnd.value;
        return;
      }

      let inputValue = value;

      const beforeDelimeterCount = getDelemeterCount(
        inputValue.slice(0, selectionStart),
        props.delimeter
      );

      const isDeletedValueDelimeter = () => {
        const reassginedNowValue = reassignDelemeter(
          // inputValue.replace(/[^0-9]/g, '').slice(0, 11),
          getOriginalValue(inputValue, options.value),
          refinedBlocks.value,
          props.delimeter
        );
        const reassginedModelValue = reassignDelemeter(
          getOriginalValue(props.modelValue, options.value),
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

      const refinedValue = getOriginalValue(inputValue, options.value);

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
        if (
          JSON.stringify(refinedBlocks.value) ===
          JSON.stringify(getRefinedBlocks(props.blocks, props.prefix))
        )
          return;
        refinedBlocks.value = getRefinedBlocks(props.blocks, props.prefix);
        onInput();
      },
      { immediate: true }
    );

    onMounted(() => {
      if (!inputElement.value) return;
      if (props.autoFocus) inputElement.value.focus();

      if (props.prefix) {
        inputElement.value.value = props.prefix;
        inputElement.value.selectionStart = props.prefix.length;
        inputElement.value.selectionEnd = props.prefix.length;

        emit('update:modelValue', props.prefix);
      }
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
