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
// 查询通行方式
addAccessContro(param) {
  return instance.post('/api/v2/door/control/insert', param)
},

deviceManageFind(param) {
  return instance.get('/api/v2/monitor/device-info/find', {params: param})
},
findSpecialGroup(param){
  return instance.get('/api/v2/monitor/device-info/find-device-group', {params: param})
},

getWays(param){
  return instance.get('/api/v2/parameter/setting/passage/way/nodes', {params: param})
},
findTimes(param){
  return instance.get('/api/v2/door/main/total-person', {params: param})
},
findFlowrate(param) {
  return instance.get('/api/v2/door/main/total-record', {params: param})
},
fireDoor(param) {
  return instance.post('/api/v2/door/device/fire-door', param)
},
findDeviceAll(param) {
  return instance.get('/api/v2/door/device/find', {params: param})
},
addDevices(param) {
  return instance.post('/api/v2/door/device/insert', param)
},
updateDevice(param) {
  return instance.post('/api/v2/door/device/modify', param)
},
removeDevice(param) {
  return instance.post('/api/v2/door/device/remove', param)
},
findAllDevice(param) {
  return instance.get('/api/v2/device/info/find', {params: param})
},
openDoor(param) {
  return instance.post('/api/v2/door/device/control-door', param)
},

findPeopleType(param) {
  return instance.get('/api/v2/person/type/find', {params: param})
},

alertList(param) {
  return instance.get('/api/v2/door/alarm/find', {params: param})
},
alertType(param) {
  return instance.get('/api/v2/door/alarm/type', {params: param})
},
alertRemove(param) {
  return instance.post('/api/v2/door/alarm/remove', param)
},
//告警设置添加
alertSetAdd(param){
  return instance.post('/api/v2/door/alarm-set/insert', param)
},
//告警设置修改
alertSetModify(param){
  return instance.post('/api/v2/door/alarm-set/modify', param)
},
//告警设置查询
getAlertSet(param){
  return instance.get('/api/v2/door/alarm-set/find', {params: param})
},
alertDetail(param) {
  return instance.get('/api/v2/door/alarm/detail', {params: param})
},
accessPeopleDetail(param) {
  return instance.get('/api/v2/personnel/info/detail', {params: param})
},
accessList(param) {
  return instance.get('/api/v2/door/passage-record/find', {params: param})
},
accessDetail(param) {
  return instance.get('/api/v2/door/passage-record/detail', {params: param})
},
accessRemove(param) {
  return instance.post('/api/v2/door/passage-record/remove',  param)
},
accessExport(param) {
  return instance.get('/api/v2/door/passage-record/export', {params: param})
},
rulesList(param) {
  return instance.get('/api/v2/door/passage-rule/find', {params: param})
},
rulesInsert(param) {
  return instance.get('/api/v2/door/passage-rule/insert', {params: param})
},
rulesModify(param) {
  return instance.get('/api/v2/door/passage-rule/modify', {params: param})
},
rulesRemove(param) {
  return instance.get('/api/v2/door/passage-rule/remove', {params: param})
},
rulesDetail(param) {
  return instance.get('/api/v2/door/passage-rule/detail', {params: param})
},
passWayList(param) {
  return instance.get('/api/v2/parameter/setting/passage/way/nodes', {params: param})
},
connectDevice(param) {
  return instance.get('/api/v2/door/passage-rule/sync', {params: param})
},
disConnectDevice(param) {
  return instance.get('/api/v2/door/passage-rule/remove', {params: param})
},
personTypeStatus(param) {
  return instance.get('/api/v2/door/passage-rule/person-type', {params: param})
},

// 查询权限
getAccessRuleList(param) {
  return instance.get('/api/v2/door/rule/find', {params: param})
},
// 添加权限
accessRuleInsert(param) {
  return instance.post('/api/v2/door/rule/insert', param)
},
// 修改权限
accessRuleModify(param) {
  return instance.post('/api/v2/door/rule/modify', param)
},
// 删除权限
accessRuleDel(param) {
  return instance.post('/api/v2/door/rule/remove', param)
},
// 权限验证
accessVerifier(param) {
  return instance.post('/api/v2/door/rule/verifier', param)
},
// 查询关联得人员列表
personByDevice(param) {
  return instance.get('/api/v2/door/rule/person-by-device', {params: param})
},
// 人员和规则关联列表
personByRule(param) {
  return instance.get('/api/v2/persion/rule/find', {params: param})
},
// 删除人员关联规则
personByRuleRemove(param) {
  return instance.post('/api/v2/persion/rule/remove', param)
},
// 设备和规则权限关联查询
deviceByRuleFind(param) {
  return instance.get('/api/v2/device/rule/find', {params: param})
},
// 设备和规则关联删除
deviceByRuleDel(param) {
  return instance.post('/api/v2/device/rule/remove', param)
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
//人员批量分组
personBatchGroup(param){
  return instance.post('/api/v2/personnel/info/batch', param)
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
},
//添加设备分组
deviceGroupInsert(param){
  return instance.post('/api/v2/device/group/insert',  param)
},
//修改设备分组
deviceGroupModify(param){
  return instance.post('/api/v2/device/group/modify',  param)
},
//删除设备分组
deviceGroupDelete(param){
  return instance.post('/api/v2/device/group/remove',  param)
},
//设备分组详情
deviceGroupDetail(param){
  return instance.get('/api/v2/device/group/detail',   {params: param})
},
//设备信息验证及上传
deviceUploudValidation(param){
  return instance.post('/api/v2/file/excel-import',  param)
},
//智能硬件类型查询
smartHardwareType(param){
  return instance.get('/api/v2/device/info/find-ih-type',   {params: param})
},
//单位信息查询
getCompanyDetail(param){
  return instance.get('/api/v2/company/find',   {params: param})
},
//单位信息添加
companyInsert(param){
  return instance.post('/api/v2/company/insert',  param)
},
//单位信息修改
companyModify(param){
  return instance.post('/api/v2/company/modify',  param)
},
//单位信息删除
companyDelete(param){
  return instance.post('/api/v2/company/remove',  param)
},
//单位场景添加
companySceneInsert(param){
  return instance.post('/api/v2/company/insert-scene',  param)
},
//单位场景修改
companySceneModify(param){
  return instance.post('/api/v2/company/modify-scene',  param)
},
//单位场景删除
companySceneDelete(param){
  return instance.post('/api/v2/company/remove-scene',  param)
},
//主页统计查询
getIndexData(param){
  return instance.get('/api/v2/home/total-bri',  {params:param})
},
//主页echarts查询
getEchartsData(param){
  return instance.get('/api/v2/home/total-alarm-detail',  {params:param})
},
//操作日志查询
getOperationLogs(param){
  return instance.get('/api/v2/operation-log/find',  {params:param})
},
getMessage(param){
  return instance.get('/api/v2/alarm-log/find',  {params:param})
},
changeMassage(param){
  return instance.post('/api/v2/alarm-log/modify',  param)
},
deleteMessage(param){
  return instance.post('/api/v2/alarm-log/remove',  param)
}
//startTime finishTime 2019-00-00 00:00:00
//设备激活
//
 /*==============首页end===================*/
}
