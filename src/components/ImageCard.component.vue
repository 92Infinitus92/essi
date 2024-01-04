<template>
  <div class="rounded overflow-hidden shadow-lg">
    <img :src="image.imageUrl" alt="EPIC Image" class="w-full" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ image.caption }}</div>
      <p class="text-gray-700 text-base">{{ formatDate(image.date) }}</p>
    </div>
    <button @click="toggleFavorite" class="favorite-icon">
      <i :class="['fa-heart', isFavorite ? 'fas' : 'far']"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

interface EpicImageData {
  imageUrl: string;
  caption: string;
  date: string;
  identifier: string;
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
    const favorites = ref<string[]>(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );

    const isFavorite = computed(() =>
      favorites.value.includes(props.image.identifier)
    );

    const toggleFavorite = () => {
      if (!isAuthenticated.value) {
        loginWithRedirect();
      } else {
        const index = favorites.value.indexOf(props.image.identifier);
        if (index === -1) {
          favorites.value.push(props.image.identifier);
        } else {
          favorites.value.splice(index, 1);
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
    };
  },
});
</script>
