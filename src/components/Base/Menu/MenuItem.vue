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
  height: 30px;
  width: 100px;
  background-color: v-bind('props.bgColor');
  color: v-bind('props.textColor');
  font-size: 12px;

  .menu-item__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 8px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }

  &:hover {
    cursor: pointer;
    background: v-bind('props.hoverBgColor');
    color: v-bind('props.hoverTextColor');
  }
}
</style>
