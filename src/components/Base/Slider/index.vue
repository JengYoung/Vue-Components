<template>
  <div class="slider" ref="sliderRef">
    <div class="slider__inner" />
    <div class="slider__track" :style="{ width: `${value}%` }" />
    <div
      class="slider__handle"
      @mousedown="onDragStart"
      @touchstart="onDragStart"
      :style="{ left: `calc(${value}% - 6px)` }"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
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
    defaultValue: Number,
  },
  setup(props) {
    const sliderRef = ref<HTMLDivElement | null>(null);
    const dragging = ref<boolean>(false);

    const value = ref<number>(props.defaultValue || 0);
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

    return { dragging, value, sliderRef, percentage, onDragStart, onMouseMove };
  },
});
</script>

<style lang="scss" scoped>
%slider-rails {
  position: absolute;
  top: 0.375rem;
  left: 0;

  height: 0.25rem;
  border-radius: 5px;
}

.slider {
  position: relative;
  width: 100%;
  height: 1rem;
  background: yellow;

  &__inner {
    width: 100%;
    background-color: skyblue;
    @extend %slider-rails;
  }

  &__track {
    width: 0;
    background-color: black;
    @extend %slider-rails;
  }

  &__handle {
    position: absolute;
    top: 0.125rem;
    left: 0;
    z-index: 1110;
    width: 0.75rem;
    height: 0.75rem;
    background-color: red;
    border-radius: 50%;
  }
}
</style>
