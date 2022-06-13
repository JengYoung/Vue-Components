<template>
  <input ref="inputElement" @input="changeInputValue">
  <div>prefix: {{ prefix }}</div>
  <div>blocks: {{ blocks }}</div>
  <div>delimeter: {{ delimeter }}</div>
  <div>modelValue: {{ modelValue.length }}</div>
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
    const inputElement = ref<HTMLInputElement | null>(null);
    const value = ref('');
    const computedModelValue = computed(() => props.modelValue);
    const computedBlocks = computed(() => props.blocks);
    const arr = ref<string[]>([]);

    // ['a', 'b', 'c-']
    const changeInputValue = (e: Event) => {
      emit('update:inputValue', (e.target as HTMLInputElement).value); // 이전에는 `this.$emit('input', title)`
    }

    watch([computedModelValue], () => {
      if (!inputElement.value) return;
      const input = inputElement.value;

      value.value = input.value;


      console.log(
        value.value,
        computedModelValue.value,
        input.selectionStart,
        input.selectionEnd
      );

      let cnt = 0;
      arr.value = [];
      for (let i = 0; i < computedBlocks.value.length; i += 1) {
        const nowBlockLength = props.blocks[i];

        for (let j = cnt; j < cnt + nowBlockLength; j += 1) {
          arr.value = [...arr.value, input.value[j] || '']
          console.log(input.value[j])
        }

        const lastBlockStr: string = arr.value[cnt + nowBlockLength - 1];
        arr.value[cnt + nowBlockLength - 1] += lastBlockStr && (i !== computedBlocks.value.length - 1)
          ? props.delimeter
          : '';

        cnt += nowBlockLength
        console.log('after', cnt)
      }
    })

    return {
      inputElement,
      value,
      changeInputValue,
      arr,
    }
  }
})
</script>

<style scoped>

</style>
