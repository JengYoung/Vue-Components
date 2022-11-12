<template>
  <transition name="menu-visible">
    <div v-if="modelValue" ref="menuRef" class="menu">
      <div class="menu-inner">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    target: {
      type: String,
      required: true,
    },
    isShadowed: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: [Number, String],
    },
    borderColor: {
      type: String,
      default: '#000',
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [Number, String],
      default: '6.25rem',
    },
    fontSize: {
      type: [Number, String],
      default: '1rem',
    },
    isClickOutSide: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const menuRef = ref<HTMLElement>();

    const viewPort = ref({ clientWidth: 0, clientHeight: 0 });
    const mousePosition = ref({ x: 0, y: 0 });

    const menuHeight = ref(0);

    watch(
      () => ['menuRef', props.modelValue],
      () => {
        nextTick(() => {
          if (!menuRef.value) return;
          const menuRect = (menuRef.value as HTMLElement).getBoundingClientRect();

          menuHeight.value = menuRect.height;
        });
      },
      { immediate: true }
    );

    const menuPosition = computed(() => {
      let propsWidth = props.width;

      const nowFontSize = Number(
        getComputedStyle(document.documentElement).fontSize.replace(/[^0-9.]/g, '')
      );

      if (typeof propsWidth === 'string') {
        if (propsWidth.includes('rem'))
          propsWidth = nowFontSize * Number(propsWidth.replace(/[^0-9.]/g, ''));
        else propsWidth = Number(propsWidth.replace(/[^0-9]/g, ''));
      }

      return {
        x:
          viewPort.value.clientWidth < mousePosition.value.x + propsWidth
            ? `calc(${mousePosition.value.x}px - ${propsWidth}px)`
            : `${mousePosition.value.x}px`,
        y:
          viewPort.value.clientHeight < mousePosition.value.y + menuHeight.value
            ? `calc(${mousePosition.value.y}px - ${menuHeight.value}px)`
            : `${mousePosition.value.y}px`,
      };
    });

    const menuCSS = computed(() => ({
      borderRadius:
        typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
      boxShadow: props.isShadowed ? '0px 0.5px 2px 1px #ddd' : 'none',
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      fontSize: typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize,
    }));

    const onResize = () => {
      viewPort.value = {
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight,
      };
    };

    const onClickOutside = (e: MouseEvent) => {
      if (props.modelValue) {
        if (props.isClickOutSide && !(e.target as HTMLElement).closest(props.target)) {
          emit('update:modelValue', false);

          return;
        }

        mousePosition.value = {
          ...mousePosition.value,
          x: e.clientX,
          y: e.clientY,
        };
      }
    };

    onMounted(() => {
      onResize();

      window.addEventListener('resize', onResize);
      document.body.addEventListener('click', onClickOutside);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
      document.body.removeEventListener('click', onClickOutside);
    });

    return { menuRef, menuCSS, mousePosition, viewPort, menuPosition, menuHeight };
  },
});
</script>

<style lang="scss" scoped>
.menu {

  position: absolute;
  top: v-bind('menuPosition.y');
  left: v-bind('menuPosition.x');
  z-index: 999;

  width: v-bind('menuCSS.width');
  overflow: hidden;

  border-radius: v-bind('menuCSS.borderRadius');
  box-shadow: v-bind('menuCSS.boxShadow');

  transition: opacity 0.3s;

  &.menu-visible-enter-active,
  &.menu-visible-leave-active {
    opacity: 0;
  }
  &.menu-visible-enter-to {
    opacity: 1;
  }
}
.menu-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
</style>
