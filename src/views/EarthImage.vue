<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4">Earth Image</h1>
    <div v-if="loading" class="loader"></div>
    <div v-if="earthImage && !loading">
      <img
        :src="earthImage.url"
        alt="Earth Image"
        class="max-w-lg rounded-lg shadow-xl"
      />
      <div class="flex justify-center mt-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="zoomIn"
        >
          Zoom Out
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          @click="zoomOut"
        >
          Zoom In
        </button>
      </div>
    </div>
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
    const dim = ref(0.1);
    const errorMessage = ref("");
    const lat = ref<number | null>(null); // Latitude
    const lon = ref<number | null>(null); // Longitude

    const fetchLatestAvailableDate = async (
      lat: number,
      lon: number
    ): Promise<string | null> => {
      try {
        const today = new Date();
        let year = today.getFullYear() - 3; // Change to 3 years prior
        let month = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");
        let queryDate = `${year}-${month}-${day}`;

        console.log(`Attempting to fetch data for date: ${queryDate}`);

        const assetsUrl = `https://api.nasa.gov/planetary/earth/assets`;

        const fetchDataForDate = async (date: string) => {
          const url = `${assetsUrl}?lon=${lon}&lat=${lat}&dim=0.025&date=${date}&api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`; // Use dynamic date
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            return data.date ? data.date.split("T")[0] : null;
          }
          return null;
        };

        let availableDate = await fetchDataForDate(queryDate);

        if (!availableDate) {
          console.log(
            "No data for computed date, trying with hardcoded date: 2021-01-31"
          );
          availableDate = await fetchDataForDate("2021-01-31");
        }

        return availableDate;
      } catch (error) {
        console.error("Error fetching date:", error);
        return null;
      }
    };

    const fetchImageData = async () => {
      if (lat.value !== null && lon.value !== null) {
        const imageryUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon.value}&lat=${lat.value}&dim=${dim.value}&date=2021-01-31&api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`;
        try {
          loading.value = true;
          const response = await fetch(imageryUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          earthImage.value = { url: URL.createObjectURL(blob) };
          loading.value = false;
        } catch (error) {
          console.error("Error fetching image data: ", error);
          errorMessage.value = "Unable to fetch image data.";
          loading.value = false;
        }
      }
    };

    const zoomIn = () => {
      dim.value = Math.min(dim.value + 0.1, 0.1); // Increase dim
      fetchImageData();
    };

    const zoomOut = () => {
      dim.value = Math.max(dim.value - 0.1, 0.025); // Decrease dim
      fetchImageData();
    };

    onMounted(() => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          lat.value = position.coords.latitude;
          lon.value = position.coords.longitude;
          // Fetch image data with initial lat, lon, and dim
          fetchImageData();
        },
        (error) => {
          console.error(error);
          errorMessage.value = "Error fetching client's location.";
          loading.value = false;
        },
        { enableHighAccuracy: true }
      );
    });

    return { earthImage, loading, errorMessage, zoomIn, zoomOut };
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
