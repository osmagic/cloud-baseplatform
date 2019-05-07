<template>
  <el-tree
    :data="groupType"
    :props="defaultProps"
    :highlight-current="true"
    @node-click="handleNodeClick"
    lazy
    :load="loadNode"
    class="menu-tree"
  >
  </el-tree>
</template>

<script>
// import api from "../../../../../config/api.js";
export default {
  name: "theTree",
  props: ["isSelect", "isNeedlinkage", "platform", "isLeftBar"],
  data() {
    return {
      selectdialogVisible: false,
      search: "",
      groupType: [],
      netAPI: "",
      monitorAPI: '',
      searchgroup: "1005",
      postBooleanToParent: false,
      curr: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      groupDeviceNum: ''
    };
  },
  created() {
    // this.netAPI = api().get("device_group");
    // this.netAPI2 = api().get("accessSystem");
    // this.netAPI3 = api().get("device");
    // this.monitorAPI = api().get("monitorSystem").deviceManage;
  },
  mounted() {
    this.$EventBus.$on('initTree', () => {
      this.initData();
    })
  },
  methods: {
    initData() {
      this.groupType = [
        {
          label: this.$i18n.locale == 'zh' ? '设备分组' : 'Device group',
          groupNo: "1005",
          groupName: this.$i18n.locale == 'zh' ? '设备分组' : 'Device group',
          parentNo: this.$i18n.locale == 'zh' ? '无' : 'null',
          description: this.$i18n.locale == 'zh' ? '根节点' : 'Root group'
        }
      ];
    },
    // 加载树形菜单
    loadNode(node, resolve) {
      if (node.level == 0) {
        return resolve([
          {
            // label: "设备分组",
            // groupNo: "1005",
            // groupName: "设备分组",
            // parentNo: "无",
            // description: "根节点"
            label: this.$i18n.locale == 'zh' ? '设备分组' : 'Device group',
            groupNo: "1005",
            groupName: this.$i18n.locale == 'zh' ? '设备分组' : 'Device group',
            parentNo: this.$i18n.locale == 'zh' ? '无' : 'null',
            description: this.$i18n.locale == 'zh' ? '根节点' : 'Root group'
          }
        ]);
      }
      let groupNo = "";
      if (node.data.groupNo) {
        groupNo = node.data.groupNo;
      }
      if(this.platform == 'monitor'){
        var api = this.monitorAPI.findSpecialGroup
      }else{
        var api = this.netAPI.find
      }
      this.$http
        .findSpecialGroup({
            groupNo
          })
        .then(res => {
          if (res.data.status == 200) {
            let newgroupType = [];
            res.data.data.forEach(item => {
              // 云平台中，设备组下没设备依然显示设备组
              if(this.platform == 'coala') {
                // 如果是选择分组的话就不显示组下设备数量
                if(this.isSelect == 'true') {
                  newgroupType.push({
                    label: item.groupName,
                    groupNo: item.groupNo,
                    id: item.id,
                    description: item.description,
                    parentNo: item.parentNo
                  });
                }else{
                  newgroupType.push({
                    label: item.groupName + ` <${item.deviceNumber}>`,
                    groupNo: item.groupNo,
                    id: item.id,
                    description: item.description,
                    parentNo: item.parentNo
                  });
                }
              }else{
              // 监控系统中，设备组下没设备就不显示设备组
                if(item.deviceNumber > 0) {
                  // newgroupType.push({
                  //   label: item.groupName + ` <${item.deviceNumber}>`,
                  //   groupNo: item.groupNo,
                  //   id: item.id,
                  //   description: item.description,
                  //   parentNo: item.parentNo
                  // });
                  this.$http.deviceManageFind(
                   {
                      groupNo: item.groupNo
                  }).then(res => {
                    if(res.data.status == 200) {
                      if(res.data.total > 0) {
                        newgroupType.push({
                          label: item.groupName + ` <${res.data.total}>`,
                          groupNo: item.groupNo,
                          id: item.id,
                          description: item.description,
                          parentNo: item.parentNo
                        });
                        resolve(newgroupType);
                      }
                    }
                  })
                }
              }
            });
            resolve(newgroupType);
          }
        });
    },
    // 点击节点时触发的事件
    handleNodeClick(data, node) {
      console.log(data)
      this.$store.state.sccessDevice.accessManage.groupData = data
      const promise = new Promise((resolve, reject) => {
        this.$http
          .findSpecialGroup({
            groupNo: data.groupNo,
            type: this.$store.state.sccessDevice.accessManage.deviceType
          })
          .then(res => {
             console.log(1111)
            if (res.data.status == 200) {
              this.$store.state.sccessDevice.accessManage.deviceList = res.data.data;
              resolve(res.data.data)
            } else {
              this.$message.error(res.data.message);
            }
          });
      });
      promise.then(res => {
        this.getAddDeviceList()
      })
      // this.$store.sccessDevice.commit('freshData')
      console.log(this.$store)
      this.curr = data;
      // 判断如果是云平台的设备列表
      if(this.platform == 'coala') {
        this.$emit("receiveChildProps", this.postBooleanToParent, this.curr);
        this.$emit("batchgroupProps", this.curr);
      }else{
        this.$emit("monitorLinkage", data)
      }
      // 判断是否联动（云平台和监控系统独立）
      if (this.isNeedlinkage == "true" && this.platform == 'coala') {
        this.$EventBus.$emit("linkage", data);
        // this.$emit("linkage", data);
      }
    },
    //获取已添加所有设备
    getAddDeviceList() {
      console.log(22222)
      this.$http
        .findDeviceAll(
          {
            pageSize: 1000,
            pageNo: 1
          })
        .then(res => {
          for (const key in res.data.data) {
            if (res.data.data.hasOwnProperty(key)) {
              const element = res.data.data[key];
              for (const key2 in this.$store.state.sccessDevice.accessManage.deviceList) {
                if (this.$store.state.sccessDevice.accessManage.deviceList.hasOwnProperty(key2)) {
                  const device = this.$store.state.sccessDevice.accessManage.deviceList[key2];
                  if (element.deviceId == device.id) {
                    // device.isAdd = false;

                    this.$set(device, "isAdd", "true");
                  }
                }
              }
            }
          }

          // this.pageNumber = res.data.pageNumber;
        });
    },
    selectHandleClose() {
      this.selectdialogVisible = false;
    }
  }
};
</script>

<style lang="scss">
.menu-tree{
  
  .el-tree-node__content{
    span:nth-child(2){
        overflow-x: auto !important;
      }
  }
}
</style>
