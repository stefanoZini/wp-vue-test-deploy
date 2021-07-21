import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "./views/Feed";
import categories from "./views/categories"
import FourOFour from "./views/FourOFour";
import Post from "./views/Post";
import bus from "./bus";
import Category from "./views/category"

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    redirect: "/category/2-featured"
  },
  {
    name: "categories",
    path:"/categories",
    component: categories
  },
  {
    name: "posts",
    path: "/posts",
    component: Feed
  },
  {
    name: "post",
    path: "/posts/:slug",
    component: Post
  },
  {
    name: "category",
    path:"/category/:id-:slug",
    component:Category
  },
  {
    name: "page",
    path: "/page/:page",
    component: Feed
  },
  {
    name:"category_page",
    path:"/category/:id-:slug/page/:page",
    component: Category
  },
  {
    name: "four-o-four",
    path: "/404",
    component: FourOFour
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.afterEach(() => {
  //-- Bump the key on App component to force component to update on route change.
  bus.$emit("bumpViewKey");
});

export default router;
