<template>
<div>
  <el-dialog
      custom-class="create-people-dialog"
      :title="isEditPeo === 0 ? $t('peopleManageList.addPeople') : isEditPeo === 1 ? $t('peopleManageList.editPeople') : $t('peopleManageList.personDetails')"
      :visible.sync="isShow.show"
      width="30%"
      :close="initForm"
      :before-close="handleClose">
      <el-form ref="form" :model="FormData" :rules="rules" label-width="120px" size="mini">

        <div v-for="(item,index) in isShow.tableDataLabel" v-if="item.property!='id'" :key="item.code">

          <el-form-item :label="item.name" v-if="item.name === $t('peopleManageList.photo')" :rules="[
                { required: item.required}
              ]">
              <el-upload
                action=""
                :disabled="isEditPeo === 2"
                :http-request="sunk"
                list-type="picture-card"
                :file-list="imgList"
                :before-upload="beforeUploadImg"
                :on-change="imgCardPre"
                :on-remove="removeImg">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="324">
              </el-dialog>
            </el-form-item>

            <el-form-item v-else :label="item.name" :key="index" :prop="item.property">
              <el-input v-model="FormData[item.property]" :placeholder="language === 'en' ? `${$t('peopleManageList.pleaseEnter')} ${item.name}` : `${$t('peopleManageList.pleaseEnter')}${item.name}`" v-if="item.type=='input'" clearable :disabled="isEditPeo === 2"></el-input>
            </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="submit" :disabled="isEditPeo === 2">{{$t('common.ok')}}</el-button>
      </span>
  </el-dialog>

</div>

