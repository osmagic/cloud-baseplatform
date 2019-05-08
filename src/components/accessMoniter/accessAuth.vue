<template>
  <div class="accessAuth">
    <div class="selectGroup">
       <el-input v-model.trim="seatchWord" placeholder="请输入内容" class="searchI"></el-input>
        <el-button class="searchB" @click="queryGroup(seatchWord)">查询</el-button>
        <div class="editGroup">
          <el-button @click="addJur">新增权限组</el-button>
          <el-button @click="delJurs">批量删除权限组</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            @selection-change="handleSelectionRuleChange"
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
              <!-- <template slot-scope="scope">
                <div class="pointer" @click="showTime(scope.row)">
                  {{filterTime(scope.row)}}
                </div>
              </template> -->
              <template slot-scope="timeScope">
                <el-popover placement="left-start" trigger="hover">
                  <span
                    slot="reference"
                  >{{$t('accessSystem.zhouyi')}} {{timeScope.row.mon}}{{$t('accessSystem.dian')}}...</span>
                  <p>{{$t('accessSystem.zhouyi')}} {{timeScope.row.mon}}</p>
                  <p>{{$t('accessSystem.zhouer')}} {{timeScope.row.tue}}</p>
                  <p>{{$t('accessSystem.zhousan')}} {{timeScope.row.wed}}</p>
                  <p>{{$t('accessSystem.zhousi')}} {{timeScope.row.thu}}</p>
                  <p>{{$t('accessSystem.zhouwu')}} {{timeScope.row.fri}}</p>
                  <p>{{$t('accessSystem.zhouliu')}} {{timeScope.row.sat}}</p>
                  <p>{{$t('accessSystem.zhouri')}} {{timeScope.row.sun}}</p>
                </el-popover>
              </template>
            </el-table-column>
              
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="editJur(scope.row)" type="text" size="small">编辑权限组</el-button>
              <el-button type="text" size="small" @click="delSJur([{id:scope.row.id}])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="footer-bottom">
          <el-pagination
            class="pagination"
            @size-change="mainTableSizeChange"
            @current-change="mainCurrentChange"
            :current-page="mainCurrentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size.sync="mainPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="mainTotal"
          >
          </el-pagination>
        </div>
     
      </div>

      <dialog-container :di="isDShow" top="0" @saveDialog="saveJurDialog" @closeDialog="closeJurDialog">
           <div slot="container" class="el-form-content">
             <!-- {{selDevices}} -->
             <div class="el-form-left">
               <el-form :model="jurRuleForm" :rules="jurRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="权限组名称" prop="name">
                    <el-input v-model="jurRuleForm.name" placeholder="请输入权限组名称"></el-input>
                  </el-form-item>

                  <el-form-item label="规则描述" prop="description">
                    <el-input type="textarea" v-model="jurRuleForm.description" placeholder="请输入规则描述" resize="none"></el-input>
                  </el-form-item>

                  <el-form-item label="关联人员" prop="persionIds">
                    <el-button type="primary" @click="showSelPerson">
                      {{selPersons.length > 0 ? selPersons[0].name : '请选择'}}
                    </el-button>
                  </el-form-item>

                  <el-form-item label="是否允许同行" prop="allow">
                    <template slot-scope="scope">
                      <div>
                        <el-radio v-model="jurRuleForm.allow" label="1">是</el-radio>
                        <el-radio v-model="jurRuleForm.allow" label="2">否</el-radio>
                      </div>
                    </template>
                  </el-form-item>
    
                  <el-form-item label="是否告警" prop="deviceIds" v-if="jurRuleForm.allow === '2'">
                     <el-select v-model="jurRuleForm.alarm" placeholder="请选择">
                        <el-option
                          v-for="item in alermOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="可通行设备" prop="deviceIds" v-if="jurRuleForm.allow === '1'">
                    <el-button type="primary" @click="showDialogDivice">{{selDevices.length > 0 ? selDevices[0].deviceName : '请选择'}}</el-button>
                  </el-form-item>

                  <el-form-item label="通行方式" prop="passageMode" v-if="jurRuleForm.allow === '1'">
                    <!-- <el-radio v-model="jurRuleForm.passageMode" label="1">人脸识别</el-radio> -->
                    <el-checkbox-group v-model="passcheckList">
                      <el-checkbox v-for="(item, index) in waysArr" :label="item.nameZh" v-show="index === 0"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
              </el-form>
             </div>
             
             <div class="el-form-right">
               <el-form style="margin-left: 70px">
                  <el-form-item label="通行时间" v-if="jurRuleForm.allow === '1'">
                      <div class="week-time-sel">
                          <week-time-sel @getTime="getTime" :setWeekTime="setWeekTime"></week-time-sel>
                      </div>
                    </el-form-item>
                </el-form>
             </div>
             
           </div>
      </dialog-container>

      <!-- 关联人员 -->
      <dialog-container :di="isShowPerson" top="0" @saveDialog="savePersonDialog" @closeDialog="closeSeDialog">
          <div slot="container">
            <select-person @seletPerson="seletPerson" :setSelPersons="setSelPersons"></select-person>
          </div>
      </dialog-container>
       
       <!-- 关联设备 -->
       <dialog-container :di="isShowDivice" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
          <div slot="container">
            <select-divice @getSeletedDivice="getSeletedDivice" :setSelDivices="setSelDivices"></select-divice>
          </div>
      </dialog-container>
      
      <!-- 显示权限已经关联得人员 -->
      <dialog-container :di="isshowGlPerson" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
         <div slot="container">
           <el-table
              :data="glPersonsTable"
              @selection-change="handleSelectionPerson"
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
                  <img :src="scope.row.personBasicInfoVo.urls !== null ? scope.row.personBasicInfoVo.urls[0] : ''" class="table-img"/>
                 </template>
              </el-table-column>
           </el-table>

           <div class="footer-table">
              <div class="del-gl-divice">
                <el-button type="primary" @click="removeRuleByPerson">从规则移除</el-button>
                <el-button @click="removeRuleByPerson('empty')">一键清空</el-button>
                
                <div class="footer-page">
                  <el-pagination
                    class="pagination"
                    @size-change="personTableSizeChange"
                    @current-change="personCurrentChange"
                    :current-page="personCurrentPage"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size.sync="personPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="personTotal"
                  >
                  </el-pagination>
                </div>
              </div>
           </div>
         </div>
      </dialog-container>

      <!-- 显示权限已经关联得设备 -->
      <dialog-container :di="isshowGlDivice" top="0" @saveDialog="saveDiviceDialog" @closeDialog="closeSeDialog">
        <div slot="container">
          <el-table
                :data="glDivicesTable"
                @selection-change="handleSelectionDivice"
                style="width: 100%">
                <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column label="设备名称">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.name !== null ? scope.row.deviceInfoVo.name : ''}}
                 </template>
              </el-table-column>
              <el-table-column label="设备ip">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.ip}}
                 </template>
              </el-table-column>
              <el-table-column label="设备编号">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.groupNo !== null ? scope.row.deviceInfoVo.groupNo : ''}}
                 </template>
              </el-table-column>
              <el-table-column label="关联时间">
                 <template slot-scope="scope">
                   {{scope.row.deviceInfoVo.updateTime !== null ? scope.row.deviceInfoVo.updateTime : ''}}
                 </template>
              </el-table-column>
          </el-table>
          <div class="footer-table">
            <div class="del-gl-divice">
                <el-button type="primary" @click="removeRuleByDivice">从规则移除</el-button>
                <el-button @click="removeRuleByDivice('empty')">一键清空</el-button>
                <div class="footer-page">
                  <el-pagination
                    class="pagination"
                    @size-change="diviceTableSizeChange"
                    @current-change="diviceCurrentChange"
                    :current-page="diviceCurrentPage"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size.sync="divicePageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="diviceTotal"
                  >
                  </el-pagination>
                </div>
            </div>
          </div>
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
          Width: '900px',
          isshowfooter: true
      },
      isShowDivice: {
          Visible: false,
          Title: '选择门禁设备',
          Width: '674px',
          isshowfooter: true
      },
      isShowPerson: {
          Visible: false,
          Title: '选择关联人员',
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
      alermOptions: [{
        label: '告警',
        value: 1
      },
      {
        label: '不告警',
        value: 0
      }],
      passcheckList:[],
      seletJurs: [], // 选中得门禁
      setWeekTime: {}, // 编辑得时候设时间
      glPersonsTable: [], // 关联的人员列表
      glDivicesTable: [], // 关联的设备列表
      delTableGlPersons: [], // 删除关联的人员
      delTableGlDivices: [], // 删除关联的人员
      selectTableRuleObj: '', // 打开展开关联的规则obj
      mainPageSize: 10,
      mainTotal: 0,
      mainCurrentPage: 1,
      personPageSize: 10,
      personTotal: 0,
      personCurrentPage: 1,
      divicePageSize: 10,
      diviceTotal: 0,
      diviceCurrentPage: 1,
      setSelPersons: [], // 设置给已选择的人员打勾
      setSelDivices: [] // 设置给已选择的设备打勾
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
    diviceTableSizeChange(val) {
       this.divicePageSize = val
       this.showAssDivice(this.selectTableRuleObj)
    },
    diviceCurrentChange(val) {
       this.diviceCurrentPage = val
       this.showAssDivice(this.selectTableRuleObj)
    },
    personTableSizeChange(val) {
       this.personPageSize = val
       this.showAssPerson(this.selectTableRuleObj)
    },
    personCurrentChange(val) {
       this.personCurrentPage = val
       this.showAssPerson(this.selectTableRuleObj)
    },
    mainTableSizeChange(val) {
       this.mainPageSize = val
       this.queryGroup()
    },
    mainCurrentChange(val) {
       this.mainCurrentPage = val
       this.queryGroup()
    },
    carryOutRemoveRuleByDivice() {
      let delDiviceIds = []
      this.delTableGlDivices.forEach(item => {
        delDiviceIds.push({
          id:item.id
        })
      })
      this.$http.deviceByRuleDel(delDiviceIds).then(res => {
        if(res.status === 200) {
          this.$message.success('删除成功')
          // 刷新权限列表
          this.queryGroup()
          // 刷新关联列表
          this.showAssDivice(this.selectTableRuleObj)
        }
      })
    },
    // 删除关联的设备
    removeRuleByDivice(type) {
       if(type === 'empty') {
          this.$confirm('此操作将清空所有关联人员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             this.carryOutRemoveRuleByDivice()
          })
       } else {
          this.carryOutRemoveRuleByDivice()
       }
    },
    carryOutRemoveRuleByPerson() {
        let delPersonIds = []
          this.delTableGlPersons.forEach(item => {
            delPersonIds.push({
              id:item.id
            })
          })
          this.$http.personByRuleRemove(delPersonIds).then(res => {
            if(res.status === 200) {
              this.$message.success('删除成功')
              // 刷新权限列表
              this.queryGroup()
              // 刷新关联列表
              this.showAssPerson(this.selectTableRuleObj)
            }
          })
    },
    removeRuleByPerson(type) {
       if(type === 'empty') {
          this.$confirm('此操作将清空所有关联人员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             this.carryOutRemoveRuleByPerson()
          })
       } else {
          this.carryOutRemoveRuleByPerson()
       }
    },
    // 展示关联的人员
    showAssPerson(row) {
      this.selectTableRuleObj = row
      this.isshowGlPerson.Visible = true
      this.$http.personByRule({
        ruleIds: row.id,
        pageSize: this.personPageSize,
        pageNo: this.personCurrentPage
      }).then((res) => {
        this.glPersonsTable = res.data.data
        this.personTotal = res.data.total
      })
    },
    // 展示关联的设备
    showAssDivice(row) {
      this.selectTableRuleObj = row
      this.isshowGlDivice.Visible = true
       this.$http.deviceByRuleFind({
        ruleIds: row.id
      }).then((res) => {
        this.glDivicesTable = res.data.data
        this.diviceTotal = res.data.total
        console.log(this.glDivicesTable)
      })
    },
    // 选择门禁的列表
    handleSelectionRuleChange(val) {
      console.log(val)
      this.seletJurs = val
    },
    // 触发选择人员
    handleSelectionPerson(val) {
      this.delTableGlPersons = val
    },
    // 触发选择的设备
    handleSelectionDivice(val) {
      this.delTableGlDivices = val
    },
    // 删除权限
    delSJur(idsArr) {
      this.mainCurrentPage = 1
      this.$http.accessRuleDel(idsArr).then(res => {
        if(res.data.status === 200) {
          this.queryGroup()
          this.$message.success('删除成功')
        }
      })
    },
    // 编辑权限组
    editJur(row) {
      this.isDShow.Title = '编辑权限组'
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

      // 关联的人员
      this.selPersons = row.personBasicInfos

      this.setSelPersons = this.selPersons
      // 关联设备
      row.deviceInfos.forEach(d => {
        this.selDevices.push({
          deviceId: d.id,
          deviceName: d.name
        })
      })
      this.setSelDivices = JSON.parse(JSON.stringify(this.selDevices))
      // this.selDevices = row.deviceInfos
      this.isDShow.Visible = true
    },
    // 获取时间
    getTime(weekObj) {
    //  this.setWeekTime = weekObj
     this.jurRuleForm = Object.assign(this.jurRuleForm, weekObj);
    },
    // 确定选中的人员
    savePersonDialog() {
      
      this.isShowPerson.Visible = false
    },
    saveDiviceDialog() {
        
        this.isShowDivice.Visible = false
    },
    saveJurDialog() {
      

      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // 赋值personIds
            let personIds = []
            this.selPersons.forEach(item => {
              personIds.push(item.personId)
            })
            this.jurRuleForm.persionIds = personIds
            // 赋值diviceIds
            this.jurRuleForm.deviceIds = []
            this.selDevices.forEach(item => {
              this.jurRuleForm.deviceIds.push(item.deviceId)
            })

             if(this.jurRuleForm.id) {
                 this.$http.accessRuleModify(this.jurRuleForm).then(res => {
                    if(res.status === 200) {
                      this.isDShow.Visible = false
                      this.queryGroup()
                       this.$message.success('编辑成功')
                    } else {
                      this.$message.error('编辑失败')
                    }
                 })
             } else {
                this.$http.accessRuleInsert(this.jurRuleForm).then(res => {
                  console.log(res)
                  if(res.status === 200) {
                    this.isDShow.Visible = false
                    this.queryGroup()
                    this.$message.success('新增成功')
                  } else {
                    this.$message.error(res.message)
                  }
                })
             }
             
          }
      })
      
    },
    seletPerson(persons) {
      console.log(persons)
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
      if(name !== '' && name !== undefined) {
        this.mainCurrentPage = 1
      }
      this.$http.getAccessRuleList({
        name,
        pageSize: this.mainPageSize,
        pageNo: this.mainCurrentPage
      }).then((res) => {
        this.tableData = res.data.data
        console.log(res)
        this.mainTotal = res.data.total
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
    // 初始化新增得表单
    initAddForm() {
      this.selDevices = []
      this.selPersons = []
      this.passcheckList = []
    },
    addJur() {
      this.isDShow.Title = '新增权限组'
      this.initAddForm()
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
      this.delSJur(jurIds)

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
.el-form-content {
  display: flex;
  .el-form-left {
    flex: 2;
  }
  .el-form-right {
    flex: 3;
  }
}

.footer-table {
  margin-top: 20px;
  .del-gl-divice {

  }
  .footer-page {
    float: right;
    display: inline-block;
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
  height: auto;
  margin-top: 20px;
}
.pointer {
  cursor: pointer;
}
.footer-bottom {
  text-align: right;
  margin-top: 10px;
}
</style>
