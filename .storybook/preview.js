import '@css/globalStyle.scss';
import { app } from '@storybook/vue3';
import { createPinia } from 'pinia';

const pinia = createPinia();

app.use(pinia);

export const parameters = {
  actions: { argTypesRegex: '(^on[A-Z].*)|(^update:.*)' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
  },
  layout: 'fullscreen',
};
