<template>
  <div class="py-24 sm:py-32">
    <div class="relative isolate">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20"
          :class="themeClass"
        >
          <img
            class="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
            src="https://i.ibb.co/LpXmxdg/background-ver5.webp"
            alt=""
          />
          <div class="w-full flex-auto">
            <h1 class="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
              Earth and Space Satellite Images
            </h1>
            <p class="text-xl lg:text-2xl">
              Explore the vastness of space and the intricacies of our planet
              with high-resolution imagery.
            </p>
            <router-link
              to="/explore"
              class="inline-block bg-[#5c8374] hover:bg-[#347a78] text-white py-2 px-6 rounded-full text-lg font-semibold transition transform hover:scale-110 shadow-lg mt-2"
            >
              Start Your Journey
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          class="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style="
            clip-path: polygon(
              73.6% 51.7%,
              91.7% 11.8%,
              100% 46.4%,
              97.4% 82.2%,
              92.5% 84.9%,
              75.7% 64%,
              55.3% 47.5%,
              46.5% 49.4%,
              45% 62.9%,
              50.3% 87.2%,
              21.3% 64.1%,
              0.1% 100%,
              5.4% 51.1%,
              21.4% 63.9%,
              58.9% 0.2%,
              73.6% 51.7%
            );
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "HomeHeroSection",
  setup() {
    const isDarkTheme = ref(false);

    const themeClass = computed(() => {
      return isDarkTheme.value
        ? "ring-1 ring-white/10 bg-white/5 "
        : "ring-1 ring-black/10 bg-black/5";
    });

    return {
      themeClass,
    };
  },
});
</script>
