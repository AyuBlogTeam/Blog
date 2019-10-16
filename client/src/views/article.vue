<template>
  <main class="main">
    <div class="w70">
      <ArticleList
        @showLoading="showLoading"
        @toArticleDetail="toArticleDetail"
      />
    </div>
    <div class="infoCard">
      <IndexUserInfo @toArticleDetail="toArticleDetail" />
    </div>
    <div class="clear"></div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleList from "@/components/ArticleList.vue";
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

  private showLoading(boo) {
    this.$emit("showLoading", boo);
  }
}
</script>

<style lang="stylus" scoped>
.main {
  display: flex;
}
</style>