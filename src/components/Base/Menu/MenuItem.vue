<template>
  <div class="menu-item" @click="onClickMenuItem">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    route: {
      type: Object as PropType<{ to: any; replace: boolean }>,
      default: () => ({ to: '', replace: false })
    },
  },
  setup (props) {
    const router = useRouter();
    const onClickMenuItem = async () => {
      if (props.route.to) {
        const replace = props.route.replace ?? false;

        if (replace) router.replace(props.route.to)
        else router.push(props.route.to)
      }
    }

    return {
      onClickMenuItem
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  background-color: white;
  font-size: 12px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }

  &:hover {
    cursor: pointer;
    background: #482bad;
    color: white;
  }
}
</style>
