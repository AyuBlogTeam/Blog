<template>
  <IndexList />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexList from "@/components/Index/IndexList.vue";
@Component({
  components: {
    IndexList
  }
})
export default class HelloWorld extends Vue {}
</script>