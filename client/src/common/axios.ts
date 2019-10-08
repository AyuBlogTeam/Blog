import axios from 'axios'
// import iview from 'iview'
/*import {mapMutations,mapGetters} from 'vuex';
import store from "@/store/index"*/

/*let baseURL;
if(process.env.NODE_ENV=='development'){
  baseURL = 'http://localhost:8081/key'
}else{
  baseURL = ''
}*/
const $http = axios.create({
  // baseURL,
})
// $http.defaults.withCredentials=true
// $http.defaults.headers.common['Authorization'] = store.state.token ? store.state.token : sessionStorage.token;

/*$http.interceptors.request.use(
  config=>{
    axios.post("http://localhost:8081/key/getToken.php").then((res)=>{
      store.state.token = res.data.data.token
    })
    console.log(store.state.token)
    config.headers = {
      'Authorization': store.state.token ? store.state.token : sessionStorage.token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);*/
var count = 0
export const get = (url:string, params:object) => {
  params = params || {};
  return new Promise((resolve, reject) => {
    // axios 自带 get 和 post 方法
    $http.get(url, {
      params,
    }).then(res => {
      if (res.data.code === "200") {
        resolve(res.data.data);
      } else if (res.data.code === "401") {
        count++
        if (count == 1) {
        //   iview.Message.error({
        //     content: "登录过期，请重新登录",
        //     duration: 3
        //   })
        //   setTimeout(() => {
        //     location.href = '/'
        //     count = 0
        //   }, 3000)
        }
      } else {
        reject(res.data.message)
      }
    }).catch((error) => {
      count++
      if (count == 1) {
        // iview.Message.error({
        //   content: "请求失败，请联系管理员",
        //   duration: 3
        // })
        // setTimeout(() => {
        //   count = 0
        // }, 3000)
      }
      reject(error)
    })
  })
}

export const post = (url:string, params:object) => {
  params = params || {};
  return new Promise((resolve, reject) => {
    $http.post(url, params).then(res => {
      if (res.data.code === "200") {
        resolve(res.data.data);
      } else if (res.data.code === "401") {
        count++
        if (count == 1) {
        //   iview.Message.error({
        //     content: "登录过期，请重新登录",
        //     duration: 3
        //   })
        //   setTimeout(() => {
        //     location.href = '/'
        //     count = 0
        //   }, 3000)
        }
      } else {
        count++
        if (count == 1) {
        //   iview.Message.error({
        //     content: "请求失败，请联系管理员",
        //     duration: 3
        //   })
        //   setTimeout(() => {
        //     count = 0
        //   }, 3000)
        }
        reject(res.data.message);
      }
    }).catch((error) => {
      reject(error)
    })
  })
}