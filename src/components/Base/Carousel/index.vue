<template>
  <div class="carousel" :style="carouselStyle">
    <div class="carousel__inner">
      <ul
        class="carousel__cards"
        @transitionend="() => handleTransitionEnd(nowActive)"
        :style="{ transition: `all ${nowDelay}s`, '--now-active-index': `-${nowActive * 100}%` }"
      >
        <li
          class="carousel__card card-container"
          :class="nowActive === index ? 'carousel__cards--active' : ''"
          :key="card.title"
          v-for="(card, index) in refinedCards"
        >
          <img class="carousel__img" :src="card.imageUrl" alt="carousel images" />

          <div class="carousel__content">
            <h1>{{ card.title }}</h1>

            <div>
              <p :key="index" v-for="(description, index) in card.body">
                {{ description }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <button class="carousel__prev-button" @click="prevButtonClick">&lsaquo;</button>
      <button class="carousel__next-button" @click="nextButtonClick">&rsaquo;</button>

      <ul class="carousel__direct-buttons">
        <li
          class="carousel__direct-button"
          :class="directButtonClass(i)"
          :style="directButtonStyle"
          :key="i"
          v-for="i in refinedCards.length"
          @click="directButtonClick(i - 1)"
        >
          <div class="circle"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';

// interface CardInterface {
//   imageUrl: string;
//   title: string;
//   body: string[];
//   type: 'left' | 'center' | 'right';
// }

export default defineComponent({
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: 25,
    },
    delay: {
      type: Number,
      default: 0.3
    }
  },
  setup(props) {
    const refinedCards = computed(() => {
      if (props.cards.length === 0) {
        return [];
      }
      const size = props.cards.length;
      return [props.cards[size - 1], ...props.cards, props.cards[0]];
    });

    const nowDelay = ref<number>(0);
    const loading = ref<boolean>(false);
    
    const nowActive = ref<number>(1);
    const moveCount = ref<number>(0);
    const maxSize = computed(() => refinedCards.value.length || 0);

    const prevAnimationDisable = computed(() => moveCount.value < 0 && (nowActive.value === 0 || nowActive.value === maxSize.value - 2));
    const nextAnimationDisable = computed(() => moveCount.value > 0 && (nowActive.value === 1 || nowActive.value === maxSize.value - 1));

    const carouselStyle = computed(() => ({
      '--width': typeof props.width === 'number' ? `${props.width}rem` : props.width,
      '--height': typeof props.height === 'number' ? `${props.height}rem` : props.height,
    }))

    const directButtonStyle = computed(() => ({
        '--move-count': moveCount.value,
      })) 

    const directButtonClass = (index: number) => {
      const arr = [];
      if (nowActive.value === index - 2) {
        arr.push('carousel__direct-button--prev');
      }
      if (nowActive.value === index - 1) {
        arr.push('carousel__direct-button--active');
      }
      if (nowActive.value === index) {
        arr.push('carousel__direct-button--next');
      }
      if (prevAnimationDisable.value || nextAnimationDisable.value) {
        arr.push('carousel__direct-button--animation-hidden')
      }
      return arr;
    }

    const prevButtonClick = () => {
      if (loading.value) return;
      if (nowActive.value === 0) return;

      loading.value = true;

      nowDelay.value = 0.3;
      nowActive.value -= 1;

      if (nowActive.value === 0) {
        moveCount.value = maxSize.value - 3
      } else {
        moveCount.value = -1;
      }

      loading.value = false;
    };

    const nextButtonClick = () => {
      if (loading.value) return;
      if (nowActive.value === maxSize.value - 1) return;
      
      loading.value = true;

      nowDelay.value = props.delay;
      nowActive.value += 1;

      if (nowActive.value === maxSize.value - 1) {
        moveCount.value = - maxSize.value + 3;
      } else {
        moveCount.value = 1
      }

      loading.value = false;
    };

    const directButtonClick = (index: number) => {
      if (loading.value) return;
      if (typeof index !== 'number') return;

      nowDelay.value = props.delay;

      moveCount.value = index - nowActive.value
      nowActive.value = index;

      if (index === maxSize.value) {
        loading.value = true;
      }
    };

    const handleTransitionEnd = (index: number):void => {
      nowDelay.value = 0;

      if (index === 0) {
        nowActive.value = maxSize.value - 2;
      }
      if (index === maxSize.value - 1) {
        nowActive.value = 1;
      }
    }

    return {
      loading,
      refinedCards,
      nowDelay,
      nowActive,
      moveCount,
      carouselStyle,
      directButtonStyle,
      maxSize,

      directButtonClass,

      prevButtonClick,
      nextButtonClick,
      directButtonClick,
      handleTransitionEnd
    };
  },
});
</script>

<style lang="scss" scoped>
$animation: var(--animation);

.carousel {
  &__inner {
    overflow: hidden;
    position: relative;
    width: var(--width);
    border: 1px solid lightgray;
    border-radius: 20px;
  }

  &__cards {
    display: flex;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    transition: all 0.3s;
    transform: translate3d(var(--now-active-index), 0px, 0px);
  }

  &__card {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: var(--height);
    border: none;
  }

  &__img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    filter: brightness(40%);
  }

  &__content {
    position: absolute;
    z-index: 1;
    color: rgb(233, 232, 232);
    left: 4rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__prev-button {
    display: flex;
    position: absolute;
    align-items: center;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 0 1rem;
    font-size: 5rem;
    line-height: 0;
    background: linear-gradient(to right, #000000b0, transparent);
    border: 0;
    outline: 0;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }

  &__next-button {
    display: flex;
    position: absolute;
    align-items: center;
    z-index: 99;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 1rem;
    font-size: 5rem;
    line-height: 0;
    background: linear-gradient(to right, transparent, #000000b0);
    border: 0;
    outline: 0;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  &__direct-buttons {
    display: flex;
    position: absolute;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 1rem;
    margin: 0; 
    padding: 0;
    list-style: none;

    .carousel__direct-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      margin-right: 0.5rem;
      background-color: white;

      &:hover {
        cursor: pointer;
      }

      &:first-of-type,
      &:last-of-type {
        display: none;
      }
    }

    .carousel__direct-button--active {
      background: white;
      position: relative;

      @keyframes directButtonActivePrevMove {
        0% {
          left: calc(1.25rem * var(--move-count) * -1);
          right: calc(-1.25rem * var(--move-count) * -1);
        }
        15% {
          left: 0;
        }
        85% {
          left: 0;
          right: 0;
        }
        100% {
          display: none;
        }
      }

      @keyframes directButtonActiveNextMove {
        0% {
          left: calc(-1.25rem * var(--move-count));
          right: calc(1.25rem * var(--move-count));
        }
        15% {
          right: 0;
        }
        85% {
          left: 0;
          right: 0;
        }
        100% {
          display: none;
        }
      }
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: white;
        border-radius: 0.375rem;
        animation: directButtonActivePrevMove normal ease-in-out 0.5s;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: white;
        border-radius: 0.375rem;
        animation: directButtonActiveNextMove normal ease-in-out 0.5s;
      }

      &.carousel__direct-button--animation-hidden {
        &:after,
        &:before {
          opacity: 0;
        }
      }
    }
  }
}
</style>
