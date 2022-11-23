import Image from '@components/Base/Image/index.vue';
import Logo from '@assets/logo.png';
import { defaultImageProps } from './defaultProps';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Base/Image',
  component: Image,

  argTypes: {
    lazy: {
      control: { type: 'boolean' },
      description: 'lazy하게 이미지를 로딩할지 결정해요!',
      table: {
        defaultValue: { summary: defaultImageProps.lazy },
      },
    },
    threshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '뷰포트에서 보여질 임계점을 설정해줄 수 있어요.',
      table: {
        defaultValue: { summary: defaultImageProps.threshold },
      },
    },
    src: {
      control: { type: 'text' },
      description: '이미지 경로를 전달해주세요! 🙇🏻‍♂️',
      table: {
        defaultValue: { summary: defaultImageProps.src },
      },
    },
    defaultSrc: {
      control: { type: 'text' },
      description: '기본적으로 보여질 이미지 경로를 알려주세요.',
      table: {
        defaultValue: { summary: defaultImageProps.defaultSrc },
      },
    },
    width: {
      control: { type: 'range', min: 50, max: 200 },
      description: '이미지의 너비를 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultImageProps.width },
      },
    },
    height: {
      control: { type: 'range', min: 50, max: 200 },
      description: '이미지의 높이를 설정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultImageProps.height },
      },
    },
    objectFit: {
      control: {
        type: 'radio',
        options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      },
      description: '이미지가 어떻게 채워질지를 결정할 수 있어요.',
      table: {
        defaultValue: { summary: defaultImageProps.objectFit },
      },
    },
  },
} as Meta<typeof Image>;

const Template = (args) => ({
  components: { Image },
  setup() {
    return { args };
  },

  template: `
		<div>
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
			<Image v-bind="args" />
		</div>
	`,
});

export const Default: StoryFn<typeof Image> = Template.bind({});

Default.args = {
  ...defaultImageProps,
  width: 200,
  height: 200,
  threshold: 0.3,
  defaultSrc: Logo,
  src: 'https://picsum.photos/200',
  alt: '이미지',
};

export const NotLazy: StoryFn<typeof Image> = Template.bind({});

NotLazy.args = {
  ...defaultImageProps,
  defaultSrc: Logo,
  src: 'https://picsum.photos/200',
  alt: '이미지',
  lazy: false,
};
