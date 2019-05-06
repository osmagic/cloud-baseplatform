<template>
  <div id="device_manage">
    <!-- 设置框 -->
    <el-dialog
      :title="$t('accessSystem.shezhi')"
      :visible.sync="settingDialogVisible"
      width="28%"
      :before-close="handleClose"
    >
      <el-form label-position="left" label-width="70px" :model="settingForm" class="form">
        <div class="content-set">
          <!-- <div
            v-for="(week, index) in allWeeks"
            :key="index"
          >
            <div class="week-word">{{ week.name }}</div>
            <div
              class="week-line"
              v-for="(item, dex) in week.timeList"
              :key="dex"
            >
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <el-slider
                        v-model="item.timeQj"
                        range
                        label
                        :format-tooltip="formatTimetip"
                        :max="144"
                      >
                      </el-slider>
                    </el-col>
                    <el-col
                      :span="8"
                      style="margin-top:3px"
                    >
                      <div class="show-time">{{filterTimeInterVal(item.timeQj)}}</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col
                  :span="6"
                  style="margin-top:3px"
                >
                  <el-button
                    type="text"
                    size="mini"
                    @click="delTimeTip(index, dex)"
                    v-if="dex!=0"
                  >{{$t('accessSystem.shanchu')}}</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="addTimeTip(index, dex)"
                    v-if="dex === 0"
                  >{{$t('accessSystem.xinzeng')}}</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="tupTime(index, dex)"
                    v-if="index !== 0 && dex===0"
                  >{{$t('accessSystem.tongshang')}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>-->
          <week-time-sel @getTime="getTime" :setWeekTime="setWeekTime"></week-time-sel>
        </div>
        <el-form-item
          :label="$t('accessSystem.jinchuleixing')"
          label-width="100"
          style="margin-top:10px"
        >
          <el-select
            :placeholder="$t('accessSystem.jinchuleixing')"
            class="select"
            v-model="settingForm.inOut"
          >
            <el-option :label="$t('accessSystem.jin')" :value="1"></el-option>
            <el-option :label="$t('accessSystem.chu')" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="settingSubmit">{{$t('accessSystem.queding')}}</el-button>
    </el-dialog>
    <!--  -->
    <div class="contantHeader">
      <!-- 添加设备框 -->
      <el-dialog
        :title="$t('accessSystem.tianjiashebei')"
        :visible.sync="dialogTableVisible"
        width="47%"
        class="diglog"
        :before-close="addClose"
      >
        <select-group class="tree" ref="treemenu"></select-group>
        <!-- <tree-transfer
          :from_data='fromData'
          :to_data='toData'
          :defaultProps="{label:'label'}"
          :mode='mode'
          height='540px'
          filter
          openAll
          :leafOnly="true"
        >
        </tree-transfer>-->
        <div class="deviceList">
          <el-tabs
            v-model="$store.state.sccessDevice.accessManage.deviceType"
            type="card"
            @tab-click="tabclick"
          >
            <el-tab-pane :label="$t('accessSystem.shexiangji')" name="1"></el-tab-pane>
            <el-tab-pane :label="$t('accessSystem.zhinengyingjian')" name="3"></el-tab-pane>
            <!-- <el-tab-pane
              label="智能硬件"
              name="3"
            ></el-tab-pane>-->
          </el-tabs>
          <el-table
            :data="$store.state.sccessDevice.accessManage.deviceList"
            size="mini"
            height="400"
            style="width: 100%"
          >
            <el-table-column :label="$t('accessSystem.mingcheng')" width="180" prop="name"></el-table-column>

            <el-table-column :label="$t('accessSystem.caozuo')" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index,scope.row)"
                  :disabled="scope.row.isAdd"
                >{{$t('accessSystem.tianjia')}}</el-button>
                <!-- <span>{{scope.row.isAdd}}</span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tags">
          <div>
            <el-tag
              :key="tag.id"
              v-for="tag in $store.state.sccessDevice.accessManage.addList"
              :closable="tag.closable"
              :disable-transitions="false"
              @close="deleteTag(tag)"
            >{{tag.name}}</el-tag>
          </div>
          <div>
            <el-button type="primary" @click="insertDevice">{{$t('accessSystem.queding')}}</el-button>
          </div>
        </div>
      </el-dialog>
      <span class="title">{{$t('accessSystem.menjinshebei')}}</span>
      <div style="display:inline-block;float:right;margin-right:0.64rem">
        <el-button round @click="openAdd">{{$t('accessSystem.xinzeng')}}</el-button>
        <el-button round @click="moreDelete">{{$t('accessSystem.shanchu')}}</el-button>
        <el-button round @click="openSetting">{{$t('accessSystem.shezhi')}}</el-button>

        <el-button
          round
          type="primary"
          class="btn"
          @click="openAll"
        >{{$t('accessSystem.xiaofangkaimen')}}</el-button>
      </div>
    </div>
    <div class="contantTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="deviceName" :label="$t('accessSystem.shebeimingcheng')"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型" :formatter="formatType"></el-table-column>

        <el-table-column prop="inOut" label="进出类型" :formatter="formatInOut"></el-table-column>

        <el-table-column :label="$t('accessSystem.gongzuoshijian')">
          <template slot-scope="timeScope">
            <el-popover placement="left-start" trigger="hover">
              <span
                slot="reference"
              >{{$t('accessSystem.zhouyi')}} {{timeScope.row.mon}}{{$t('accessSystem.dian')}}......</span>
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

        <el-table-column :label="$t('accessSystem.caozuo')">
          <template slot-scope="deviceScope">
            <el-button
              size="mini"
              type="text"
              @click="openSetting(deviceScope.row)"
            >{{$t('accessSystem.shezhi')}}</el-button>
            <!-- @click="handleEdit(scope.$index, scope.row)" -->
            <el-button
              size="mini"
              type="text"
              @click="farOpen(deviceScope.row)"
            >{{$t('accessSystem.yuanchengkaimen')}}</el-button>
            <el-button
              size="mini"
              type="text"
              @click="deleteDevice(deviceScope.row)"
            >{{$t('accessSystem.shanchu')}}</el-button>
            <!-- @click="handleDelete(scope.$index, scope.row)" -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNumber"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import treeTransfer from "../access_system/transfer-extend";
