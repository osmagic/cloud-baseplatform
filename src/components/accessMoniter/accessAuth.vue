<template>
  <div class="accessAuth">
    <div class="selectGroup">
       <el-input v-model="seatchWord" placeholder="请输入内容" class="searchI"></el-input>
        <el-button class="searchB" @click="queryGroup(seatchWord)">查询</el-button>
        <div class="editGroup">
          <el-button @click="addJur">新增权限组</el-button>
          <el-button >批量删除权限组</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
          label='序号'>
        </el-table-column>
          <el-table-column
            prop="name"
            label="权限组名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="persionRules"
            label="关联人员"
            width="180">
              <template slot-scope="scope">
                {{filterPerson(scope.row)}}
              </template>
          </el-table-column>
          <el-table-column
            prop="deviceIds"
            label="可通行设备">
            <template slot-scope="scope">
                <div @click="showDivice(scope.row)" class="pointer">
                  {{filterDevice(scope.row)}}
                </div>
              </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="允许通行时间">
             <template slot-scope="scope">
               <div class="pointer" @click="showTime(scope.row)">
                 {{filterTime(scope.row)}}
               </div>
             </template>
          </el-table-column>
            
          <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑权限组</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>

      <dialog-container :di="isDShow" top="0" @saveDialog="saveJurDialog" @closeDialog="closeJurDialog">
           <div slot="container">
             <el-form :model="jurRuleForm" :rules="jurRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限组名称" prop="name">
                  <el-input v-model="jurRuleForm.name" placeholder="请输入权限组名称"></el-input>
                </el-form-item>

                <el-form-item label="规则描述" prop="description">
                  <el-input type="textarea" v-model="jurRuleForm.description" placeholder="请输入规则描述" resize="none"></el-input>
                </el-form-item>

                <el-form-item label="关联人员">
                  <el-button type="primary" @click="showSelPerson">请选择</el-button>
                  <span>

                  </span>
                </el-form-item>

                <el-form-item label="是否允许同行" prop="allow">
                  <template slot-scope="scope">
                    <div>
                      <el-radio v-model="jurRuleForm.allow" label="1">是</el-radio>
                      <el-radio v-model="jurRuleForm.allow" label="2">否</el-radio>
                    </div>
                    
                  </template>
                </el-form-item>
  
                <el-form-item label="可通行设备">
                  <el-button type="primary" @click="showDialogDivice">请选择</el-button>
                </el-form-item>

                <el-form-item label="通行方式" prop="passageMode" v-if="jurRuleForm.allow === '1'">
                  <!-- <el-radio v-model="jurRuleForm.passageMode" label="1">人脸识别</el-radio> -->
                  <el-checkbox-group v-model="checkList">
                     <el-checkbox v-for="(item, index) in waysArr" :label="item.nameZh" ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="通行时间" v-if="jurRuleForm.allow === '1'">
                  <div class="week-time-sel">
                      <week-time-sel @getTime="getTime"></week-time-sel>
                  </div>
                </el-form-item>

             </el-form>
           </div>
      </dialog-container>

      <dialog-container :di="isShowPerson" top="0" @saveDialog="savePersonDialog" @closeDialog="closeSeDialog">
          <div slot="container">
            <select-person @seletPerson="seletPerson"></select-person>
          </div>
      </dialog-container>

       <dialog-container :di="isShowDivice" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
          <div slot="container">
            <select-divice @getSeletedDivice="getSeletedDivice"></select-divice>
          </div>
      </dialog-container>

  </div>
</template>
<script>
import DialogContainer from './common/DialogWrapper.vue'
import weekTimeSel from './common/weekTimeSel.vue'
import selectPerson from './common/selectPerson.vue'
import selectDivice from './common/selectDivice.vue'

