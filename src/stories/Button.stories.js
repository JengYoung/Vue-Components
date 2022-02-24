import Button from '@components/Base/Button/index.vue';
/* eslint-disable @typescript-eslint/no-explicit-any */

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Base/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    children: {
      control: { type: 'text' },
    },
    width: { control: { type: 'range', min: 0, max: 30 } },
    height: { control: { type: 'range', min: 0, max: 30 } },
    padding: { control: { type: 'text' } },
    fontSize: { control: { type: 'range', min: 0.5, max: 3, step: 0.125 } },
    border: { control: { type: 'text' } },
    borderColor: { control: 'color' },
    borderRadius: { control: { type: 'range', min: 0, max: 20 } },
    outline: { control: { type: 'boolean' } },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Button },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Button v-bind="args" />',
});

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  children: 'Button',
  backgroundColor: '#FFFFFF',
  // width: 'auto',
  // height: 'auto',
  padding: '0.5rem 2rem',
  border: '1px solid lightgray',
  borderColor: '#888888',
  borderRadius: 5,
  outline: false,
};
