<template>
  <div :style="toggleStyle" class="toggle" @click="handleToggle">
    <div class="toggle__button" :class="buttonClass" :style="toggleButtonStyle"></div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: [String, Number],
      default: '6.25rem'
    },
    height: {
      type: [String, Number],
      default: '3rem'
    },
    activeBgColor: {
      type: String,
      default: '#b377ff'
    },
    defaultBgColor: {
      type: String,
      default: '#888888'
    },
    buttonColor: String,
    isToggle: Boolean,
    border: {
      type: [String, Number],
      default: '1px solid lightgray'
    }
  },
  setup (props, { emit }) {
    const nowToggled = ref(false)
    const buttonClass = computed(() => nowToggled.value ? ['toggle__button--toggled'] : [])
    
    const toggleStyle = computed(() => ({
      backgroundColor: nowToggled.value ? props.activeBgColor : props.defaultBgColor,
      width: typeof props.width === 'string' ? props.width : `${props.width}rem`,
      height: typeof props.height === 'string' ? props.height : `${props.height}rem`,
      border: props.border,
      borderRadius: `calc(${typeof props.height === 'string' ? props.height : `${props.height}rem`} / 2 + 0.25rem)`
    }))


    const toggleButtonStyle = computed(() => ({
      width: `calc(${typeof props.height === 'string' ? props.height : `${props.height}rem`})`,
      height: `calc(100%)`,
      backgroundColor: props.buttonColor,
      borderRadius: `calc(${typeof props.height === 'string' ? props.height : `${props.height}rem`} / 2)`,
    }))

    const handleToggle = () => {
      nowToggled.value = !nowToggled.value
      emit('toggle', nowToggled.value) // parent side 
    }

    return {
      toggleStyle,
      toggleButtonStyle,
      buttonClass,
      handleToggle,
    }
  }
})
</script>

<style lang="scss" scoped>
.toggle {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 1px 2px 1px rgba(0,0,0,0.2);
}

.toggle__button {
  transform: translateX(calc(100% + 0.25rem));
  transition: all 0.3s;

  &.toggle__button--toggled {
    transform: translateX(0rem);
  }
}

</style>