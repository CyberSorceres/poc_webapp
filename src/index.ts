///<reference path="./vue-shims.d.ts"/>

import { createApp } from "vue";
import "../style.css";
import Register from "./Register.vue";
import Login from "./Login.vue";
import { CognitoAuthenticator } from "./cognito";

createApp(Login, {
  authenticator: new CognitoAuthenticator(),
}).mount("#vue");
