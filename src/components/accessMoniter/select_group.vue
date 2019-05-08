<template>
   <el-tree
    :data="groupType"
    :highlight-current="true"
    lazy
     @node-click="handleNodeClick"
    :load="loadNode"
    class="menu-tree"
  >
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      groupType: []
    }
  },
  methods: {
    handleNodeClick(data, node) {
       this.$store.state.sccessDevice.accessManage.groupData = data.groupNo
      //         .groupNo
       this.$http
          .getDeviceList({
              groupNo: data.groupNo,
              type: this.$store.state.selectGroupStore.accessManage.deviceType
          })
          .then(res => {
            if (res.data.status == 200) {
              this.$store.state.sccessDevice.accessManage.deviceList = res.data.data;
            } else {
              this.$message.error(res.data.message);
            }
          });
    },
    loadNode(node, resolve) {
       if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
      this.$http
        .getGroupList({
          groupNo: node.data.groupNo,
          deviceType: this.$store.state.sccessDevice.accessManage.deviceType
        })
        .then(res => {
          if (res.data.status == 200) {
            console.log(res.data.data)
            let raxData = JSON.parse(JSON.stringify(res.data.data).replace(/groupNameZh/g, 'label'))
            resolve(raxData)
          } else {
            this.$message.error(res.data.message);
          }
        });
       console.log(2222)
    }
  },
  mounted() {
    this.groupType = [
      {
        label: this.$i18n.locale == 'zh' ? '设备分组1' : 'Device group',
        groupNo: "1005",
        groupName: this.$i18n.locale == 'zh' ? '设备分组2' : 'Device group',
        parentNo: this.$i18n.locale == 'zh' ? '无' : 'null',
        description: this.$i18n.locale == 'zh' ? '根节点' : 'Root group'
      }
    ];
    this.$store.state.sccessDevice.accessManage.groupData = "1005"
  }
}
</script>

<style lang="scss" scope>

</style>
