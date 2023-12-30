import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { createAuth0 } from "@auth0/auth0-vue";

const app = createApp(App);

app.use(router);

app.use(
  createAuth0({
    domain: "dev-fmd8mdy3hwmbaiim.eu.auth0.com",
    clientId: "4VeOUEwn0XsnNZqz9SYukcCFZhiTKjAV",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);

app.mount("#app");
