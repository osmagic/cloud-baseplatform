<template>
  <el-card class="deptManagement">
    <div class="head">
      <p>单位管理</p>
    </div>
    <div class="content">
      <div class="innerCont">
        <div class="item">
          <span>顶部logo</span>
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
        
            :on-change="upLogo"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
          >
            <img v-if="imageUpUrl" :src="imageUpUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="item">
          <span>单位名称</span>
          <el-input placeholder="请输入单位名称" style="width: 300px" v-model="unitform.name"></el-input>
        </div>
        <div class="item">
          <span>主页logo</span>
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
           
            :on-change="indexLogo"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
          >
            <img v-if="imageIndexUrl" :src="imageIndexUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="item">
          <span>公司标语</span>
          <el-input placeholder="请输入公司标语" style="width: 300px" v-model="unitform.description"></el-input>
        </div>
        <div class="item">
          <span>公司简介</span>
          <el-input
            placeholder="请输入公司简介"
            style="width: 300px"
            type="textarea"
            v-model="unitform.biography"
          ></el-input>
        </div>

        <div class="img-list-box">
          <div class="img-info-label">{{$t("unitManage.upload")}}：</div>
          <div class="img-info-box">
            <el-row :gutter="12">
              <el-col :span="3" v-for="(o,index) in pictureList" :key="index" class="card">
                <el-card :body-style="{ padding: '0px' }">
                  <el-carousel :autoplay="false" height="156px" indicator-position="none">
                    <el-carousel-item v-for="(src,ind) in o.urls" :key="ind">
                      <img :src="src" class="image">
                    </el-carousel-item>
                  </el-carousel>
                  <div class="card-content">
                    <p class="omit">{{o.description}}</p>
                    <div class="bottom clearfix">
                      <time class="time">{{o.name}}</time>
                      <el-button
                        type="text"
                        class="button del-btn"
                        style="font-size:20px"
                        icon="el-icon-delete"
                        @click="remove(o)"
                      ></el-button>
                      <el-button
                        type="text"
                        class="button"
                        style="font-size:20px"
                        icon="el-icon-edit"
                        @click="showEditDialog(o)"
                      ></el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-button icon="el-icon-upload" @click="createDialog = true;this.editFileBinary=[]">上传</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="btmBtn">
      <el-button type="primary" @click="submitAll">确定</el-button>
      <el-button>取消</el-button>
    </div>
    <!--修改-->
    <el-dialog
      :title="$t('unitManage.modify')"
      :visible.sync="editDialog"
      width="30%"
      :before-close="editDialogClose"
    >
      <el-form ref="editExhibition" :model="editForm" label-width="120px" :rules="rules">
        <el-form-item :label="$t('unitManage.className')" prop="pictureClassification">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('unitManage.description')">
          <el-input v-model="editForm.description"></el-input>
          <!--<span>{{editForm.fileList.length}}</span>-->
        </el-form-item>
        <el-form-item :label="$t('unitManage.pictures')" prop="file">
          <el-upload
            accept="image/jpeg, image/jpg, image/bmp, image/png"
            action
            ref="editFile"
            list-type="picture-card"
            :file-list="editForm.fileList"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            :http-request="editExhibition"
            :on-change="editFilesChange"
            :on-remove="filesRemove"
            :limit="6"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">{{$t("unitManage.requirement")}}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">{{$t("common.cancel")}}</el-button>
        <el-button type="primary" @click="submitForm('editExhibition')">{{$t("common.ok")}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="imgdialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <!--展示-->
    <el-dialog
      :title="$t('unitManage.pictures')"
      :visible.sync="createDialog"
      width="30%"
      :before-close="createExhibitionClose"
    >
      <el-form ref="createExhibition" :model="createFrom" :rules="rules" label-width="150px">
        <el-form-item :label="$t('unitManage.className')" prop="pictureClassification">
          <el-input v-model="createFrom.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('unitManage.description')">
          <el-input v-model="createFrom.description"></el-input>
        </el-form-item>
        <el-form-item :label="$t('unitManage.pictures')" prop="file">
          <el-upload
            ref="createFile"
            action
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="createHandleRemove"
            :http-request="createExhibition"
            :on-change="filesChange"
            :limit="6"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">{{$t("unitManage.requirement")}}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createExhibitionClose">{{$t("common.cancel")}}</el-button>
        <el-button type="primary" @click="submitForm('createExhibition')">{{$t("common.ok")}}</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  name: "deptManagement",
  data() {
    var self = this;
    var validatorCreateFile = (rule, value, callback) => {
      if (self.createFileNum == 0) {
        callback(new Error("请选择文件"));
      } else {
        callback();
      }
    };
    var validatoreditFile = (rule, value, callback) => {
      if (self.editFileNum == 0) {
        callback(new Error("请选择文件"));
      } else {
        callback();
      }
    };
    return {
      imageUpUrl: "",
      imageIndexUrl: "",
      imgArr: [
        { url: "./../../assets/img/pic.png" },
        { url: "./../../assets/img/pic.png" },
        { url: "./../../assets/img/pic.png" }
      ],
      pictureList: [],
      unitform: {
        description: "",
        biography: "",
        name: ""
      },
      createFrom: {
        name: "",
        description: "",
        vrPics: false,
        files: []
      },
      phtotArr: [],
      createFileNum: 0, //创建图片个数
      editFileNum: 0, //修改图片个数
      editForm: {
        id: "",
        pictureClassification: "", //分类
        pictureDescription: "", //描述
        vrPics: false, //vr开关
        files: [], //上传用户的
        fileList: [], //展示要用的
        readyDel: [] //准备删除的id列表
      },
      editDialog: false, //修改弹框状态
      createDialog: false, //创建弹框状态
      rules: {
        pictureClassification: [
          { required: false, message: "不能为空" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符" }
        ]
        // file: [{ validator: validatorCreateFile, message: "请上传图片" }]
      },
      imgdialogVisible: false,
      dialogImageUrl: "",
      companyId: "",
      fileListId: "",
      editFileBinary: [],
      isEdit: false,
      upLogoBinary: "",
      indexLogoBinary: ""
    };
  },
  created() {
    this.unitformSubmit();
  },
  mounted() {
    this.getPictureList();
  },
  methods: {
    upLogo(file, fileList) {
      this.upLogoBinary = file.raw;
       this.imageUpUrl = URL.createObjectURL(file.raw);
    },
    indexLogo(file, fileList) {
      this.indexLogoBinary = file.raw;
      this.imageIndexUrl = URL.createObjectURL(file.raw);
    },
    submitAll() {
      let Allform = new FormData();
      Allform.append("name", this.unitform.name);
      Allform.append("description", this.unitform.description);
      if(this.upLogoBinary!=''){
 Allform.append("logoBinary", this.upLogoBinary);
      }
      if(this.indexLogoBinary!=''){
Allform.append("brandBinary", this.indexLogoBinary);
      }
     
      
      Allform.append("biography", this.unitform.biography);

      if (this.isEdit) {
        Allform.append("companyId", this.companyId);
        this.$http.companyModify(Allform).then(res => {
          if (res.data.status == 200) {
            this.unitformSubmit();
            this.upLogoBinary='';
            this.indexLogoBinary='';
             this.$message.success(this.$t("common.updateSuccess"))
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$http.companyInsert(Allform).then(res => {
          if (res.data.status == 200) {
            this.unitformSubmit();
            this.upLogoBinary='';
            this.indexLogoBinary='';
             this.$t("common.updateSuccess")
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    handleAvatarUpSuccess(file,fileList) {
      this.imageUpUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(){},
    handleAvatarUpSuccess(file,fileList) {
      this.imageIndexUrl = URL.createObjectURL(file.raw);
    },
    unitformSubmit() {
      this.$http.getCompanyDetail().then(
        res => {
          if (res.data.status == 200) {
            this.unitform.biography = res.data.data[0].biography;
            this.unitform.description = res.data.data[0].description;
            this.unitform.name = res.data.data[0].name;
            this.imageUpUrl = res.data.data[0].logoUrl;
            this.imageIndexUrl = res.data.data[0].brandUrl;
            this.pictureList = res.data.data[0].scenes;
            this.companyId = res.data.data[0].companyId;
            if ((res.data.data.length > 0)) {
              this.isEdit = true;
            }
          }
        },
        err => {
          this.$message({
            message: "服务错误" + err,
            type: "warning"
          });
        }
      );
    },
    editUnitform() {
      this.$http.post(this.netAPI.updateCustomerInfo, this.unitform).then(
        res => {
          if (res.body.status == 200) {
            this.$message({
              message: this.$t("common.updateSuccess"),
              type: "success"
            });
          }
        },
        err => {
          this.$message({
            message: "服务错误" + err,
            type: "warning"
          });
        }
      );
    },
    getPictureList() {
      this.$http.get(this.netAPI.findCustomerClassificationList).then(res => {
        if (res.body.status == 200) {
          this.pictureList = res.body.data;
          for (let item of this.pictureList) {
            this.$set(item, "imgList", "");
            this.addPicture(item);
          }
          console.log(this.pictureList);
        }
      });
    },
    addPicture(item) {
      this.$http
        .get(this.netAPI.findClassificationPictureIdList, {
          params: { ClassificationId: item.id }
        })
        .then(
          res => {
            if (res.body.status == 200) {
              item.imgList = res.body.data;
            }
          },
          err => {
            this.$message({
              message: "服务错误" + err,
              type: "warning"
            });
          }
        );
    },
    pictureUpload() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (formName) {
            case "createExhibition":
              this.$refs.createFile.submit();

              break;
            case "editExhibition":
              console.log(this.editFileNum);

              this.editExhibition();

              break;
            default:
              break;
          }
        } else {
          this.$message.error("请填写必填信息");
          return false;
        }
      });
    },
    filesChange(file, fileList) {
      //发生添加文件
      this.createFileNum++;
    },
    createHandleRemove() {
      this.createFileNum--;
    },
    editFilesChange(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.editFileBinary.push(file.raw);
      this.editFileNum++;
      this.fileListId = "";
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        if (!element.raw) {
          if (this.fileListId == "") {
            this.fileListId = element.url.split("attr=")[1];
          } else {
            this.fileListId = "," + this.fileListId;
          }
        }
      }
    },
    filesRemove(file, fileList) {
      //file name 就是ID
      console.log(file);
      if (file.raw) {
        console.log(this.editFileBinary)
        this.editFileBinary.pop();
      }
      this.fileListId = "";
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        if (!element.raw) {
          if (this.fileListId == "") {
            this.fileListId = element.url.split("attr=")[1];
          } else {
            this.fileListId = "," + this.fileListId;
          }
        }
      }
      this.editFileNum++;
    },
    //第一次上传
    createExhibition(content) {
      console.log("上传");
      console.log(content.file);
      //倒计数
      if (this.createFileNum > 1) {
        this.createFrom.files.push(content.file);
        this.createFileNum--;
        return;
      }

      this.createFrom.files.push(content.file);
      let from = new FormData();
      from.append("description", this.createFrom.description);
      from.append("companyId", this.companyId);
      from.append("name", this.createFrom.name);
      from.append("vrPics", this.createFrom.vrPics);
      for (let file of this.createFrom.files) {
        from.append("files", file);
      }
      console.log(from.get("file"));

      this.$http.companySceneInsert(from).then(
        res => {
          if (res.data.status == 200) {
            // this.getPictureList();
            this.unitformSubmit();
            this.createExhibitionClose();
          }
        },
        err => {
          this.$message({
            message: "服务错误" + err,
            type: "warning"
          });
        }
      );
    },
    //修改编辑
    editExhibition() {
      // 数据修改  发布数据不知道

      let editForm = new FormData();
      editForm.append("companyId", this.companyId);
      editForm.append("description", this.editForm.description);
      editForm.append("name", this.editForm.name);
      editForm.append("csId", this.editForm.csId);
      editForm.append("picture", this.fileListId);

      for (let index = 0; index < this.editFileBinary.length; index++) {
        const element = this.editFileBinary[index];
        editForm.append("files", element);
      }
      this.$http.companySceneModify(editForm).then(res => {
        if (res.data.status == 200) {
          this.editDialogClose();
          this.unitformSubmit();
          this.$message.success(this.$t("common.updateSuccess"));
        } else {
          this.editDialogClose();
          this.$message.error(res.data.message);
        }
      });
      // Promise.all([uptext, del, file]).then(result => {
      //   this.editDialogClose();
      //   this.getPictureList();
      //   this.$message.success(this.$t("common.updateSuccess"));
      // });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // debugger;
      this.imgdialogVisible = true;
    },
    handlePictureCardPreview1(file) {
      console.log(file);
    },
    editFilesChange1(file) {
      console.log(file);
    },
    createExhibitionClose() {
      //关闭并且清空
      // this.nulltoForm(this.createFrom, "createExhibition");
      this.createFrom = {
        name: "",
        description: "",
        vrPics: false,
        files: []
      };
      this.createDialog = false;
      this.createFileNum = 0; //创建图片个数
      this.$refs.createExhibition.resetFields();
      this.$refs.createFile.clearFiles();
    },
    showEditDialog(obj) {
      this.editFileBinary=[]
      console.log(obj);
      this.editDialog = true;
      this.editForm.id = obj.id;
      this.editForm.name = obj.name;
      this.editForm.description = obj.description;
      this.editForm.csId = obj.csId;
      this.editForm.fileList = [];
      this.editForm.files = [];
      this.editForm.readyDel = [];
      obj.urls.map(item => {
        this.editForm.fileList.push({
          url: item
        });
      });
    },
    editDialogClose() {
      //关闭并且清空
      this.editDialog = false;
      this.fileListId = "";
      // this.nulltoForm(this.editForm, "editExhibition");
      this.$refs.editFile.clearFiles();
    },
    nulltoForm(obj, formName) {
      for (let i in obj) {
        obj[i] = undefined;
      }
      this.$refs[formName].resetFields();
    },
    remove(obj) {
      this.$confirm("是否删除选中的相册？", "删除提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t("common.delete"),
        cancelButtonText: this.$t("delete.cancel"),
        type: "warning"
      })
        .then(() => {
          //先删除图片再删除相册
          this.beforeRemoveImgList(obj, _ => {
            //作为图片删除成功的回调

            _.$message.success("相册删除成功！");
            // _.getPictureList();
            _.unitformSubmit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    beforeRemoveImgList(obj, callback) {
      console.log(obj);

      //先删除图片
      this.$http.companySceneDelete({ csId: obj.csId }).then(res => {
        if (res.data.status == 200) {
          callback(this);
        }
      });
    },
    pictureHandleRemove() {}
  }
};
</script>
<style scoped lang="scss">
.deptManagement {
  height: 86vh;
  width: 100%;
  position: relative;

  .head {
    width: 100%;
    height: 30px;
    text-align: left;
    font-size: 20px;
    line-height: 30px;
    position: relative;
    left: -20px;

    p {
      margin-left: 30px;
    }

    p:before {
      content: "";
      position: absolute;
      left: 0px;
      width: 10px;
      height: 30px;
      background-color: #4383dc;
    }
  }

  .content {
    height: 75vh;
    .innerCont {
      padding: 30px 250px;
      .item {
        width: 320px;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        white-space: nowrap;
        margin: 5px 0;
        span {
          margin-right: 20px;
        }
      }
    }
  }
  .btmBtn {
    text-align: center;
  }
}

.avatar-uploader {
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  /*overflow: hidden;*/
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
.imgOuter {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  white-space: nowrap;
  margin: 5px 0;
  span {
    margin-right: 10px;
  }
  .imgBox {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    .imgGroup {
      width: 800px;
      height: 300px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow-y: scroll;
      align-items: flex-end;
      .imgDiv {
        width: 230px;
        height: 300px;
        border-radius: 5px;
        box-shadow: 0 0 5px #99a9bf;
        position: relative;
        overflow: hidden;
        margin: 10px 10px;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .views {
          color: white;
          position: absolute;
          top: 170px;
          right: 0;
          z-index: 100000;
        }
        p {
          margin-left: 10px;
        }
        .btmIcon {
          width: 100%;
          height: 40px;
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          i {
            font-size: 16px;
            margin: 0 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.img-list-box {
  margin-left: -10px;
  // width: 100%;
  width: 1044px;
  height: 55%;
  display: flex;
  @media screen and(max-width: 1450px) {
    width: 100%;
  }
  .img-info-label {
  }
  .img-info-box {
    flex: 9;
    height: 100%;
    overflow-x: hidden;
    .el-row {
      display: flex;
      flex-wrap: wrap;
      > .card {
        width: 230px;
        height: 280px;
        margin: 0;
        margin-right: 6px;
        margin-top: 5px;
      }
      .add-icon {
        margin-top: 89px;
        margin-left: 7.48095%;
        text-align: center;
        width: 3.5%;
        cursor: pointer;
        transition: all 0.4s;
        width: 147px;
        height: 147px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // margin-top: 100px;
        // margin-bottom: 40px;
        cursor: pointer;
        transition: all 0.4s;
        position: relative;
        &.add-icon:hover {
          box-shadow: 6px 8px 37px -2px;
        }
        .el-card {
          width: 100%;
          height: 100%;
          i {
            // height: 67px;
            height: 100%;
            width: 100%;
            color: rgb(222, 222, 222);
            font-size: 28px;
            // line-height: 67px;
            display: flex;
            justify-content: center;
            align-items: center;
            // text-align: center;
          }
        }
      }
    }
  }
}
.submit {
  text-align: right;
  width: 1044px;
  @media screen and(max-width:1450px ) {
    width: 100%;
  }
}
.time {
  display: block;
  font-size: 13px;
  color: #999;
  margin-bottom: 3px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;

  bottom: 0;
}
.del-btn {
  color: #f56c6c;
  margin-left: 5px;
}
.button {
  padding: 0;
  float: right;
}
.card-content {
  padding: 14px;
  flex-grow: 1;
}
// .add-icon {
//   margin-top: 89px;
//   margin-left: 7.48095%;
//   text-align: center;
//   width: 3.5%;
//   cursor: pointer;
//   transition: all 0.4s;
// }
// .add-icon:hover {
//   box-shadow: 6px 8px 37px -2px;
// }
// .add-icon i {
//   height: 67px;
//   color: rgb(222, 222, 222);
//   font-size: 28px;
//   line-height: 67px;
//   text-align: center;
// }

.omit {
  position: relative;
  line-height: 20px;
  max-height: 19px;
  overflow: hidden;
}
.omit::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 14px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card {
  height: 270px;
  margin-top: 15px;
  margin-left: 3.480952380952381%;
  transition: all 0.4s;
  cursor: pointer;
}
.card:hover {
  box-shadow: 6px 8px 37px -2px;
}
.unit_manage-page {
  width: 100%;
  height: 100%;
  position: relative;
  .unit_manage-main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 30px;
    // margin: auto;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: #d1d1d1 0 2px 4px 0;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 40px;
    .blue {
      width: 12px;
      height: 20px;
      background: rgba(67, 131, 220, 1);
      border-radius: 0px 3px 3px 0px;
      position: absolute;
      left: 0;
      top: 19px;
    }
    .title {
      position: absolute;
      left: 20px;
      top: 18px;
      font-size: 20px;
      font-weight: 600;
    }
    .main-content {
      width: 100%;
      // height: 100%;
      height: 770px;
      box-sizing: border-box;
      padding: 50px 240px;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      @media screen and(max-width:1680px ) {
        padding: 50px 20px;
      }
      .unit-info {
        height: 45%;
        .demo-form-inline {
          p {
            margin: 0;
          }
        }
      }
      .img-list-box {
        margin-left: -10px;
        // width: 100%;
        width: 1044px;
        height: 55%;
        display: flex;
        @media screen and(max-width: 1450px) {
          width: 100%;
        }
        .img-info-label {
          flex: 1.5;
        }
        .img-info-box {
          flex: 9;
          height: 100%;
          overflow-x: hidden;
          .el-row {
            display: flex;
            flex-wrap: wrap;
            > .card {
              width: 230px;
              height: 280px;
              margin: 0;
              margin-right: 6px;
              margin-top: 5px;
            }
            .add-icon {
              margin-top: 89px;
              margin-left: 7.48095%;
              text-align: center;
              width: 3.5%;
              cursor: pointer;
              transition: all 0.4s;
              width: 147px;
              height: 147px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              // margin-top: 100px;
              // margin-bottom: 40px;
              cursor: pointer;
              transition: all 0.4s;
              position: relative;
              &.add-icon:hover {
                box-shadow: 6px 8px 37px -2px;
              }
              .el-card {
                width: 100%;
                height: 100%;
                i {
                  // height: 67px;
                  height: 100%;
                  width: 100%;
                  color: rgb(222, 222, 222);
                  font-size: 28px;
                  // line-height: 67px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  // text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.unit_manage-page {
  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    height: 100%;
    .el-card__body {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}
.noShow .el-upload--picture-card {
  display: none !important;
}
.show .el-upload--picture-card {
  display: inline-block !important;
}
</style>

