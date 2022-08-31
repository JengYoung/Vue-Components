<template>
  <div class="menu" :style="menuCSS" :class="modelValue ? 'menu--visible' : '' " >
    <div class="menu-inner" :class="modelValue ? 'menu-inner--visible' : '' ">
      <slot></slot>
    </div>
  </div>
  <div>
  menuPosition: {{ menuPosition }}
  </div>
  <div>
    mousePosition: {{ mousePosition }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, StyleValue } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    target: {
      type: String,
      required: true
    },
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
    modelValue: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [Number, String],
      default: '6.25rem'
    },
    height: {
      type: [Number, String],
      default: '3rem'
    },
    fontSize: {
      type: [Number, String],
      default: '1rem'
    },
    isClickOutSide: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const viewPort = ref({ clientWidth: 0, clientHeight: 0 })
    const mousePosition = ref({ x: 0, y: 0 });

    const menuPosition = computed(() => {
      let propsWidth = props.width;
      let propsHeight = props.height;
      const nowFontSize = Number(getComputedStyle(document.documentElement).fontSize.replace(/[^0-9.]/g, ''));

      if (typeof propsWidth === 'string') {
        if (propsWidth.includes('rem')) propsWidth = nowFontSize * Number(propsWidth.replace(/[^0-9.]/g, ''));
        else propsWidth = Number(propsWidth.replace(/[^0-9]/g, ''))
      }

      if (typeof propsHeight === 'string') {
        if (propsHeight.includes('rem')) propsHeight = nowFontSize * Number(propsHeight.replace(/[^0-9.]/g, ''));
        else propsHeight = Number(propsHeight.replace(/[^0-9]/g, ''))
      }

      console.log(mousePosition.value.x, propsWidth, ' / ', mousePosition.value.y, propsHeight)
      return {
        x: viewPort.value.clientWidth < (mousePosition.value.x + propsWidth) ? `calc(${mousePosition.value.x}px - ${propsWidth}px)` : `${mousePosition.value.x}px`,
        y: viewPort.value.clientHeight < (mousePosition.value.y + propsHeight) ? `calc(${mousePosition.value.y}px - ${propsHeight}px)` : `${mousePosition.value.y}px`,
      }
    })

    const menuCSS = computed(() => ({
      '--border-radius': typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
      '--box-shadow': props.isShadowed ? '0px 0px 4px 4px' : 'none',
      '--width': typeof props.width === 'number' ? `${props.width}px` : props.width,
      '--height': typeof props.height === 'number' ? `${props.height}px` : props.height,
      '--font-size': typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize
    } as StyleValue))

    const onResize = () => {
      viewPort.value = {
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight
      }
    }
    const onClickOutside = (e: MouseEvent) => {
        if (props.modelValue) {
          if (props.isClickOutSide && !(e.target as HTMLElement).closest(props.target)) {
            emit('update:modelValue', false)

            return;
          }

          mousePosition.value = {
            ...mousePosition.value,
            x: e.clientX,
            y: e.clientY,
          }
        }
      }

    onMounted(() => {
      onResize();

      window.addEventListener('resize', onResize);
      document.body.addEventListener('click', onClickOutside);
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
      document.body.removeEventListener('click', onClickOutside)
    })

    return { menuCSS, mousePosition, viewPort, menuPosition }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  left: #{v-bind('menuPosition.x')};
  top: #{v-bind('menuPosition.y')};
  z-index: 999;
  overflow: hidden;
  transition: transform 0.3s;
  transform: scaleY(0);
  transform-origin: top;
  width: var(--width);
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  &--visible {
    transform: scaleY(1);
  }
}
.menu-inner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>
