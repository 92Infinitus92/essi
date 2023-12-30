<template>
  <div>
    <nav class="bg-black text-white p-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex flex-col">
        <img
          src="https://i.ibb.co/M1knWxw/ESSI.webp"
          alt="ESSI Logo"
          class="w-full h-24 object-contain"
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
          class="block px-2 py-2 hover:text-gray-300 text-center text-2xl essi-logo"
          >Home</router-link
        >
        <router-link
          to="/apod"
          class="block px-2 py-2 hover:text-gray-300 text-center text-2xl essi-logo"
          >APOD</router-link
        >
        <router-link
          to="/earth-image"
          class="block px-2 py-2 hover:text-gray-300 text-center text-2xl essi-logo"
          >Earth Image</router-link
        >
        <router-link
          to="/epic-image"
          class="block px-2 py-2 hover:text-gray-300 text-center text-2xl essi-logo"
          >EPIC Image</router-link
        >
      </div>

      <!-- Theme Switcher and Sign In Button -->
      <div class="flex items-center justify-between md:w-1/5 w-60">
        <!-- Theme Switcher -->
        <div class="order-1 md:order-1 relative">
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

        <!-- User Profile Display -->
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <img
            :src="user?.picture"
            alt="Profile picture"
            class="rounded-full w-12 h-12"
          />
          <div class="text-white text-sm">
            <p class="font-bold">{{ user?.name }}</p>
            <p>{{ user?.email }}</p>
          </div>
        </div>

        <!-- Sign In/Sign Out Button -->
        <button
          v-if="!isAuthenticated"
          @click="login"
          class="bg-[#5c8374] hover:bg-[#347a78] text-white font-bold py-2 px-4 rounded essi-logo"
        >
          Sign In
        </button>
        <button
          v-else
          @click="logout"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded essi-logo"
        >
          Sign Out
        </button>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="ml-4 md:hidden p-2 rounded">
          <i class="fas fa-bars" v-if="!isMobileMenuOpen"></i>
          <i class="fas fa-times" v-else></i>
        </button>
      </div>
    </nav>
    <!-- Router View: Components for the current route will be rendered here -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  name: "App",
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
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
      isAuthenticated,
      user,
      login: () => {
        loginWithRedirect();
      },
      logout: () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      },
    };
  },
});
</script>
