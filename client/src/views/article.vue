<template>
  <main class="main">
    <div class="w70">
      <ArticleList @toArticleDetail="toArticleDetail" />
    </div>
    <div class="infoCard">
      <IndexUserInfo @toArticleDetail="toArticleDetail" />
    </div>
    <div class="clear"></div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleList from "@/components/articleList.vue";
import IndexUserInfo from "@/components/UserInfo.vue";
@Component({
  components: {
    ArticleList,
    IndexUserInfo
  }
})
export default class Index extends Vue {
  private toArticleDetail(name: string, id: string) {
    if (this.$route.params.id == id) {
      return;
    }
    this.$router.push({
      name: `articleDetails`,
      params: {
        id: id
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.main 
  display flex
</style>