import { useToastStore } from '@/store/useToastStore';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import { defaultToastsProps } from './defaultProps';
import Toasts from './Toasts.vue';

// https://github.com/storybookjs/storybook/issues/17932
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Toasts/Default',
  component: { Toasts },
  // More on actions: https://storybook.js.org/docs/react/essentials/actions
  parameters: { actions: { argTypesRegex: '^on.*' } },

  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    toastStyle: {
      options: ['float', 'block'],
      control: { type: 'radio' },
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

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = defaultToastsProps;
