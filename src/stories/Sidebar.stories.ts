import Sidebar from '@components/Layout/Sidebar/Sidebar.vue';
import Hamburger from '@components/Base/Button/Hamburger/Hamburger.vue';
import { computed, ref } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { defaultSidebarProps } from '@/components/Layout/Sidebar/defaultProps';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Layout/Sidebar',
  component: { Sidebar },
  subcomponents: { Hamburger },

  argTypes: {
    width: {
      controls: { type: 'text' },
      description: '너비를 설정할 수 있어요.',
    },
    padding: {
      controls: { type: 'text' },
      description: '패딩을 설정할 수 있어요.',
    },
    bgColor: {
      controls: { type: 'color' },
      description: '사이드바의 색상을 설정할 수 있어요.',
    },
    sidebarClosed: {
      controls: { type: 'boolean' },
      description: '햄버거 버튼과 사이드바가 닫힐지를 결정할 수 있어요.',
    },
    border: {
      controls: { type: 'text' },
      description:
        '**오른쪽의 선 굵기**를 설정할 수 있어요. 형식은 `1px solid {{색상}}`입니다.',
    },
    headerHeight: {
      controls: { type: 'text' },
      description: '헤더의 높이만큼 사이드바의 크기를 줄여요.',
    },
    duration: {
      controls: { type: 'number', min: 0.1, max: 1, step: 0.1 },
      description: '사이드바가 닫히는 속도를 조절해요.',
    },
    isClickAway: {
      controls: { type: 'boolean' },
      description: '바깥을 눌러도 사이드바가 닫힐지를 결정해요.',
    },
    'update:closed': {
      description:
        'emit으로 사이드바의 상태를 관찰할 수 있어요. 이를 통해 `sidebarClosed`를 조정합니다.',
    },
  },
} as Meta<typeof Sidebar>;

const Template = (args) => ({
  components: { Sidebar, Hamburger },
  setup() {
    const sidebarClosed = ref(args.sidebarClosed);
    const updateClosed = action('update:closed');

    const updateCloseSidebar = (value) => {
      sidebarClosed.value = value;
      updateClosed(value);
    };

    return {
      sidebarClosed,
      updateCloseSidebar,
      args: computed(() => ({ ...args, sidebarClosed: sidebarClosed.value })),
    };
  },
  /**
   * @throws
   * 스토리북에서는 fixed가 적용이 잘 되지 않습니다.
   * 따라서 이를 style로 absolute로 임시방편으로 설정합니다.
   */
  template: `
    <div style=" position: relative; width: 100vw;height: 100vh;">
      <Hamburger
        style="position: absolute; z-index: 20;"
        :actived="sidebarClosed"
        @update:hamburger="updateCloseSidebar"
      />

      <Sidebar
        style="position: absolute; z-index: 10;"
        v-bind="args"
        @update:closed="updateCloseSidebar"
      >
        내용을 입력할 수 있어요. 🙇🏻‍♂️
      </>
    </div>
  `,
  methods: { action },
});

export const SidebarComponent: StoryFn<typeof Sidebar> = Template.bind({});

SidebarComponent.args = { ...defaultSidebarProps };
