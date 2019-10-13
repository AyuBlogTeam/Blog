<template>
  <div
    v-html="content"
    class="content"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class HelloWorld extends Vue {
  private content: string = "";

  mounted() {
    document.documentElement.scrollTop = 0;
    this.getArtical(this.$route.params.id);
  }

  private getArtical(id: string) {
    this.$http
      .get(IPserver + "articals/getOneArtical.php", {
        articalid: id
      })
      .then((res: any) => {
        this.content = res.content;
      });
  }

  @Watch("$route")
  routeChange() {
    this.getArtical(this.$route.params.id);
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
</style>
