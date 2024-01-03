<template>
  <div
    class="max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
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
