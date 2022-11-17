import Tabs from '@components/Base/Tabs/index.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Tabs/Default',
  component: Tabs,
  argTypes: {},
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => ({
  components: { Tabs },
  setup() {
    return { args };
  },
  template: '<Tabs v-bind="args" />',
});

export const Default = Template.bind({});

Default.args = {
  tabs: [
    { id: '1', label: 'test1', value: 'result1' },
    { id: '2', label: 'test2', value: 'result2' },
    { id: '3', label: 'test3', value: 'result3' },
  ],
  width: '100%',
  height: '2rem',
};
