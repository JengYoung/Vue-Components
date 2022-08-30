<template>
  <div class="menu-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {


    return {}
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
  font-size: 14px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
}
</style>
