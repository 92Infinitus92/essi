<template>
  <div class="text-center">
    <HomeHeroSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeHeroSection from "@/components/HomeHero.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HomeHeroSection,
  },
});
</script>
