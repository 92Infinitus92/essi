<template>
  <div>
    <h1>EPIC Image</h1>
    <img v-if="epicImage" :src="epicImageUrl(epicImage)" alt="EPIC Image" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

export default {
  name: "EpicImage",
  setup() {
    const epicImage = ref(null);

    onMounted(async () => {
      const res = await fetch(
        `https://api.nasa.gov/EPIC/api/natural?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`
      );
      const images = await res.json();
      epicImage.value = images[0]; // assuming you want the most recent image
    });

    const epicImageUrl = (image: {
      date: string | number | Date;
      image: any;
    }) => {
      const date = new Date(image.date);
      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}/png/${
        image.image
      }.png?api_key=4WuRz5BlS8438yctIwGFegJrYcXxOcExxfX0Seuc`;
      return imageUrl;
    };

    return {
      epicImage,
      epicImageUrl,
    };
  },
};
</script>
