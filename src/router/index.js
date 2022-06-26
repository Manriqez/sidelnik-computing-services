import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue"
import Category from "../views/Category.vue"
import Product from "../views/Product.vue";
import Chat from "../views/Chat.vue"
import Admin from "../views/admin/Admin.vue"
import ProductsManager from "../views/admin/ProductsManager.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth
  },
  {
    path: "/category/:id",
    name: "category",
    component: Category,
    props: true
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "products-manager",
        name: "ProductsManager",
        component: ProductsManager,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
