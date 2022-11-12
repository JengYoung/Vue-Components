<template>
  <button class="sidebar__toggle-button" @click.stop="onToggle">
    <img
      :src="require(sidebarClosed ? '@assets/sidebar-menu.svg' : '@assets/logo.png')"
      class="toggle-button__icon"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    sidebarClosed: Boolean,
  },

  emits: ['update:sidebarClosed'],

  setup(props, { emit }) {
    const toggled = ref(props.sidebarClosed);

    watch(
      () => [props.sidebarClosed],
      () => {
        toggled.value = props.sidebarClosed;
      }
    );

    const onToggle = () => {
      toggled.value = !toggled.value;
      emit('update:sidebarClosed', toggled.value);
    };

    return { onToggle, toggled };
  },
});
</script>

<style lang="scss" scoped>
.sidebar__toggle-button {
  display: inline-flex;
  justify-content: center;
  align-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  overflow: hidden;
  cursor: pointer;

  .toggle-button__icon {
    height: 100%;
  }
}
</style>