export default {
  components: {
    DialogContainer,
    weekTimeSel,
    selectDivice,
    selectPerson
  },
   data(){
    return{
      treeData: [],
      tableData:[],
      seatchWord: '',
      isDShow: {
          Visible: false,
          Title: '新增权限组',
          Width: '574px',
          isshowfooter: true
      },
      isShowDivice: {
          Visible: false,
          Title: '新增门禁设备',
          Width: '674px',
          isshowfooter: true
      },
      isShowPerson: {
          Visible: false,
          Title: '关联人员',
          Width: '1030px',
          isshowfooter: true
      },
      weeks: [{
          name:'周一',
          file: 'mon'
        },
        {
          name:'周二',
          file: 'tue'
        },
        {
          name:'周三',
          file: 'wed'
        },
        {
          name:'周四',
          file: 'thu'
        },
        {
          name:'周五',
          file: 'fri'
        },
        {
          name:'周六',
          file: 'sat'
        },
        {
          name:'周日',
          file: 'sun'
        }],
      jurRuleForm: {
          name: '',
          passageMode: '',
          allow: '1',
          alarm: 1,
          description: '',
          mon: '',
          tue: '',
          wed: '',
          thu: '',
          fri: '',
          sat: '',
          sun: '',
          deviceIds: [],
          persionIds: []
      },
      jurRules: {
          name: [
            { required: true, message: '请输入权限组名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
      },
      selPersons: [],
      selDevices: [],
      waysArr: [],
      checkList:[]
    }
  },
  watch: {
    checkList(newVal) {
      let w = []
      newVal.forEach(item1 => {
        this.waysArr.forEach(item2 => {
          if(item1 === item2.nameZh) {
            w.push(item2.categoryNo)
          }
        })
      })
     
      this.jurRuleForm.passageMode = w.toLocaleString()
      return newVal
    },
  },
  methods: {
    // 获取时间
    getTime(weekObj) {
     this.jurRuleForm = Object.assign(this.jurRuleForm, weekObj);
    },
    savePersonDialog() {
      this.jurRuleForm.persionIds = this.selPersons
      this.isShowPerson.Visible = false
    },

    saveDiviceDialog() {
        this.jurRuleForm.deviceIds = []
        this.selDevices.forEach(item => {
          this.jurRuleForm.deviceIds.push(item.id)
        })
        this.isShowDivice.Visible = false
    },
    saveJurDialog() {
      this.$http.accessRuleInsert(this.jurRuleForm).then(res => {
        debugger
        if(res.status === 200) {
          this.$message.success('新增成功')
          this.queryGroup()
          this.isDShow.Visible = false
        } else {
           this.$message.success('新增失败')
        }
      })
      
    },
    seletPerson(personNo) {
      this.selPersons = personNo
      // console.log(personNo)
      // this.jurRuleForm.persionIds = personNo
    },
    getSeletedDivice(devices) {
      this.selDevices = devices
    },
    showSelPerson() {
      this.isShowPerson.Visible = true
    },
    closeSeDialog() {
      this.isShowDivice.Visible = false
      this.isShowPerson.Visible = false
    },
    getDiviceGroup() {
      this.$http.personGroupList({ no: '100010021001' }).then(res => {
        console.log(res)
      });
    },
    // 过滤人员
    filterPerson(row) {
      let names = [] 
      row.personBasicInfos.forEach(item => {
          names.push(item.name)
      });
      return names.toLocaleString()
    },
    // 过滤设备
    filterDevice(row) {
     let divices = [] 
      row.deviceInfos.forEach(item => {
          divices.push(item.name)
      });
      return divices.toLocaleString()
    },
    // 查询权限组
    queryGroup(name) {
      // let params = {name}
       this.$http.getAccessRuleList({name}).then((res) => {
          this.tableData = res.data.data
        })
    },
    // 查询通行方式
    queryWay() {
      this.$http.getWays({}).then((res) => {
        this.waysArr = res.data.data
      })
    },
    // 显示设备组
    showDivice(row) {
      console.log(22332323)
       
    },
    // 在新增和编辑权限组中操作
    showDialogDivice() {
      this.isShowDivice.Visible = true
    },
    showTime(row) {

    },
    showPerson() {

    },
    filterTime(row) {
      let str = ''
      this.weeks.forEach(item => {
        str =  `${str} ${item.name}[${row[item.file]}]`
      })
      return str.substr(1)
    },
   
    closeJurDialog() {
      console.log('pppp')
      this.isDShow.Visible = false
      
    },
    addJur() {
      this.isDShow.Visible = true
    }
  },
  mounted() {
    // 查询规则
    this.queryGroup()
    // 查询通行方式
    this.queryWay()
  }
}
</script>
<style lang="scss" scoped>
.accessAuth{
  padding: 20px;
  .week-time-sel {
    height: 330px;
    overflow: auto;
  }
}
// .el-dialog{ -webkit-backface-visibility: hidden; }

.searchI{
  width: 200px;
}
.searchB{
  background:rgba(76,131,255,1);
  color: white;
  margin-left: 20px;
}
.editGroup{
  display: inline-block;
  float: right;
}
.table{
  height: 850px;
  margin-top: 20px;
}
.pointer {
  cursor: pointer;
}
</style>
