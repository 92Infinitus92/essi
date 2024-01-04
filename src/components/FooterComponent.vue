<template>
  <footer class="bg-black text-gray-300 p-10">
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
    >
      <!-- About Section -->
      <div>
        <h5 class="text-xl font-semibold mb-3">About ESSI</h5>
        <p class="text-gray-400 text-sm">
          Leveraging NASA's API, ESSI brings the wonders of Earth and space
          closer to you. Explore with us.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h5 class="text-xl font-semibold mb-3">Quick Links</h5>
        <ul>
          <li class="mb-2">
            <router-link to="/" class="hover:text-white">Home</router-link>
          </li>
          <li class="mb-2">
            <router-link to="/apod" class="hover:text-white">APOD</router-link>
          </li>
          <li class="mb-2">
            <router-link to="/earth-image" class="hover:text-white"
              >Earth Image</router-link
            >
          </li>
          <li class="mb-2">
            <router-link to="/epic-image" class="hover:text-white"
              >EPIC Image</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Social Media -->
      <div>
        <h5 class="text-xl font-semibold mb-3">Follow Us</h5>
        <div class="flex space-x-4">
          <!-- Replace with actual links and icons -->
          <a href="#" class="hover:text-white">FB</a>
          <a href="#" class="hover:text-white">TW</a>
          <a href="#" class="hover:text-white">IG</a>
        </div>
      </div>
    </div>

    <div class="text-center text-gray-400 mt-8 text-sm">
      © 2024 ESSI. All rights reserved.
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>
