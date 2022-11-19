import { useToastStore } from '@/store/useToastStore';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import { defaultToastsProps } from './defaultProps';
import Toasts from './Toasts.vue';

// https://github.com/storybookjs/storybook/issues/17932
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Toast/types',
  component: { Toasts },
  // More on actions: https://storybook.js.org/docs/react/essentials/actions
  parameters: { actions: { argTypesRegex: '^on.*' } },

  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    toastStyle: {
      options: ['float', 'block'],
      control: { type: 'radio' },
      description:
        '토스트 스타일을 설정할 수 있어요. `float`은 중첩해서 쌓을 수 있고, `block`은 블록처럼 쌓을 수 있습니다.',
    },
    gap: {
      description:
        '토스트가 나왔을 때, 나오는 방향으로부터 얼마나 너비를 줄 것인지를 설정할 수 있어요.',
    },
    direction: {
      options: [
        'top left',
        'top',
        'top right',
        'left',
        'right',
        'bottom left',
        'bottom',
        'bottom right',
      ],
      control: { type: 'radio' },
      description:
        '토스트가 어디서 나올 것인지, 8방향으로 방향 설정이 가능해요.',
    },
    isTransition: {
      control: { type: 'boolean' },
      description: '트랜지션에 대한 여부를 설정 가능해요.',
    },
    width: {
      control: { type: 'text' },
      description: '토스트 너비를 설정할 수 있어요.',
    },
    height: {
      control: { type: 'text' },
      description: '토스트 높이를 설정할 수 있어요.',
    },
  },
} as Meta<typeof Toasts>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: StoryFn<typeof Toasts> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Toasts },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup(props) {
    const toastStore = useToastStore();
    const id = ref(0);

    const onClick = () => {
      toastStore.addToast({
        type: args.type,
        id: `${id.value}`,
        content: `
          버튼을 ${id.value}번 클릭하셨어요.
          그런데 말이죠. 만약에 이렇게 에러 메시지가 길어버리면 어떻게 하죠...?🎉
        `,
        showTime: 5,
      });

      id.value += 1;
    };

    return {
      args,
      onClick,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div>
      <button @click="onClick">button!</button>
      <Toasts v-bind="args" />
    </div>
  `,
});

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Warning.args = {
  type: 'warning',
  ...defaultToastsProps,
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Error.args = {
  type: 'error',
  ...defaultToastsProps,
};

export const Info = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Info.args = {
  type: 'info',
  ...defaultToastsProps,
};

export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Success.args = {
  type: 'success',
  ...defaultToastsProps,
};
