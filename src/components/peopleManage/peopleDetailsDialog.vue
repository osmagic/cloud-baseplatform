<template>
<el-dialog
  title="人员详情"
  :visible.sync="isShow.show"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="Form"  label-width="110px" size="mini">
     <el-form-item label="图像采集">
      <img v-if="isShow.row" :src="isShow.row.urls[0]" alt="" style="width: 65%;">
    </el-form-item>    
     <el-form-item v-for="(item,index) in isShow.tableDataLabel" :key="index" :label="item.name+'：'">
      <span>{{ isShow.row[item.property]}}</span>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  name: "isShow",
  props: ["isShow"],
  data() {
    return {
      Form:{}
    };
  },
  
  methods: {
    handleClose() {
      this.$emit("active");
    },
    submit() {}
  }
};
</script>
<style lang="scss" scoped>
</style>

