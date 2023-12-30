<template>
  <div class="text-center">
    <img
      alt="Vue logo"
      src="https://i.ibb.co/M1knWxw/ESSI.webp"
      class="mx-auto"
    />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
});
</script>
