import Toggle from '../components/Base/Toggle/index.vue'

export default {
  title: 'Example/Toggle',
  component: Toggle,
  argTypes: {
    width: { control: { type: 'range', min: 6.25, max: 10 } },
    height: { control: { type: 'range', min: 3, max: 4.75 } },
    buttonColor: { control: 'color' },
    backgroundColor: { control: 'color'},
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
  width: 6.25,
  height: 3,
  border: '1px solid lightgray',
  backgroundColor: '#b377ff',
  buttonColor: '#f3f3f3',
  isToggle: false,
}