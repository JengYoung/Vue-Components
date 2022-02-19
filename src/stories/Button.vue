<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script>
// import './button.css';
import { reactive, computed } from 'vue';

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const nowProps = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': nowProps.primary,
        'storybook-button--secondary': !nowProps.primary,
        [`storybook-button--${nowProps.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: nowProps.backgroundColor,
      })),
      onClick() {
        emit('click');
      },
    };
  },
};
</script>
