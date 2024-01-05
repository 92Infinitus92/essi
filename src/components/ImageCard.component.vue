<template>
  <div
    class="rounded relative overflow-hidden shadow-lg transition-shadow duration-300 bg-white bg-opacity-10 hover:bg-opacity-20 border border-gray-600 hover:border-gray-500"
  >
    <img :src="image.imageUrl" alt="EPIC Image" class="w-full" />
    <div class="px-6 py-4 relative">
      <div class="font-bold text-xl mb-2">{{ image.caption }}</div>
      <p class="text-base card">{{ formatDate(image.date) }}</p>
      <div
        class="absolute inset-x-0 -top-72 -left-20 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          class="aspect-[1318/752] w-[125rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style="
            clip-path: polygon(
              73.6% 51.7%,
              91.7% 11.8%,
              100% 46.4%,
              97.4% 82.2%,
              92.5% 84.9%,
              75.7% 64%,
              55.3% 47.5%,
              46.5% 49.4%,
              45% 62.9%,
              50.3% 87.2%,
              21.3% 64.1%,
              0.1% 100%,
              5.4% 51.1%,
              21.4% 63.9%,
              58.9% 0.2%,
              73.6% 51.7%
            );
          "
        />
      </div>
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
