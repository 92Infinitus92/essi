<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <!-- Date Picker Input -->
    <input
      type="date"
      v-model="selectedDate"
      @change="fetchApodData"
      class="mt-8 mb-4 p-2 rounded-lg card-reversed"
    />

    <h1 class="md:text-4xl text-2xl font-bold mb-4 mt-8 text-center mx-6">
      Astronomy Picture of the Day
    </h1>
    <div
      v-if="apod"
      class="mt-8 mb-8 p-6 w-3/4 bg-white/10 backdrop-blur-md shadow-lg rounded-xl text-center"
    >
      <h2 class="text-3xl font-semibold">{{ apod.title }}</h2>
      <p class="mt-4 md:text-lg text-sm leading-relaxed">
        {{ apod.explanation }}
      </p>
      <button
        @click="handleSaveToFavorites(apod)"
        :class="[
          'mt-4 py-2 px-4 rounded-full text-lg font-semibold transition transform shadow-lg',
          isSaved
            ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
            : 'bg-[#5c8374] hover:bg-[#347a78]',
        ]"
        :disabled="isSaved"
      >
        {{ isSaved ? "Saved" : "Save to Favorites" }}
      </button>
    </div>
    <div class="w-3/4 h-screen flex justify-center items-center mb-32">
      <!-- If it's a video -->
      <iframe
        v-if="apod && apod.media_type === 'video'"
        :src="apod.url"
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
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, onMounted, computed } from "vue";

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
    const selectedDate = ref(new Date().toISOString().split("T")[0]);
    const cacheKey = "apodData";

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const favorites = ref<ApodData[]>([]);

    const isSaved = computed(() => {
      return favorites.value.some(
        (favorite) => favorite.url === apod.value?.url
      );
    });

    const fetchApodData = async () => {
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc&date=${selectedDate.value}`;
      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          apod.value = data;
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } else {
          console.error("Failed to fetch APOD data: ", res.status);
        }
      } catch (error) {
        console.error("Network error when fetching APOD data: ", error);
      }
    };

    const handleSaveToFavorites = (apod: ApodData) => {
      if (!isAuthenticated.value) {
        loginWithRedirect();
      } else if (!isSaved.value) {
        favorites.value.push(apod);
        localStorage.setItem("favorites", JSON.stringify(favorites.value));
      }
    };

    onMounted(() => {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        favorites.value = JSON.parse(savedFavorites);
      }

      fetchApodData();
    });

    return {
      apod,
      selectedDate,
      handleSaveToFavorites,
      isAuthenticated,
      isSaved,
      user,
      fetchApodData,
    };
  },
};
</script>
