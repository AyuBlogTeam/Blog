import axios from 'axios'
import {
  message
} from 'antd';

const $http = axios.create({})
var count = 0
export const get = (url, params) => {
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
        if (count === 1) {
          message.error("登录过期，请重新登录")
          setTimeout(()=>{
            window.router.push('/manage/login');
            count = 0
          },3000)
        }
      } else {
        reject(res.data.message)
      }
    }).catch((error) => {
      count++
      if (count === 1) {
        message.error("请求失败，请联系管理员")
      }
      reject(error)
    })
  })
}

export const post = (url, params) => {
  params = params || {};
  return new Promise((resolve, reject) => {
    $http.post(url, params).then(res => {
      if (res.data.code === "200") {
        resolve(res.data.data);
      } else if (res.data.code === "401") {
        count++
        if (count === 1) {
          message.error("登录过期，请重新登录")
          setTimeout(()=>{
            window.router.push('/manage/login');
            count = 0
          },3000)
        }
      } else {
        count++
        if (count === 1) {
          message.error("请求失败，请联系管理员")
        }
        reject(res.data.message);
      }
    }).catch((error) => {
      reject(error)
    })
  })
}