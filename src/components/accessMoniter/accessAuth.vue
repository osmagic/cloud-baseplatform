<template>
  <div class="accessAuth">
    <div class="selectGroup">
       <el-input v-model="seatchWord" placeholder="请输入内容" class="searchI"></el-input>
        <el-button class="searchB" @click="queryGroup(seatchWord)">查询</el-button>
        <div class="editGroup">
          <el-button @click="addJur">新增权限组</el-button>
          <el-button @click="delJurs">批量删除权限组</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
           @selection-change="handleSelectionChange"
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
                <div @click="showAssPerson(scope.row)" class="pointer">
                   {{filterPerson(scope.row)}}
                </div>
              </template>
          </el-table-column>
          <el-table-column
            prop="deviceIds"
            label="可通行设备">
            <template slot-scope="scope">
              <div @click="showAssDivice(scope.row)" class="pointer">
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
            <el-button @click="editJur(scope.row)" type="text" size="small">编辑权限组</el-button>
            <el-button type="text" size="small" @click="delJur([{id:scope.row.id}])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>

      <dialog-container :di="isDShow" top="0" @saveDialog="saveJurDialog" @closeDialog="closeJurDialog">
           <div slot="container">
             <!-- {{jurRuleForm}} -->
             <el-form :model="jurRuleForm" :rules="jurRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限组名称" prop="name">
                  <el-input v-model="jurRuleForm.name" placeholder="请输入权限组名称"></el-input>
                </el-form-item>

                <el-form-item label="规则描述" prop="description">
                  <el-input type="textarea" v-model="jurRuleForm.description" placeholder="请输入规则描述" resize="none"></el-input>
                </el-form-item>

                <el-form-item label="关联人员" prop="persionIds">
                  <el-button type="primary" @click="showSelPerson">请选择</el-button>
                  <span>
                      {{selPersons.length> 0 ? selPersons[0].name : ''}}...
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
  
                <el-form-item label="可通行设备" prop="deviceIds">
                  <el-button type="primary" @click="showDialogDivice">请选择</el-button>
                  <span>{{selDevices.length > 0 ? selDevices[0].deviceName : ''}}...</span>
                </el-form-item>

                <el-form-item label="通行方式" prop="passageMode" v-if="jurRuleForm.allow === '1'">
                  <!-- <el-radio v-model="jurRuleForm.passageMode" label="1">人脸识别</el-radio> -->
                  <el-checkbox-group v-model="passcheckList">
                     <el-checkbox v-for="(item, index) in waysArr" :label="item.nameZh" ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="通行时间" v-if="jurRuleForm.allow === '1'">
                  <div class="week-time-sel">
                      <week-time-sel @getTime="getTime" :setWeekTime="setWeekTime"></week-time-sel>
                  </div>
                </el-form-item>

             </el-form>
           </div>
      </dialog-container>

      <!-- 关联人员 -->
      <dialog-container :di="isShowPerson" top="0" @saveDialog="savePersonDialog" @closeDialog="closeSeDialog">
          <div slot="container">
            <select-person @seletPerson="seletPerson"></select-person>
          </div>
      </dialog-container>
       
       <!-- 关联设备 -->
       <dialog-container :di="isShowDivice" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
          <div slot="container">
            <select-divice @getSeletedDivice="getSeletedDivice"></select-divice>
          </div>
      </dialog-container>
      
      <!-- 显示设备已经关联得人员 -->
      <dialog-container :di="isshowGlPerson" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
         <div slot="container">
           <el-table
                :data="glPersonsTable"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column label="人员编号" prop="code">

              </el-table-column>
               <el-table-column label="名称" prop="name">

              </el-table-column>
               <el-table-column label="照片">
                 <template slot-scope="scope">
                   <!-- {{scope.row.personBasicInfoVo.urls[0]}} -->
                  <img :src="scope.row.personBasicInfoVo.urls[0]" class="table-img"/>
                 </template>
              </el-table-column>
           </el-table>

           <div class="footer-table">
              <div class="del-gl-divice">
                 <el-button type="primary" @click="removeRule">从规则移除</el-button>
                 <el-button @click="removeRule">一键清空</el-button>
              </div>

              <div class="footer-page">

              </div>

           </div>
         </div>
      </dialog-container>

      <!-- 显示设备已经关联得设备 -->
      <dialog-container :di="isshowGlDivice" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
         <div slot="container">
            <el-table
                :data="glDivicesTable"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column label="设备名称">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.name}}
                 </template>
              </el-table-column>
              <el-table-column label="设备ip">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.ip}}
                 </template>
              </el-table-column>
              <el-table-column label="设备组编号">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.groupNo}}
                 </template>
              </el-table-column>
           </el-table>
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
      // 权限已经关联得人员
      isshowGlPerson: {
        Visible: false,
        Title: '已关联的人员列表',
        Width: '1030px',
        isshowfooter: false
      },
      // 权限已经关联得设备
      isshowGlDivice: {
        Visible: false,
        Title: '已关联的设备列表',
        Width: '1030px',
        isshowfooter: false
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
      },
      initRuleForm: {
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
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]

      },
      selPersons: [],
      selDevices: [],
      waysArr: [],
      passcheckList:[],
      seletJurs: [], // 选中得门禁
      setWeekTime: {}, // 编辑得时候设时间
      glPersonsTable: [], // 关联的人员列表
      glDivicesTable: [], // 关联的设备列表
    }
  },
  watch: {
    passcheckList(newVal) {
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
    removeRule() {

    },
    showAssPerson(row) {
      this.isshowGlPerson.Visible = true
      this.$http.personByRule({
        ruleIds: row.id
      }).then((res) => {
        this.glPersonsTable = res.data.data
      })
    },
    showAssDivice(row) {
      this.isshowGlDivice.Visible = true
       this.$http.deviceByRuleFind({
        ruleIds: row.id
      }).then((res) => {
        this.glDivicesTable = res.data.data
        console.log(this.glDivicesTable)
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.seletJurs = val
    },
    // 删除权限
    delJur(idsArr) {
      this.$http.accessRuleDel(idsArr).then(res => {
        this.queryGroup()
      })
     
    },
    // 编辑权限组
    editJur(row) {
      console.log(row)
      // 后台会将allow转成int类型
      row.allow = String(row.allow)
      this.jurRuleForm = row
      let wayIds = []
      let wayNames = []
      // 将通行规则得id转化成数组得name
      wayIds = this.jurRuleForm.passageMode.split(',')
      wayIds.forEach(id => {
         this.waysArr.forEach(item => {
           if(id === item.categoryNo) {
             wayNames.push(item.nameZh)
           }
         })
      })
      this.passcheckList = wayNames
      // 获取时间
      let t= {}
      this.weeks.forEach(item => {
        t[item.file] = row[item.file]
      })
      this.setWeekTime = t
      this.isDShow.Visible = true
    },
    // 获取时间
    getTime(weekObj) {
    //  this.setWeekTime = weekObj
     this.jurRuleForm = Object.assign(this.jurRuleForm, weekObj);
    },
    savePersonDialog() {
      let personIds = []
      this.selPersons.forEach(item => {
        personIds.push(item.personId)
      })
      this.jurRuleForm.persionIds = personIds
      this.isShowPerson.Visible = false
    },
    saveDiviceDialog() {
        this.jurRuleForm.deviceIds = []
        this.selDevices.forEach(item => {
          this.jurRuleForm.deviceIds.push(item.deviceId)
        })
        this.isShowDivice.Visible = false
    },
    saveJurDialog() {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
             if(this.jurRuleForm.id) {
                 this.$http.accessRuleModify(this.jurRuleForm).then(res => {
                    if(res.status === 200) {
                      this.$message.success('编辑成功')
                      this.isDShow.Visible = false
                    } else {
                      this.$message.error('编辑失败')
                    }
                 })
             } else {
                this.$http.accessRuleInsert(this.jurRuleForm).then(res => {
                  if(res.status === 200) {
                    this.$message.success('新增成功')
                    this.queryGroup()
                    this.isDShow.Visible = false
                  } else {
                    this.$message.error('新增失败')
                  }
                })
             }
             
          }
      })
      
    },
    seletPerson(persons) {
      this.selPersons = persons
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
      this.isshowGlPerson.Visible = false
       this.isshowGlDivice.Visible = false
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
      this.jurRuleForm = JSON.parse(JSON.stringify(this.initRuleForm))
      this.setWeekTime = {
          fri: "00:10-24:00",
          mon: "00:10-24:00",
          sat: "00:10-24:00",
          sun: "00:10-24:00",
          thu: "00:10-24:00",
          tue: "00:10-24:00",
          wed: "00:10-24:00"
      }
      this.isDShow.Visible = true
    },
    delJurs() {
      let jurIds = []
      this.seletJurs.forEach(item => {
         jurIds.push(
           {id: item.id
           })
      })
      console.log(jurIds)
      this.delJur(jurIds)

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
.footer-table {
  .del-gl-divice {

  }
  .footer-page {

  }
}
// .el-dialog{ -webkit-backface-visibility: hidden; }
.table-img {
  width: 100px;
}
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
