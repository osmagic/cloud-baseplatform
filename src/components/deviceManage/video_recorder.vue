<template>
  <div class="recorderPage">
    <!-- 操作 -->
    <div class="recorder-operation" ref="recorderOperation">
    <!-- 搜索 -->
    <div class="operation-left" ref="operationLeft">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item :label="$t('deviceList.status') + '：'">
          <el-select v-model="search.status" clearable
                     :placeholder="$t('deviceList.all')"
                     :style="{'width':$i18n.locale == 'zh'? '140px':'100px'}">
            <el-option
              v-for="(item,index) in statusType"
              :key="index"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceName') + '：'">
          <el-input v-model="search.name" :placeholder="$t('deviceList.deviceName')" clearable
                    style="width:160px;"
                    class="recorderDevice-input"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.ip') + '：'">
          <el-input v-model="search.ip" :placeholder="$t('deviceList.ip')" clearable
                    style="width:160px;"
                    class="recorderIp-input"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchtabledata('search')">{{$t('common.search')}}</el-button>
      </el-form>
    </div>
     <div class="operation-right"
          ref="operationRight">
        <el-button ref="batchremove" :disabled="batchdisabled" style="color:#BABABA" @click="deleteRow(multipleSelection)">
            {{$t('common.batchDeletion')}}
        </el-button>
        <el-button ref="batchgroup" :disabled="batchdisabled" style="color:#BABABA" @click="openBatch(multipleSelection)">
            {{$t('deviceList.batchGroup')}}
        </el-button>
        <el-button @click="openadddialogVisible" :disabled="!$route.meta['add']">
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
              :header-cell-style="{background:'rgba(245,248,252,1)'}"
              @selection-change="handleSelectionChange"
              height="520"
              style="width: 100%"
              ref="recordertable"
              :row-key="getRowKeys"
              >
      <el-table-column
      fixed
      type="selection"
      width="50"
      align="center"
      @selection-change="handleSelectionChange"
      :selectable="filterselectable"
      reserve-selection
      ></el-table-column>
      <el-table-column type="index"  :label="$t('deviceList.index')" prop="id" align="center" width="62">
      </el-table-column>
      <el-table-column prop="name" :label="$t('deviceList.name')" align="center" fixed="left">
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
      <el-table-column prop="user" :label="$t('deviceList.user')" align="center">
      </el-table-column>
      <el-table-column prop="password" :label="$t('deviceList.passWord')" align="center">
      </el-table-column>
      <el-table-column :label="$t('deviceList.connectingCamera')"
                        align="center"
                       :width="$i18n.locale == 'zh'? '120':'155'">
        <template slot-scope="scope" >
         <span v-if="scope.row.cameras" :title="filterCameras(scope.row)">
           {{scope.row.cameras[0].cameraName}}...
           <!-- <span v-if="scope.row.cameras.length>1">...</span> -->
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceList.operation')" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateopen(scope.row)" :disabled="!$route.meta['modify']">
            {{$t('common.edit')}}
          </el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)" :disabled="!$route.meta['remove']">
            {{$t('common.delete')}}
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
    <!-- 添加模态框 -->
    <el-dialog :title="$t('deviceList.addRecorder')"
               :close-on-click-modal="false"
               :visible.sync="adddialogVisible"
               width="575px"
               :before-close="careateFileHandleClose">
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
        <el-form-item :label="$t('deviceList.status')" prop="status">
          <el-select v-model="createfrom.status" :placeholder="$t('deviceList.status')">
            <el-option
              v-for="(item,index) in statusType"
              :key="index"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.passageway')"
                       prop="sourceAddress"
                      >
          <el-input v-model="createfrom.sourceAddress" :placeholder="$t('deviceList.passageway')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.connectingCamera')" prop="cameraIds"
                      :label-width="$i18n.locale=='zh'?'100':'140'"
                      class="createConnect"
                      >
            <span v-for="(item,index) in createconnectCameraname"
                :key="index"
                :class="filterClass(index)">
                {{item}}
            </span>
          <el-button @click="openConnectCamera" class="connect">+</el-button>
        </el-form-item>
        <el-form-item :label="$t('deviceList.modifyGrouping')" prop="groupNo">
          <el-input v-model="createselectGroupName" :placeholder="$t('deviceList.modifyGrouping')" @focus="openselectDeviceGroup"></el-input>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelcreatedialogVisible('createfrom')">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="createdFrom('createfrom')">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑模态框 -->
     <el-dialog :title="$t('deviceList.editingCamera')"
                :visible.sync="updateialogVisible"
                width="575px"
                :before-close="updateFileHandleClose"
                :close-on-click-modal="false">
      <el-form ref="updatefrom" :model="updatefrom" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('deviceList.name')" prop="name">
          <el-input v-model="updatefrom.name" :placeholder="$t('deviceList.deviceName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.ip')" prop="ip">
          <el-input v-model="updatefrom.ip" :placeholder="$t('deviceList.ip')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.port')" prop="port">
          <el-input v-model="updatefrom.port" :placeholder="$t('deviceList.port')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.user')" prop="user">
          <el-input v-model="updatefrom.user" :placeholder="$t('deviceList.user')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.passWord')" prop="password">
          <el-input v-model="updatefrom.password" :placeholder="$t('deviceList.passWord')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.status')" prop="status">
          <el-select v-model="updatefrom.status" :placeholder="$t('deviceList.status')">
            <el-option
              v-for="(item,index) in statusType"
              :key="index"
              :label="$i18n.locale == 'zh' ? item.zhName : item.enName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.passageway')" prop="sourceAddress">
          <el-input v-model="updatefrom.sourceAddress" :placeholder="$t('deviceList.passageway')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.connectingCamera')" prop="cameraIds"
                      :label-width="$i18n.locale=='zh'?'100':'140'"
                      class="updateConnect">
          <span v-for="(item,index) in updateconnectCameraname"
                :key="index"
                :class="filterClass(index)"
                style="margin-bottom: 10px;"
                >{{item}}</span>
          <!-- <el-input v-model="updateconnectCameraname" disabled style="width: 86%;" placeholder="请关联摄像机"></el-input> -->
          <el-button @click="openConnectCamera('update')"
                     class="connect">+</el-button>
        </el-form-item>
        <el-form-item :label="$t('deviceList.modifyGrouping')" prop="groupNo">
          <el-input v-model="updateselectGroupName" :placeholder="$t('deviceList.modifyGrouping')" @focus="openselectDeviceGroup"></el-input>
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
               class="select-group-dialog"
               :close-on-click-modal="false">
      <el-form :model="selectgroupform" label-width="80px">
      <select-group  @receiveChildProps="showSelectedGroup"
                     class="selectTree"
                     isSelect="true"
                     ref="recorderselectgroup"
                     isNeedlinkage="false"
                     platform="coala"></select-group>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelselectGroupialogVisible('selectgroupform')" size="small">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="selectGroupForm('selectgroupform')" size="small">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 批量分组模态框 -->
    <el-dialog :title="$t('deviceList.modifyGrouping')"
               :visible.sync="batchGroupialogVisible"
               width="380px"
               :before-close="batchGroupFileHandleClose"
               class="batch-group-dialog"
               :close-on-click-modal="false">
      <el-form :model="batchgroupfrom" label-width="80px">
      <!-- 选择分组树形菜单 -->
      <select-group isNeedlinkage="false"
                    ref="recorderbatchgroup"
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
    <!-- 关联摄像机模态框 -->
    <connectcamera ref="connectCameraRef"
                   @ConnectChildProps="receiveConnectChildProps"
                   @clearConnect="clearConnect"></connectcamera>
  </div>
