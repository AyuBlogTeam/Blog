import Vue from 'vue'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $http: any
  }
}