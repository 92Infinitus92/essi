import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AstronomyPictureOfTheDay from "../views/AstronomyPictureOfTheDay.vue";
import EarthImage from "../views/EarthImage.vue";
import EpicImage from "../views/EpicImage.vue";
import FavoritesView from "../views/Favorites.vue";

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
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
