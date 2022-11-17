<template>
  <ul class="tabs" :class="$style.tabs">
    <template v-for="tab in tabs" :key="tab.id">
      <li class="tabs__tab" @click="() => onClick(tab)">
        {{ tab.label }}
      </li>
    </template>
    <div class="tabs__highlight"></div>
  </ul>
</template>

<script lang="ts">
import globalCSS from '@/utils/globalCSS';
import { defineComponent, PropType, ref } from 'vue';
import { TabInterface } from './types';

const DEFAULT_TAB_WIDTH = '5rem';
const DEFAULT_TAB_HEIGHT = '3rem';

export default defineComponent({
  name: 'DefaultTabs',
  props: {
    tabs: {
      type: Array as PropType<TabInterface[]>,
      default: () => [],
    },
    tabWidth: {
      type: String,
      default: DEFAULT_TAB_WIDTH,
    },
    tabHeight: {
      type: String,
      default: DEFAULT_TAB_HEIGHT,
    },
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
      props,
    };
  },
});
console.log(globalCSS);
</script>

<style lang="scss" scoped module>
.tabs {
  overflow: hidden;
  display: flex;
  position: relative;
  height: v-bind('props.tabHeight');
  .tabs__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: v-bind('props.tabWidth');
  }
  .tabs__highlight {
    position: absolute;
    z-index: -1;
    width: v-bind('props.tabWidth');
    height: v-bind('props.tabHeight');
    background-color: orange;
  }
}
</style>
