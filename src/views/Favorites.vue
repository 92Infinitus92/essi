<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4">My Favorites</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(favorite, index) in favorites"
        :key="index"
        class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col"
      >
        <img
          :src="favorite.hdurl"
          alt="Favorite Image"
          class="w-full h-48 object-cover"
        />
        <!-- Text container is now a flex container itself and will grow to take remaining space -->
        <div class="px-6 py-4 flex-grow flex items-center justify-center">
          <!-- Title is centered within text container -->
          <div class="font-bold text-xl text-center">
            {{ favorite.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface FavoriteItem {
  hdurl: string;
  title: string;
  explanation: string;
}

export default {
  name: "FavoritesView",
  data() {
    return {
      favorites: [] as FavoriteItem[],
    };
  },
  created() {
    const favoritesData = localStorage.getItem("favorites");
    if (favoritesData) {
      this.favorites = JSON.parse(favoritesData);
    }
  },
};
</script>
