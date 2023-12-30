<template>
  <div class="relative">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img
        src="https://i.ibb.co/LPP3mf7/background-ver2.webp"
        alt="Earth from space"
        class="w-full h-full object-contain opacity-75"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative container mx-auto px-6 py-32 lg:py-40 text-center">
      <h1 class="text-4xl lg:text-6xl font-bold mb-4 text-var(--text-color)">
        Earth and Space Satellite Images
      </h1>
      <p class="text-xl lg:text-2xl mb-8 text-var(--text-color)">
        Explore the vastness of space and the intricacies of our planet with
        high-resolution imagery.
      </p>
      <router-link
        to="/explore"
        class="inline-block bg-blue-500 hover:bg-blue-700 font-bold py-2 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg text-var(--text-color)"
      >
        Start Your Journey
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeHeroSection",
  // Your script here if necessary
};
</script>
