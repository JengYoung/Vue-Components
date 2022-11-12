<template>
  {{ visible }}
  <button class="button" @click="onClick">Click!</button>
  <!-- v-if="visible" -->
  <Menu
    :target="'.button'"
    isShadowed
    isClickOutSide
    width="100px"
    :borderRadius="10"
    borderColor="#ddd"
    :modelValue="visible"
    @update:modelValue="visible = $event"
  >
    <MenuItem>메뉴1</MenuItem>
    <MenuItem :route="{ to: '/hi', replace: false }">메뉴2</MenuItem>
    <MenuItem>메뉴3fewfwewfewfewfwfwefwefwewfwwe</MenuItem>
    <MenuItem>메뉴4</MenuItem>
  </Menu>
</template>

<script lang="ts">
import Menu from '@components/Base/Menu/Menu.vue';
import { defineComponent, ref } from 'vue';
import MenuItem from '../components/Base/Menu/MenuItem.vue';

export default defineComponent({
  name: 'AboutPage',
  components: { Menu, MenuItem },
  setup() {
    const visible = ref(false);

    const onClick = () => {
      visible.value = !visible.value;
    };

    return {
      visible,
      onClick,
    };
  },
});
</script>
<style lang="scss" scoped></style>
