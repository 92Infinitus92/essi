<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4 mt-8">Astronomy Picture of the Day</h1>
    <div
      v-if="apod"
      class="mt-8 mb-8 p-6 max-w-6xl w-full bg-white/10 backdrop-blur-md shadow-lg rounded-xl text-center"
    >
      <h2 class="text-3xl font-semibold">{{ apod.title }}</h2>
      <p class="mt-4 text-lg">{{ apod.explanation }}</p>
    </div>
    <div class="w-3/4 h-screen flex justify-center items-center">
      <!-- If it's a video -->
      <iframe
        v-if="apod && apod.media_type === 'video'"
        :src="apod.url + '&autoplay=1&mute=1'"
        :title="apod.title"
        class="w-full h-full"
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      ></iframe>
      <!-- If it's an image -->
      <img
        v-else-if="apod && apod.media_type === 'image'"
        :src="apod.url"
        :alt="apod.title"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

interface ApodData {
  url: string;
  title: string;
  explanation: string;
  media_type: string;
}

export default {
  name: "AstronomyPictureOfTheDay",
  setup() {
    const apod = ref<ApodData | null>(null);
    const cacheKey = "apodData";

    onMounted(async () => {
      // Check if data is already cached
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        apod.value = JSON.parse(cachedData);
      } else {
        try {
          const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
          );
          if (res.ok) {
            const data = await res.json();
            if (
              data.media_type === "video" &&
              data.url.includes("youtube.com")
            ) {
              data.url += "?autoplay=1&mute=0";
            }
            apod.value = data;
            // Cache the data in local storage
            localStorage.setItem(cacheKey, JSON.stringify(data));
          } else {
            console.error("Failed to fetch APOD data: ", res.status);
          }
        } catch (error) {
          console.error("Network error when fetching APOD data: ", error);
        }
      }
    });

    return {
      apod,
    };
  },
};
</script>
