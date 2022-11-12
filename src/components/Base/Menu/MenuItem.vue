<template>
  <div class="menu-item" @click="onClickMenuItem">
    <div class="menu-item__content"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    route: {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      type: Object as PropType<{ to: any; replace: boolean }>,
      default: () => ({ to: '', replace: false }),
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    textColor: {
      type: String,
      default: '#111',
    },
    hoverBgColor: {
      type: String,
      default: '#482bad',
    },
    hoverTextColor: {
      type: String,
      default: '#fff',
    },
  },
  setup(props) {
    const router = useRouter();
    const onClickMenuItem = async () => {
      if (props.route.to) {
        const replace = props.route.replace ?? false;

        if (replace) router.replace(props.route.to);
        else router.push(props.route.to);
      }
    };

    return {
      props,
      onClickMenuItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  font-size: 12px;
  color: v-bind('props.textColor');
  background-color: v-bind('props.bgColor');

  .menu-item__content {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }

  &:hover {
    color: v-bind('props.hoverTextColor');
    cursor: pointer;
    background: v-bind('props.hoverBgColor');
  }
}
</style>
