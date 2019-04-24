import 'babel-polyfill'
// import Vue from "vue/types";
import Vue from "vue"
import axios from 'axios/index'
// import Router from "vue-router/types";
import Router from "vue-router"
import RouterConfig from '@/router/index';
import { baseUrl } from './url.js'
// import { Modal } from 'iview/types';


Vue.use(Router);
const router = new Router(RouterConfig);


axios.defaults.timeout = 60000;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['language'] = 'en_US';
//创建一个axios实例
const instance = axios.create();
axios.interceptors.request.use = instance.interceptors.request.use;


//request拦截器
instance.interceptors.request.use(
  config => {
    let loginToken = window.sessionStorage.getItem('token');
    //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    if (loginToken) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer-' + loginToken;
    }
    return config;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

//respone拦截器
instance.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 2000:
        window.sessionStorage.clear();

        break;
      default:
        return response;
    }
  },
  error => { //默认除了0之外的都是错误的
    // Modal.error({
    //     title: "提示：",
    //     content: "网络连接超时！"
    // });
    console.log(error);
    return Promise.reject(error);
  }
);


/*===============统一的接口管理============*/

export default {
  /*=============start=====by HENRY===========*/
  //example
  // getReportOverview(param) {
  //   return instance.get('/api/v2/cmcc/report/basic-resource/overview', {params: param})
  // },


  /*==============首页end===================*/
}
