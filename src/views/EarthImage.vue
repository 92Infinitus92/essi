<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4">Earth Image</h1>
    <div v-if="loading" class="loader"></div>
    <img
      v-if="earthImage && !loading"
      :src="earthImage.url"
      alt="Earth Image"
      class="max-w-lg rounded-lg shadow-xl"
    />
    <p v-if="!earthImage && !loading" class="text-lg mt-4">
      No image available for your location.
    </p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

interface EarthImageData {
  url: string;
}

export default {
  name: "EarthImage",
  setup() {
    const earthImage = ref<EarthImageData | null>(null);
    const loading = ref(false);
    const apiKey = "4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc";

    onMounted(async () => {
      loading.value = true;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const availableDates = await fetchAvailableDates(lat, lon, apiKey);

            if (availableDates.length > 0) {
              const mostRecentDate = availableDates[0];
              const imageryUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.025&date=${mostRecentDate}&api_key=${apiKey}`;
              const imageResponse = await fetch(imageryUrl);
              if (imageResponse.ok) {
                const imageJson = await imageResponse.json();
                earthImage.value = { url: imageJson.url };
              } else {
                console.error("Failed to fetch image: ", imageResponse.status);
              }
            } else {
              console.error("No available dates for imagery at this location");
            }
          } catch (error) {
            console.error("Error fetching image data: ", error);
          }

          loading.value = false;
        },
        (err) => {
          console.error(err);
          loading.value = false;
        },
        { enableHighAccuracy: true }
      );
    });

    const fetchAvailableDates = async (
      lat: number,
      lon: number,
      apiKey: string
    ) => {
      const assetsUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&api_key=${apiKey}`;
      try {
        const response = await fetch(assetsUrl);
        if (response.ok) {
          const data = await response.json();
          return data.results.map((asset: { date: any }) => asset.date);
        } else {
          console.error("Failed to fetch available dates: ", response.status);
          return [];
        }
      } catch (error) {
        console.error("Network error when fetching available dates: ", error);
        return [];
      }
    };

    return { earthImage, loading };
  },
};
</script>

<style>
.loader {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
