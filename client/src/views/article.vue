<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexList from "@/components/Index/IndexList.vue";
@Component({
  components: {
    IndexList
  }
})
export default class HelloWorld extends Vue {
  private content:string = '<p>123</p>'

  mounted() {
    this.getArtical(this.$route.params.queryId)
  }

  private getArtical(id:string) {
    this.$http.get("http://localhost:8081/articals/getOneArtical.php",{
      articalid:id
    }).then((res)=>{
      this.content = res.content
    })
  }
}
</script>