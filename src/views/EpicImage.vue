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

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>

    <!-- Images Grid -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ImageCard
        v-for="image in epicImages"
        :key="image.identifier"
        :image="image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from "vue";
import ImageCard from "@/components/ImageCard.component.vue";

interface EpicImageData {
  identifier: string;
  caption: string;
  date: string;
  imageUrl: string;
}

export default {
  name: "EpicImage",
  components: { ImageCard },
  setup() {
    const startDate: Ref<string> = ref("");
    const endDate: Ref<string> = ref("");
    const epicImages: Ref<EpicImageData[]> = ref([]);
    const availableDates: Ref<string[]> = ref([]);

    const loading = ref(false);

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
        const latestFourDates = availableDates.value.slice(0, 6);
        await fetchImagesByDates(latestFourDates);
      }
    });

    const fetchImagesByDates = async (dates: string[]) => {
      loading.value = true;
      const imageFetchPromises = dates.map(async (date) => {
        const res = await fetch(
          `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch images for date ${date}`);
        }
        const images = await res.json();
        console.log(images); // Log the response to inspect the structure
        return images[0]; // Taking the first image for the date
      });

      try {
        const imagesData = await Promise.all(imageFetchPromises);
        epicImages.value = imagesData.map((imageData) => {
          // Make sure to extract the correct field from imageData
          const imageUrl = epicImageUrl({
            date: imageData.date,
            image: imageData.image, // Assuming 'image' is the correct field
          });
          loading.value = false;
          return {
            identifier: imageData.identifier,
            caption: imageData.caption,
            date: imageData.date,
            imageUrl: imageUrl, // Now this should have the correct URL
          };
        });
      } catch (error) {
        console.error("Error fetching images by dates:", error);
        loading.value = false;
      }
    };

    const fetchImages = async () => {
      if (startDate.value && endDate.value) {
        loading.value = true;
        epicImages.value = []; // Clear previous images before fetching new ones
        const filteredDates = availableDates.value.filter(
          (date) => date >= startDate.value && date <= endDate.value
        );

        const imageFetchPromises = filteredDates.map((date) =>
          fetch(
            `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=YOUR_API_KEY`
          )
        );

        try {
          const imagesResponses = await Promise.all(imageFetchPromises);
          const imagesData = await Promise.all(
            imagesResponses.map((res) => res.json())
          );

          epicImages.value = imagesData.flat().map((imageData) => ({
            identifier: imageData.identifier,
            caption: imageData.caption,
            date: imageData.date,
            imageUrl: epicImageUrl(imageData), // Ensure this function is defined and works correctly
          }));
        } catch (error) {
          console.error("Error fetching images:", error);
        }

        loading.value = false;
      }
    };

    const epicImageUrl = (imageData: {
      date: string;
      image: string;
    }): string => {
      // Splitting the date string to separate the date and time
      const dateTimeParts = imageData.date.split(" ");
      if (dateTimeParts.length < 2) {
        console.error("Invalid date-time format:", imageData.date);
        return ""; // Return an empty string or a placeholder image URL in case of format issues
      }

      // Extracting year, month, and day from the date part
      const dateParts = dateTimeParts[0].split("-");
      if (dateParts.length !== 3) {
        console.error("Invalid date format:", dateTimeParts[0]);
        return ""; // Return an empty string or a placeholder image URL in case of format issues
      }

      const [year, month, day] = dateParts;

      // Constructing the image URL
      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${imageData.image}.png?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`;
      return imageUrl;
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
      loading,
    };
  },
};
</script>
