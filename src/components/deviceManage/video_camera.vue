<template>
  <div>
    <div class="camera-operation" ref="cameraOperation">
    <!-- 搜索 -->
      <div class="operation-left" ref="operationLeft">
        <el-form :inline="true" :model="search" class="operation-left-form">
          <el-form-item :label="$t('deviceList.status') + '：'">
            <el-select v-model="search.status" clearable
                       :placeholder="$t('deviceList.all')"
                      :style="{'width':$i18n.locale == 'zh'? '140px':'100px'}">
              <el-option
                v-for="(item,index) in statusType"
                :key="item.id"
                :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('deviceList.deviceName') + '：'">
            <el-input v-model="search.name" :placeholder="$t('deviceList.deviceName')"
                      style="width:160px;"
                      clearable
                      class="cameraDevice-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('deviceList.ip') + '：'">
            <el-input v-model="search.ip" :placeholder="$t('deviceList.ip')"
                      style="width:160px;"
                      clearable
                      class="cameraIp-input"></el-input>
          </el-form-item>
          <el-button @click="searchtabledata('search')">{{$t('common.search')}}</el-button>
        </el-form>
      </div>
      <div class="operation-right"
           ref="operationRight">
          <el-button ref="batchremove" :disabled="batchdisabled" @click="deleteRow(multipleSelection)">
            {{$t('common.batchDeletion')}}
          </el-button>
          <el-button ref="batchgroup" :disabled="batchdisabled" @click="openBatch(multipleSelection)">
            {{$t('deviceList.batchGroup')}}
          </el-button>
          <!-- <el-button  @click="openadddialogVisible" :disabled="!$route.meta['add']">
            {{$t('deviceList.addDevice')}}
          </el-button> -->
          <el-button  @click="openadddialogVisible">
            {{$t('deviceList.addDevice')}}
          </el-button>
          <el-button @click="doimport">
            {{$t('deviceList.batchImport')}}
          </el-button>
        </div>
    </div>

    <!-- 详情 -->
    <div class="table-box">

      <el-table :data="tableData"
                v-loading="tableBoxLoading"
                element-loading-background="rgba(255,255,255,0.3)"
                :header-cell-style="{background:'#ebeef5'}"
                @selection-change="handleSelectionChange"
                height="646"
                ref="cameratable"
                style="width: 100%"

                :cell-class-name="rowClass"
                >
                <!-- :row-key="getRowKeys" -->

                <el-table-column
                fixed
                type="selection"
                width="50"
                align="center"
                reserve-selection
                ></el-table-column>
                <el-table-column type="index" :label="$t('deviceList.index')" prop="id" align="center" width="62">
                </el-table-column>
                <el-table-column prop="name" :label="$t('deviceList.name')" align="center">
                </el-table-column>
                <el-table-column :label="$t('deviceList.group')" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.groups[0].groupName"
                          :title="scope.row.groups[0].groupName">{{scope.row.groups[0].groupName.slice(0,7)}}...</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ip" :label="$t('deviceList.ip')" align="center">
                </el-table-column>
                <el-table-column prop="port" :label="$t('deviceList.port')" align="center">
                </el-table-column>
                <el-table-column prop="status"
                                :label="$t('deviceList.status')"
                                align="center"
                                :formatter="filterTabledata">
                </el-table-column>
                <el-table-column prop="protocol" :label="$t('deviceList.protocol')" align="center">
                </el-table-column>
                <el-table-column prop="user" :label="$t('deviceList.user')" align="center">
                </el-table-column>
                <el-table-column prop="password" :label="$t('deviceList.passWord')" align="center">
                </el-table-column>
                <el-table-column prop="sourceAddress" :label="$t('deviceList.sourceAddress')" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.sourceAddress"
                          :title="scope.row.sourceAddress">{{scope.row.sourceAddress.slice(0,7)}}...</span>
                  </template>
                </el-table-column>
                <el-table-column prop="source-Id" :label="$t('deviceList.sourceId')" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.sourceId">{{scope.row.sourceId}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="producer" :label="$t('deviceList.producer')" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.producer">{{scope.row.producer}}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="isMonitor" label="AI Power" align="center">
                  <template slot-scope="scope">
                    <el-switch
                      @change="changeRow(scope.row)"
                      v-model="tableData[scope.$index].isMonitor"
                      :active-value="1"
                      :inactive-value="0"
                      active-color="#409EFF"
                      inactive-color="#7E8CB1"
                    >
                    </el-switch>
                  </template>
                </el-table-column> -->

                <el-table-column :label="$t('deviceList.operation')" align="center" fixed="right" >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateopen(scope.row)">
                      {{$t('common.edit')}}
                    </el-button>
                    <el-button type="text" size="small" @click="deleteRow(scope.row)" class="delete-button">
                      {{$t('common.delete')}}
                    </el-button>
                  </template>
                </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 添加模态框 -->
    <el-dialog :title="$t('deviceList.addCamera')"
               :visible.sync="adddialogVisible"
               width="575px"
               :before-close="createFileHandleClose"
               :close-on-click-modal="false">
      <el-form ref="createfrom" :model="createfrom" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('deviceList.name')" prop="name">
          <el-input v-model="createfrom.name" :placeholder="$t('deviceList.deviceName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.ip')" prop="ip">
          <el-input v-model="createfrom.ip" :placeholder="$t('deviceList.ip')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.port')" prop="port">
          <el-input v-model="createfrom.port" :placeholder="$t('deviceList.port')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.user')" prop="user">
          <el-input v-model="createfrom.user" :placeholder="$t('deviceList.user')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.passWord')" prop="password">
          <el-input v-model="createfrom.password" :placeholder="$t('deviceList.passWord')"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('deviceList.status')" prop="status">
          <el-select v-model="createfrom.status" :placeholder="$t('deviceList.status')">
            <el-option
              v-for="(item,index) in statusType"
              :key="item.id"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('deviceList.protocol')" prop="protocol">
          <el-select v-model="createfrom.protocol" :placeholder="$t('deviceList.protocol')">
            <el-option
              v-for="(item,index) in protocolType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.sourceAddress')" prop="sourceAddress">
          <el-input v-model="createfrom.sourceAddress" :placeholder="$t('deviceList.sourceAddress')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.modifyGrouping')" prop="groupNo">
          <el-input v-model="createselectGroupName" :placeholder="$t('deviceList.modifyGrouping')" @focus="openselectDeviceGroup"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('deviceList.longitude')" prop="lng">
          <el-input v-model="createfrom.lng" :placeholder="$t('deviceList.longitude')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.latitude')" prop="lat">
          <el-input v-model="createfrom.lat" :placeholder="$t('deviceList.latitude')"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('deviceList.sourceId')" prop="sourceId">
          <el-input v-model="createfrom.sourceId" :placeholder="$t('deviceList.sourceId')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.producer')" prop="producer">
          <el-input v-model="createfrom.producer" :placeholder="$t('deviceList.producer')"></el-input>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelcreatedialogVisible('createfrom')">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="createdFrom('createfrom')">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog :title="$t('deviceList.editingRecorder')"
               :visible.sync="updateialogVisible"
               width="575px"
               :before-close="updateFileHandleClose"
               :close-on-click-modal="false">
      <el-form ref="updatefrom" :model="updatefrom"  label-width="90px" label-position="left" :rules="rules">
        <el-form-item :label="$t('deviceList.name')" prop="name">
          <el-input v-model="updatefrom.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.ip')" prop="ip">
          <el-input v-model="updatefrom.ip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.port')" prop="port">
          <el-input v-model="updatefrom.port"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.user')" prop="user">
          <el-input v-model="updatefrom.user"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.passWord')" prop="password">
          <el-input v-model="updatefrom.password"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('deviceList.status')" prop="status">
          <el-select v-model="updatefrom.status" :placeholder="$t('deviceList.status')">
            <el-option
              v-for="(item,index) in statusType"
              :key="index"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('deviceList.protocol')" prop="protocol">
          <el-select v-model="updatefrom.protocol" :placeholder="$t('deviceList.protocol')">
            <el-option
              v-for="(item,index) in protocolType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.sourceAddress')" prop="sourceAddress">
          <el-input v-model="updatefrom.sourceAddress"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.modifyGrouping')" prop="groupNo">
          <el-input v-model="updateselectGroupName" @focus="openselectDeviceGroup"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('deviceList.longitude')" prop="longitude">
          <el-input v-model="updatefrom.lng" :placeholder="$t('deviceList.longitude')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.latitude')" prop="latitude">
          <el-input v-model="updatefrom.lat" :placeholder="$t('deviceList.latitude')"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('deviceList.sourceId')" prop="sourceId">
          <el-input v-model="updatefrom.sourceId" :placeholder="$t('deviceList.sourceId')"></el-input>
        </el-form-item>
         <el-form-item :label="$t('deviceList.producer')" prop="producer">
          <el-input v-model="updatefrom.producer" :placeholder="$t('deviceList.producer')"></el-input>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelupdateialogVisible('updatefrom')">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="updateFrom('updatefrom')">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 选择分组模态框 -->
    <el-dialog :title="$t('deviceList.modifyGrouping')"
               :visible.sync="selectGroupialogVisible"
               width="380px"
               :before-close="selectGroupFileHandleClose"
               :close-on-click-modal="false"
               class="select-group-dialog">
      <el-form :model="selectgroupform" label-width="80px">
      <!-- 选择分组树形菜单 -->
      <select-group ref="cameraselectgroup"
                    isSelect="true"
                    isNeedlinkage="false"
                    platform="coala"
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
               width="380px"
               :before-close="batchGroupFileHandleClose"
               :close-on-click-modal="false"
               class="batch-group-dialog">
      <el-form :model="batchgroupfrom" label-width="80px">
      <!-- 选择分组树形菜单 -->
      <select-group isNeedlinkage="false"
                    isSelect="true"
                    ref="camerabatchgroup"
                    class="selectTree"
                    @batchgroupProps="handlebatchgroup"
                    platform="coala"></select-group>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelbatchGroupialogVisible" size="small">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="doBatch" size="small">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 提示设备已存在模态框 -->
    <el-dialog :title="$t('deviceList.exists')"
               :visible.sync="hasdevicedialogVisible"
               :close-on-click-modal="false"
               width="450px"
               class="has-device-box">
      <div class="el-icon-info hasdeviceinfo">{{$t('deviceList.addInfo')}}</div>
      <div class="sub">
        <el-button type="primary" @click="closehasdevicedialogVisible" size="small">{{$t('common.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


import selectGroup from "./select_group.vue"

export default {
  name: "video_camera",
  components: {

    selectGroup
  },
  data () {
    return {
      pageSize: 100,
      currentPage: 1,
      total: 0,
      status: "",
      tableData: [],
      netAPI: "",
      createselectGroupName: '',
      updateselectGroupName: '',
      // 被待选中的设备组名称
      beingSelectGroupName: '',
      // 被待选中的设备组编号
      beingSelectGroupNo: '',
      multipleSelection: [],
      adddialogVisible: false,
      updateialogVisible: false,
      selectGroupialogVisible: false,
      hasdevicedialogVisible: false,
      batchGroupialogVisible: false,
      istreeshow: false,
      batchdisabled: true,
      tableBoxLoading: false,
      groups: [],
      groupType: [],
      // 协议类型
      protocolType: ['KoaLaRtsp', 'HTTP', 'TCP', 'UDP', 'FTP'],
      // 状态类型
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
          // 设置row-key
      getRowKeys(row) {
        console.log(row.id)
        return row.id
      },
      // 添加数据
      createfrom: {
        name: "",
        ip: "",
        status: "",
        port: "",
        user: "",
        password: "",
        sourceAddress: "",
        type: 1,
        groupNo: "",
        protocol: "",
        lng: "",
        lat: "",
        sourceId: "",
        producer: "",
      },
      // 编辑数据
      updatefrom: {
        id: "",
        name: "",
        ip: "",
        port: "",
        user: "",
        password: "",
        sourceAddress: "",
        type: 1,
        status: "",
        protocol: "",
        groupNo: "",
        lng: "",
        lat: "",
        sourceId: "",
        producer: ""
      },
      // 选择分组
      selectgroupform: {

      },
      // 批量分组
      batchgroupfrom: {
        groupNo: '',
        deviceIds: []
      },
      // 查询
      search: {
        ip: "",
        name: "",
        status: "",
        type: 1, //必须携带
      },
      // 设备分组默认参数
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    };
  },
  computed: {
    rules() {
      return{
        name: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.deviceName'), trigger: 'blur' },
        ],
        ip: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.ip'), trigger: 'blur' },
        ],
        port: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.port'), trigger: 'blur' },
        ],
        user: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.user'), trigger: 'blur' },
        ],
        password: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.passWord'), trigger: 'blur' },
        ],
        status: [
            { required: true, message: this.$t('deviceList.select') + this.$t('deviceList.status'), trigger: 'change' }
        ],
        protocol: [
            { required: true, message: this.$t('deviceList.select') + this.$t('deviceList.protocol'), trigger: 'change' },
        ],
        sourceAddress: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.sourceAddress'), trigger: 'blur' },
        ],
      }
    }
  },
  created () {
    // this.netAPI = NetAPI().get("device");
    // this.token = localStorage.getItem('token');
    this.searchtabledata();
  },
  methods: {
    changeRow(row) {
      console.log(row)
      this.$http.deviceModify(row).then(
          res => {
            if (res.data.status == 200) {
              this.$message.success(this.$t('deviceControl.modifiedSuccess'));
            }
          })
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if(columnIndex == 0 || columnIndex == 15) {
        return 'selectBackground'
      }
    },
    filterselectable(row, index) {
      if(this.$route.meta['remove']) {
        return 1;
      }else{
        return 0;
      }
    },
    // 格式化表格设备状态
    filterTabledata(row) {
      // console.log(row)
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
    // 批量导入
    doimport() {
      this.$emit('doimport', true, 1)
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
      this.$http.deviceGroup(this.batchgroupfrom).then(
          res => {
            if(res.data.status == 200) {
              this.$message.success(this.$t('deviceList.batchGroupSuccess'))
              this.$refs.cameratable.clearSelection();
              this.$emit('initTree')
              this.searchtabledata();
            } else {
              this.$message.warning(res.data.message)
            }
          }
        )
      this.$refs.camerabatchgroup.initData();
      this.batchGroupialogVisible = false;
    },
    // 点击右上角，关闭批量分组模态框
    batchGroupFileHandleClose(done) {
      this.$refs.camerabatchgroup.initData();
      done();
    },
    // 点击取消，关闭批量分组模态框
    cancelbatchGroupialogVisible() {
      this.$refs.camerabatchgroup.initData();
      this.batchGroupialogVisible = false;
    },
    // 弹出选择分组模态框
    openselectDeviceGroup() {
      this.selectGroupialogVisible = true;
    },
    // 选择设备组时，点击事件
    showSelectedGroup(data1, data2) {
      this.beingSelectGroupNo = data2.groupNo;
      this.beingSelectGroupName = data2.label;
      // console.log(JSON.stringify(this.beingSelectGroupNo))
      // console.log(JSON.stringify(this.beingSelectGroupName))
    },
    // 点击确定，关闭选择分组模态框
    selectGroupForm(forName) {
      this.$refs.cameraselectgroup.initData();
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
      this.$refs.cameraselectgroup.initData();
      this.selectGroupialogVisible = false;
    },
    // 点击右上角，关闭选择分组模态框
    selectGroupFileHandleClose (done) {
      this.$refs.cameraselectgroup.initData();
      done();
    },
    // 改变批量分组和批量删除的默认颜色和禁用状态
    handleSelectionChange (val) {
      if(val.length > 0) {
        this.batchdisabled = false
      }else{
        this.batchdisabled = true
      }
      this.multipleSelection = val;
      // console.log(JSON.stringify(this.multipleSelection))
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
    // 打开添加模态框
    openadddialogVisible() {
      this.createfrom.groupNo = '';
      this.createselectGroupName = '';
      this.adddialogVisible = true;
    },
    // 点击右上角，关闭添加模态框
    createFileHandleClose (done) {
      this.$refs.createfrom.resetFields();
      this.createselectGroupName = '';
      done()
    },
    // 点击取消，关闭添加模态框
    cancelcreatedialogVisible (formName) {
      this.$refs[formName].resetFields();
      this.adddialogVisible = false;
      this.createselectGroupName = '';
    },
    // 点击右上角，关闭编辑模态框
    updateFileHandleClose (done) {
      this.$refs.updatefrom.resetFields();
      this.updateialogVisible = false;
    },
    // 点击取消，关闭编辑模态框
    cancelupdateialogVisible (formName) {
      this.updatefrom = { brand_right: 0 };
      this.$refs[formName].resetFields();
      this.updateialogVisible = false;
    },
    // 点击编辑，打开编辑模态框
    updateopen (row) {
      console.log(JSON.stringify(row))
      row.groups.forEach(item => {
        this.updateselectGroupName = item.groupName;
      })
      this.updatefrom.status = row.status
      this.updatefrom.id = row.id
      this.updatefrom.name = row.name
      this.updatefrom.ip = row.ip
      this.updatefrom.port = row.port
      this.updatefrom.user = row.user
      this.updatefrom.password = row.password
      this.updatefrom.protocol = row.protocol
      this.updatefrom.sourceAddress = row.sourceAddress
      this.updatefrom.type = row.type
      this.updatefrom.groupNo = row.groupNo
      this.updatefrom.lng = row.lng
      this.updatefrom.lat = row.lat
      this.updatefrom.sourceId = row.sourceId
      this.updatefrom.producer = row.producer
      this.updateialogVisible = true;
    },
    // 按条件搜索
    searchtabledata (v) {
      this.tableBoxLoading = true;
      if(v === 'search') {
        this.currentPage = 1
        this.search.type = Number(this.search.type)
      }
      // if(this.status !== "") {
      //   this.search.status = this.status
      // }
      // this.$http.headers.common['token'] = this.token;
      this.search.pageSize = this.pageSize;
      this.search.pageNo = this.currentPage;
      // console.log(JSON.stringify(this.search))
      this.$http.getDeviceList(this.search ).then(
        res => {
          if (res.data.status == 200) {
            // console.log(JSON.stringify(res.data.data))
            // this.parseData(res)
            let newData = res.data.data
            newData.forEach(item => {
              if(!item.hasOwnProperty('isMonitor')) {
                item.isMonitor = 0
              }
            })
            this.tableData = JSON.parse(JSON.stringify(newData))
            // this.tableData.forEach(item => {
            //    if(!item.hasOwnProperty('isMonitor')) {
            //      item.isMonitor = 0
            //    }
            // })
            this.total = res.data.total
            this.tableBoxLoading = false;
          } else {
            this.$message.warning(res.data.message);
          }
        },
        err => {
          this.$message({
            message: this.$t('common.serviceError') + err,
            type: "warning"
          });
        }
      );
    },
    // 添加数据方法
    createdFrom (formName) {
      // console.log(JSON.stringify(this.createfrom))
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$http.headers.common['token'] = this.token;
          if(this.createfrom.lng) {
            this.createfrom.lng = parseFloat(this.createfrom.lng)
          }else{
            delete this.createfrom.lng
          }
          if(this.createfrom.lat) {
            this.createfrom.lat = parseFloat(this.createfrom.lat)
          }else{
            delete this.createfrom.lat
          }
          console.log(JSON.stringify(this.createfrom))
          this.$http.deviceInsert(this.createfrom).then(
          res => {
            if(res.data.status == 200) {
              // console.log(JSON.stringify(res.data.data))
              this.$refs.createfrom.resetFields();
              this.$refs.cameraselectgroup.initData();
              this.$emit('initTree')
              this.search.groupNo = '1005'
              this.searchtabledata();
              this.adddialogVisible = false;
              this.$message.success(this.$t('deviceControl.insertSuccess'));
            } else {
              this.$message.warning(this.$t('common.insertFailed') + res.data.message);
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
      });
    },
    // 编辑数据方法
    updateFrom (formName) {
      console.log(JSON.stringify(this.updatefrom))
      // this.$http.headers.common['token'] = this.token;
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.updatefrom.lng) {
            this.updatefrom.lng = parseFloat(this.updatefrom.lng)
          }else{
            delete this.updatefrom.lng
          }
          if(this.updatefrom.lat) {
            this.updatefrom.lat = parseFloat(this.updatefrom.lat)
          }else{
            delete this.updatefrom.lat
          }
          this.$http.deviceModify( this.updatefrom).then(
          res => {
            if (res.data.status == 200) {
              // console.log(JSON.stringify(res.data.data))
              this.$message.success(this.$t('deviceControl.modifiedSuccess'));
              this.updateialogVisible = false;
              this.$emit('initTree')
              this.searchtabledata();
            } else {
              this.$message.warning(this.$t('common.updateFailed') + res.data.message);
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
    // 关闭已存在设备提示弹窗
    closehasdevicedialogVisible() {
      this.createfrom.name = '';
      this.hasdevicedialogVisible = false;
    },
    // 删除选中行
    deleteRow (row) {
      let ids = [];
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
          ids.push({ id: row[index].id });
        }
      } else {
        ids.push({ id: row.id });
      }
      // console.log(JSON.stringify(ids))
      this.$confirm(this.$t('delete.deleteRow'), this.$t('delete.prompt'), {
        distinguishCancelAndClose: true,
        type: 'warning',
        confirmButtonText: this.$t('common.delete'),
        cancelButtonText: this.$t('common.cancel')
      }).then(() => {
        this.$http.deviceDelete(ids).then(
          res => {
            if (res.data.status == 200) {
              if (ids.length == this.tableData.length) {
                this.currentPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : 1
                this.searchtabledata();
              } else {
                this.searchtabledata();
              }
              this.$emit('initTree')
              this.$message.success(this.$t('delete.success'));
              this.$refs.cameratable.clearSelection();
            } else {
              this.$message.warning(
                  this.$t('common.deleteFailed') + res.data.message
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
};
</script>

<style lang="scss" scoped>
// @media screen and (max-width: 1810px){
//     .camera-operation{
//         display: block !important;
//         .operation-right{
//           margin-bottom: 15px;
//           button{
//             padding: 12px 35px;
//           }
//         }
//     }
// }
// @media screen and (max-width: 1910px){
//     .camera-operation{
//       position: relative;
//         .operation-right{
//           position: absolute;
//           top: -50px;
//           right: 0;
//         }
//     }
// }
.sub {
  text-align: right;
}
.camera-operation {
  box-sizing: border-box;
  padding-top: 10px;
  min-height: 72px;
  display: flex;
  justify-content: space-between;
  .operation-right{
    button{
      padding: 12px 16px;
    }
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
.selectTree {
  height: 300px;
  overflow-x: hidden;
}
.has-device-box{
  .hasdeviceinfo{
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
}
</style>
<style lang="scss">
.el-table th, .el-table tr {
      // color:rgba(37,44,53,1) !important;
    }
.delete-button{
  margin: 0 !important;
}
  @media screen and (max-width: 1910px){
    .camera-operation{
      position: relative;
      .operation-left{
        .el-select{
          width: 160px !important;
          .el-input{
            width: 100% !important;
          }
        }
        .el-input{
          width: 220px !important;
        }
        @media screen  and(max-width: 1660px) {
          margin-top: 50px;
          .el-form-item{
            margin-right: 10px !important;
            .el-select{
              width: 140px !important;
            }
            .cameraDevice-input{
              width: 160px !important;
            }
            .cameraIp-input{
              width: 160px !important;
            }
          }
        }
      }
        .operation-right{
          position: absolute;
          top:-50px;
          right: 0;
          @media screen and(max-width: 1660px) {
            left: 0;
            top: 5px;
          }
          button{
            padding: 12px 18px !important;
          }
        }
    }
}
</style>
