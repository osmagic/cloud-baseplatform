<template>
  <div class="hardwarePage">
    <!-- 顶部按钮 -->
    <div class="setting" ref="settingBox">
      <el-button @click="trunToSetting(multipleSelection)" :disabled="multipleSelection.length<1">
          {{$t('deviceList.batchSetting')}}
      </el-button>
      <el-button @click="reload">
          {{$t('deviceList.refreshList')}}
      </el-button>
      <el-button :disabled="!$route.meta['modify']">
          {{$t('deviceList.factoryReset')}}
      </el-button>
      <el-button :disabled="!$route.meta['modify']">
          {{$t('deviceList.batchUpdate')}}
      </el-button>
    </div>
    <!-- 搜索栏 -->
    <div class="hardwareSearch">
      <div class="hardwareSearch-left">
        <el-form :inline="true" :model="search" class="search-form">
          <el-form-item :label="$t('deviceList.deviceType') +'：'">
          <el-select class="mini-input deviceType-input"
                     v-model="search.deviceType"
                     :placeholder="$t('deviceList.deviceType')"
                     style="width:172px"
                     clearable>
            <el-option
              v-for="(item,index) in alldeviceTypeName"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="search.name"
                      :placeholder="$t('deviceList.deviceName')"
                      style="width:180px"
                      clearable
                      class="deviceName-input"></el-input>
          </el-form-item>
        <el-button type="primary" @click="searchtabledata('search')">{{$t('common.search')}}</el-button>
        </el-form>
      </div>
      <!-- 第二行按钮 -->
      <div class="hardwareSearch-right" ref="mainBox">
        <el-button @click="deleteRow(multipleSelection)"
                   style="color:#BABABA"
                   ref="batchremove"
                   :disabled="batchdisabled">
          {{$t('common.batchRemove')}}
        </el-button>
        <el-button style="color:#BABABA"
                   ref="batchgroup"
                   :disabled="batchdisabled"
                   @click="openBatch(multipleSelection)">
          {{$t('deviceList.batchGroup')}}
        </el-button>
        <el-button :disabled="!$route.meta['add']" @click="openAdd">
          {{$t('deviceList.addDevice')}}
        </el-button>
        <el-button @click="doimport">
            {{$t('deviceList.batchImport')}}
        </el-button>
      </div>
    </div>
    <!-- 详情列表 -->
    <div class="table-box">
    <el-table :data="tableData"
              v-loading="tableBoxLoading"
              :header-cell-style="{background:'rgba(245,248,252,1)'}"
              @selection-change="handleSelectionChange"
              style="width: 100%"
              height="646"
              ref="hardwaretable"
              :row-key="getRowKeys">
      <el-table-column
        type="selection"
        align="center"
        width="50"
        reserve-selection
        :selectable="filterselectable"
        >
        <!-- @selection-change="handleSelectionChange" -->
      </el-table-column>
      <el-table-column prop="name" :label="$t('deviceList.name')" align="center" width="125" fixed="left">
        <template slot-scope="scope">
          <span v-if="scope.row.name" :title="scope.row.name">{{scope.row.name.slice(0,7)}}...</span>
        </template>
      </el-table-column>
      <el-table-column prop="groupNo" :label="$t('deviceList.group')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.groups"
                :title="scope.row.groups[0].groupName">
                {{scope.row.groups[0].groupName.slice(0,9)}}...
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" :label="$t('deviceList.ip')" width="130" align="center">
      </el-table-column>
      <el-table-column prop="snNumber" :label="$t('deviceList.sn')" align="center">
      </el-table-column>
      <el-table-column prop="status"
                       :label="$t('deviceList.status')"
                       align="center"
                       :formatter="filterTabledata">
      </el-table-column>
      <el-table-column prop="administrator" :label="$t('deviceList.administrator')" align="center" width="114">
        <template slot-scope="scope">
          <span v-if="scope.row.admins" :title="filterAdmins(scope.row)">{{scope.row.admins[0].adminName}}...</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" :label="$t('deviceList.time')" align="center"  width="145">
        <template slot-scope="scope">
          <span v-if="scope.row.updateTime"
                :title="scope.row.updateTime">{{scope.row.updateTime.slice(0,10)}}...</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceList.operation')" align="center" width="205" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailopen(scope.row)" >
          {{$t('common.edit')}}
          </el-button>
          <el-button type="text" size="small" @click="openUpgrade(scope.row)" >
          {{$t('deviceList.update')}}
          </el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">
          {{$t('common.delete')}}
          </el-button>
          <el-button type="text" size="small" @click="openParameSetting(scope.row)" >
          {{$t('deviceList.paramsSetting')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-box">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,20]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    </div>

    <!-- 添加设备模态框 -->
    <el-dialog :title="$t('deviceList.addIntelligent')"
               :visible.sync="adddialogVisible"
               width="575px"
               :before-close="createFileHandleClose"
               :close-on-click-modal="false">
      <el-form ref="createfrom" :model="createfrom" :rules="addrules" label-width="100px" label-position="left">
        <el-form-item :label="$t('deviceList.deviceType')" prop="deviceType">
          <el-select class="mini-input" v-model="createfrom.deviceType" :placeholder="$t('deviceList.deviceType')"  style="width:434px" clearable>
            <el-option
              v-for="(item,index) in alldeviceTypeName"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.name')" prop="name">
          <el-input v-model="createfrom.name" :placeholder="$t('deviceList.deviceName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.snNumber')" prop="snNumber">
          <el-input v-model="createfrom.snNumber" :placeholder="$t('deviceList.snNumber')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.ip')" prop="ip">
          <el-input v-model="createfrom.ip" @blur="isValidIP(createfrom.ip)" :placeholder="$t('deviceList.ip')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.status')" prop="status">
          <el-select v-model="createfrom.status" :placeholder="$t('deviceList.status')" style="width:434px">
            <el-option
              v-for="(item,index) in statusType"
              :key="index"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.modifyGrouping')" prop="groupNo">
          <el-input v-model="createselectGroupName"
                    @focus="openselectDeviceGroup"
                    :placeholder="$t('deviceList.modifyGrouping')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.admin')"
                      prop="adminIds"
                      >
          <el-select class="mini-input"
            v-model="createAdminsName"
            :placeholder="$t('deviceList.admin')"
            clearable
            multiple
            filterable>
            <el-option
              v-for="(item,index) in allAdministrator"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelcreatedialogVisible('createfrom')">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="createdFrom('createfrom')">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 设备编辑模态框 -->
    <el-dialog :title="$t('deviceList.editingIntelligent')"
               :visible.sync="updatedialogVisible"
               width="575px"
               :before-close="updateFileHandleClose"
               :close-on-click-modal="false">
      <div id="detail">
      <el-form ref="updatefrom" :model="updatefrom" :rules="updaterules" label-width="110px" label-position="left">
        <el-form-item :label="$t('deviceList.deviceName')" prop="name">
          <el-input v-model="updatefrom.name" :placeholder="$t('deviceList.deviceName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.status')" prop="status">
          <el-select v-model="updatefrom.status" :placeholder="$t('deviceList.status')" style="width:398px">
            <el-option
              v-for="(item,index) in statusType"
              :key="index"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceGroup')" prop="groupNo">
          <el-input v-model="updateselectGroupName" :placeholder="$t('deviceList.deviceGroup')" @focus="openselectDeviceGroup"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.admin')" prop="adminIds">
          <el-select
            v-model="updateAdminsName"
            clearable
            multiple
            filterable
            style="width:398px">
            <el-option
              v-for="(item,index) in allAdministrator"
              :key="index"
              :label="item.name"
              :value="item.name"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceType')+':'" prop="deviceType">
          <span>{{updatefrom.deviceType}}</span>
        </el-form-item>
        <el-form-item :label="$t('deviceList.snNumber')+':'" prop="snNumber">
          <span>{{updatefrom.snNumber}}</span>
        </el-form-item>
        <el-form-item :label="$t('deviceList.ipAddress')+':'"
                      prop="ip"
                      :label-width="$i18n.locale == 'zh'?'100px':'132px'">
          <span>{{updatefrom.ip}}</span>
        </el-form-item>
        <el-form-item :label="$t('deviceList.macAddress')+':'"
                      prop="macAddr"
                      :label-width="$i18n.locale == 'zh'?'106px':'150px'">
          <span>{{updatefrom.macAddr}}</span>
        </el-form-item>
        <el-form-item :label="$t('deviceList.version')+':'"
                      prop="version"
                      :label-width="$i18n.locale == 'zh'?'100px':'167px'">
          <span>{{updatefrom.version}}</span>
        </el-form-item>
      </el-form>
      </div>
      <div class="sub">
        <el-button type="primary" @click="detailclose">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="updateFrom('updatefrom')">{{$t('common.ok')}}</el-button>
      </div>
    </el-dialog>
    <!-- 添加和编辑时，选择分组模态框 -->
    <el-dialog :title="$t('deviceList.modifyGrouping')"
               :visible.sync="selectGroupialogVisible"
               width="20%"
               :before-close="selectGroupFileHandleClose"
               class="select-group-dialog"
               :close-on-click-modal="false">
      <el-form :model="selectgroupform" label-width="80px">
      <!-- 选择分组树形菜单 -->
      <select-group isNeedlinkage="false"
                    platform="coala"
                    isSelect="true"
                    ref="hardwareselectgroup"
                    @receiveChildProps="showSelectedGroup"
                    class="selectTree"></select-group>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelselectGroupialogVisible('selectgroupform')" size="small">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="selectGroupForm('selectgroupform')" size="small">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 批量分组模态框 -->
    <el-dialog :title="$t('deviceList.batchGroup')"
               :visible.sync="batchGroupialogVisible"
               width="20%"
               :before-close="batchGroupFileHandleClose"
               :close-on-click-modal="false"
               class="batch-group-dialog">
      <el-form :model="batchgroupfrom" label-width="80px">
      <!-- 选择分组树形菜单 -->
      <select-group isNeedlinkage="false"
                    ref="hardwarebatchgroup"
                    isSelect="true"
                    class="selectTree"
                    @batchgroupProps="handlebatchgroup"
                    platform="coala"></select-group>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelbatchGroupialogVisible" size="small">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="doBatch" size="small">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>


  import selectGroup from "./select_group.vue";

  export default {
    name: "intelligent_hardware",
    components: {

      selectGroup
    },
    data() {
      return {
        type: "3",
        status: "",
        tableData: [],
        settingStyle: {
          width: '490px',
          height: '40px',
          overflow: 'hidden',
          display: 'flex'
        },
        netAPI: "",
        adminAPI: "",
        multipleSelection: [],
        alldivergenceType: '',
        alldeviceTypeName: [],
        // 所有设备管理员信息
        allAdministrator: null,
        updatedialogVisible: false,
        adddialogVisible: false,
        selectGroupialogVisible: false,
        batchdisabled: true,
        batchGroupialogVisible: false,
        tableBoxLoading: false,
        deleteData: [],
        // 被待选中的设备组名称
        beingSelectGroupName: '',
        // 被待选中的设备组编号
        beingSelectGroupNo: '',
        createselectGroupName: '',
        updateselectGroupName: '',
        pageSize: 5,
        currentPage: 1,
        total: 0,
        // 添加时设备管理员数组
        createAdminsName: [],
        // 编辑时设备管理员数组
        updateAdminsName: [],
        // 设置row-key
        getRowKeys(row) {
          return row.id
        },
        statusType: [
          {id: 1,
            zhName: '断开',
            enName: 'Disconnect'},
          {id: 2,
            zhName: '正常',
            enName: 'Normal'},
          {id: 3,
            zhName: '常开',
            enName: 'Normally Open'},
          {id: 4,
            zhName: '常闭',
            enName: 'Normally Close'}
        ],
        // 添加设备
        createfrom: {
          type: 3,
          name: "",
          ip: "",
          status: "",
          snNumber: "",
          port: "",
          protocol: "",
          deviceType: "",
          adminIds: [],
          groupNo: "",
          macAddr: "",
          version: "",
        },
        // 编辑设备
        updatefrom: {
          id: "",
          type: 3,
          name: "",
          status: "",
          prot: "",
          protocol: "",
          user: "",
          password: "",
          sourceAddress: "",
          adminIds: [],
          deviceType: "",
          snNumber: "",
          ip: "",
          macAddr: "",
          version: "",
          groupNo: "",
          mappingIds: []
        },
        search: {
          type: 3, //必须携带
        },
        administrator: {
          pageNo: 1,
          pageSize: 5000
        },
        // 选择分组
        selectgroupform: {
        },
        // 批量分组
        batchgroupfrom: {
          groupNo: '',
          deviceIds: []
        },
      }
    },
    computed: {
      addrules() {
        return{
          deviceType: [
            { required: true, message: this.$t('deviceList.select') + this.$t('deviceList.deviceType'), trigger: 'change' },
          ],
          name: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.deviceName'), trigger: 'blur' },
          ],
          snNumber: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.snNumber'), trigger: 'blur' },
          ],
          ip: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.ip'), trigger: 'blur' },
          ],
          status: [
            { required: true, message: this.$t('deviceList.select') + this.$t('deviceList.status'), trigger: 'change' }
          ],
        }
      },
      updaterules() {
        return{
          name: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.deviceName'), trigger: 'blur' },
          ],
          status: [
            { required: true, message: this.$t('deviceList.select') + this.$t('deviceList.status'), trigger: 'change' }
          ],
        }
      }
    },
    created() {

      // this.getdivergenceType();
      // this.getAdministrator();
      this.searchtabledata();
    },
    methods: {
      // 批量导入
      doimport() {
        this.$emit('doimport', true, 3)
      },
      filterselectable(row, index) {
        if(this.$route.meta['remove']) {
          return 1;
        }else{
          return 0;
        }
      },
      mainBoxWidth() {
        let me = this;
        this.$nextTick(function () {
          me.inputStyWidth = me.$refs.mainBox.$el.clientWidth + 'px';
          console.log(me)
        })
      },
      filterTabledata(row) {
        switch(row.status) {
          case 1:
            return this.$i18n.locale == 'zh' ? this.statusType[0].zhName : this.statusType[0].enName;
          case 2:
            return this.$i18n.locale == 'zh' ? this.statusType[1].zhName : this.statusType[1].enName;
          case 3:
            return this.$i18n.locale == 'zh' ? this.statusType[2].zhName : this.statusType[2].enName;
          case 4:
            return this.$i18n.locale == 'zh' ? this.statusType[3].zhName : this.statusType[3].enName;
        }
      },
      // 遍历每个智能硬件所关联的设备管理员，显示title
      filterAdmins(row) {
        let adminNames = [];
        row.admins.forEach(item => {
          adminNames.push(item.adminName)
        })
        return adminNames;
      },
      // 按条件搜索
      searchtabledata (v) {
        this.tableBoxLoading = true;
        // 深拷贝
        let newSearch = JSON.parse(JSON.stringify(this.search))
        if(v === 'search') {
          this.currentPage = 1
          newSearch.type = Number(this.search.type)
        }
        newSearch.pageSize = this.pageSize;
        newSearch.pageNo = this.currentPage;
        for (let item in this.alldivergenceType) {
          if(this.alldivergenceType[item] === this.search.deviceType) {
            newSearch.deviceType = item
          }
        }
        // console.log(JSON.stringify(newSearch))
        if(newSearch.deviceType == '') {
          delete newSearch.deviceType
        }
        this.$http.getDeviceList(newSearch ).then(
        res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data
            this.total = res.data.total
            this.tableBoxLoading = false;
          } else {
            this.$message.warning(res.data.message);
          }
        },
        err => {
          this.$message({
            message: err,
            type: "warning"
          });
        }
      );
      },
      // 获取设备类型
      getdivergenceType() {
        this.$http.get(this.netAPI.ihtype).then(
          res => {
            if(res.data.status == 200) {
              // console.log(JSON.stringify(res.data.data))
              this.alldivergenceType = res.data.data
              for (let item in res.data.data) {
                this.alldeviceTypeName.push(res.data.data[item])
              }
            }
          }
        )
      },
      // 获取管理员
      getAdministrator () {
        this.$http.get(this.adminAPI.find, {params: this.administrator}).then(
          res => {
            if (res.data.status == 200) {
              // console.log(JSON.stringify(res.data.data[0]))
              this.allAdministrator = res.data.data
            } else {
              this.$message.warning(res.data.message);
            }
          },
        err => {
          this.$message({
            message: err,
            type: "warning"
          });
        }
        )
      },
      // 打开添加模态框
      openAdd() {
        this.createselectGroupName = '';
        this.createAdminsName = [];
        // console.log(JSON.stringify(this.createfrom))
        this.adddialogVisible = true;
      },
      // 点击确定，添加设备
      createdFrom(formName) {
        // 使用新的变量防止添加失败后设备类型显示为设备类型编码
        let newcreate = JSON.parse(JSON.stringify(this.createfrom))
        // 获取已选择的设备管理员Id
        this.allAdministrator.forEach(item => {
          this.createAdminsName.forEach(i => {
            if(item.name == i) {
              newcreate.adminIds.push(item.id);
            }
          })
        })
        // 获取已选择设备类型
        for (let i in this.alldivergenceType) {
          if(this.alldivergenceType[i] == this.createfrom.deviceType) {
            newcreate.deviceType = i;
          }
        }
        // console.log(JSON.stringify(this.createfrom))
        // console.log(JSON.stringify(newcreate))
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$http.post(this.netAPI.insert, newcreate).then(
              res => {
                if (res.data.status == 200) {
                  // console.log(JSON.stringify(res.data.data))
                  this.$refs.createfrom.resetFields();
                  this.$refs.hardwaretable.clearSelection();
                  this.$emit('initTree')
                  this.adddialogVisible = false;
                  this.$message.success(this.$t('common.insertSuccess'));
                  this.search.groupNo = '1005'
                  this.searchtabledata();
                } else {
                  this.$message.warning(
                    this.$t('common.insertFailed') + res.data.message
                  );
                  this.createfrom.adminIds = [];
                }
              },
              err => {
                this.$message({
                  message: this.$t('common.serviceError') + err,
                  type: "warning"
                });
                this.createfrom.adminIds = [];
              }
            );
          } else {
            return false;
          }
        })
      },
      // 点击右上角，关闭添加模态框
      createFileHandleClose(done) {
        this.$refs.createfrom.resetFields();
        done();
      },
      // 点击取消，关闭添加模态框
      cancelcreatedialogVisible(formName) {
        this.$refs[formName].resetFields();
        this.adddialogVisible = false;
      },
      // 打开编辑模态框
      detailopen(row) {
        console.log(JSON.stringify(row))
        let i18n = this.$i18n.locale;
        switch(row.deviceType) {
          case "SN001":
            i18n == 'zh'
            ? this.updatefrom.deviceType = '闸机系列（SN001）'
            : this.updatefrom.deviceType = 'Gates series（SN001）'
            break;
          case "SN002":
            i18n == 'zh'
            ? this.updatefrom.deviceType = '门禁系列（SN002）'
            : this.updatefrom.deviceType = 'Access control series（SN002）'
            break;
          case "SN003":
            i18n == 'zh'
            ? this.updatefrom.deviceType = '桌面机系列（SN003）'
            : this.updatefrom.deviceType = 'Desktop Series（SN003）';
            break;
          case "SN004":
            i18n == 'zh'
            ? this.updatefrom.deviceType = '一体机系列（SN004）'
            : this.updatefrom.deviceType = 'Integrative Machine Series（SN004）'
            break;
          case "SN005":
            i18n == 'zh'
            ? this.updatefrom.deviceType = '认证对比系列（SN005）'
            : this.updatefrom.deviceType = 'Certification Contrast Series（SN005）'
            break;
        }
        this.updatefrom.status = row.status
        this.updatefrom.id = row.id
        this.updatefrom.name = row.name
        this.updatefrom.ip = row.ip
        this.updatefrom.port = row.port
        this.updatefrom.groupNo = row.groupNo
        this.updatefrom.protocol = row.protocol
        this.updatefrom.snNumber = row.snNumber
        this.updatefrom.macAddr = row.macAddr
        this.updatefrom.version = row.version
        // 设备组名
        row.groups.forEach(item => {
          this.updateselectGroupName = item.groupName
        })
        // 设备管理员名和需要移除的管理员映射id
        this.updateAdminsName = [];
        this.updatefrom.mappingIds = [];
        if(row.admins && row.admins.length > 0) {
          row.admins.forEach(item => {
            this.updateAdminsName.push(item.adminName)
            this.updatefrom.mappingIds.push(item.id)
          })
        }else{
          this.updateAdminsName = [];
        }
        // console.log(JSON.stringify(this.updatefrom))
        this.updatedialogVisible = true;
      },
      // 点击确定，编辑设备
      updateFrom(formName) {
        // 防止编辑失败时设备类型显示为设备编码
        let newUpdateform = JSON.parse(JSON.stringify(this.updatefrom))
        newUpdateform.adminIds = [];
        // 编辑管理员id
        this.allAdministrator.forEach(item => {
          this.updateAdminsName.forEach(i => {
            if(item.name == i) {
              newUpdateform.adminIds.push(item.id);
            }
          })
        })
        // 编辑设备类型
        if(this.$i18n.locale == 'zh') {
          switch(newUpdateform.deviceType) {
            case "闸机系列（SN001）":
              newUpdateform.deviceType = 'SN001';
              break;
            case "门禁系列（SN002）":
              newUpdateform.deviceType = 'SN002';
              break;
            case "桌面机系列（SN003）":
              newUpdateform.deviceType = 'SN003';
              break;
            case "一体机系列（SN004）":
              newUpdateform.deviceType = 'SN004';
              break;
            case "认证对比系列（SN005）":
              newUpdateform.deviceType = 'SN005';
              break;
          }
        }else{
          switch(newUpdateform.deviceType) {
            case "Gates series（SN001）":
              newUpdateform.deviceType = 'SN001';
              break;
            case "Access control series（SN002）":
              newUpdateform.deviceType = 'SN002';
              break;
            case "Desktop Series（SN003）":
              newUpdateform.deviceType = 'SN003';
              break;
            case "Integrative Machine Series（SN004）":
              newUpdateform.deviceType = 'SN004';
              break;
            case "Certification Contrast Series（SN005）":
              newUpdateform.deviceType = 'SN005';
              break;
          }
        }

        // console.log(JSON.stringify(this.updatefrom))
        // console.log(JSON.stringify(newUpdateform))
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$http.post(this.netAPI.update, newUpdateform).then(
            res => {
              if (res.data.status == 200) {
                // console.log(JSON.stringify(res.body.data))
                this.$message.success(this.$t('deviceControl.modifiedSuccess'));
                this.$refs.hardwaretable.clearSelection();
                this.$emit('initTree')
                this.updatedialogVisible = false;
                this.searchtabledata();
              } else {
                this.$message.warning(this.$t('common.updateFailed') + res.body.message);
              }
            },
            err => {
              this.$message({
                message: this.$t('common.serviceError') + err,
                type: "warning"
              });
            }
          );
          } else {
            return false;
          }
        })
      },
      // 点击右上角，关闭编辑模态框
      updateFileHandleClose(done) {
        this.updatefrom.groupNo = '';
        this.$refs.updatefrom.resetFields();
        done();
      },
      // 点击取消，关闭编辑模态框
      detailclose() {
        this.updatefrom.groupNo = '';
        this.$refs.updatefrom.resetFields();
        this.updatedialogVisible = false;
      },
      // 点击升级，升级设备
      openUpgrade() {

      },
      // 点击参数设置，进行参数设置
      openParameSetting(row) {
        // debugger
        console.log(JSON.stringify(row))
        this.$router.push({path: `/deviceManage/parameterConfig?sn=${row.snNumber}`})
      },
      // 添加和编辑设备时，弹出选择分组模态框
      openselectDeviceGroup() {
        this.selectGroupialogVisible = true;
      },
      // 单个设备选择设备组时，点击事件
      showSelectedGroup(data1, data2) {
        this.beingSelectGroupNo = data2.groupNo;
        this.beingSelectGroupName = data2.label;
      },
      // 点击确定，选择分组并关闭选择分组模态框
      selectGroupForm(forName) {
        this.$refs.hardwareselectgroup.initData();
        // 添加
        this.createfrom.groupNo = this.beingSelectGroupNo;
        this.createselectGroupName = this.beingSelectGroupName;
        // 编辑
        this.updatefrom.groupNo = this.beingSelectGroupNo;
        this.updateselectGroupName = this.beingSelectGroupName;
        this.selectGroupialogVisible = false;
      },
      // 点击取消，关闭选择分组模态框
      cancelselectGroupialogVisible (forName) {
        this.$refs.hardwareselectgroup.initData();
        this.selectGroupialogVisible = false;
      },
      // 点击右上角，关闭选择分组模态框
      selectGroupFileHandleClose (done) {
        this.$refs.hardwareselectgroup.initData();
        done();
      },
      // 点击批量分组树型菜单时接收数据
      handlebatchgroup(data) {
        this.batchgroupfrom.groupNo = data.groupNo;
      },
      // 点击批量分组，弹出批量分组模态框
      openBatch(row) {
        this.batchgroupfrom.deviceIds = [];
        this.batchgroupfrom.groupNo = '';
        row.forEach(item => {
          this.batchgroupfrom.deviceIds.push(item.id)
        })
        this.batchGroupialogVisible = true;
      },
      // 点击确定，批量分组，并关闭模态框
      doBatch() {
        // console.log(JSON.stringify(this.batchgroupfrom))
        this.$http.post(this.netAPI.batch, this.batchgroupfrom).then(
          res => {
            if(res.body.status == 200) {
              this.$message.success(this.$t('deviceList.batchGroupSuccess'))
              this.$refs.hardwaretable.clearSelection();
              this.$emit('initTree')
              this.searchtabledata();
            } else {
              this.$message.warning(res.body.message)
            }
          }
        )
        this.$refs.hardwarebatchgroup.initData();
        this.batchGroupialogVisible = false;
      },
      // 点击右上角，关闭批量分组模态框
      batchGroupFileHandleClose(done) {
        this.$refs.hardwarebatchgroup.initData();
        done();
      },
      // 点击取消，关闭批量分组模态框
      cancelbatchGroupialogVisible() {
        this.$refs.hardwarebatchgroup.initData();
        this.batchGroupialogVisible = false;
      },
      // 跳转到批量设置
      trunToSetting(multipleSelection) {
        console.log(JSON.stringify(multipleSelection))
        let params;
        if(multipleSelection.length == 1) {
          params = multipleSelection[0].snNumber
        }else{
          let sns = multipleSelection.map(item => {
            return item.snNumber
          })
          params = sns.join(",");
        }
        console.log(JSON.stringify(params))
        this.$router.push({path: `/deviceManage/parameterConfig?sn=${params}`})
      },
      // 改变批量分组和批量删除的默认颜色
      handleSelectionChange (val) {
        if(val.length > 0) {
          this.$refs.batchremove.$el.style.color = "black"
          this.$refs.batchgroup.$el.style.color = "black"
          this.batchdisabled = false
        }else{
          this.$refs.batchremove.$el.style.color = "#BABABA"
          this.$refs.batchgroup.$el.style.color = "#BABABA"
          this.batchdisabled = true
        }
        this.multipleSelection = val;
      },
      // 刷新列表
      reload() {
        this.tableData = []
        this.searchtabledata();
        this.$message.success(this.$t('deviceList.refreshSuccess'))
      },
      // 验证ip格式
      isValidIP(ip) {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if(reg.test(ip) == false) {
          this.$message.warning("请输入正确的IP地址");
          this.createfrom.ip = '';
        }
      },
      // 处理页面显示个数变化
      handleSizeChange (pageSize) {
        this.pageSize = pageSize;
        this.searchtabledata();
      },
      // 处理当前页变化
      handleCurrentChange (Current) {
        this.currentPage = Current;
        this.searchtabledata();
      },
      // 删除行
      deleteRow(row) {
        this.deleteData = [];
        if (!row) {
          this.$message({
            message: this.$t('delete.choose'),
            type: "warning"
          });
          return;
        }
      //判断类型
        let rowType = row instanceof Array
        if (rowType == true) {
          for (let index in row) {
            this.deleteData.push({ id: row[index].id });
          }
        } else {
          this.deleteData.push({ id: row.id });
        }
        // console.log(JSON.stringify(this.deleteData))
        this.$confirm(this.$t('delete.deleteRow'), this.$t('delete.prompt'), {
          confirmButtonText: this.$t('common.delete'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http.post(this.netAPI.delete, this.deleteData).then(
            res => {
              if (res.body.status == 200) {
                if(this.deleteData.length == this.tableData.length) {
                  this.currentPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : 1
                  this.searchtabledata();
                }else {
                  this.searchtabledata();
                }
                this.$emit('initTree')
                this.$message.success(this.$t('delete.success'));
                this.$refs.hardwaretable.clearSelection();
              } else {
                this.$message.warning(
                  res.body.message
                );
              }
            },
            err => {
              this.$message({
                message: this.$t('common.serviceError') + err,
                type: "warning"
              });
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('delete.canceledDeletion')
          });
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
// @media screen and (max-width: 1730px){
//     .hardwareSearch-right{
//       position: absolute;
//       left: 0;
//       top: 60px;
//       button{
//         padding: 12px 24px;
//       }
//     }
//      .table-box{
//       margin-top: 50px;
//     }
// }
// @media screen and (max-width: 1730px){
//     .setting{
//       button{
//         padding: 12px 18px;
//       }
//       }
//     .hardwareSearch-right{
//       position: absolute;
//       left: 0;
//       top: 60px;
//       button{
//         padding: 12px 26px;
//       }
//     }
//      .table-box{
//       margin-top: 50px;
//     }
// }
  .sub {
    text-align: right;
  }
  input {
    border: 0px;
  }

  #detail {
    width: 95%;
    margin: auto;
    font-size: 15px;
  }
  .hardwareSearch{
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    @media screen and(max-width: 1660px) {
      margin-top: 65px;
      display: block;
    }
  }
  .hardwarePage{
    position: relative;
    .setting{
      position: absolute;
      top: -60px;
      // right: 240px;
      right: 0;
      @media screen and(max-width: 1660px) {
        left: 0;
        /*top:0;*/
      }
    }
    .table-box{
    .pagination-box {
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
      @media screen and(max-width:1120px ) {
        width: 670px;
      }
  }
  }

  .function{
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px solid  #e4e7ed;
  }
  .pagination {
  text-align: center;
  }
</style>
<style lang="scss">
.hardwarePage{
  @media screen and (max-width: 1730px){
    .setting{
      button{
        padding: 12px 16px;
        }
      }
      .hardwareSearch-right{
        @media screen and(max-width: 1660px) {
          padding-bottom: 20px;
        }
        button{
          padding: 12px 14px;
        }
      }
  }
  @media screen and (max-width: 1678px){
    .setting{
      button{
        padding: 12px 16px;
        }
      }
      .hardwareSearch-right{

        button{
          padding: 12px 10px;
        }
      }
  }
}
//   @media screen and (max-width: 1650px){
//       .setting{
//         button{
//           padding: 12px 18px;
//           }
//         }
//       .hardwareSearch-right{
//         position: absolute;
//         left: 0;
//         top: 60px;
//         button{
//           padding: 12px 26px;
//         }
//       }
//       .table-box{
//         margin-top: 50px;
//       }
//   }
// }
</style>
