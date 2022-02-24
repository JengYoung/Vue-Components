import Image from '@components/Base/Image/index.vue';

export default {
  title: 'Base/Image',
  component: Image,

  argTypes: {
    lazy: { control: 'boolean' },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    src: { control: 'text' },
    defaultSrc: { control: 'text' },
    width: { control: { type: 'range', min: 1, max: 20 } },
    height: { control: { type: 'range', min: 1, max: 20 } },
    objectFit: {
      controls: { type: 'radio', opitons: ['fill', 'contain', 'cover', 'none', 'scale-down'] },
    },
  },
};

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

export const Lazy = Template.bind({});

Lazy.args = {
  display: 'block',
  lazy: true,
  threshold: 0.1,
  defaultSrc: 'http://placeimg.com/640/480/animals',
  src: 'https://picsum.photos/200',
  width: 6.25,
  height: 6.25,
  alt: 'Test Image',
  objectFit: 'cover',
};
