<template>
  <div>
    <div
      class="oneArticle"
      v-for="item in articleList"
      :key="item.articalid"
    >
      <h2
        class="title fl"
        @click="toArticleDetail(item.title,item.articalid)"
      >{{item.title}}</h2>
      <div class="clear"></div>
      <div class="richContent">
        <div class="pic">
          <img :src="item.coverimg">
        </div>
        <div class="info">
          <p>{{item.summary}}</p>
        </div>
      </div>
      <div class="footArticle">
        <p class="fl grey">{{item.kind}}</p>
        <p class="fr grey">{{item.time}}</p>
        <p class="clear"></p>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class IndexList extends Vue {
  private articleList:object[] = []

  mounted(){
    this.getArtical()
  }

  private toArticleDetail(name: string,id:string) {
    this.$emit("toArticleDetail",name,id)
  }

  private getArtical(){
    this.$http.get("http://localhost:8081/articals/getArtical.php").then((res:object[])=>{
      if(res){
        this.articleList = res
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.oneArticle {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .title {
    font-size: 18px;
    margin-bottom: 15px;
    cursor: pointer;
    color: #1a1a1a;
  }

  .richContent {
    display: flex;
    flex-direction: row;
    align-items: stretch;

    .pic {
      border-radius: 5px;
      position: relative;
      text-align: center;
      width: 190px;
      height: 105px;
      margin-right: 20px;
      overflow: hidden;

      img {
        height: 100%;
        object-fit: contain;
      }
    }

    .info {
      flex: 1;
      line-height: 1.5;

      p {
        word-break: break-word;
        line-height: 1.6;
      }
    }
  }

  .footArticle {
    margin-top: 20px;
  }
}
</style>