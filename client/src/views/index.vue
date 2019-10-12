<template>
  <IndexList 
    @toArticleDetail="toArticleDetail"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IndexList from "@/components/Index/IndexList.vue";
@Component({
  components: {
    IndexList
  }
})
export default class HelloWorld extends Vue {
  private toArticleDetail(name: string,id:string) {
    this.$emit("toArticleDetail",name,id)
  }
}
</script>