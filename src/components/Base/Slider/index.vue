<template>
  <div class="slider" ref="sliderRef">
    <div class="slider__inner">
      <div class="slider__rail" />
      <div class="slider__track" />
      <div
        class="slider__handle"
        @mousedown="onDragStart"
        @touchstart="onDragStart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import globalCSS from '@/utils/globalCSS';
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:slider-value'],
  name: 'DefaultSlider',
  props: {
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '1rem',
    },
    railColor: {
      type: String,
      default: globalCSS.color.sub,
    },
    trackColor: {
      type: String,
      default: globalCSS.color.default,
    },
    handleSize: {
      type: String,
      default: '16px',
    },
    handleColor: {
      type: String,
      default: globalCSS.color.white,
    },
    handleActiveColor: {
      type: String,
      default: globalCSS.color.default,
    },
    padding: {
      type: String,
      default: '0',
    },
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
    border: {
      type: String,
      default: 'none',
    },
    borderRadius: {
      type: String,
      default: '0px',
    },
  },
  setup(props, { emit }) {
    const sliderRef = ref<HTMLDivElement | null>(null);
    const dragging = ref<boolean>(false);

    const value = ref<number>(props.value || 0);
    const percentage = computed(
      () => (value.value - props.min) / (props.max - props.min)
    );

    const onDragEnd = () => {
      dragging.value = false;
    };

    const onDragStart = () => {
      dragging.value = true;
    };

    const getTrackValue = (track: number, min: number, max: number): number => {
      if (track < 0) return min;
      if (track > 1) return max;

      return (
        Math.round((props.min + (props.max - props.min) * track) / props.step) *
        props.step
      );
    };

    const onMouseMove = (e: MouseEvent) => {
      if (sliderRef.value === null) return;
      if (!dragging.value) return;

      const handleOffset = e.pageX - sliderRef.value.offsetLeft;
      const sliderWidth = sliderRef.value.offsetWidth;

      value.value = getTrackValue(
        handleOffset / sliderWidth,
        props.min,
        props.max
      );

      emit('update:slider-value', value.value);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (sliderRef.value === null) return;
      if (!dragging.value) return;

      const handleOffset =
        e.changedTouches[e.changedTouches.length - 1].pageX -
        sliderRef.value.offsetLeft;
      const sliderWidth = sliderRef.value.offsetWidth;

      value.value = getTrackValue(
        handleOffset / sliderWidth,
        props.min,
        props.max
      );

      emit('update:slider-value', value.value);
    };

    watch(
      () => [dragging.value],
      () => {
        if (dragging.value === true) {
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('touchmove', onTouchStart);
          document.addEventListener('mouseup', onDragEnd);
          document.addEventListener('touchend', onDragEnd);
        } else {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('touchmove', onTouchStart);
          document.removeEventListener('mouseup', onDragEnd);
          document.removeEventListener('touchend', onDragEnd);
        }
      },
      { deep: true }
    );

    return {
      dragging,
      sliderValue: value,
      sliderRef,
      percentage,
      onDragStart,
      onMouseMove,
      globalCSS,
    };
  },
});
</script>

<style lang="scss" scoped>
%slider-rails {
  position: absolute;
  left: 0;
  align-self: center;

  height: 0.25rem;

  border-radius: 5px;
}

.slider {
  width: v-bind('width');
  height: v-bind('height');
  padding: v-bind('padding');

  cursor: pointer;
  background-color: v-bind('backgroundColor');
  border: v-bind('border');
  border-radius: v-bind('borderRadius');

  &__inner {
    position: relative;
    display: flex;
    width: 100%;
    height: v-bind('height');
  }
  &__rail {
    align-self: center;
    width: 100%;
    background-color: v-bind('railColor');

    @extend %slider-rails;
  }

  &__track {
    align-self: center;
    width: calc(v-bind('sliderValue') * 1%);
    background-color: v-bind('trackColor');

    @extend %slider-rails;
  }

  &__handle {
    position: absolute;
    left: calc(v-bind('sliderValue') * 1% - v-bind('handleSize') / 2);
    z-index: 99;

    box-sizing: border-box;
    align-self: center;

    width: v-bind('handleSize');
    height: v-bind('handleSize');

    background-color: v-bind('handleColor');

    border: 1px solid v-bind('railColor');
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover,
    &:active {
      background-color: v-bind('handleActiveColor');
      border: 1px solid v-bind('handleActiveColor');
    }
  }
}
</style>
