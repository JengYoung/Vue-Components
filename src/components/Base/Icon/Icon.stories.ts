import globalCSS from '@/utils/globalCSS';
import type { Meta, StoryFn } from '@storybook/vue3';
import DefaultIcon from './Default.vue';
import { defaultIconProps } from './defaultProps';
// https://github.com/storybookjs/storybook/issues/17932
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: `Base/Icon`,
  component: { DefaultIcon },
  // More on actions: https://storybook.js.org/docs/react/essentials/actions
  parameters: { actions: { argTypesRegex: '^on.*' } },

  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    src: {
      type: 'string',
      defaultValue:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/351.jpg',
      description: '아이콘에 들어갈 이미지 경로를 넣어줍니다.',
    },
    alt: {
      type: 'string',
      defaultValue: defaultIconProps.alt,
      description: '아이콘이 나오지 않을 경우 나올 이름을 지정합니다.',
    },
    size: {
      type: 'string',
      defaultValue: defaultIconProps.size,
      description: '아이콘의 크기를 지정합니다.',
    },
    strokeWidth: {
      type: 'string',
      defaultValue: defaultIconProps.strokeWidth,
      description: '아이콘의 선의 굵기를 지정합니다.',
    },
    strokeColor: {
      type: 'string',
      defaultValue: defaultIconProps.strokeColor,
      description: '아이콘의 선의 굵기를 지정합니다.',
      table: {
        type: { summary: 'color' },
        defaultValue: { summary: globalCSS.color.sub },
      },
    },
    round: {
      type: 'boolean',
      defaultValue: defaultIconProps.round,
      description: '둥글게 표현할지를 지정합니다. 기본 값은 5px입니다.',
    },
  },
} as Meta<typeof DefaultIcon>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: StoryFn<typeof DefaultIcon> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DefaultIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      args,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <DefaultIcon v-bind="args" />
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  ...defaultIconProps,
  src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/351.jpg',
};
