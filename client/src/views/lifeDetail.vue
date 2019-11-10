<template lang="pug">
  main.main
    div.w70(style="background:#fff;")
      div.content(v-html="content")
    div.infoCard
      IndexUserInfo(@toArticleDetail="toLifeDetail",:currentComponent="'life'")
    div.clear
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import IndexUserInfo from "@/components/UserInfo.vue";
@Component({
  components: {
    IndexUserInfo
  }
})
export default class lifeDetails extends Vue {
  private content: string = "";

  mounted() {
    document.documentElement.scrollTop = 0;
    this.getLife(this.$route.params.id);
  }

  private toLifeDetail(id: string) {
    if (this.$route.params.id == id) {
      return;
    }
    this.$router.push({
      name: `lifeDetails`,
      params: {
        id: id
      }
    });
  }

  private getLife(id: string) {
    this.$emit("showLoading", true);
    this.$http
      .get(IPserver + "lifes/getOneLife.php", {
        articalid: id
      })
      .then((res: any) => {
        if (res) {
          this.content = res.content;
        }
      });
  }

  @Watch("$route")
  routeChange() {
    this.getLife(this.$route.params.id);
    document.documentElement.scrollTop = 0;
  }
}
</script>
<style lang="stylus" scoped>
.content >>> blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

.content {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
.content >>> pre{
  white-space: inherit;
}
.main {
  display: flex;
}
</style>