import selectGroup from "./select_group.vue";
import weekTimeSel from "./common/weekTimeSel.vue";
// import APICONFIG from "../../../../../../config/api.js";
export default {
  components: { selectGroup, weekTimeSel },
  data() {
    return {
      tableData: [],
      settingIds: [], //参与设置id列表
      addList: [],
      deviceIds: [],

      dialogTableVisible: false, //新增设备弹窗
      settingDialogVisible: false,
      settingForm: {
        inOut: 0
      },
      getRowKeys(row) {
        return row.id;
      },
      allWeeks: [
        {
          name: this.$t("accessSystem.zhouyi"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouer"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhousan"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhousi"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouwu"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouliu"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouri"),
          timeList: [{ timeQj: [0, 144] }]
        }
      ],

      //test
      mode: "addressList", // transfer addressList
      fromData: [
        {
          id: "1",
          pid: 0,
          label: "一级 1",
          children: [
            {
              id: "1-1",
              pid: "1",
              label: "二级 1-1",
              children: []
            }
          ]
        }
      ],
      toData: [],
      deviceAlreadyList: [],
      netAPI: {},
      value4: "",
      value: "",
      total: 0,
      pageNumber: 1,
      store: this.$store.state.sccessDevice.accessManage,
      multipleSelection: [],
      pageSize: 5,
      setWeekTime: {
        fri: "00:00-24:00",
        mon: "00:00-24:00",
        sat: "00:00-24:00",
        sun: "00:00-24:00",
        thu: "00:00-24:00",
        tue: "00:00-24:00",
        wed: "00:00-24:00"
      },
      weekTime:{}
    };
  },
  created() {
    // this.netAPI = APICONFIG().get("accessSystem");
    this.getDeviceList();
    // this.getDevices();
  },
  mounted() {
    console.log(this.$store.state.sccessDevice.accessManage.deviceType);
  },
  methods: {
    getTime(v) {
      console.log(v);
      this.weekTime = v
    },
    // 已设置时间数据格式化
    timeDataTransfer(initData) {
      this.allWeeks = [
        {
          name: this.$t("accessSystem.zhouyi"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouer"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhousan"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhousi"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouwu"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouliu"),
          timeList: [{ timeQj: [0, 144] }]
        },
        {
          name: this.$t("accessSystem.zhouri"),
          timeList: [{ timeQj: [0, 144] }]
        }
      ];

      let xqs = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      let editForm = initData;
      var a = true;
      // 时间段数据转换后复值
      xqs.forEach((res, index) => {
        if (!editForm[xqs[index]]) {
          a = false;
        }
      });
      if (a) {
        this.allWeeks.forEach((item, index) => {
          if (this.allWeeks[index].timeList) {
            this.allWeeks[index].timeList = [];
          }
        });
      }

      xqs.forEach((res, index) => {
        if (editForm[xqs[index]]) {
          editForm[xqs[index]].split(",").forEach((item, dex) => {
            let start =
              parseInt(item.split("-")[0].split(":")[0]) * 6 +
              parseInt(item.split("-")[0].split(":")[1]) / 10;
            let end =
              parseInt(item.split("-")[1].split(":")[0]) * 6 +
              parseInt(item.split("-")[1].split(":")[1]) / 10;
            this.allWeeks[index].timeList.push({ timeQj: [start, end] });
          });
        }
      });
    },
    // 切换设备种类
    tabclick() {
      console.log(this.$store.state.sccessDevice.accessManage.groupData);
      const promise = new Promise((resolve, reject) => {
        this.$http
          .findAllDevice({
            groupNo: this.$store.state.sccessDevice.accessManage.groupData
              .groupNo,
            type: this.$store.state.sccessDevice.accessManage.deviceType
          })
          .then(res => {
            if (res.data.status == 200) {
              this.$store.state.sccessDevice.accessManage.deviceList =
                res.data.data;
              resolve(res.data.data);
            } else {
              this.$message.error(res.data.message);
            }
          });
      });
      promise.then(res => {
        this.$http
          .findDeviceAll({
            pageSize: 1000,
            pageNo: 1
          })
          .then(res => {
            for (const key in res.data.data) {
              if (res.data.data.hasOwnProperty(key)) {
                const element = res.data.data[key];
                // this.addList.push({
                //   name: element.deviceName,
                //   id: element.deviceId
                // });
                for (const key2 in this.$store.state.sccessDevice.accessManage
                  .deviceList) {
                  if (
                    this.$store.state.sccessDevice.accessManage.deviceList.hasOwnProperty(
                      key2
                    )
                  ) {
                    const device = this.$store.state.sccessDevice.accessManage
                      .deviceList[key2];
                    if (element.deviceId == device.id) {
                      // device.isAdd = false;

                      this.$set(device, "isAdd", "true");
                    }
                  }
                }
              }
            }

            // this.pageNumber = res.data.pageNumber;
          });
        console.log(this.$store.state.sccessDevice.accessManage.deviceList);
      });
    },
    // 添加设备对话框关闭前处理
    addClose() {
      (this.$store.state.sccessDevice.accessManage.addList = []),
        (this.dialogTableVisible = false);
    },
    //消防开门
    openAll() {
      this.$http.openDoor([]).then(res => {
        if (res.data.status == 200) {
          this.$message.success(this.$t("accessSystem.yikaimen"));
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //表格多选处理
    handleSelectionChange(val) {
      console.log(val);
      if (val.length) {
        this.multipleSelection = val;
      } else {
        this.multipleSelection = [];
      }
    },
    moreDelete() {
      var params = [];
      if (this.multipleSelection.length < 1) {
        this.$message.warning(this.$t("accessSystem.qingxuanzeshanchuxiang"));
      } else {
        for (const key in this.multipleSelection) {
          if (this.multipleSelection.hasOwnProperty(key)) {
            const element = this.multipleSelection[key];
            params.push({ id: element.id });
          }
        }
        this.$http.removeDevice(params).then(res => {
          if (res.data.status == 200) {
            this.$message.success(this.$t("accessSystem.shanchuchenggong"));
            console.log(this.tableData.length);
            if (this.tableData.length == 1) {
              this.pageNumber =
                this.pageNumber - 1 > 0 ? this.pageNumber - 1 : 1;
            }
            if (params.length == res.data.data) {
              this.pageNumber =
                this.pageNumber - 1 > 0 ? this.pageNumber - 1 : 1;
            }
            //  this.pageNumber = res.data.pageNumber

            this.getDeviceList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    //远程开门
    farOpen(row) {
      this.$http.openDoor([{ deviceId: row.id }]).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success(this.$t("accessSystem.yikaimen"));
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //删除设备
    deleteDevice(row) {
      console.log(row);
      this.$http.removeDevice([{ id: row.id }]).then(res => {
        if (res.data.status == 200) {
          this.$message.success(this.$t("accessSystem.shanchuchenggong"));
          if (this.tableData.length == 1) {
            this.pageNumber = this.pageNumber - 1 > 0 ? this.pageNumber - 1 : 1;
          }
          //  this.pageNumber = res.data.pageNumber
          this.getDeviceList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    settingSubmit() {
      // let weeks = JSON.parse(JSON.stringify(this.allWeeks));
      // weeks.forEach((item, dex1) => {
      //   item.timeList.forEach((res, dex2) => {
      //     let start = res.timeQj[0];
      //     let end = res.timeQj[1];
      //     let minStart = `${
      //       (start % 6) * 10 < 10 ? "0" + (start % 6) * 10 : (start % 6) * 10
      //     }`;
      //     let minEnd = `${
      //       (end % 6) * 10 < 10 ? "0" + (end % 6) * 10 : (end % 6) * 10
      //     }`;
      //     weeks[dex1].timeList[dex2].timeQj = `${Math.floor(
      //       start / 6
      //     )}:${minStart}-${Math.floor(end / 6)}:${minEnd}`;
      //   });
      // });
      // let xqs = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      // xqs.forEach((xq, index) => {
      //   let str = "";
      //   weeks[index].timeList.forEach(res => {
      //     if (str) {
      //       str = str + "," + res.timeQj;
      //     } else {
      //       str = res.timeQj;
      //     }
      //   });
      //   this.settingForm[xq] = str;
      // });

      for (const key in this.weekTime) {
        // if (this.weekTime.hasOwnProperty(key)&&(!this.settingForm.hasOwnProperty(key))) {
          this.settingForm[key]=this.weekTime[key]   
          console.log(this.weekTime[key]   )
        // }
      }
      this.settingForm.ids = this.settingIds;
      if (this.settingIds.length == 0) {
        console.log(this.multipleSelection);
        var ids = [];

        for (const key in this.multipleSelection) {
          if (this.multipleSelection.hasOwnProperty(key)) {
            const element = this.multipleSelection[key];
            ids.push(element.id);
          }
        }
        this.settingForm.ids = ids;
      }
      console.log(this.settingIds);
      this.$http.updateDevice(this.settingForm).then(res => {
        if (res.data.status == 200) {
          this.$message.success(this.$t("accessSystem.shezhichenggong"));
          this.getDeviceList();
          this.settingDialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.settingDialogVisible = false;
        }
      });
    },
    insertDevice() {
      let paramsId = [];
      console.log(
        this.deviceAlreadyList,
        this.$store.state.sccessDevice.accessManage.addList
      );
      for (var key in this.$store.state.sccessDevice.accessManage.addList) {
        if (
          this.$store.state.sccessDevice.accessManage.addList.hasOwnProperty(
            key
          )
        ) {
          const element = this.$store.state.sccessDevice.accessManage.addList[
            key
          ];
          paramsId.push(element.id);
          for (const key2 in this.$store.state.sccessDevice.accessManage
            .deviceAlreadyList) {
            if (
              this.$store.state.sccessDevice.accessManage.deviceAlreadyList.hasOwnProperty(
                key2
              )
            ) {
              const element2 = this.$store.state.sccessDevice.accessManage
                .deviceAlreadyList[key2];
              if (element2.deviceId == element.id) {
                paramsId.pop();
                console.log(1);
              }
            }
          }
        }
      }
      this.$http
        .addDevices({
          deviceIds: paramsId
        })
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success(this.$t("accessSystem.tianjiachenggong"));
            this.getDeviceList();
          } else {
            this.$message.error(res.data.message);
          }
          this.addClose();
        });
    },
    deleteTag(tag) {
      console.log(tag);
      this.$store.state.sccessDevice.accessManage.addList.splice(
        this.$store.state.sccessDevice.accessManage.addList.indexOf(tag),
        1
      );
      for (let index = 0; index < this.store.deviceList.length; index++) {
        const element = this.store.deviceList[index];
        if (tag.id == element.id) {
          element.isAdd = false;
          this.$set(this.store.deviceList, index, element);
        }
      }
    },
    //设备添加
    handleEdit(index, row) {
      console.log(index);

      row.isAdd = true;
      this.$set(this.store.deviceList, index, row);

      this.$store.state.sccessDevice.accessManage.addList.push({
        name: row.name,
        id: row.id,
        closable: true
      });
    },
    // 新增设备列表查询
    getDevices() {
      this.$http.findAllDevice().then(res => {});
    },
    openAdd() {
      this.dialogTableVisible = true;
      console.log(this.$store);
      this.$store.commit("freshData");
    },
    formatType(row, column) {
      switch (row.deviceType) {
        case 1:
          return this.$t("accessSystem.zhaoxiangji");
          break;
        case 2:
          return this.$t("accessSystem.luxiangji");
          break;
        case 3:
          return this.$t("accessSystem.zhinengyingjian");
          break;
      }
    },
    formatInOut(row, column) {
      switch (row.inOut) {
        case 1:
          return "开门";
          break;
        case 0:
          return "关门";
          break;
      }
    },
    openSetting(row) {
      if (!row.id && this.multipleSelection.length < 1) {
        this.$message.warning(this.$t("accessSystem.qingxuanzeshezhixiang"));
      } else {
        this.settingDialogVisible = true;
      }

      if (row.id) {
        this.settingIds.push(row.id);
      }
      console.log(row)

      // this.timeDataTransfer(row);
       let xqs = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
       for (let index = 0; index < xqs.length; index++) {
         const element = xqs[index];
         this.setWeekTime[element] = row[element]
       }
      this.settingForm.inOut = row.inOut;
    },
    handleClose() {
      this.settingDialogVisible = false;
      this.settingIds = [];
      console.log("close");
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getDeviceList();
    },
    handleCurrentChange(pageNumber) {
      this.pageNumber = pageNumber;
      this.getDeviceList();
    },
    //门禁设备列表查询
    getDeviceList() {
      this.$http
        .findDeviceAll({
          params: {
            pageSize: this.pageSize,
            pageNo: this.pageNumber,
            sort: "id",
            order: "asc"
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.total;
          // if(this.pageNumber-res.data.pageNumber==1){
          //   this.pageNumber--
          //   this.getDeviceList()
          // }
          // this.pageNumber = res.data.pageNumber;
        });
    },
    // 新增工作时间段
    addTimeTip(dex1, dex2) {
      if (this.allWeeks[dex1].timeList.length < 4) {
        this.$set(
          this.allWeeks[dex1].timeList,
          `${this.allWeeks[dex1].timeList.length}`,
          { timeQj: [0, 144] }
        );
      } else {
        this.$message.error(
          this.$t("accessSystem.meirishangxiansigeshijianduan")
        );
      }
    },
    // 删除工作时间段
    delTimeTip(dex1, dex2) {
      this.allWeeks[dex1].timeList.splice(dex2, 1);
    },
    // 同步昨天的时间段设置
    tupTime(dex1, dex2) {
      this.allWeeks[dex1].timeList = JSON.parse(
        JSON.stringify(this.allWeeks[dex1 - 1].timeList)
      );
    },
    // 处理所选时间区间
    filterTimeInterVal(val) {
      let start = val[0];
      let end = val[1];
      let minStart = `${
        (start % 6) * 10 < 10 ? "0" + (start % 6) * 10 : (start % 6) * 10
      }`;
      let minEnd = `${
        (end % 6) * 10 < 10 ? "0" + (end % 6) * 10 : (end % 6) * 10
      }`;
      return `${Math.floor(start / 6)}:${minStart}-${Math.floor(
        end / 6
      )}:${minEnd}`;
    },
    // 格式化toolTip
    formatTooltip(val) {
      return val / 100;
    },
    // 格式化设备时间
    formatTimetip(val) {
      let mintime = `${
        (val % 6) * 10 < 10 ? "0" + (val % 6) * 10 : (val % 6) * 10
      }`;
      return `${Math.floor(val / 6)}:${mintime}`;
    }
  }
};
</script>
<style lang='scss'>
#device_manage {
  .el-dialog {
    height: 550px;
    overflow: auto;
  }
}
.el-dialog__body {
  overflow: hidden;
}
</style>


<style scoped>
.select {
  width: 2rem;
}
.btn {
  box-shadow: 0px 5px 6px 0px rgba(179, 209, 241, 1);
}
#device_manage {
  height: 800px;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
.contantHeader {
  font-size: 20px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(39, 39, 39, 1);
  padding-top: 23px;
}
.title {
  margin-left: 32px;
}
.pagination {
  float: right;
  margin-top: 25px;
  margin-right: 0.62rem;
}
.contantTable {
  padding-top: 20px;
}
.form {
  margin: 0 auto;
  width: 90%;
}
.week-word {
  float: left;
  margin-top: 7px;
}
.week-line {
  padding-left: 70px;
}
.show-time {
  margin-top: 7px;
}
.word-content {
  padding-top: 10px;
}
.tree {
  width: 4rem;

  height: 300px;
  float: left;
}
.deviceList {
  float: left;
  margin-top: -30px;
  margin-left: 0.4rem;
}
.tags {
  float: left;

  width: 4rem;
  margin-top: 30px;
  margin-left: 0.5rem;
}
</style>
