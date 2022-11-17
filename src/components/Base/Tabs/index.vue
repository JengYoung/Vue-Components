<template>
  <ul class="tabs">
    <template v-for="(tab, idx) in tabs" :key="tab.id">
      <li
        class="tabs__tab"
        @click="() => onClick(tab, idx)"
        :class="{ 'tabs__tab--active': tabActiveIndex === idx }"
      >
        {{ tab.id }}
      </li>
    </template>
    <div class="tabs__highlight"></div>
  </ul>
</template>

<script lang="ts">
import globalCSS from '@/utils/globalCSS';
import { defineComponent, PropType, ref } from 'vue';
import { TabInterface } from './types';

const DEFAULT_TAB_WIDTH = '100%';
const DEFAULT_TAB_HEIGHT = '3rem';

export default defineComponent({
  name: 'DefaultTabs',
  props: {
    tabs: {
      type: Array as PropType<TabInterface[]>,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: 0,
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
    const activeItem = ref<TabInterface>(props.tabs[0]);
    const tabActiveIndex = ref(props.activeIndex);

    const onClick = (item: TabInterface, idx) => {
      activeItem.value = item;
      tabActiveIndex.value = idx;
      emit('update:tab', item);
    };

    return {
      activeItem,
      onClick,
      props,
      globalCSS,
      tabActiveIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
$common-border: 1px solid #{v-bind('globalCSS.color.sub')};
$activeIndex: v-bind('tabActiveIndex');
.tabs {
  border-radius: v-bind('globalCSS.borderRadius.soft');
  overflow: hidden;
  display: flex;
  position: relative;
  height: v-bind('props.tabHeight');
  border: 1px solid v-bind('globalCSS.color.sub');
  .tabs__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: v-bind('props.tabWidth');

    &:not(:first-of-type) {
      border-left: $common-border;
    }
    &.tabs__tab--active {
      color: v-bind('globalCSS.color.white');
    }
  }
  .tabs__highlight {
    position: absolute;
    z-index: -1;
    width: calc(100% / v-bind('props.tabs.length'));
    height: v-bind('props.tabHeight');
    background-color: v-bind('globalCSS.color.default');

    transform: translateX(calc(-100% + 100% * v-bind('activeItem.id')));
    transition: all 0.3s;
  }
}
</style>
