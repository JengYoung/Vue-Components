<template>
  <div class="carousel">
    <div class="carousel__inner">
      <div class="carousel__card card-container" :key="card.title" v-for="card in cards">
        <img class="carousel__img" :src="card.imageUrl" alt="carousel images" />

        <div class="carousel__content">
          <h1>{{ card.title }}</h1>

          <div>
            <p :key="index" v-for="(description, index) in card.body">{{ description }}</p>
          </div>
        </div>
      </div>

      <button class="carousel__prev-button">&lsaquo;</button>
      <button class="carousel__next-button">&rsaquo;</button>

      <ul class="carousel__direct-buttons">
        <li class="carousel__direct-button" :key="i" v-for="i in cards.length">
          <div class="circle"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
  setup() {
    return {};
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

  &__card {
    width: 100%;
    height: 25rem;
    border: 1px solid yellow;
  }

  &__img {
    width: 100%;
    position: absolute;
    object-fit: cover;
  }

  &__content {
    position: absolute;
    z-index: 1;
    color: black;
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
    background: linear-gradient(to right, #ffffff, transparent 80%);
    border: 0;
    outline: 0;
    color: black;
    &:hover {
      cursor: pointer;
    }
  }

  &__next-button {
    display: flex;
    position: absolute;
    align-items: center;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 1rem;
    font-size: 5rem;
    line-height: 0;
    background: linear-gradient(to left, #ffffff, transparent 80%);
    border: 0;
    outline: 0;
    color: black;
    &:hover {
      cursor: pointer;
    }
  }

  &__direct-buttons {
    display: flex;
    position: absolute;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 1rem;

    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;

    .carousel__direct-button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: white;
    }
  }
}
</style>
