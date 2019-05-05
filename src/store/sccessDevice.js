import Vue from 'vue'
import http from '../api/http.js'


export default {
  state:{
    accessManage:{
    //门禁系统设备类型
    deviceType:"1",
    //门禁系统设备列表
    deviceList:[],
    // 分组数据
    groupData:{},
    netAPI:'',
    addList:[],
    deviceAlreadyList:[]//新增门禁设备数据备份
    },
    MonitoringManage:{
      //智能安防设备类型
      deviceType:"1",
      //智能安防设备列表
      deviceList:[],
      },
    //  批量导入设备时用到的设备组编号
      importDeviceNo: 1005,
      importDeviceType: 1
  },
  mutations:{
    freshData:function(state){
      const promise = new Promise((resolve, reject) => {
        http.findAllDevice({
          
              groupNo: state.accessManage.groupData.groupNo,
              type: state.accessManage.deviceType
          
          })
          .then(res => {
            if (res.data.status == 200) {
              state.accessManage.deviceList = res.data.data;
              resolve(res.data.data)
            }
          });
      });
      promise.then(res=>{
        http.findDeviceAll({
              pageSize: 1000,
              pageNo: 1
          })
          .then(res => {
            state.accessManage.deviceAlreadyList = res.data.data
            for (const key in res.data.data) {
              if (res.data.data.hasOwnProperty(key)) {
                const element = res.data.data[key];
                // console.log(state.accessManage.addList)
                if(state.accessManage.addList.length< res.data.data.length){
                  state.accessManage.addList.push({
                    name: element.deviceName,
                    id: element.deviceId,
                    closable:false
                  });
                }
  
                for (const key2 in   state.accessManage.deviceList) {
                  if (  state.accessManage.deviceList.hasOwnProperty(key2)) {
                    const device =  state.accessManage.deviceList[key2];
                    if (element.deviceId == device.id) {
                      // device.isAdd = false;
                      Vue.set(device, "isAdd", true);
                    }
                  }
                }
              }
            }
  
            // this.pageNumber = res.data.pageNumber;
          });
        // console.log( state.accessManage.deviceList)
      })
    },
    // 更改导入设备类型
    changeimportDeviceType(state,data){
      // console.log(state)
      // console.log(data)
      state.importDeviceType = data
    }
  },
  actions:{},
  getters:{}
}
