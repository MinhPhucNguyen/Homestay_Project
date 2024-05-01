import axios from "axios";
import store from "./store";

store.subscribe((mutations) => {
  switch (mutations.type) {
    case "auth/SET_TOKEN":
      if (mutations.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutations.payload}`;
        localStorage.setItem("token", mutations.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
      }
      break;
  }
});
