<template>
  <div class="new-people-type">
    <el-form :model="Form" :rules="rules" ref="ruleForm" label-width="100px" >
      <el-form-item :label="$t('personnelType.typeName')" prop="peopleType" >

        <el-input
          :placeholder="$t('personnelType.pleaseEnterTypeName')"
          :disabled="isEditPersonType"
          v-model.trim="Form.peopleType"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('personnelType.infField')" prop="infoAttribute">
        <div>
          <el-checkbox-group v-model="Form.checkList">
            <div v-for="(item,index) in Form.attribute" :key="index">
              <el-checkbox :label="item"  v-if="item == $t('personnelType.name') || item == $t('personnelType.code')" disabled></el-checkbox>
              <el-checkbox :label="item" v-else></el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <div>
            <span style="float:left">{{$t("personnelType.explain")}}</span>
            <span style="float: right;">
               <el-popover
                  placement="right"
                  width="530"
                  trigger="click">
                  <template>
                    <el-transfer
                      v-model="Form.attribute"
                      :props="{key: 'description',label: 'description'}"
                      :data="attributesArr"
                      :titles="[$t('personnelType.unchecked'),$t('personnelType.selection')]"
                      filterable
                      :filter-method="filterMethod"
                      :filter-placeholder="$t('personnelType.inputField')">
                    </el-transfer>
                  </template>
                  <el-button  icon="el-icon-edit" circle slot="reference"></el-button>
                </el-popover>
            </span>
        </div>
      </el-form-item>
      <el-form-item :label="$t('personnelType.group')"  prop="global">
         <el-switch
          v-model="showGroup"
          :active-text="$t('personnelType.yes')"
          :inactive-text="$t('personnelType.no')">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{$t("common.cancel")}}</el-button>
      <el-button type="primary" @click="submit">{{$t("common.ok")}}</el-button>
    </div>
  </div>
</template>
<script>
// import APICONFIG from "../../../../../config/api.js";
export default {
  name: "isShow",
  props: {
    peopleTypeInfo: {
      type: Array,
      default: []
    },
    peopleBaseInfo: {
      type: Object,
      default: {}
    },
    isEditPersonType: {
      type: Boolean,
      default: false
    },
    dialogAddPeopleType: {
      type: Boolean,
      default: false
    }
  },
  data() {

    return {
      netAPI: "",
      Form: {
        peopleType: this.peopleBaseInfo.peopleTypeName,
        attribute: [this.$t('personnelType.name'), this.$t('personnelType.code')], //需要的字段
        checkList: [this.$t('personnelType.name'), this.$t('personnelType.code')] //必填的字段
      },
      attributesArr: [], //公共的字段
      rules: {
        peopleType: [
          { trigger: "blur" }
        ]
      },
      filterMethod(query, item) {
        return item.description.indexOf(query) > -1;
      },
      res: [],
      showGroup: true
    };
  },
  methods: {
    handleClose(ok = null) {
      // 关闭窗口
      this.$emit("dialogClosePeopleType")
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
      // 关闭窗口
      // if(this.Form.peopleType === '') {
      //   this.$message.warning('类型名称不能为空')
      //   return
      // }
      if(this.Form.peopleType === '') {
        this.$message.warning('please enter a type name')
        return
      }
      let send = {
        name: this.Form.peopleType,
        children: [{
          description:'Name',
          name:'name',
          details:{required:'1'}
        },{
           description:'Number',
          name:'code',
          details:{required:'1'}
        }],
        needGroup: this.showGroup,

      };
      //根据名字绑定数据
      for (let item of this.res) {
        // console.log(item)
        for (let name of this.Form.attribute) {
          // console.log(name)
          if (item.description == name) {
            send.children.push({
              description: name,
              name: item.name,
              isGroup: this.showGroup
            });
          }
        }
      }
      send.children.forEach((item, index) => {
        let isTrue = false
        this.Form.checkList.forEach((item2, index2) => {
          if(item.description === item2) {
            isTrue = true
          }
        })
        if(isTrue) {
          item.details = {
            required: '0'
          }
        } else {
          item.details = {
            required: '1'
          }
        }
      })

      if(send.children.length > 20) {
        this.$message.success(this.$t('personnelType.numFiledTips'));
        return
      }
      if(this.isEditPersonType) {
        send.no = this.peopleBaseInfo.categoryNo
        send.id = this.peopleBaseInfo.id
        this.$http.personTypeModify(send).then(
          res => {
            if (res.data.status == 200) {
              this.$message.success(this.$t('common.modifySuccess'));
              this.$emit("dialogClosePeopleType");
              this.handleClose("refresh");
            }
          }
        );
      } else {
        this.$http.personTypeInsert(send) .then(
          res => {
            if (res.data.status == 200) {
              this.$message.success(this.$t('common.addSuccess'));
              this.$emit("dialogClosePeopleType")
              this.initData();
            }
          }
        );
      }
    },
    getAttributes() {
      //查询所有属性
      this.$http.getPersonelList()
      .then(
        res => {
          if (res.data.status == 200) {
            this.attributesArr.length = 0;
            this.attributesArr = res.data.data;
            this.attributesArr.forEach((item, index) => {
              if(item.no === '100010011001' || item.no === '100010011002') {
                this.attributesArr[index].disabled = true
              }
            })
            this.res = res.data.data;
            // console.log(JSON.stringify(this.res))
          }
        }
      )
    },
    initData() {
      this.Form = {
        peopleType: this.peopleBaseInfo.peopleTypeName,
        attribute: [this.$t('personnelType.name'), this.$t('personnelType.code')], //需要的字段
        checkList: [this.$t('personnelType.name'), this.$t('personnelType.code')] //必填的字段
      }
      // this.attributesArr = [];
      // this.$refs.ruleForm.resetFields();
    },
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 获取绑定人员类型的属性字段名称集合
    getPersonFieldName() {
      this.initData()
      console.log(this.peopleTypeInfo)
      this.peopleTypeInfo.forEach(item => {
        if(item.description !== this.$t('personnelType.name') && item.description !== this.$t('personnelType.code')) {
          this.Form.attribute.push(item.description)
          var isrequired = JSON.parse(item.value)
          if(isrequired.required === '0') {
            this.Form.checkList.push(item.description)
          }
        }
      })
    },
    // 判断是否分组
    distGroup() {
      let categoryValue = this.peopleBaseInfo.categoryValue
      if (JSON.parse(categoryValue).hasOwnProperty('group')) {
        this.showGroup = true
      } else {
        //
        this.showGroup = true
      }
    }
  },
  created() {
    // this.netAPI = APICONFIG().get("people_manage")
    this.getAttributes()
    if(this.isEditPersonType) {
      this.getPersonFieldName()
      // 判断是否分组
      this.distGroup()
    }
    // if(this.peopleBaseInfo.peopleTypeName === '常客') {
    //   this.showGroup = true
    // }
  },
  watch: {
    dialogAddPeopleType(val) {
      if(val === true) {
        this.getAttributes()
        this.distGroup()
        this.getPersonFieldName()
      }
    },
    'peopleBaseInfo': {
      handler(val) {
        // if(val.peopleTypeName === '常客') {
        //   this.showGroup = true
        // }
        this.distGroup()
        this.Form.peopleType = val.peopleTypeName
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.new-people-type {
  .dialog-footer {
    text-align: right;
  }
  .attribute-button {
    text-align: right;
  }
}

</style>
