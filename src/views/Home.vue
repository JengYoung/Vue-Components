<template>
  <Sidebar
    :width="6"
    :padding="0"
    :headerHeight="4"
    backgroundColor= '#eff1e2'
    border= '1px solid lightgray'
    :sidebarClosed="sidebarClosed"
  ></Sidebar>
  <SidebarToggleButton @click="handleToggle"></SidebarToggleButton>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Sidebar from '@/components/Layout/Sidebar/Sidebar.vue';
import SidebarToggleButton from '@/components/Layout/Sidebar/SidebarToggleButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    Sidebar,
    SidebarToggleButton,
  },

  setup() {
    const sidebarClosed=ref(true);

    const handleToggle = () => {
      sidebarClosed.value=!sidebarClosed.value
    }
    return {
      sidebarClosed, handleToggle
    }
  }
});
</script>
