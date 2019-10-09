<template>
  <div
    v-html="content"
    class="content"
  ></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HelloWorld extends Vue {
  private content: string = "";

  mounted() {
    document.documentElement.scrollTop = 0;
    this.getArtical(this.$route.params.queryId);
  }

  private getArtical(id: string) {
    this.$http
      .get("http://localhost:8081/articals/getOneArtical.php", {
        articalid: id
      })
      .then((res: any) => {
        this.content = res.content;
      });
  }
}
</script>
<style lang="stylus" scoped>
.content {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
