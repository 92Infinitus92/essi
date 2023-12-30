<template>
  <nav
    class="flex flex-wrap items-center justify-between bg-gray-800 text-white p-4"
  >
    <!-- Logo on the left -->
    <div class="flex-shrink-0">
      <img
        src="https://i.ibb.co/M1knWxw/ESSI.webp"
        alt="ESSI Logo"
        class="h-12 md:h-24"
      />
      <h1 class="text-lg md:text-xl font-semibold text-center -mt-2 md:-mt-5">
        ESSI
      </h1>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden p-2 focus:outline-none focus:bg-gray-700 rounded"
      @click="toggleMobileMenu"
    >
      <i class="fas fa-bars" v-if="!isMobileMenuOpen"></i>
      <i class="fas fa-times" v-else></i>
    </button>

    <!-- Navigation Links -->
    <div
      class="md:flex md:items-center md:justify-center w-full md:w-auto order-3 md:order-2 bg-gray-800 md:bg-transparent"
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
    >
      <router-link
        to="/"
        class="block px-4 py-2 hover:text-gray-300 text-center"
        >Home</router-link
      >
      <router-link
        to="/apod"
        class="block px-4 py-2 hover:text-gray-300 text-center"
        >APOD</router-link
      >
      <router-link
        to="/earth-image"
        class="block px-4 py-2 hover:text-gray-300 text-center"
        >Earth Image</router-link
      >
      <router-link
        to="/epic-image"
        class="block px-4 py-2 hover:text-gray-300 text-center"
        >EPIC Image</router-link
      >
    </div>

    <!-- Theme Switcher -->
    <div class="relative order-2 md:order-3">
      <input
        type="checkbox"
        id="theme-switcher"
        class="sr-only"
        @change="toggleDarkTheme"
        :checked="isDarkTheme"
      />
      <label
        for="theme-switcher"
        class="bg-gray-600 rounded-full p-1 w-14 h-7 flex items-center justify-between cursor-pointer"
      >
        <i class="fas fa-sun text-yellow-500"></i>
        <span
          class="bg-white rounded-full block w-5 h-5 transform transition-transform"
          :class="{ 'translate-x-7': isDarkTheme }"
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
    const isMobileMenuOpen = ref(false);

    function toggleMobileMenu() {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    }

    function toggleDarkTheme() {
      isDarkTheme.value = !isDarkTheme.value;
      const theme = isDarkTheme.value ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }

    return {
      isDarkTheme,
      toggleDarkTheme,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
});
</script>
