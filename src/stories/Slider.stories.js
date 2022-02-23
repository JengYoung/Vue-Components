import Slider from '@components/Base/Slider/index.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Slider',
  component: Slider,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Slider },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Slider v-bind="args" />',
});

export const Default = Template.bind({});

// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  max: 100,
  min: 0,
  step: 1,
};
