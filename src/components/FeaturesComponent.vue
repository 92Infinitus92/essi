<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        title="APOD"
        description="Discover the cosmos with daily images and stories."
        to="/apod"
      />
      <FeatureCard
        title="Earth Image"
        description="Explore high-resolution images of our home planet."
        to="/earth-image"
      />
      <FeatureCard
        title="EPIC Image"
        description="View stunning images of Earth from the EPIC camera."
        to="/epic-image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import FeatureCard from "@/components/FeatureCard.vue";

export default {
  components: {
    FeatureCard,
  },
};
</script>

<style scoped>
.feature-card {
  background-color: var(--background-color); /* Using defined color variable */
  color: var(--text-color); /* Using defined color variable */
}

.feature-card .cta-button {
  background-color: var(--shape-color); /* Using defined color variable */
}
</style>
