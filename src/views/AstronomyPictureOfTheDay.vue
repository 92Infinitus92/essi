<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-4xl font-bold mb-8">Astronomy Picture of the Day</h1>
    <div
      class="flex flex-col sm:flex-row sm:justify-center sm:items-end w-full mb-4"
    >
      <input
        type="date"
        v-model="selectedDate"
        class="form-input mb-4 sm:mb-0 sm:mr-4"
      />
      <button @click="fetchApodData" class="btn-primary">Show Picture</button>
    </div>
    <div v-if="loading" class="loader">Loading...</div>
    <div v-for="data in apods" :key="data.date" class="max-w-3xl w-full mb-8">
      <div
        v-if="data"
        class="bg-white/10 backdrop-blur-md shadow-lg rounded-xl text-center p-6"
      >
        <h2 class="text-3xl font-semibold">{{ data.title }}</h2>
        <p class="text-lg">{{ data.explanation }}</p>
        <img
          v-if="data.media_type === 'image'"
          :src="data.url"
          :alt="data.title"
          class="w-full h-auto mt-4"
        />
        <iframe
          v-else
          :src="data.url"
          title="video"
          class="w-full h-64 mt-4"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <button
          @click="handleSaveToFavorites(data)"
          :class="['btn-favorite', isSaved(data) ? 'saved' : '']"
        >
          {{ isSaved(data) ? "Saved" : "Save to Favorites" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

interface ApodData {
  date: string;
  explanation: string;
  media_type: string;
  title: string;
  url: string;
}

export default {
  name: "AstronomyPictureOfTheDay",
  setup() {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const apods = ref<ApodData[]>([]);
    const selectedDate = ref("");
    const loading = ref(false);
    const favorites = ref<ApodData[]>(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );

    const isSaved = (apod: ApodData) => {
      return favorites.value.some((favorite) => favorite.date === apod.date);
    };

    const handleSaveToFavorites = (apod: ApodData) => {
      if (!isAuthenticated.value) {
        loginWithRedirect();
      } else {
        if (!isSaved(apod)) {
          favorites.value.push(apod);
          localStorage.setItem("favorites", JSON.stringify(favorites.value));
        }
      }
    };

    const fetchApodData = async () => {
      loading.value = true;
      const apiKey = "YOUR_API_KEY"; // Replace with your NASA API key.
      let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
      if (selectedDate.value) {
        url += `&date=${selectedDate.value}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        apods.value = [data]; // Wrap the single object in an array for consistency.
      } catch (error) {
        console.error("There was an error fetching the APOD data", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchApodData);

    return {
      apods,
      selectedDate,
      loading,
      isAuthenticated,
      handleSaveToFavorites,
      isSaved,
      user,
    };
  },
};
</script>