</template>
<script>
// import APICONFIG from "../../../../config/api.js";
export default {
  name: "isShow",

  props: {
    isEditPeo: {
      type: Number,
      default: () => {
        return -1
      }
    },
    isShow: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    // upload
  },
  data() {
    return {
      language: localStorage.language,
      FormData: {
        groupNo: '',
        groupName: '',
        typeNo: '',
        typeName: '',
        pictures: []
      },
      rules: {},
      netApi: "",
      img2id: "",
      imgList: [],
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  created() {
    // let self = this
    // this.netApi = APICONFIG().get("people_manage");
  },
  watch: {
    'isShow': {
      handler(val) {
        if(val.show) {
          this.initForm()
          if(val.show && this.isEditPeo !== 0) {
            this.initSetForm()
          } else {
            this.$nextTick(() => {
              this.FormData = JSON.parse(JSON.stringify(this.selectInfo))
              if (this.FormData.hasOwnProperty('pictures') && this.isEditPeo === 0) {
                this.FormData.pictures = []
              }
              console.log(this.FormData)
            })
          }
        } else {
          this.initForm()
        }
      },
      deep: true
    }
  },
  beforeUpdate() {
    for (let item of this.isShow.tableDataLabel) {
      this.rules[item.property] = [
        {
          min: 1,
          max: 30,
          message: this.$t('peopleManageList.zfLength'),
          trigger: "change",
          id: 0
        }
      ];
    }
  },
  methods: {
    // 覆盖http
    sunk() {

    },
    removeImg(file, fileList) {
      let self = this
      this.chaBase(fileList)
      self.FormData.pictures.forEach((item, index) => {
        if(item.name === file.name.split('.')[0]) {
          self.FormData.pictures.splice(index, 1)
        }
      })
    },
    beforeUploadImg(file) {
      let isTrue = false
      let filename = ''
      console.log(file)
      if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.warning(this.$t('peopleManageList.pleaseUploadPhoto'))
        return false
      }

      if(file.type === 'image/jpeg') {
        filename = file.name.split('.jpg')[0]
      } else if(file.type === 'image/png') {
        filename = file.name.split('.png')[0]
      }
      this.FormData.pictures.forEach(item => {
        if(filename === item.name) {
          isTrue = true
        }
      })
      // 图片名字有重复, 判断图片是否重复
      if(isTrue) {
        this.$message.warning(this.$t('peopleManageList.imgDuplicated'))
        return false
      } else {
        return true
      }
    },
    imgCardPre(file, fileList) {
      let self = this
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        self.FormData.pictures.push({
          'name': file.raw.name.split('.')[0],
          'base64': this.result.split('base64,')[1]
        })
      }
    },
    chaBase(fL) {

    },
    handleClose() {
      this.FormData.pictures = []
      this.imgList = []
      this.$refs['form'].resetFields();
      this.$emit("active");
    },
    addsLabel(item) {},
    submit() {
      // 没有上传照片等
      if(!this.rtxForm()) {
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //添加表类型
      this.FormData["type"] = this.isShow.categoryNo;
      if(this.isShow.categoryNo == '100010001001') {
        if(!this.selectGroupCode) {
          this.FormData["groupCode"] = '100010021001'
        }else{
          this.FormData["groupCode"] = this.selectGroupCode
        }
      }
      // 1是编辑状态
      if(this.isEditPeo === 1) {
        // 获取删除的照片
        let del = []
        this.selectInfo.pictures.forEach(vl => {
          let isTrue = true
          this.FormData.pictures.forEach(item => {
            if(vl.name === item.name) {
              isTrue = false
            }
          })
          if(isTrue) {
            del.push(vl.name)
          }
        })
        // 获取新增的
        let add = []
        this.FormData.pictures.forEach(item => {
          let isTrue = true
          this.selectInfo.pictures.forEach(vl => {
            if(vl.name === item.name) {
              isTrue = false
            }
          })
          if(isTrue) {
            add.push(item)
          }
        })
        console.log(add)
        // 将删除的name进行封装
        this.FormData['deletes'] = del
        this.FormData['pictures'] = add
        this.FormData['id'] = this.selectInfo.id
        if(this.selectInfo.hasOwnProperty('picName')) {
          this.FormData['picName'] = this.selectInfo['picName']
        } else {
          if(this.FormData.hasOwnProperty('picName')) {
            delete this.FormData.picName
          }
        }
        this.$http.post(this.netApi.updatePeople, this.FormData).then(
        res => {
          if (res.body.status == 200) {
            // this.$message.success(this.$t('common.modifySuccess'));
            this.$message.success(res.body.message)
            this.$emit("active", "refresh");
          }else{
            this.$message.warning(res.body.message)
          }
          loading.close()
        },
        err => {
          this.$message.warning(err)
        });
      } else {
        if(this.FormData.hasOwnProperty('id')) {
          delete this.FormData.id
        }
        if(this.FormData.hasOwnProperty('picName')) {
          delete this.FormData.picName
        }
        this.$http.post(this.netApi.insertPeople, this.FormData).then(
        res => {
          if (res.body.status == 200) {
            this.$message.success(res.body.message)
            this.$emit("active", "refresh");
          }else{
            this.$message.warning(res.body.message)
          }
          loading.close()
        },
        err => {
          this.$message.warning(err)
        });
      }
    },
    rtxForm() {
      let isTrue = true
      this.isShow.tableDataLabel.forEach(item => {
        if(item.name === this.$t('peopleManageList.photo') && this.FormData.pictures.length === 0 && item.required) {
          this.$message.warning(this.$t('peopleManageList.pleaseUploadPhoto'))
          isTrue = false
        } else if (item.required && this.FormData[item.property] === '' && item.name !== this.$t('peopleManageList.photo')) {
          this.$message.warning(`${item.name} ${this.$t('peopleManageList.notEmpty')}`)
          isTrue = false
        }
      })
      return isTrue
    },
    initForm() {
      this.isShow.tableDataLabel.forEach(item => {
        this.FormData[item.property] = ''
      })
      this.imgList = []
      this.FormData.pictures = []
    },

    initSetForm() {
      // 设置表单值
      this.isShow.tableDataLabel.forEach(item => {
        this.FormData[item.property] = this.selectInfo[item.property]
      })
      this.FormData.pictures = JSON.parse(JSON.stringify(this.selectInfo.pictures))
      this.selectInfo.pictures.forEach((item, index) => {
        this.imgList.push({
          name: item.name,
          url: `data:image/jpeg;base64,${item.base64}`
        })
      })
    },
    initSelectInfo() {
    }
  },
};
</script>
<style lang="scss">
.create-people-dialog {
  min-width: 401px;
}
</style>
