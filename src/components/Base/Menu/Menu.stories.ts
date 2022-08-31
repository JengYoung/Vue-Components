import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import Menu from '@components/Base/Menu/Menu.vue';
import MenuItem from '@components/Base/Menu/MenuItem.vue';

// https://github.com/storybookjs/storybook/issues/17932
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Menu/Default',
  component: {Menu, MenuItem},
  // More on actions: https://storybook.js.org/docs/react/essentials/actions
  parameters: { actions: { argTypesRegex: '^on.*' } },

  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  },
} as Meta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: StoryFn<typeof Menu> = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Menu, MenuItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const visible = ref(false);
    const onClick = () => {
      visible.value = !visible.value
    }
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
Default.args = {
  target: ".button",
  isShadowed: true,
  isClickOutSide: true,
  width: "6.25rem",
  borderRadius: 10,
  borderColor: "#ddd",
};
