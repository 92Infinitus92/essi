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
    const errorMessage = ref("");

    const fetchAvailableDates = async (lat: number, lon: number) => {
      // Round the coordinates to fewer decimal places
      const roundedLat = parseFloat(lat.toFixed(1));
      const roundedLon = parseFloat(lon.toFixed(1));

      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/earth/assets?lon=${roundedLon}&lat=${roundedLat}&api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.results.map((asset: { date: string }) => asset.date);
      } catch (error) {
        console.error("Network error when fetching available dates: ", error);
        errorMessage.value = "Error fetching available dates.";
        return [];
      }
    };

    const fetchImageData = async (lat: number, lon: number) => {
      try {
        const availableDates = await fetchAvailableDates(lat, lon);
        if (availableDates.length === 0) {
          errorMessage.value =
            "No available imagery for this location and date.";
          return;
        }

        const mostRecentDate = availableDates[0];
        // Again, construct the URL using string concatenation
        const imageryUrl =
          "https://api.nasa.gov/planetary/earth/imagery?lon=" +
          lon +
          "&lat=" +
          lat +
          "&dim=0.025&date=" +
          mostRecentDate +
          "&api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc";

        console.log("fetchImageData URL:", imageryUrl); // Log the URL for debugging
        const imageResponse = await fetch(imageryUrl);
        if (!imageResponse.ok)
          throw new Error("Failed to fetch image: " + imageResponse.status);

        const blob = await imageResponse.blob();
        earthImage.value = { url: URL.createObjectURL(blob) };
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching image data: ", error.message);
          errorMessage.value = error.message;
        } else {
          console.error("An unknown error occurred");
          errorMessage.value = "An unknown error occurred.";
        }
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loading.value = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetchImageData(lat, lon);
        },
        (error) => {
          console.error(error);
          errorMessage.value = "Error fetching client's location.";
          loading.value = false;
        },
        { enableHighAccuracy: true }
      );
    });

    return { earthImage, loading, errorMessage };
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
