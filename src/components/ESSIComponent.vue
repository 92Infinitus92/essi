<template>
  <div class="max-w-7xl mx-auto w-3/4 py-12 sm:py-4 lg:py-5 relative">
    <div class="text-center">
      <div class="text-3xl leading-9 font-extrabold sm:text-4xl sm:leading-10">
        About <span class="rainbow-text">ESSI</span>
      </div>
      <p
        class="text-lg leading-7 card font-semibold w-1/3 xl:w-1/2 mx-auto mt-10"
      >
        ESSI leverages NASA's API to bring the wonders of Earth and space closer
        to you. Explore our vast universe, from the mysterious depths of black
        holes to the shimmering auroras of distant planets. With ESSI, the
        cosmos is within reach, inviting you to embark on an epic journey across
        the stars. Discover constellations, learn about celestial events, and
        immerse yourself in the beauty of the night sky—all from the comfort of
        your home. Our goal is to ignite your curiosity and inspire a lifelong
        passion for astronomy and space exploration.
      </p>
    </div>
    <div
      class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[1318/752] w-[75rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
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
</template>

<style scoped>
.rainbow-text {
  background: linear-gradient(
    90deg,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgb(42, 5, 116) 70%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: rainbow-animation 15s ease-in-out infinite;
}

@keyframes rainbow-animation {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(-360deg);
  }
}
</style>
