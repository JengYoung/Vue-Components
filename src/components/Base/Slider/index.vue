<template>
  {{ percentage }}
  {{ `${dragging}` }}
  {{ value }}
  <div class="slider" ref="sliderRef">
    <div class="slider__inner" />
    <div class="slider__track" :style="{ width: `${value}%` }" />
    <div
      class="slider__handle"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      :style="{ left: `calc(${value}% - 6px)` }"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
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
    const percentage = computed(() => (value.value - props.min) / (props.max - props.min));

    const handleMouseUp = () => {
      dragging.value = false;
      console.log('bye');
    };

    const handleMouseDown = () => {
      console.log('hello');
      dragging.value = true;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (sliderRef.value === null) return;
      if (!dragging.value) return;

      let handleOffset: number | undefined;

      if ((e as MouseEvent).pageX) {
        handleOffset = (e as MouseEvent).pageX - (sliderRef.value as HTMLDivElement).offsetLeft;
      } else {
        for (let i = 0; i < (e as TouchEvent).changedTouches.length; i += 1) {
          console.log((e as TouchEvent).changedTouches[i].pageX as number);
          handleOffset =
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            ((e as TouchEvent).changedTouches[i].pageX as number) -
            (sliderRef.value as HTMLDivElement).offsetLeft;
        }
      }

      const sliderWidth = (sliderRef.value as HTMLDivElement).offsetWidth;

      if (handleOffset === undefined) return;
      const track = (handleOffset as number) / sliderWidth;

      let newValue;

      if (track < 0) {
        newValue = props.min;
      } else if (track > 1) {
        newValue = props.max;
      } else {
        newValue =
          Math.round((props.min + (props.max - props.min) * track) / props.step) * props.step;
      }

      value.value = newValue;
    };

    watch(
      () => [dragging.value],
      () => {
        if (dragging.value === true) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
          document.addEventListener('touchend', handleMouseUp);
          document.addEventListener('touchmove', handleMouseMove);
        } else {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('touchend', handleMouseUp);
        }
      },
      { deep: true }
    );

    return { dragging, value, sliderRef, percentage, handleMouseDown };
  },
});
</script>

<style lang="scss" scoped>
.slider-rails {
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
    @extend .slider-rails;
  }

  &__track {
    width: 0;
    background-color: black;
    @extend .slider-rails;
  }

  &__handle {
    position: absolute;
    top: 0.125rem;
    left: 0;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    z-index: 1110;
    background-color: red;
  }
}
</style>
