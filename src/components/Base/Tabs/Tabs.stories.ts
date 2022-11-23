import globalCSS from '@/utils/globalCSS';
import Tabs from '@components/Base/Tabs/index.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Base/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      description: 'Tabs는 해당 컴포넌트의 데이터가 들어가야 합니다.',
    },
    activeIndex: {
      description: '맨 처음에 활성화되는 인덱스를 설정해줄 수 있습니다.',
    },
    tabWidth: {
      description:
        'tab의 길이를 정해줄 수 있습니다. 해당 컴포넌트의 전체 크기는 tab의 길이가 결정하는 구조입니다.',
      table: {
        defaultValue: { summary: '100%' },
      },
    },
    tabHeight: {
      description:
        'tab의 높이를 정해줄 수 있습니다. 기본 글자 크기에 비례하게 높이를 설정했습니다.',
      table: {
        defaultValue: { summary: '3rem' },
      },
    },
    activeBackgroundColor: {
      defaultValue: globalCSS.color.default,
      description: '활성화된 탭의 배경색입니다.',
      table: {
        type: { summary: 'color' },
        defaultValue: { summary: globalCSS.color.default },
      },
    },
    activeTextColor: {
      defaultValue: globalCSS.color.white,
      description: '활성화된 탭의 배경색입니다.',
      table: {
        type: { summary: 'color' },
        defaultValue: { summary: globalCSS.color.white },
      },
    },
    borderWidth: {
      description: '선의 굵기입니다.',
    },
    borderColor: {
      defaultValue: globalCSS.color.sub,
      description: '선의 색상입니다.',
      table: {
        type: { summary: 'color' },
        defaultValue: { summary: globalCSS.color.sub },
      },
    },
  },
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
  activeBackgroundColor: globalCSS.color.default,
};
