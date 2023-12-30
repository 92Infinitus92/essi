<template>
  <nav class="flex items-center justify-between p-4 bg-gray-800 text-white">
    <!-- Logo -->
    <img
      src="https://i.ibb.co/M1knWxw/ESSI.webp"
      alt="ESSI Logo"
      class="h-12"
    />

    <!-- Navigation Links -->
    <div class="hidden md:flex space-x-4">
      <router-link to="/" class="hover:text-gray-300">Home</router-link>
      <router-link to="/apod" class="hover:text-gray-300">APOD</router-link>
      <router-link to="/earth-image" class="hover:text-gray-300"
        >Earth Image</router-link
      >
      <router-link to="/epic-image" class="hover:text-gray-300"
        >EPIC Image</router-link
      >
    </div>

    <!-- Theme Switcher -->
    <div class="relative">
      <input
        type="checkbox"
        id="theme-switcher"
        class="sr-only"
        @change="toggleDarkTheme"
        :checked="isDarkTheme"
      />
      <label
        for="theme-switcher"
        class="bg-gray-600 rounded-full p-1 w-20 h-7 flex items-center justify-between cursor-pointer"
      >
        <i class="fas fa-sun text-yellow-500"></i>
        <span
          class="bg-white rounded-full block w-5 h-5 absolute transform transition-transform"
          :class="{ 'translate-x-12': isDarkTheme }"
          :style="{ left: isDarkTheme ? '0.6rem' : '0.25rem' }"
        ></span>
        <i class="fas fa-moon text-indigo-300"></i>
      </label>
    </div>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const isDarkTheme = ref(
      localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    // Watch for changes on the system preferences
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        isDarkTheme.value = event.matches;
        applyTheme();
      });

    // Apply the initial theme
    applyTheme();

    // Method to toggle the theme
    function toggleDarkTheme() {
      isDarkTheme.value = !isDarkTheme.value;
      applyTheme();
    }

    // Apply theme changes
    function applyTheme() {
      document.documentElement.setAttribute(
        "data-theme",
        isDarkTheme.value ? "dark" : "light"
      );
      // Update the local storage
      localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
    }

    return { isDarkTheme, toggleDarkTheme };
  },
});
</script>
