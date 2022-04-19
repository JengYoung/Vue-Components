<template>
{{ visible }}
<button @click="onClick">Click!</button>
<Menu
  class="menu"
  :class="visible ? 'menu--visible' : '' "
  isShadowed
  :borderRadius="10"
  borderColor="white"
  :menu="{}"
  :visible="visible"
>
  <div class="menu-item-mock"></div>
</Menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false);

    const onClick = () => {
      visible.value = !visible.value;
    }

    return {
      visible,
      onClick
    }
  }
})

</script>
<style lang="scss" scoped>
.menu-item-mock {
  height: 120px;
  width: 150px;
  background-color: #888888;
}
.menu {
  position: relative;
  z-index: -1;
  overflow: hidden;
  transform: translateY(-100%);
  transition: all 0.3s;
  &--visible {
    transform: translateY(0);
  }
}
</style>
