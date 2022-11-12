<template>
  <ul class="tabs">
    <template v-for="tab in tabs" :key="tab.id">
      <li class="tabs__tab" @click="() => onClick(tab)">
        {{ tab.label }}
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { TabInterface } from './types';

export default defineComponent({
  name: 'DefaultTabs',
  props: {
    tabs: Array as PropType<TabInterface[]>,
  },

  setup(props, { emit }) {
    const activeItem = ref<TabInterface>();

    const onClick = (item: TabInterface) => {
      activeItem.value = item;
      emit('update:tab', item);
    };

    return {
      activeItem,
      onClick,
    };
  },
});
</script>

<style scoped></style>
