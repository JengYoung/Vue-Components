import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { computed, ref } from 'vue';
import FormattingInput from './FormattingInput.vue';

// https://github.com/storybookjs/storybook/issues/17932
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: `FormattingInput/PhoneNumber`,
  component: { FormattingInput },
  // More on actions: https://storybook.js.org/docs/react/essentials/actions
  parameters: { actions: { argTypesRegex: '^on.*' } },

  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    modelValue: {
      controls: { type: 'text' },
      description:
        '기본 값을 넣어요. **2가지의 emit 이벤트**를 통해 가져올 수 있습니다.',
    },
    prefix: {
      controls: { type: 'text' },
      description: '맨 앞에 기본적으로 붙이는 문자를 지원해요.',
    },
    delimeter: {
      controls: { type: 'text' },
      description:
        '구분자를 지원해요. <br/>🚨 다만 **절대** 문자와 혼합되지 않도록 주의하세요! <br/> 이를 지원하지만, 원하지 않는 결과가 나올 수 있어요.',
    },
    blocks: {
      controls: { type: 'text' },
      description:
        '나와야 할 개수를 블록 단위로 쪼개서 주입해요. <br/> 예컨대 3-3-4글자로 나눠야 한다면 `[3,3,4]`에요.',
    },
    number: {
      controls: { type: 'boolean' },
      description:
        '넘버 타입만 추출하실 건가요? <br/>이 친구,  기존 `Vue`처럼 문자만 input할 수 있어요!',
    },
    autoFocus: {
      controls: { type: 'boolean' },
      description: '오토포커스 기능을 지원해요.',
    },
  },
} as Meta<typeof FormattingInput>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: StoryFn<typeof FormattingInput> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { FormattingInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const value = ref(args.modelValue);

    const getModelValue = action('update:model-value');
    const getRowValue = action('update:row-value');

    const updateValue = (v) => {
      value.value = v;
      getRowValue(v);
    };

    return {
      value,
      args: computed(() => ({
        ...args,
        blocks: value.value.length === 11 ? [3, 4, 4] : [3, 3, 5],
      })),
      getModelValue,
      updateValue,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="margin-bottom: 1rem;">FormattingInput은 <strong>quasar/Input</strong>과 달리 masking을 <strong>동적으로</strong> 지원합니다.</div>

    <FormattingInput
      @update:model-value="getModelValue"
      @update:row-value="updateValue"
      v-bind="args"
    />
  `,
  methods: { action },
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  modelValue: '',
  blocks: [3, 4, 4],
  delimeter: '-',
  prefix: '',
  number: false,
  autoFocus: false,
};
