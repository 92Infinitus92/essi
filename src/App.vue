<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <!-- Logo -->
    <div class="flex flex-col">
      <img
        src="https://i.ibb.co/M1knWxw/ESSI.webp"
        alt="ESSI Logo"
        class="h-24"
      />
      <h1 class="essi-logo text-xl font-semibold text-center -mt-5">ESSI</h1>
    </div>

    <!-- Navigation Links -->
    <div
      class="md:flex md:items-center md:justify-center w-fit md:w-auto bg-gray-800 md:bg-transparent"
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
    >
      <router-link
        to="/"
        class="block px-2 py-2 hover:text-gray-300 text-center"
        >Home</router-link
      >
      <router-link
        to="/apod"
        class="block px-2 py-2 hover:text-gray-300 text-center"
        >APOD</router-link
      >
      <router-link
        to="/earth-image"
        class="block px-2 py-2 hover:text-gray-300 text-center"
        >Earth Image</router-link
      >
      <router-link
        to="/epic-image"
        class="block px-2 py-2 hover:text-gray-300 text-center"
        >EPIC Image</router-link
      >
    </div>

    <!-- Theme Switcher and Sign In Button -->
    <div class="flex items-center justify-between md:w-1/5 w-60">
      <!-- Theme Switcher -->
      <div class="order-2 md:order-1 relative">
        <input
          type="checkbox"
          id="theme-switcher"
          class="sr-only"
          @change="toggleDarkTheme"
          :checked="isDarkTheme"
        />
        <label
          for="theme-switcher"
          class="bg-gray-600 rounded-full p-1 w-20 h-7 flex items-center justify-between cursor-pointer px-3"
        >
          <i class="fas fa-sun text-yellow-500"></i>
          <span
            class="bg-white rounded-full block w-5 h-5 absolute transform transition-transform"
            :class="{ 'translate-x-12': isDarkTheme }"
            :style="{ left: isDarkTheme ? '0.50rem' : '0.60rem' }"
          ></span>
          <i class="fas fa-moon text-indigo-300"></i>
        </label>
      </div>

      <!-- Sign In Button -->
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded order-2"
      >
        Sign In
      </button>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="ml-4 md:hidden p-2 rounded">
        <i class="fas fa-bars" v-if="!isMobileMenuOpen"></i>
        <i class="fas fa-times" v-else></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <!-- <div
      v-if="isMobileMenuOpen"
      class="absolute top-32 left-0 w-full bg-gray-800 md:hidden"
    >
      <router-link to="/" class="block text-center p-2 hover:bg-gray-700"
        >Home</router-link
      >
      <router-link to="/apod" class="block text-center p-2 hover:bg-gray-700"
        >APOD</router-link
      >
      <router-link
        to="/earth-image"
        class="block text-center p-2 hover:bg-gray-700"
        >Earth Image</router-link
      >
      <router-link
        to="/epic-image"
        class="block text-center p-2 hover:bg-gray-700"
        >EPIC Image</router-link
      >
    </div> -->
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const isDarkTheme = ref(false);

    // Apply theme changes
    const applyTheme = () => {
      const theme = isDarkTheme.value ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };

    // Method to toggle the theme
    const toggleDarkTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
    };

    // Watch for changes on isDarkTheme and apply the theme
    watch(isDarkTheme, (newValue) => {
      applyTheme();
    });

    // Method to toggle the mobile menu
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    // Initialize the theme based on user preference or system settings
    onMounted(() => {
      isDarkTheme.value =
        localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(); // Apply the initial theme
    });

    const isMobileMenuOpen = ref(false);

    return {
      isDarkTheme,
      toggleDarkTheme,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
});
</script>
