import "bootstrap/dist/css/bootstrap.css";
import App from "./App.vue";
import router from "@/router/index";
import axios from "axios";
import store from "@/store/store";
import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

require("@/store/subscriber");
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  const app = createApp(App);
  app.use(router);
  app.use(store);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.mount("#app");
});
