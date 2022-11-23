import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import Menu from '@components/Base/Menu/Menu.vue';
import MenuItem from '@components/Base/Menu/MenuItem.vue';
import { defaultProps } from './defaultProps';

// https://github.com/storybookjs/storybook/issues/17932
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Base/Menu',
  component: { Menu, MenuItem },
  // More on actions: https://storybook.js.org/docs/react/essentials/actions
  parameters: { actions: { argTypesRegex: '^on.*' } },

  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    target: {
      type: 'string',
      defaultValue: '.button',
      description:
        '클릭할 때 나타날 수 있는 타겟은 셀렉터로 지정할 수 있습니다.',
    },
    modelValue: {
      type: 'boolean',
      defaultValue: false,
      description:
        '이 메뉴를 처음에 열 것인지를 지정해줄 수 있습니다. 필수 값입니다.',
    },
    isShadowed: {
      type: 'boolean',
      defaultValue: true,
      description:
        '메뉴는 반드시 그림자질 필요가 없습니다. 이를 조정할 수 있습니다.',
    },
    isClickOutSide: {
      type: 'boolean',
      defaultValue: true,
      description: '메뉴가 바깥을 눌러도 닫힐 수 있도록 합니다.',
    },
    width: {
      type: 'string',
      defaultValue: '6.25rem',
      description: '메뉴의 기본 너비입니다.',
    },
    borderRadius: {
      type: 'string',
      defaultValue: '.button',
      description: '메뉴를 얼마나 둥글게 할지를 고를 수 있습니다.',
    },
    borderColor: {
      type: 'number',
      defaultValue: 10,
      description: '선의 색상을 지정해줍니다.',
    },
  },
} as Meta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: StoryFn<typeof Menu> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Menu, MenuItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const visible = ref(args.modelValue);
    const onClick = () => {
      visible.value = !visible.value;
    };
    return { args, onClick, visible };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <button class="button" @click="onClick">Click!
    </button>
    <Menu
      v-bind="args"
      :modelValue="visible"
      @update:modelValue="visible = $event"
    >
      <MenuItem>메뉴1</MenuItem>
      <MenuItem :route="{ to: '/hi', replace: false }">메뉴2</MenuItem>
      <MenuItem>메뉴wefwfewfewwefewfwfewfew3</MenuItem>
      <MenuItem>메뉴4</MenuItem>
    </Menu>
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = { ...defaultProps, target: '.button' };
