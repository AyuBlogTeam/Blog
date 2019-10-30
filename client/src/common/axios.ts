import axios from "axios";
import vue from "../main";

const $http = axios.create({});
var count = 0;
export const get = (url: string, params: object) => {
  params = params || {};
  return new Promise((resolve, reject) => {
    // axios 自带 get 和 post 方法
    $http
      .get(url, {
        params
      })
      .then(res => {
        vue.$showLoading(false);
        if (res.data.code === "200") {
          resolve(res.data.data);
        } else if (res.data.code === "401") {
          count++;
          if (count == 1) {
          }
        } else {
          count++;
          if (count == 1) {
            vue.$Message("请求失败，请联系管理员");
            setTimeout(() => {
              count = 0;
            }, 3000);
          }
          reject(res.data.message);
        }
      })
      .catch(error => {
        count++;
        if (count == 1) {
          vue.$Message("请求失败，请联系管理员");
          vue.$showLoading(false);
          setTimeout(() => {
            count = 0;
          }, 3000);
        }
        reject(error);
      });
  });
};

export const post = (url: string, params: object) => {
  params = params || {};
  return new Promise((resolve, reject) => {
    $http
      .post(url, params)
      .then(res => {
        vue.$showLoading(false);
        if (res.data.code === "200") {
          resolve(res.data.data);
        } else if (res.data.code === "401") {
          count++;
          if (count == 1) {
          }
        } else {
          count++;
          if (count == 1) {
            vue.$Message("请求失败，请联系管理员");
            setTimeout(() => {
              count = 0;
            }, 3000);
          }
          reject(res.data.message);
        }
      })
      .catch(error => {
        count++;
        if (count == 1) {
          vue.$Message("请求失败，请联系管理员");
          vue.$showLoading(false);
          setTimeout(() => {
            count = 0;
          }, 3000);
        }
        reject(error);
      });
  });
};
