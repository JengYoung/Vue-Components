import Carousel from '@components/Base/Carousel/index.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { defaultCarouselProps } from './defaultProps';

export default {
  title: 'Base/Carousel',
  component: Carousel,

  argTypes: {
    cards: {
      control: { type: 'array' },
      description:
        '캐러셀로 보여질 카드들을, 다음과 같이 설정할 수 있어요.\n' +
        `
        {
          imageUrl: 이미지 경로;
          title: 제목;
          body: 내용(배열)
          type: 내용이 보여질 위치
        }
      `,
      table: {
        defaultValue: { summary: `[]` },
      },
    },
    width: {
      control: { type: 'text' },
      description: '캐러셀의 너비를 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultCarouselProps.width },
      },
    },
    height: {
      control: { type: 'text' },
      description: '캐러셀의 높이를 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultCarouselProps.height },
      },
    },
    borderRadius: {
      control: { type: 'text' },
      description: '캐러셀의 외곽을 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultCarouselProps.borderRadius },
      },
    },
    bgColor: {
      control: { type: 'color' },
      description:
        '이미지가 안보일 동안 보여질 기본 색상을 설정할 수 있어요. 기본은 `#111`입니다.',
      table: {
        defaultValue: { summary: defaultCarouselProps.bgColor },
      },
    },

    duration: {
      control: { type: 'range', min: 0.2, max: 2, step: 0.1 },
      description: '캐러셀의 애니메이션 시간을 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultCarouselProps.duration },
      },
    },
  },
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
  ...defaultCarouselProps,
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
};
