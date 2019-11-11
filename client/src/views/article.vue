<template lang="pug">
  div.main
    div.w70.content
      ArticleList(
        @toArticleDetail="toArticleDetail")
    div.infoCard
      IndexUserInfo(@toArticleDetail="toArticleDetail",:currentComponent="'article'")
    div.clear
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
  private toArticleDetail(id: string) {
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
.main {
  display: flex;
}
</style>