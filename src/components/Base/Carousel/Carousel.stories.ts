import Carousel from '@components/Base/Carousel/index.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Base/Carousel',
  component: Carousel,

  argTypes: {},
} as Meta<typeof Carousel>;

const Template = (args) => ({
  components: { Carousel },
  setup() {
    return { args };
  },

  template: `
		<Carousel v-bind="args" />
	`,
});

export const Default: StoryFn<typeof Carousel> = Template.bind({});

const getTexts = (idx) => [
  'Carousel은 다음과 같이 Body를 지원합니다.',
  '멀티라인이 가능해요.',
  `현재는 ${idx}번째입니다.`,
];

Default.args = {
  cards: [
    {
      imageUrl: 'http://placeimg.com/640/480/nightlife',
      title: 'Carousel 1!',
      body: getTexts(1),
      type: 'left',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/animal',
      title: 'Carousel 2!',
      body: getTexts(2),
      type: 'center',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/abstract',
      title: 'Carousel 3!',
      body: getTexts(3),
      type: 'right',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/city',
      title: 'Carousel 4!',
      body: getTexts(4),
      type: 'left',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/nature',
      title: 'Carousel 5!',
      body: getTexts(5),
      type: 'center',
    },
  ],
  width: '100%',
  height: 25,
};
