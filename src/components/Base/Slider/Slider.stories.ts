import Slider from '@components/Base/Slider/index.vue';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import { defaultSliderProps } from './defaultProps';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Base/Slider',
  component: Slider,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    max: {
      control: {
        type: 'number',
      },
      description: '최댓값을 입력할 수 있어요. 기본값은 100이에요.',
      table: {
        defaultValue: { summary: defaultSliderProps.max },
      },
    },
    min: {
      control: {
        type: 'number',
      },
      description:
        '최솟값을 입력할 수 있어요. 기본값은 0이에요. 이때, `value`에 값을 주지 않는다면 `min`으로 설정되어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.min },
      },
    },
    step: {
      control: {
        type: 'number',
      },
      description: '넘어갈 단위를 입력할 수 있어요. 기본값은 1이에요.',
      table: {
        defaultValue: { summary: defaultSliderProps.step },
      },
    },

    value: {
      control: {
        type: 'number',
      },
      description: '처음에 시작할 기본 값을 넘길 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.value },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description:
        '너비를 설정할 수 있어요. 이때, 레일 및 트랙의 크기는 변경되지 않아요.',
      table: {
        defaultValue: { summary: defaultSliderProps.width },
      },
    },
    height: {
      control: {
        type: 'text',
      },
      description:
        '높이를 설정할 수 있어요. 이때, 레일 및 트랙의 크기는 변경되지 않아요.',
      table: {
        defaultValue: { summary: defaultSliderProps.height },
      },
    },
    padding: {
      control: {
        type: 'text',
      },
      description: '컨테이너의 패딩 영역을 조정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.padding },
      },
    },
    backgroundColor: {
      control: {
        type: 'color',
      },
      description: '컨테이너의 배경 색을 지정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.backgroundColor },
      },
    },

    border: {
      control: {
        type: 'text',
      },
      description: '컨테이너의 보더 속성을 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.border },
      },
    },
    borderRadius: {
      control: {
        type: 'text',
      },
      description: '컨테이너의 외곽을 부드럽게 조정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.borderRadius },
      },
    },

    railColor: {
      control: {
        type: 'color',
      },
      description: '트랙 값이 적용되지 않는 영역의 색을 조정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.railColor },
      },
    },
    trackColor: {
      control: {
        type: 'color',
      },
      description: '트랙 값이 적용되는 영역의 색을 조정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.trackColor },
      },
    },

    handleSize: {
      control: {
        type: 'text',
      },
      description: '핸들의 크기를 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.handleSize },
      },
    },
    handleColor: {
      control: {
        type: 'color',
      },
      description: '핸들의 색상을 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.handleColor },
      },
    },
    handleActiveColor: {
      control: {
        type: 'color',
      },
      description: '핸들이 active될 때, 변경되는 색상을 조정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultSliderProps.handleActiveColor },
      },
    },
    'update:slider-value': {
      description: '슬라이더가 갖고 있는 value값을 가져올 수 있어요.',
    },
  },
} as Meta<typeof Slider>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Slider },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const sliderValue = ref(0);
    const getSliderValue = action('update:slider-value');

    const updateValue = (value) => {
      sliderValue.value = value;
      getSliderValue(sliderValue);
    };

    return { args, updateValue, sliderValue };
  },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    SliderValue: {{ sliderValue }}

    <Slider
      @update:slider-value="updateValue"
      v-bind="args"
    />
  `,
  methods: { action },
});

export const Default: StoryFn<typeof Slider> = Template.bind({});

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  ...defaultSliderProps,
};
