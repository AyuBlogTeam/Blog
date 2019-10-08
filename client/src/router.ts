import Vue from "vue";
import Router from "vue-router";
const Home = () => import("@/views/index.vue");
const ArticleDetails = () => import("@/views/article.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/article/:id",
      name: "article",
      component: ArticleDetails
    }
  ]
});
