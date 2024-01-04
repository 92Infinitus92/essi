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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Use the ImageCard component and pass the image object with imageUrl -->
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
          return {
            identifier: imageData.identifier,
            caption: imageData.caption,
            date: imageData.date,
            imageUrl: imageUrl, // Now this should have the correct URL
          };
        });
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

    const epicImageUrl = (imageData: {
      date: string;
      image: string;
    }): string => {
      const date = new Date(imageData.date);
      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${date.getFullYear()}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/png/${
        imageData.image // Use the 'image' field from the API response
      }.png?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`;

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
    };
  },
};
</script>
