<template>
{{ visible }}
<button @click="onClick">Click!</button>
<Menu
  isShadowed
  :borderRadius="10"
  borderColor="white"
  :visible="visible"
>
  <div class="menu-item-mock"></div>
</Menu>
</template>

<script lang="ts">
import Menu from '@components/Morecule/Menu.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { Menu },
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
</style>
