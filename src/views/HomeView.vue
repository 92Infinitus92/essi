<template>
  <div class="text-center">
    <HomeHeroSection />
    <ESSIComponent />
    <FeaturesComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeHeroSection from "@/components/HomeHero.vue";
import ESSIComponent from "@/components/ESSIComponent.vue";
import FeaturesComponent from "@/components/FeaturesComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HomeHeroSection,
    ESSIComponent,
    FeaturesComponent,
  },
});
</script>
