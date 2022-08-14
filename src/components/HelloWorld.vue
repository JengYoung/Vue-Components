<template>
  <div class="hello">
    <FormattingInput
      v-model="inputValue"
      :prefix="prefix"
      :delimeter="delimeter"
      :blocks="inputValue.length === 12 ? [3, 3, 5] : [3, 4, 4]"
      number
      autoFocus
    ></FormattingInput>
    inputvalue: {{ inputValue }} {{ inputValue.length }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormattingInput from './Base/Input/FormattingInput.vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: { FormattingInput },
  setup() {
    const inputValue = ref('');
    const prefix = ref('TEL)');
    const delimeter = ref('-');

    return {
      inputValue,
      prefix,
      delimeter,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
