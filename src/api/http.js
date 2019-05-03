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
axios.defaults.headers.common['token'] = '7d1e52d3cf0142e19b5901eb1ef91372';
//创建一个axios实例
const instance = axios.create();
axios.interceptors.request.use = instance.interceptors.request.use;


//request拦截器
// instance.interceptors.request.use(
//   config => {
//     let loginToken = window.sessionStorage.getItem('token');
//     //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
//     if (loginToken) {
//       // 让每个请求携带自定义token 请根据实际情况自行修改
//       config.headers['Authorization'] = 'Bearer-' + loginToken;
//     }
//     return config;
//   },
//   err => {
//     console.log(err);
//     return Promise.reject(err);
//   }
// );

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
// 门禁系统
getAccessFindTimes(param){
  return instance.get('/api/v2/door/main/total-person', {params: param})
},


// 门禁权限
// 查询权限
getAccessRuleList(param) {
  return instance.get('/api/v2/door/rule/find', {params: param})
},
// 添加权限
accessRuleInsert(param) {
  return instance.get('/api/v2/door/rule/insert', {params: param})
},
// 修改权限
accessRuleModify(param) {
  return instance.get('/api/v2/door/rule/modify', {params: param})
},
// 删除权限
accessRuleDel(param) {
  return instance.get('/api/v2/door/rule/remove', {params: param})
},
// 权限验证
accessRuleDel(param) {
  return instance.get('/api/v2/door/rule/verifier', {params: param})
},
// 查询关联得人员列表
personByDevice(param) {
  return instance.get('/api/v2/door/rule/person-by-device', {params: param})
},
// 设备和规则权限关联查询
deviceByRuleFind(param) {
  return instance.get('/api/v2/device/rule/find', {params: param})
},
// 设备和规则关联删除
deviceByRuleDel(param) {
  return instance.get('/api/v2/device/rule/remove', {params: param})
},

//人员类型查询
getPersonType(param){
  return instance.get('/api/v2/personnel/type/find', {params: param})
},
//字段列表查询
getPersonelList(param){
  return instance.get('/api/v2/personnel/field/find', {params: param})
},
//添加字段
insertPersonel(param){
  return instance.post('/api/v2/personnel/field/insert', param)
},
//删除字段
deletePersonel(param){
  return instance.post('/api/v2/personnel/field/remove', param)
},
//添加类型
personTypeInsert(param){
  return instance.post('/api/v2/personnel/type/insert', param)
},
//修改类型
personTypeModify(param){
  return instance.post('/api/v2/personnel/type/modify', param)
},
//删除类型
personTypeDelete(param){
  return instance.post('/api/v2/personnel/type/remove', param)
},
//人员列表查询
getPersonList(param){
  return instance.get('/api/v2/personnel/info/find', {params: param})
},
//人员添加
personInsert(param){
  return instance.post('/api/v2/personnel/info/insert', param)
},
//人员修改
personModify(param){
  return instance.post('/api/v2/personnel/info/modify', param)
},
//人员删除
personDelete(param){
  return instance.post('/api/v2/personnel/info/remove', param)
},
//人员详情
peopleDetail(param){
  return instance.get('/api/v2/personnel/info/detail', {params: param})
},
//人员分组查询
personGroupList(param){
  return instance.get('/api/v2/personnel/group/find', {params: param})
},
//人员分组添加
personGroupInsert(param){
  return instance.post('/api/v2/personnel/group/insert', param)
},
//人员分组修改
personGroupModify(param){
  return instance.post('/api/v2/personnel/group/modify', param)
},
//人员分组删除
personGroupDelete(param){
  return instance.post('/api/v2/personnel/group/remove', param)
},
//人员属性查询
personAttrlist(param){
  return instance.get('/api/v2/personnel/field/find', {params: param})
},
personAttrInsert(param){
  return instance.post('/api/v2/personnel/field/insert', param)
},
personAttrModify(param){
  return instance.post('/api/v2/personnel/field/modify', param)
},
personAttrDelete(param){
  return instance.post('/api/v2/personnel/field/remove', param)
},
//特征值提取
getSpecialValue(param){
  return instance.post('/api/v2/feature/use-binary-do-feature', param)
},
//下载模版
getExcelTemplate(param){
  return instance.get('/api/v2/personnel/info/download', {params: param})
},
//管理员列表查询
getManagerList(param){
  return instance.get('/api/v2/device/admin/find', {params: param})
},
//管理员添加
managerInsert(param){
  return instance.post('/api/v2/device/admin/insert',  param)
},
//管理员修改
managerModify(param){
  return instance.post('/api/v2/device/admin/modify',  param)
},
//管理员删除
managerDelete(param){
  return instance.post('/api/v2/device/admin/remove',  param)
},
//管理员详情
managerDetail(param){
  return instance.post('/api/v2/device/admin/detail',  param)
},
//管理员登录
managerLogin(param){
  return instance.post('/api/v2/device/admin/login',  param)
},
//人员照片上传
personPhotoUpload(param){
  return instance.post('/api/v2/personnel/info/upload',  param)
},
//获取未关联设备
getNotRelatedDevice(param){
  return instance.get('/api/v2/device/admin/find-not-include-devices', {params: param})
},
//获取关联设备
getRelatedDevice(param){
  return instance.get('/api/v2/device/admin/find-included-devices', {params: param})
},
//获取设备列表
getDeviceList(param){
  return instance.get('/api/v2/device/info/find', {params: param})
},
//设备添加
deviceInsert(param){
  return instance.post('/api/v2/device/info/insert',  param)
},
//设备修改
deviceModify(param){
  return instance.post('/api/v2/device/info/modify',  param)
},
//设备删除
deviceDelete(param){
  return instance.post('/api/v2/device/info/remove',  param)
},
//设备详情
deviceDetail(param){
  return instance.get('/api/v2/device/info/detail', {params: param})
},
//设备信息分组
deviceGroup(param){
  return instance.post('/api/v2/device/info/batch',  param)
},
//设备分组查询
getGroupList(param){
  return instance.get('/api/v2/device/group/find', {params: param})
},
//获取门禁设备列表
getAccessDeviceList(param){
  return instance.get('/api/v2/door/device/find', {params: param})
}
//设备激活
//
 /*==============首页end===================*/
}
