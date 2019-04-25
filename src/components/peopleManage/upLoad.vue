<template>
    <div>
        <el-upload
        ref="upload"
        action=""
        :accept="accept"
        :auto-upload="false"
        list-type="picture-card"
        :on-change="handleChange"
        :on-preview="handlePictureCardPreview"
        :file-list="fileList"
        :on-remove="handleRemove"
        :http-request="handRequest">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>        
    </div>
</template>
<script>
export default {
  props: ["id", "url", "fileList", "serviceCode", "type"], //url fileLsit已有的图片 serviceCode业务代码
  data() {
    return {
      readyNum: 0, //准备上传的图片个数
      files: [], //存放上传文件
      delFiles: [], //存放删除的id
      accept: "",
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  created() {
    if (this.type == "file") {
      this.accept = "image/jpeg,image/jpg,image/bmp,image/png";
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    delete() {
      this.handRequest();
    },
    handleRemove(file, fileList) {
      this.delFiles.push(file.name);
      //点击删除的文件名字
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.readyNum++;
    },
    handRequest(content) {
      if (this.readyNum > 1) {
        this.files.push(content.file);
        this.readyNum--;
        return;
      }

      if(content) this.files.push(content.file);

      let form = new FormData();
      form.append("code", this.serviceCode);
      form.append("delete", this.delFiles);

      if (this.id) form.append("id", this.id);

      // form.append("appendFileList",'');
      for (let item of this.files) {
        form.append("insert", item);
      }

      this.$http.post(this.url, form).then(
        res => {
          if (res.data.status == 200) {
            this.$emit("successCallback");
            this.init();
          }
        }
      );
    },
    init() {
      this.readyNum = 0; //准备上传的图片个数
      this.files = []; //存放上传文件
      this.delFiles = []; //存放删除的id
      this.$refs.upload.clearFiles();
    }
  }
};
</script>
<style>
</style>
