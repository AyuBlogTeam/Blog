import Vue from "vue";
import Router from "vue-router";
const Article = () => import("@/views/article.vue");
const ArticleDetails = () => import("@/views/articleDetail.vue");
const Life = () => import("@/views/life.vue");
const LifeDetails = () => import("@/views/lifeDetail.vue");
const HomePage = () => import("@/views/index.vue");
const Search = () => import("@/views/search.vue");
const Word = () => import("@/views/word.vue");

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
    },
    {
      path: "/life",
      name: "life",
      component: Life
    },
    {
      path: "/life/:id",
      name: "lifeDetails",
      component: LifeDetails
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/word",
      name: "word",
      component: Word
    }
  ]
});
