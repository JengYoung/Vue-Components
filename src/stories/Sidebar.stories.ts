import Sidebar from '@components/Layout/Sidebar/Sidebar.vue';
import Hamburger from '@components/Base/Button/Hamburger/Hamburger.vue';
import { computed, ref } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { defaultSidebarProps } from '@/components/Layout/Sidebar/defaultProps';

export default {
  title: 'Layout/Sidebar',
  component: { Sidebar, Hamburger },
  argTypes: {
    width: { control: { type: 'text' } },
    padding: { control: { type: 'text' } },
    backgroundColor: { control: 'color' },
    border: { control: { type: 'text' } },
    headerHeight: { control: { type: 'text' } },
    delay: { control: { type: 'number', min: 0.1, max: 1, step: 0.1 } },
    isClickAway: { control: { type: 'boolean' } },
  },
} as Meta<typeof Sidebar>;

const Template = (args) => ({
  components: { Sidebar, Hamburger },
  setup() {
    const sidebarClosed = ref(false);
    const onClickHamburger = (value) => {
      sidebarClosed.value = value;
    };
    return {
      sidebarClosed,
      onClickHamburger,
      args: computed(() => ({ ...args, sidebarClosed: sidebarClosed.value })),
    };
  },
  template: `
    <div>
      <Hamburger
        fixed
        @update:hamburger="onClickHamburger"
      />

      <Sidebar
        v-bind="args"
        @update:closed="(value) => {
          sidebarClosed = value
          args.sidebarClosed = value
        }"
      >
        내용을 입력할 수 있어요. 🙇🏻‍♂️
      </>
    </div>
  `,
});

export const SidebarComponent: StoryFn<typeof Sidebar> = Template.bind({});

SidebarComponent.args = { ...defaultSidebarProps };
