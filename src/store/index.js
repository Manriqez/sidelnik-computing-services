import { createStore } from "vuex";
import product from "./product";
import category from "./category";
import userData from "./userData";
import chat from "./chat";

export default createStore({
  modules: {
    product,
    category,
    userData,
    chat
  }
});
