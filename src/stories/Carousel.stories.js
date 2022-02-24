import Carousel from '@components/Base/Carousel/index.vue';

export default {
  title: 'Base/Carousel',
  component: Carousel,

  argTypes: {},
};

const Template = (args) => ({
  components: { Carousel },
  setup() {
    return { args };
  },

  template: `
		<Carousel v-bind="args" />
	`,
});

export const Default = Template.bind({});

Default.args = {
  cards: [
    {
      imageUrl: 'http://placeimg.com/640/480/nightlife',
      title: 'Carousel Test!',
      body: ['Do you wanna know how make carousel?!', 'It is very simple,', '"Ask to JengYoung!"'],
      type: 'left',
    },
  ],
};
