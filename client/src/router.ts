import Vue from "vue";
import Router from "vue-router";
const Article = () => import("@/views/article.vue");
const ArticleDetails = () => import("@/views/articleDetail.vue");
const HomePage = () => import("@/views/index.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "homePage",
      component: HomePage
    },
    {
      path: "/article",
      name: "article",
      component: Article
    },
    {
      path: "/article/:id",
      name: "articleDetails",
      component: ArticleDetails
    }
  ]
});
