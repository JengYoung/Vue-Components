<template>
  <div
    class="menu"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    isShadowed: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: [Number, String]
    },
    borderColor: {
      type: String,
      default: '#000'
    },
    menu: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 6.25
    },
    height: {
      type: [Number, String],
      default: 3
    },
    fontSize: {
      type: [Number, String],
      default: 1
    }
  },
  setup (props) {
    const menuCSS = computed(() => ({
      '--border-radius': typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
      '--box-shadow': props.isShadowed ? '0px 0px 4px 4px' : 'none',
      '--width': typeof props.width === 'number' ? `${props.width}rem` : props.width,
      '--height': typeof props.height === 'number' ? `${props.height}rem` : props.height,
      '--font-size': typeof props.fontSize === 'number' ? `${props.fontSize}rem` : props.fontSize,
    }))

    return { menuCSS }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  overflow: hidden;
  height: 0;
  &--visible {
    height: auto;
  }
}
</style>
