<template>
  <div class="carousel">
    <div class="carousel__inner">
      <ul class="carousel__cards" :style="{ '--now-active-index': `${nowActive}%` }">
        <li class="carousel__card card-container" :key="card.title" v-for="card in cards">
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
          :key="i"
          v-for="i in cards.length"
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
    cards: Array,
  },
  setup(props) {
    const nowActive = ref<number>(0);
    const maxSize = computed(() => props?.cards?.length || 0);

    const prevButtonClick = () => {
      if (nowActive.value === 0) {
        nowActive.value = maxSize.value - 1;
        return;
      }
      nowActive.value -= 1;
    };
    const nextButtonClick = () => {
      if (nowActive.value === maxSize.value - 1) {
        nowActive.value = 0;
        return;
      }
      nowActive.value += 1;
    };

    const directButtonClick = (index: number) => {
      if (typeof index !== 'number') return;
      nowActive.value = index;
    };
    return { nowActive, prevButtonClick, nextButtonClick, directButtonClick };
  },
});
</script>

<style lang="scss" scoped>
.carousel {
  &__inner {
    overflow: hidden;
    position: relative;
    display: flex;
    width: 100%;
    border: 1px solid green;
  }
  &__cards {
    display: flex;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    transition: all 0.3s;
    transform: translateX(calc(-1 * 100 * var(--now-active-index)));
  }

  &__card {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 25rem;
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
    }
  }
}
</style>
