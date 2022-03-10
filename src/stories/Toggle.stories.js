import Toggle from '../components/Base/Toggle/index.vue'

export default {
  title: 'Example/Toggle',
  component: Toggle,
  argTypes: {
    width: { control: { type: 'range', min: 4.25, max: 10, step: 0.125 } },
    height: { control: { type: 'range', min: 2, max: 4.75, step: 0.125 } },
    buttonColor: { control: 'color' },
    activeBgColor: { control: 'color'},
    border: { control: "text" },
    isToggle: { control: 'boolean' }
  }
}

const Template = args => ({
  components: { Toggle },
  setup() {
    return { args }
  },
  template: '<Toggle v-bind="args"></Toggle>'
})

export const Default = Template.bind({});

Default.args = {
  width: 4.25,
  height: 2,
  border: '1px solid lightgray',
  activeBgColor: '#b377ff',
  buttonColor: '#f3f3f3',
}