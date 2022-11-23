import Sidebar from '@components/Layout/Sidebar/Sidebar.vue';
import Hamburger from '@components/Base/Button/Hamburger/Hamburger.vue';
import { computed, ref } from 'vue';

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  argTypes: {
    width: { control: { type: 'range', min: 4, max: 20 } },
    padding: { control: { type: 'range', min: 0, max: 5 } },
    backgroundColor: { control: 'color' },
    border: { control: { type: 'text' } },
    headerHeight: { control: { type: 'range', min: 0, max: 5 } },
    delay: { control: { type: 'range', min: 0.1, max: 1, step: 0.1 } },
    isClickAway: { control: { type: 'boolean' } },
  },
};

const Template = (args) => ({
  components: { Sidebar, Hamburger },
  setup() {
    const sidebarClosed = ref(false);
    return {
      sidebarClosed,
      args: computed(() => ({ ...args, sidebarClosed: sidebarClosed.value })),
    };
  },
  template: `
    <div>
      <Sidebar
        v-bind="args"
        @update:closed="(value) => {
          sidebarClosed = value
          args.sidebarClosed = value
        }"
      />
      <Hamburger
      />
    </div>
  `,
});

export const SidebarComponent = Template.bind({});

SidebarComponent.args = {
  width: 6,
  padding: 0,
  backgroundColor: '#123421',
  border: '1px solid lightgray',
  headerHeight: 4.125,
  delay: 0.3,
  isClickAway: true,
};
