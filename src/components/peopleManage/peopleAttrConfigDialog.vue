<template>
<div class="people-attr-config-dialog">
  <div>
      <el-tag
        v-for="(tag, index) in attrs"
        :key="index"
        @close="handleDeleteTag(tag)"
        closable
        type=""
        class="tag-style">
        {{language === 'en' && tag.hasOwnProperty('descriptionEn') ? tag.descriptionEn : tag.hasOwnProperty('descriptionZh') ? tag.descriptionZh : tag.description}}
      </el-tag>

      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="input"
        ref="saveTagInput"
        size="small"
        @blur="submit"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ {{$t("personnelType.new")}}</el-button>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">{{$t("common.ok")}}</el-button>
    </div>
  </div>
</div>
</template>
<script>
// import APICONFIG from "../../../../../config/api.js";
export default {
  name: "isShow",
  props: ["isShow", "dialogFixField"],
  data () {
    return {
      attrs: [],
      input: "",
      netAPI: "",
      inputVisible: false,
      enWorld: {
        yen: ['EntryTime', 'IcCardNumber', 'PhoneNumber', 'IdentifyNumber', 'ValidityPeriod', 'FeatureAttribute'],
        xen: ['Entry time', 'Ic card number', 'Phone number', 'Identify number', 'Validity period', 'Feature attribute']
      },
      language: localStorage.language
    };
  },
  created () {
    // this.netAPI = APICONFIG().get("people_manage");
    // this.getData();
  },
  methods: {
    handleClose (raw) {
      this.$emit("closeDialogFixField");
    },
    // 删除tag
    handleDeleteTag(raw) {
      console.log(raw)
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
      this.$http.post(this.netAPI.deletePeopleAttribute, [{
        no: raw.no
      }]).then(res => {
        loading.close();
        if(res.data.status === 200) {
          this.$message.success('success')
          this.getData();
        }
      })
    },
    submit () {
      this.inputVisible = false
      var reg = /^[A-Za-z]+$/;
      if(!this.input) return;
      if (!reg.test(this.input)) { //判断是否符合正则表达式
        this.$message.warning(this.$t('peopleManageList.fieldTips'));
        this.input = ''
        return false;
      }

      for (let item of this.attrs) {
        if(this.input === item.description) {
          this.input = ''
          this.$message.warning(this.$t('peopleManageList.fieldDupTips'));
          return
        }
      }
      const loading = this.$loading({
        lock: true,
        text: 'loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
      this.$http
        .post(this.netAPI.insertPeopleAttribute, {
          description: this.input
        })
        .then(res => {
          if (res.body.status == 200) {
            loading.close();
            this.$message.success("success!");
            this.input = ''
            this.getData();
          } else {
            loading.close();
          }
        })
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    getData () {
      let self = this
      this.$http
        .get(this.netAPI.findPeopleAttribute, {
          params: { categoryNo: 10001001 }
        })
        .then(
          res => {
            if (res.body.status == 200) {
              this.attrs = [];
              let newData = res.body.data

              newData.forEach((item, dex) => {
                self.enWorld.yen.forEach((item2, index) => {
                  if(item.descriptionEn === item2) {
                    newData[dex].description = self.enWorld.xen[index]
                    newData[dex].descriptionEn = self.enWorld.xen[index]
                  }
                })
                // this.attrs
              });
              this.attrs = newData
            }
          }
        );
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  watch: {
    dialogFixField() {
      this.input = ''
      this.getData()
    }
  }
};
</script>
<style lang="scss">
.people-attr-config-dialog {
  .button-new-tag {
    margin-top: 5px;
  }
  .tag-style {
    margin-right: 10px;
    margin-top: 5px;
  }
  .input-new-tag {
    width: 100px;
  }
  .attr-box {
    width: 100%;
  }
  .el-dialog__body {
    width: 100%;
    padding: 30px 0px;
    padding-bottom: 0px;
  }
  .attr-box {
    word-wrap: break-word;
    display: inline-block;
    width: 16%;
    padding: 3px 2%;
    height: 25px;
    text-align: center;
  }
  .input {
    padding: 3px 2%;
    margin-top: 10px;
  }
  .add-input {
    width: 130px;
  }
  .dialog-footer {
    text-align: right;
    margin-top: 10px;
  }
}
</style>