</template>

<script>
// import NetAPI from "../../../../../config/api.js";
import connectcamera from "./connect_camera.vue"
import selectGroup from "./select_group.vue"
export default {
  name: "video_recorder",
  components: {
    connectcamera,
    selectGroup
  },
  data () {
    return {
      status: "",
      tableData: [],
      netAPI: "",
      multipleSelection: [],
      cameraIds: [],
      // 所有未关联的摄像机
      allNotIncludeCarmeras: [],
      // 已关联的摄像机映射id
      hasconnectedIds: [],
      createconnectCameraname: [],
      updateconnectCameraname: [],
      rowConnectCamerasData: [],
      createselectGroupName: '',
      updateselectGroupName: '',
      // 被待选中的设备组编号
      beingSelectGroupNo: '',
      // 被待选中的设备组名称
      beingSelectGroupName: '',
      // 协议类型
      protocolType: ['RTSP', 'HTTP', 'TCP', 'UDP', 'FTP'],
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
        return row.id
      },
      selectGroupialogVisible: false,
      adddialogVisible: false,
      updateialogVisible: false,
      batchGroupialogVisible: false,
      batchdisabled: true,
      tableBoxLoading: false,
      clear: false,
      groups: [],
      pageSize: 5, //当前分页
      currentPage: 1, //当前页
      total: 0, //一共多少条数据
      createfrom: {
        type: 2,
        status: "",
        name: "",
        ip: "",
        port: "",
        user: "",
        password: "",
        groupNo: "",
        // 暂时作为‘通道’
        sourceAddress: "",
        cameraIds: [],
      },
      updatefrom: {
        type: 2,
        id: "",
        status: "",
        name: "",
        ip: "",
        port: "",
        user: "",
        password: "",
        groupNo: "",
        // 暂时作为‘通道’
        sourceAddress: "",
        cameraIds: [],
        mappingIds: []
      },
      search: {
        ip: "",
        status: "",
        name: "",
        type: 2 //必须携带
      },
      // rules: {
      //   name: [
      //       { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.deviceName'), trigger: 'blur' },
      //   ],
      //   ip: [
      //       { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.ip'), trigger: 'blur' },
      //   ],
      //   port: [
      //       { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.port'), trigger: 'blur' },
      //   ],
      //   user: [
      //       { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.user'), trigger: 'blur' },
      //   ],
      //   password: [
      //       { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.passWord'), trigger: 'blur' },
      //   ],
      //   status: [
      //       { required: true, message: this.$t('deviceList.select') + this.$t('deviceList.status'), trigger: 'change' }
      //   ],
      //   sourceAddress: [
      //       { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.passageway'), trigger: 'blur' },
      //   ],
      // },
      selectgroupform: {

      },
      // 批量分组
      batchgroupfrom: {
        groupNo: '',
        deviceIds: []
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
        sourceAddress: [
            { required: true, message: this.$t('deviceList.please') + this.$t('deviceList.passageway'), trigger: 'blur' },
        ],
      }
    }
  },
  created () {
    // this.netAPI = NetAPI().get("device");
    // this.token = localStorage.getItem('token');
    // this.searchtabledata();
    // this.findAllCarmers();
  },
  methods: {
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
    // 选择设备组tags动态类名
    filterClass(index) {
      if(index % 5 == 0) {
        return 'randomTags1'
      }else if(index % 5 == 1) {
        return 'randomTags2'
      }else if(index % 5 == 2) {
        return 'randomTags3'
      } else if(index % 5 == 3) {
        return 'randomTags4'
      }else if(index % 5 == 4) {
        return 'randomTags5'
      }
    },
    // 批量导入
    doimport() {
      this.$emit('doimport', true, 2)
    },
    // 遍历每个录像机所关联的摄像机，显示title
    filterCameras(row) {
      let cameras = [];
      row.cameras.forEach(item => {
        cameras.push(item.cameraName)
      })
      return cameras;
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
              this.$refs.recordertable.clearSelection();
              this.$emit('initTree');
              this.$message.success(this.$t('deviceList.batchGroupSuccess'))
              this.searchtabledata();
            } else {
              this.$message.warning(res.body.message)
            }
          }
        )
      this.$refs.recorderbatchgroup.initData();
      this.batchGroupialogVisible = false;
    },
    // 点击批量分组树型菜单时接收数据
    handlebatchgroup(data) {
      this.batchgroupfrom.groupNo = data.groupNo;
    },
    // 点击右上角，关闭批量分组模态框
    batchGroupFileHandleClose(done) {
      this.$refs.recorderbatchgroup.initData();
      done();
    },
    // 点击取消，关闭批量分组模态框
    cancelbatchGroupialogVisible() {
      this.$refs.recorderbatchgroup.initData();
      this.batchGroupialogVisible = false;
    },
    // 弹出选择分组模态框
    openselectDeviceGroup() {
      this.selectGroupialogVisible = true;
    },
    // 选择设备组时，点击事件
    showSelectedGroup(data1, data2) {
      // console.log(JSON.stringify(data2))
      // 被待选的设备组编号和名称
      this.beingSelectGroupNo = data2.groupNo;
      this.beingSelectGroupName = data2.label;
    },
    // 点击确定，选择或修改设备组关闭选择分组模态框
    selectGroupForm(forName) {
      this.$refs.recorderselectgroup.initData();
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
      this.$refs.recorderselectgroup.initData();
      this.selectGroupialogVisible = false;
    },
    // 点击右上角，关闭选择分组模态框
    selectGroupFileHandleClose (done) {
      this.$refs.recorderselectgroup.initData();
      done();
    },
    // 打开添加模态框
    openadddialogVisible() {
      this.createfrom.cameraIds = [];
      this.createfrom.groupNo = '';
      this.createconnectCameraname = ''
      this.createselectGroupName = '';
      this.adddialogVisible = true;
    },
    // 添加，编辑时,打开关联摄像机模态框
    openConnectCamera(v) {
      // this.updateconnectCameraname = [];
      // 查询所有摄像机
      // this.$http.get(this.netAPI.findnotincludedcamera).then(
      //   res => {
      //     // 重置所有摄像机数据
      //     this.$refs.connectCameraRef.$data.data2 = []
      //     if(res.body.status == 200) {
      //       // console.log(JSON.stringify(res.body.data))
      //       this.allNotIncludeCarmeras = res.body.data
      //       // 左侧显示所有摄像机数据
      //       res.body.data.forEach(item => {
      //         this.$refs.connectCameraRef.$data.data2.push({
      //           label: item.name,
      //           key: item.id,
      //         })
      //       })
      // // 查询该录像机已关联的摄像机
      //       if(v == 'update') {
      //         this.$http.get(this.netAPI.findincludedcamera, {params: {vcrId: this.updatefrom.id}})
      //           .then(
      //             res => {
      //               // this.$refs.connectCameraRef.$data.connectedcameraIds = [];
      //               if(res.body.status == 200) {
      //                 // 遍历所有摄像机和该设备已关联摄像机拿到关联ID
      //                 console.log(JSON.stringify(this.$refs.connectCameraRef.$data.connectedcameraIds))
      //                 console.log(JSON.stringify(this.updateconnectCameraname))
      //                 console.log(JSON.stringify(this.allNotIncludeCarmeras))
      //                 console.log(JSON.stringify(res.body.data))
      //                 if(this.$refs.connectCameraRef.$data.connectedcameraIds.length == 0) {
      //                   console.log(this.$refs.connectCameraRef.$data.connectedcameraIds.length)
      //                   if(this.updateconnectCameraname.length != 0) {
      //                     res.body.data.forEach(item => {
      //                       this.$refs.connectCameraRef.$data.connectedcameraIds.push(item.cameraId)
      //                     })
      //                   }
      //                 }
      //                 console.log(JSON.stringify(this.$refs.connectCameraRef.$data.connectedcameraIds))
      //               } else {
      //                 this.$message.warning(res.body.message)
      //               }
      //             }
      //           )
      //       }
      //     }
      //   }
      // )
      // 重置所有未关联摄像机
      this.$refs.connectCameraRef.$data.data2 = [];
      // 查询所有摄像机
      this.$http.get(this.netAPI.findnotincludedcamera).then(
        res => {
          // 重置所有摄像机数据
          if(res.body.status == 200) {
            console.log(JSON.stringify(res.body.data))
            this.allNotIncludeCarmeras = res.body.data
            // 左侧显示所有摄像机数据
            res.body.data.forEach(item => {
              this.$refs.connectCameraRef.$data.data2.push({
                label: item.name,
                key: item.id,
              })
            })
            console.log(JSON.stringify(this.$refs.connectCameraRef.$data.data2))
          }
        })
        // 如果是编辑录像机时，拿到该行对应录像机已经关联的摄像机
      if(v == 'update') {
        // debugger
        // 如果穿梭框没有已关联的摄像机，则从行数据里面拿已关联摄像机push进去
        console.log(this.$refs.connectCameraRef.$data.connectedcameraIds)
        console.log(this.clear)
        if(this.$refs.connectCameraRef.$data.connectedcameraIds.length == 0 &&
          !this.clear) {
          this.rowConnectCamerasData.forEach(item => {
            this.$refs.connectCameraRef.$data.connectedcameraIds.push(item.cameraId)
          })
        }else{
          this.$refs.connectCameraRef.$data.connectedcameraIds = []
          this.allNotIncludeCarmeras.forEach(item => {
            this.updateconnectCameraname.forEach(i => {
              if(item.name == i) {
                this.$refs.connectCameraRef.$data.connectedcameraIds.push(item.id)
              }
            })
          })
        }
      }
      this.$refs.connectCameraRef.selectcameradialogVisible = true;
    },
    // 添加录像机
    createdFrom (formName) {
      console.log(JSON.stringify(this.createfrom))
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$http.headers.common['token'] = this.token;
          this.$http.post(this.netAPI.insert, this.createfrom).then(
          res => {
            if(res.body.status == 200) {
              // console.log(JSON.stringify(res.body.data))
              this.$message.success(this.$t('deviceControl.insertSuccess'));
              this.$refs.createfrom.resetFields();
              this.$refs.recorderselectgroup.initData();
              this.$refs.recordertable.clearSelection();
              this.$emit('initTree')
              this.adddialogVisible = false;
              this.search.groupNo = '1005'
              this.searchtabledata();
            } else {
              this.$message.warning(this.$t('common.insertFailed') + res.body.message);
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
    // 接收关联摄像机Id,以及摄像机名
    receiveConnectChildProps(data1, data2, data3) {
      // data1:已关联的摄像机id,data2:所有的摄像机数据,data3:被选择关联的摄像机名
      // console.log(JSON.stringify(data1))
      // console.log(JSON.stringify(data2))
      // console.log(JSON.stringify(data3))
      // 关联摄像机模态框，点击确定
      this.createfrom.cameraIds = data1;
      this.createconnectCameraname = data3
      // 编辑时，改变关联摄像机Id和名称
      this.updatefrom.cameraIds = data1;
      this.updateconnectCameraname = data3
    },
    // 点击确定，清楚所有关联
    clearConnect(data) {
      console.log(typeof data)
      this.clear = data;
    },
    // 打开编辑模态框
    updateopen (row) {
      console.log(JSON.stringify(row))
      this.updatefrom.status = row.status
      this.updatefrom.id = row.id
      this.updatefrom.name = row.name
      this.updatefrom.ip = row.ip
      this.updatefrom.port = row.port
      this.updatefrom.user = row.user
      this.updatefrom.password = row.password
      this.updatefrom.sourceAddress = row.sourceAddress
      this.updatefrom.type = row.type
      this.updatefrom.groupNo = row.groupNo
      if(row.cameras) {
        this.rowConnectCamerasData = row.cameras
      }
      // this.updateconnectCameraname = ''
      this.updateconnectCameraname = []
      this.updatefrom.cameraIds = []
      this.updatefrom.mappingIds = []
      // 查询该录像机已经关联的摄像机信息,并显示已关联的摄像机名,赋值已关联的摄像机Id,和需要移除的映射关系
      this.$http.get(this.netAPI.findincludedcamera, {params: {vcrId: row.id}}).then(
        res => {
          if(res.body.status == 200) {
            // console.log(JSON.stringify(res.body.data))
            res.body.data.forEach(item => {
              this.updateconnectCameraname.push(item.cameraName)
              this.updatefrom.cameraIds.push(item.cameraId)
              this.updatefrom.mappingIds.push(item.id)
            })
          }
        }
      )
      // 所在设备组名称
      row.groups.forEach(item => {
        this.updateselectGroupName = item.groupName
      })
      this.updateialogVisible = true;
    },
    // 点击确定，编辑录像机
    updateFrom (formName) {
      console.log(JSON.stringify(this.updatefrom))
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$http.headers.common['token'] = this.token;
          console.log(JSON.stringify(this.updatefrom))
          this.$http.post(this.netAPI.update, this.updatefrom).then(
        res => {
          if (res.body.status == 200) {
            // console.log(JSON.stringify(res.body.data))
            this.$message.success(this.$t('deviceControl.modifiedSuccess'));
            this.$refs.recordertable.clearSelection();
            this.$emit('initTree')
            this.$refs.connectCameraRef.$data.connectedcameraIds = [];
            this.updateialogVisible = false;
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
    // 多选变化时触发
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
    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.searchtabledata();
    },
    handleCurrentChange (Current) {
      this.currentPage = Current;
      this.searchtabledata();
    },
    // 点击右上角，关闭添加模态框
    careateFileHandleClose (done) {
      this.$refs.createfrom.resetFields();
      // if(this.$refs.recorderselectgroup) {
      //   this.$refs.recorderselectgroup.initData();
      // }
      done();
    },
    // 点击取消，关闭添加模态框
    cancelcreatedialogVisible (formName) {
      this.$refs[formName].resetFields();
      this.adddialogVisible = false;
    },
    // 点击右上角，关闭编辑模态框
    updateFileHandleClose (done) {
      // this.updateconnectCameraname = ''
      this.$refs.updatefrom.resetFields();
      this.$refs.connectCameraRef.$data.connectedcameraIds = [];
      done();
    },
    // 点击取消，关闭编辑模态框
    cancelupdateialogVisible (formName) {
      this.$refs[formName].resetFields();
      // this.updateconnectCameraname = '';
      this.$refs.connectCameraRef.$data.connectedcameraIds = [];
      this.updateialogVisible = false;
    },
    // 按条件搜索
    searchtabledata (v) {
      this.tableBoxLoading = true;
      if(v === 'search') {
        this.currentPage = 1
        this.search.type = Number(this.search.type)
      }
      this.$http.headers.common['token'] = this.token;
      this.search.pageSize = this.pageSize;
      this.search.pageNo = this.currentPage;
      // console.log(JSON.stringify(this.search))
      this.$http.get(this.netAPI.find, { params: this.search }).then(
        res => {
          if (res.body.status == 200) {
            // this.parseData(res)
            this.tableData = res.body.data
            this.total = res.body.total
            this.tableBoxLoading = false;
            // console.log(JSON.stringify(this.tableData))
          } else {
            this.$message.warning(res.body.message);
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
    deleteRow (row) {
      // console.log(JSON.stringify(row))
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
        this.$http.post(this.netAPI.delete, ids).then(
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
              this.$refs.recordertable.clearSelection();
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
//     .recorder-operation{
//         display: block !important;
//         .operation-right{
//           margin-bottom: 15px;
//           button{
//             padding: 12px 35px;
//           }
//         }
//     }
// }

.sub {
  text-align: right;
}

input {
  border: 0px;
}
.recorder-operation {
  padding-top: 10px;
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
.connect{
  border:1px dashed #4383DC;
  border-radius:3px;
  color:#4383DC;
}
.connectCameraTags{
  display: inline-block;
  border: 1px solid;
  background:rgba(236,245,255,1);
  color:rgba(152,192,236,1);
  padding: 0 6px;
  border-radius: 4px;
  margin-right: 5px;
  margin-top: 5px;
}
.randomTags1,.randomTags2,.randomTags3,.randomTags4,.randomTags5{
  display: inline-block;
  border: 1px solid;
  background:rgba(236,245,255,1);
  color:rgba(152,192,236,1);
  padding: 0 4px;
  border-radius: 4px;
  margin:0 2px;
  margin-top: 6px;
}
.randomTags2{
  background:rgba(240,249,235,1);
  border:1px solid rgba(190,229,168,1);
  color:rgba(160,219,127,1);
}
.randomTags3{
  background:rgba(252,246,235,1);
  border:1px solid rgba(248,222,175,1);
  color:rgb(245, 220, 173);
}
.randomTags4{
    background: rgba(245,108,108,0.1);
    border:1px solid rgba(245,108,108,0.2);
    color: #f56c6c;
}
.randomTags5{
    background: rgba(144,147,153,0.1);
    border:1px solid rgba(144,147,153,0.2);
    color: #909399;
}
</style>
<style lang="scss">
.createConnect{
  margin-bottom: 22px;
  .el-form-item__label{
    margin-right: 10px;
  }
  .el-form-item__content{
    margin-left: 137px;
  }
}
.updateConnect{
  margin-bottom: 22px;
  .el-form-item__label{
    margin-right: 10px;
  }
  .el-form-item__content{
    margin-left: 137px;
  }
}
</style>
<style lang="scss">
  @media screen and (max-width: 1910px){
     .recorder-operation{
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
            .recorderDevice-input{
              width: 160px !important;
            }
            .recorderIp-input{
              width: 160px !important;
            }
          }
        }
      }
        .operation-right{
          position: absolute;
          top: -50px;
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
