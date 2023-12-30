<template>
  <nav class="flex items-center justify-between px-4">
    <!-- Logo -->
    <div class="flex flex-col text-center">
      <img src="https://i.ibb.co/M1knWxw/ESSI.webp" alt="" class="h-20" />
      <h1 class="essi-logo -mt-4 text-2xl font-semibold text-white">ESSI</h1>
    </div>

    <!-- Navigation Links (centered) -->
    <div class="hidden md:flex space-x-4">
      <router-link to="/" class="hover:text-blue-500">Home</router-link>
      <router-link to="/apod" class="hover:text-blue-500">APOD</router-link>
      <router-link to="/earth-image" class="hover:text-blue-500"
        >Earth Image</router-link
      >
      <router-link to="/epic-image" class="hover:text-blue-500"
        >EPIC Image</router-link
      >
      <!-- Add more links as needed -->
    </div>

    <!-- Dark Theme Toggle (right) -->
    <button @click="toggleDarkTheme" class="p-2">Toggle Dark Theme</button>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  methods: {
    toggleDarkTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", newTheme);
    },
  },
});
</script>
