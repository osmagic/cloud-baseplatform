<template>
<el-dialog
  title="修改人员"
  :visible.sync="isShow.show"
  @open='openData'
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="Form" :rules="rules" label-width="110px" size="mini">
    <el-form-item label="图像采集">
       <upload ref="upload" :id="Form.id" :fileList="fileList" :url="this.netApi.uploadImage" serviceCode="101104" @successCallback="reSet"></upload>
    </el-form-item>
    <template v-for="(item,index) in isShow.tableDataLabel" v-if="item.property!='id'">
      <el-form-item :label="item.name" :key="index" :prop="item.property">
        <el-input v-model="Form[item.property]" :placeholder="'请输入'+item.name" v-if="item.type=='input'" clearable></el-input>
      </el-form-item>
    </template>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import upload from "./upLoad";
// import APICONFIG from "../../../../config/api.js";
export default {
  name: "isShow",
  props: ["isShow"],
  components: {
    upload
  },
  data() {
    return {
      Form: {},
      rules: {},
      netApi: "",
      fileList:[],
    };
  },
  created() {
    // this.netApi = APICONFIG().get("people_manage");
  },
  methods: {
    handleClose() {
      this.fileList = [];
      this.$refs.upload.init();
      this.$refs.form.resetFields();
      this.$emit("active");
    },
    submit() {
      //表单对象
      this.Form.type = this.isShow.categoryNo;
      this.$http.post(this.netApi.updatePeople, this.Form).then(
        res => {
          if (res.body.status==200) {
            this.reSet();
            if(this.$refs.upload.readyNum>0){
              this.$refs.upload.submitUpload();
            }else if(this.$refs.upload.delFiles.length>0){
              this.$refs.upload.delete();
            }
          }
        }
      );
    },
    openData() {
      this.Form = JSON.parse(JSON.stringify(this.isShow.row));
      for(let item  of this.Form.urls){
        let urlQuerys = item.split('?');
        let querys = urlQuerys[1].split('&');
        let map = new Map;
        for(let query of querys){
          map.set(query.split('=')[0],query.split('=')[1])
        }

        this.fileList.push({
            name:map.get('attr'),
            url:item
        })

      }

      for (let item of this.isShow.tableDataLabel) {
        this.rules[item.property] = [
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "change"
          }
        ];
      }
    },
    reSet() {

      this.$message.success("修改成功");
      this.$emit("active", "", "refresh");
      this.Form = {};
      this.fileList = [];
      this.$refs.form.resetFields();
    }
  },
};
</script>
<style>
</style>
