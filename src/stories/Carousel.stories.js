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
      body: ['Do you wanna know how make carousel?!', 'It is very simple,', '"Ask for JengYoung!"'],
      type: 'left',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/animal',
      title: 'Carousel Test2!',
      body: ['Do you wanna know how make carousel?!', 'It is very simple,', '"Ask for JengYoung!"'],
      type: 'left',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/abstract',
      title: 'Carousel Test3!',
      body: ['Do you wanna know how make carousel?!', 'It is very simple,', '"Ask for JengYoung!"'],
      type: 'left',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/city',
      title: 'Carousel Test4!',
      body: ['Do you wanna know how make carousel?!', 'It is very simple,', '"Ask for JengYoung!"'],
      type: 'left',
    },
    {
      imageUrl: 'http://placeimg.com/640/480/nature',
      title: 'Carousel Test5!',
      body: ['Do you wanna know how make carousel?!', 'It is very simple,', '"Ask for JengYoung!"'],
      type: 'left',
    },
  ],
  width: '100%',
  height: 25,
};
