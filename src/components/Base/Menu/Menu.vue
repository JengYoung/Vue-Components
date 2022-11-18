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
import { isNotNumberRegex } from '@/utils/regexps';
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { defaultProps } from './defaultProps';

export default defineComponent({
  name: 'DefaultMenu',
  emits: ['update:modelValue'],
  props: {
    target: {
      type: String,
      required: true,
      default: defaultProps.target,
    },
    modelValue: {
      type: Boolean,
      required: true,
      default: defaultProps.modelValue,
    },

    width: {
      type: [Number, String],
      default: defaultProps.width,
    },
    fontSize: {
      type: [Number, String],
      default: defaultProps.fontSize,
    },

    borderRadius: {
      type: [Number, String],
      default: defaultProps.borderRadius,
    },
    borderColor: {
      type: String,
      default: defaultProps.borderColor,
    },

    isShadowed: {
      type: Boolean,
      default: defaultProps.isShadowed,
    },
    isClickOutSide: {
      type: Boolean,
      default: defaultProps.isClickOutSide,
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
          const menuRect = (
            menuRef.value as HTMLElement
          ).getBoundingClientRect();

          menuHeight.value = menuRect.height;
        });
      },
      { immediate: true }
    );

    const menuPosition = computed(() => {
      let propsWidth = props.width;

      const nowFontSize = Number(
        getComputedStyle(document.documentElement).fontSize.replace(
          isNotNumberRegex,
          ''
        )
      );

      if (typeof propsWidth === 'string') {
        if (propsWidth.includes('rem')) {
          propsWidth =
            nowFontSize * Number(propsWidth.replace(isNotNumberRegex, ''));
        } else propsWidth = Number(propsWidth.replace(/[^0-9]/g, ''));
      }

      const calc = (client, position, menuSize) => {
        console.log(position, client);
        return client < position + menuSize
          ? `${Math.max(0, position - menuSize)}px`
          : `${position}px`;
      };

      console.log({
        x: calc(viewPort.value.clientWidth, mousePosition.value.x, propsWidth),
        y: calc(
          viewPort.value.clientHeight,
          mousePosition.value.y,
          menuHeight.value
        ),
      });
      return {
        x: calc(viewPort.value.clientWidth, mousePosition.value.x, propsWidth),
        y: calc(
          viewPort.value.clientHeight,
          mousePosition.value.y,
          menuHeight.value
        ),
      };
    });

    const menuCSS = computed(() => ({
      borderRadius:
        typeof props.borderRadius === 'number'
          ? `${props.borderRadius}px`
          : props.borderRadius,
      boxShadow: props.isShadowed ? defaultProps.boxShadow : 'none',
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      fontSize:
        typeof props.fontSize === 'number'
          ? `${props.fontSize}px`
          : props.fontSize,
    }));

    const onResize = () => {
      viewPort.value = {
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight,
      };
    };

    const onClickOutside = (e: MouseEvent) => {
      if (props.modelValue) {
        if (
          props.isClickOutSide &&
          !(e.target as HTMLElement).closest(props.target)
        ) {
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

    return {
      menuRef,
      menuCSS,
      mousePosition,
      viewPort,
      menuPosition,
      menuHeight,
    };
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
  width: 100%;
  transition: all 0.3s;
}
</style>
