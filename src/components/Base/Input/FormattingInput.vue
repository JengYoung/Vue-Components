<template>
  <input ref="inputElement" @input="onInput">
  <div>prefix: {{ prefix }}</div>
  <div>blocks: {{ blocks }}</div>
  <div>delimeter: {{ delimeter }}</div>
  <div>modelValue: {{ modelValue }}</div>
  <div>arr: {{ JSON.stringify(arr) }}</div>
  <div>inputDirection: {{ inputDirection }}</div>
  <div>selectionStart: {{ selectionStart}}</div>
  <div>selectionEnd: {{ selectionEnd }}</div>
  <br/>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref } from 'vue'

enum InputDirectionEnum {
  PLUS = 'plus',
  MINUS = 'minus'
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
    const inputDirection = ref<InputDirectionEnum>(InputDirectionEnum.PLUS);
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
     */

    const onInput = () => {
      if (!inputElement.value) return;

      let result = '';
      const inputValue = inputElement.value.value;
      const refinedValue = inputValue.replace(/[^0-9]/g, '').slice(0, 11);

      result = reassignDelemeter(refinedValue, refinedBlocks.value, props.delimeter);

      console.log(inputValue, props.modelValue, result)
      inputElement.value.value = result;
      emit('update:modelValue', result)
    }


    return {
      inputElement,
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
