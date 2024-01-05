<template>
  <div class="pb-2 flex flex-col min-h-[75vh]">
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
        class="md:flex flex flex-col md:flex-row md:items-center md:justify-center w-fit md:w-auto md:bg-transparent"
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

        <!-- User Profile and Dropdown Menu -->
        <div v-if="isAuthenticated" class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center focus:outline-none"
            :class="{
              'text-gray-300': isDarkTheme,
              'text-gray-700': !isDarkTheme,
            }"
          >
            <img
              :src="user?.picture"
              alt="Profile picture"
              class="rounded-full w-12 h-12"
            />
            <i
              class="fas fa-chevron-down ml-2"
              :class="{
                'text-white': isDarkTheme,
                'text-gray-600': !isDarkTheme,
              }"
            ></i>
            <!-- Dropdown icon added -->
          </button>
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-xl z-20"
            :class="{ 'bg-[#092635]': isDarkTheme, 'bg-white': !isDarkTheme }"
          >
            <router-link
              to="/favorites"
              class="block px-4 py-2 text-sm capitalize transition-colors duration-200"
              :class="{
                'hover:bg-[#123812] text-black hover:text-white': !isDarkTheme,
                'hover:bg-[#347a78] hover:text-gray-300': isDarkTheme,
              }"
            >
              Favorites
            </router-link>
            <button
              @click="logout"
              class="w-full text-left block px-4 py-2 text-sm capitalize transition-colors duration-200"
              :class="{
                'hover:bg-[#123812] text-black hover:text-white': !isDarkTheme,
                'hover:bg-[#347a78] hover:text-gray-300': isDarkTheme,
              }"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Sign In -->
        <button
          v-if="!isAuthenticated"
          @click="login"
          class="inline-block bg-[#5c8374] hover:bg-[#347a78] text-white essi-logo py-2 px-6 rounded-full text-lg font-semibold transition transform hover:scale-110 shadow-lg"
        >
          Sign In
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
  <FooterComponent />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import FooterComponent from "./components/FooterComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    FooterComponent,
  },
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const isDarkTheme = ref(false);
    const showDropdown = ref(false);
    const isMobileMenuOpen = ref(false);

    const applyTheme = () => {
      const theme = isDarkTheme.value ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };

    const toggleDarkTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      applyTheme();
    };

    onMounted(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        isDarkTheme.value = storedTheme === "dark";
      } else {
        isDarkTheme.value = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }
      applyTheme();
      document.addEventListener("click", onClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", onClickOutside);
    });

    const toggleDropdown = (event: MouseEvent) => {
      event.stopPropagation(); // Prevent event from immediately propagating to the document
      showDropdown.value = !showDropdown.value;
    };

    const onClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown")) {
        showDropdown.value = false;
      }
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
      isDarkTheme,
      toggleDarkTheme,
      isMobileMenuOpen,
      toggleMobileMenu,
      isAuthenticated,
      user,
      login: () => loginWithRedirect(),
      logout: () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      },
      showDropdown,
      toggleDropdown,
    };
  },
});
</script>

<style>
/* Add dark theme styles here */
:root {
  --text-color-dark: #c0caf5; /* or any color you prefer */
  --text-hover-bg-dark: #2c2e33; /* or any color you prefer */
  --dropdown-bg-dark: #092635; /* already set in your template */
}

/* Add light theme styles here */
:root {
  --text-color-light: #4b5563; /* or any color you prefer */
  --text-hover-bg-light: #0559ff; /* or any color you prefer */
  --dropdown-bg-light: #4e1818; /* already set in your template */
}
</style>
