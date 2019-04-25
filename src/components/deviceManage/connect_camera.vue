<template>
<el-dialog :title="this.$i18n.locale=='zh'?'选择摄像机':'Select Cameras'" :visible.sync="selectcameradialogVisible" width="30%" :before-close="selectcameraFileHandleClose">
    <el-transfer
    filterable
    :filter-placeholder="this.$i18n.locale=='zh'?'搜索':'Search'"
    @change="rightChange"
    v-model="connectedcameraIds"
    :titles="[this.$i18n.locale=='zh'?'未分组设备':'Ungrouped', this.$i18n.locale=='zh'?'已添加设备':'Added']"
    :data="data2"
    >
    </el-transfer>
    <div class="sub">
        <el-button size="mini" @click="selectCamera">{{$t('common.ok')}}</el-button>
        <el-button size="mini" @click="cancelselectcameradialogVisible">{{$t('common.cancel')}}</el-button>
    </div>
</el-dialog>
</template>

<script>
// import api from "../../../../../config/api.js";
export default {
  name: "connect_camera",
  data() {
    return {
      data2: [],
      connectedcameraIds: [],
      connectedcameraName: [],
      selectcameradialogVisible: false,
    };
  },
  methods: {
    // 点击右上角，关闭关联摄像机模态框
    selectcameraFileHandleClose(done) {
      this.data2 = [];
      done();
    },
    // 点击确定，关联摄像机
    selectCamera() {
      // 重置已关联摄像机名
      this.connectedcameraName = [];
      // data2:所有摄像机数据，connectedcameraIds:已关联摄像机Id
      this.data2.forEach(item => {
        this.connectedcameraIds.forEach(i => {
          if(item.key == i) {
            this.connectedcameraName.push(item.label)
          }
        })
      })
      this.$emit("ConnectChildProps", this.connectedcameraIds, this.data2, this.connectedcameraName)
      // console.log(JSON.stringify(this.connectedcameraName))
      // console.log(JSON.stringify(this.connectedcameraIds))
      // 如果清除所有关联
      if(this.connectedcameraIds.length == 0) {
        this.$emit("clearConnect", true)
      }
      this.selectcameradialogVisible = false;
    },
     // 点击右取消，关闭关联摄像机模态框
    cancelselectcameradialogVisible() {
      // this.connectedcameraIds = [];
      // console.log(JSON.stringify(this.connectedcameraName))
      // console.log(JSON.stringify(this.connectedcameraIds))
      this.selectcameradialogVisible = false;
    },
    rightChange() {
      console.log(JSON.stringify(this.connectedcameraIds))
    },
  }
}
</script>

<style>
.sub{
    margin-top: 25px;
    width: 100%;
    text-align: right;
}
</style>
