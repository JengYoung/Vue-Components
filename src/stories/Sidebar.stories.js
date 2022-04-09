import Sidebar from '@components/Layout/Sidebar/Sidebar.vue';

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  argTypes: {
    width: { control: { type: 'range', min: 4, max: 20 } },
    padding: { control: { type: 'range', min: 0, max: 5 } },
    backgroundColor: { control: 'color' },
    border: { control: { type: 'text' } },
    headerHeight: { control: { type: 'range', min: 0, max: 5 } },
    sidebarClosed: { control: { type: 'boolean'} }
  }
}

const Template = (args) => ({
  components: { Sidebar },
  setup() {
    return {args};
  },
  template: '<Sidebar v-bind="args"></Sidebar>'
})

export const SidebarComponent = Template.bind({});

SidebarComponent.args = {
  width: 6,
  padding: 0,
  backgroundColor: '#123421',
  border: '1px solid lightgray',
  headerHeight: 4.125,
  sidebarClosed: false,
}
