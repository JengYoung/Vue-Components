
import { ref } from 'vue'
import HeaderText from '../components/Base/HeaderText.vue'

export default {
  title: 'Base/HeaderText',
  component: HeaderText,
  argTypes: {
    tag: { control: { type: 'radio', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } },
    centered: { control: 'boolean' },
    color: { control: 'color' }
  }
}

const Template = args => ({
  components: { HeaderText },

  setup () {
    const text = ref('text')
    return { ...args, text }
  },
  template: '<HeaderText v-bind="args">{{ text }}</HeaderText>'
})

export const H1 = Template.bind({})
export const H2 = Template.bind({})
export const H3 = Template.bind({})
export const H4 = Template.bind({})
export const H5 = Template.bind({})
export const H6 = Template.bind({})

H1.args = {
  tag: 'h1',
  centered: true,
  color: '#111111'
}

H2.args = {
  tag: 'h2',
  centered: true,
  color: '#111111'
}

H3.args = {
  tag: 'h3',
  centered: true,
  color: '#111111'
}

H4.args = {
  tag: 'h4',
  centered: true,
  color: '#111111'
}

H5.args = {
  tag: 'h5',
  centered: true,
  color: '#111111'
}

H6.args = {
  tag: 'h6',
  centered: true,
  color: '#111111'
}
