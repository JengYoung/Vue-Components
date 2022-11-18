<template>
  <ul class="tabs">
    <template v-for="(tab, idx) in tabs" :key="tab.id">
      <li
        class="tabs__tab"
        @click="() => onClick(tab, idx)"
        :class="{ 'tabs__tab--active': tabActiveIndex === idx }"
      >
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

    activeBackgroundColor: {
      type: String,
      default: globalCSS.color.default,
    },
    activeTextColor: {
      type: String,
      default: globalCSS.color.white,
    },

    borderWidth: {
      type: String,
      default: '1px',
    },
    borderColor: {
      type: String,
      default: globalCSS.color.sub,
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
$common-border: v-bind('props.borderWidth') solid v-bind('props.borderColor');
$activeIndex: v-bind('tabActiveIndex');
.tabs {

  position: relative;
  z-index: 1;

  display: flex;

  height: v-bind('props.tabHeight');
  overflow: hidden;
  cursor: pointer;
  border: $common-border;

  border-radius: v-bind('globalCSS.borderRadius.soft');

  .tabs__tab {
    display: flex;
    align-items: center;
    justify-content: center;

    width: v-bind('props.tabWidth');

    &:not(:first-of-type) {
      border-left: $common-border;
    }
    &.tabs__tab--active {
      color: v-bind('props.activeTextColor');
    }
  }
  .tabs__highlight {
    position: absolute;
    z-index: -1;
    width: calc(100% / v-bind('props.tabs.length'));
    height: v-bind('props.tabHeight');

    background-color: v-bind('props.activeBackgroundColor');
    transition: all 0.3s;

    transform: translateX(calc(-100% + 100% * v-bind('activeItem.id')));
  }
}
</style>
