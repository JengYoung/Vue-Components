<template>
<Menu isShadowed :borderRadius="10" borderColor="white" :menu="{}" visible>
  <div class="menu-item-mock"></div>
</Menu>
</template>

<script lang="ts">
import Menu from '@components/Morecule/Menu.vue'

export default {
  name: 'my-page',

  components: { Menu },

  props: {
    user: {
      type: Object,
    },
  },

  emits: ['login', 'logout', 'createAccount'],
};
</script>


<style lang="scss" scoped>
.menu-item-mock {
  height: 120px;
  width: 150px;
  background-color: #888888;
}
</style>
