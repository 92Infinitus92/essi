<template>
  <div
    class="rounded overflow-hidden shadow-lg transition-shadow duration-300 relative bg-white bg-opacity-10 hover:bg-opacity-20 border border-gray-600 hover:border-gray-500"
  >
    <img :src="image.imageUrl" alt="EPIC Image" class="w-full" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ image.caption }}</div>
      <p class="text-gray-700 text-base">{{ formatDate(image.date) }}</p>
    </div>
    <button
      @click="toggleFavorite"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      class="favorite-icon absolute top-2 right-2 transition transform hover:scale-125"
    >
      <!-- Change to 'fa-solid' and fill red only when isFavorite or isHovering is true -->
      <i
        :class="[
          'fa-heart',
          isFavorite || isHovering
            ? 'fa-solid text-red-500'
            : 'fa-regular text-gray-400',
        ]"
      ></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

interface EpicImageData {
  identifier: string;
  caption: string;
  date: string;
  imageUrl: string;
}

interface FavoriteItem {
  hdurl: string;
  title: string;
  explanation: string;
}

export default defineComponent({
  name: "ImageCard",
  props: {
    image: {
      type: Object as PropType<EpicImageData>,
      required: true,
    },
  },
  setup(props) {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const favorites = ref<FavoriteItem[]>(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
    const isHovering = ref(false);

    // Adjusted to check based on image URL
    const isFavorite = computed(() =>
      favorites.value.some((fav) => fav.hdurl === props.image.imageUrl)
    );

    const toggleFavorite = () => {
      if (!isAuthenticated.value) {
        loginWithRedirect();
      } else {
        const existingIndex = favorites.value.findIndex(
          (fav) => fav.hdurl === props.image.imageUrl
        );
        if (existingIndex === -1) {
          // Add to favorites
          favorites.value.push({
            hdurl: props.image.imageUrl,
            title: props.image.caption,
            explanation: `This image was taken by NASA's EPIC camera on ${formatDate(
              props.image.date
            )}.`,
          });
        } else {
          // Remove from favorites
          favorites.value.splice(existingIndex, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites.value));
      }
    };

    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      toggleFavorite,
      isFavorite,
      formatDate,
      isHovering,
    };
  },
});
</script>
