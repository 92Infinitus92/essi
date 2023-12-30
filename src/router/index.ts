import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AstronomyPictureOfTheDay from "../views/AstronomyPictureOfTheDay.vue";
import EarthImage from "../views/EarthImage.vue";
import EpicImage from "../views/EpicImage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/apod",
    name: "AstronomyPictureOfTheDay",
    component: AstronomyPictureOfTheDay,
  },
  {
    path: "/earth-image",
    name: "EarthImage",
    component: EarthImage,
  },
  {
    path: "/epic-image",
    name: "EpicImage",
    component: EpicImage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
