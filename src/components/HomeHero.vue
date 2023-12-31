<template>
  <div
    class="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white font-orbitron"
  >
    <img
      src="https://i.ibb.co/LpXmxdg/background-ver5.webp"
      alt="Earth from space"
      class="absolute inset-0 w-full h-full object-cover object-bottom opacity-75"
    />
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Hero Content -->
    <div class="z-10 p-6 max-w-lg mx-auto space-y-6 text-center essi_logo">
      <h1 class="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
        Earth and Space Satellite Images
      </h1>
      <p class="text-xl lg:text-2xl">
        Explore the vastness of space and the intricacies of our planet with
        high-resolution imagery.
      </p>
      <router-link
        to="/explore"
        class="inline-block bg-[#5c8374] hover:bg-[#347a78] text-white essi-logo py-2 px-6 rounded-full text-lg font-semibold transition transform hover:scale-110 shadow-lg"
      >
        Start Your Journey
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeHeroSection",
};
</script>
