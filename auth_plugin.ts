import { createAuth0 } from '@auth0/auth0-vue';

export const authPlugin = createAuth0({
  domain: "dev-fmd8mdy3hwmbaiim.eu.auth0.com",
  clientId: "4VeOUEwn0XsnNZqz9SYukcCFZhiTKjAV",
authorizationParams: {
  redirect_uri: window.location.origin + "/callback"
}
});
