<template>
  <div
    class="max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out py-6 relative"
  >
    <img
      class="w-full h-32 sm:h-48 object-cover object-center"
      :src="image"
      alt="Feature Image"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-base card font-semibold">
        {{ description }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <router-link
        :to="to"
        class="inline-block bg-[#5c8374] hover:bg-[#347a78] text-white py-2 px-4 rounded-full text-lg font-semibold transition transform hover:scale-110"
      >
        Learn More
      </router-link>
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

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  components: {
    RouterLink,
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    description: {
      type: String as PropType<string>,
      required: true,
    },
    to: {
      type: String as PropType<string>,
      required: true,
    },
    image: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
