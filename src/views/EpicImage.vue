<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center text-4xl font-bold mb-8">EPIC Images</h1>

    <!-- Date Range Selector -->
    <div class="flex justify-center mb-8">
      <select
        v-model="startDate"
        class="form-select mx-2 rounded-full p-4 card-reversed font-semibold"
      >
        <option value="" disabled class="">Select Start Date</option>
        <option v-for="date in availableDates" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
      <select
        v-model="endDate"
        class="form-select mx-2 rounded-full p-4 card-reversed font-semibold"
      >
        <option value="" disabled>Select End Date</option>
        <option v-for="date in availableDates" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
      <button
        @click="fetchImages"
        class="inline-block bg-[#5c8374] hover:bg-[#347a78] text-white essi-logo py-2 px-6 rounded-full text-lg font-semibold transition transform hover:scale-110 shadow-lg"
      >
        Fetch Images
      </button>
    </div>

    <!-- Images Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="image in epicImages"
        :key="image.identifier"
        class="rounded overflow-hidden shadow-lg"
      >
        <img :src="epicImageUrl(image)" alt="EPIC Image" class="w-full" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ image.caption }}</div>
          <p class="text-gray-700 text-base">
            {{ formatDate(image.date) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from "vue";

interface EpicImageData {
  identifier: string;
  caption: string;
  date: string;
  image: string;
}

export default {
  name: "EpicImage",
  setup() {
    const startDate: Ref<string> = ref("");
    const endDate: Ref<string> = ref("");
    const epicImages: Ref<EpicImageData[]> = ref([]);
    const availableDates: Ref<string[]> = ref([]);

    onMounted(async () => {
      // Fetch available dates and sort them from newest to oldest
      const res = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/available?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
      );
      if (res.ok) {
        const dates = await res.json();
        availableDates.value = dates.sort(
          (a: string | number | Date, b: string | number | Date) =>
            new Date(b).getTime() - new Date(a).getTime()
        );
        // Fetch the latest four images
        const latestFourDates = availableDates.value.slice(0, 4);
        await fetchImagesByDates(latestFourDates);
      }
    });

    const fetchImagesByDates = async (dates: string[]) => {
      const imageFetchPromises = dates.map(async (date) => {
        const res = await fetch(
          `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch images for date ${date}`);
        }
        return res.json();
      });

      try {
        const imagesDataArrays = await Promise.all(imageFetchPromises);
        epicImages.value = imagesDataArrays.flat().map((imageData) => ({
          identifier: imageData.identifier,
          caption: imageData.caption,
          date: imageData.date,
          image: `https://api.nasa.gov/EPIC/archive/natural/${imageData.date.replace(
            /-/g,
            "/"
          )}/png/${
            imageData.image
          }.png?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`,
        }));
      } catch (error) {
        console.error("Error fetching images by dates:", error);
      }
    };

    const fetchImages = async () => {
      if (startDate.value && endDate.value) {
        const filteredDates = availableDates.value.filter(
          (date) => date >= startDate.value && date <= endDate.value
        );

        const imagesRes = await Promise.all(
          filteredDates.map((date) =>
            fetch(
              `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
            )
          )
        );

        const imagesData = (await Promise.all(
          imagesRes.map((res) => res.json())
        )) as EpicImageData[][];
        epicImages.value = imagesData.flat();
      }
    };

    const epicImageUrl = (image: EpicImageData): string => {
      const date = new Date(image.date);
      return `https://api.nasa.gov/EPIC/archive/natural/${date.getFullYear()}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/png/${
        image.image
      }.png?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`;
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
      startDate,
      endDate,
      epicImages,
      fetchImages,
      epicImageUrl,
      formatDate,
      availableDates,
    };
  },
};
</script>
