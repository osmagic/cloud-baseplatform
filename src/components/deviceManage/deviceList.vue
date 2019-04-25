<template>
  <div id="deviceList">
     <div class="deviceControl-Page">
    <!-- <separator class="bread-div"></separator> -->
     <!-- 左侧树状图菜单盒子 -->
    <div class="deviceControl-Main-content">
    <div class="select_group">
      <div class="tree-search-box">
          <el-autocomplete v-model="treeSearchValue"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    :placeholder="$t('common.search')">
                    <i slot="suffix"
                         class="el-input__icon el-icon-search"
                         style="font-size:18px;cursor:pointer;">
                    </i>
          </el-autocomplete>
      </div>
      <select-group class="select"
                    ref="treemenu"
                    @receiveChildProps="receiveBoolean"
                    isNeedlinkage="true"
                    platform="coala"
                    isLeftBar="true"></select-group>
      <div class="operation">
        <div>
          <el-button size="mini"
                        icon="el-icon-plus"
                        type="primary"
                        @click="opencreateform"
                        :disabled="adddisabled"

                        >
            {{$t('deviceControl.addGroup')}}
          </el-button></div>
        <div>
          <el-button size="mini" icon="el-icon-edit" @click="openupdateform" :disabled="disabledProp"
                  >
            {{$t('deviceControl.editGroup')}}
          </el-button>
        </div>
        <div>
          <el-button size="mini" icon="el-icon-delete" @click="opendeleteform" :disabled="disabledProp"
                    >
            {{$t('deviceControl.deleteGroup')}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="deviceContent-right">
      <div class="deviceContent-route">

        <div id="tags-box">
          <div v-for="(item,index) in TabNames"
               :key="index"
               :class="{'per-tag': item.tabs,'active-tag':item.active }"
               @click="handletabsClick(index)">
            <div class="tags-img-box">
              <img :src="filterImgDefaultUrl(index)" alt="" v-show="!item.active">
              <img :src="filterImgActiveUrl(index)" alt="" v-show="item.active">
            </div>
            <div class="tags-txt-box">
              <span v-if="$i18n.locale == 'zh'">{{item.zhName}}</span>
              <span v-else>{{item.enName}}</span>
            </div>
          </div>
        </div>
        <div id="device-route-box">
          <video-camera ref="cameraPage" @doimport="doimport" class="device-content" v-if="TabNames[0].active" @initTree="initTree"></video-camera>
          <!-- <video-recorder ref="recorderPage" @doimport="doimport" class="device-content" v-if="TabNames[1].active" @initTree="initTree"></video-recorder> -->
          <intelligent-hardware ref="hardwarePage" @doimport="doimport" class="device-content" v-if="TabNames[1].active" @initTree="initTree"></intelligent-hardware>
        </div>
      </div>
    </div>
    </div>
    <!-- 添加设备组模态框 -->
    <el-dialog :title="$t('deviceControl.addGroup')" :visible.sync="adddialogVisible" width="575px" :before-close="cancelcreatedialogVisible">
      <el-form ref="createform" :model="createform" label-width="100px" label-position="left">
        <el-form-item :label="$t('deviceControl.groupName') + '：'" prop="groupName"
                      :label-width="$i18n.locale == 'zh'? '100px' : '108px'">
          <el-input v-model="createform.groupName"
                    :placeholder="$t('deviceControl.groupName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceControl.groupDescription') + '：'" prop="description"
                      :label-width="$i18n.locale == 'zh'? '100px' : '141px'">
          <el-input v-model="createform.description"
                    :placeholder="$t('deviceControl.groupDescription')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.position') + '：'" label-width="75px">
          <el-checkbox v-model="showLongtitude">{{$t('deviceList.editPosition')}}</el-checkbox>
        </el-form-item>
        <el-form-item :label="$t('deviceList.classify') + '：'" v-if="showLongtitude" prop="classify">
            <el-select v-model="createform.classify" :placeholder="$t('deviceList.classify')" filterable>
              <el-option
                v-for="(item,index) in areaClassify"
                :key="index"
                :label="item.categoryName"
                :value="item.categoryNo">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.longitude') + '：'" v-if="showLongtitude" prop="lng">
            <el-input v-model="createform.lng"
                      :placeholder="$t('deviceList.longitude')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.latitude') + '：'" v-if="showLongtitude" prop="lat">
            <el-input v-model="createform.lat"
                    :placeholder="$t('deviceList.latitude')"></el-input>
        </el-form-item>
        <el-form-item class="sub">
          <el-button type="primary" @click="cancelcreatedialogVisible">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="createForm">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <!-- 编辑设备组模态框 -->
    <el-dialog :title="$t('deviceControl.editGroup')" :visible.sync="updatedialogVisible" width="575px" :before-close="cancelupdatedialogVisible">
      <el-form ref="updateform" :model="updateform" label-width="100px" label-position="left">
        <el-form-item :label="$t('deviceControl.groupName') + '：'" prop="groupName"
                      :label-width="$i18n.locale == 'zh'? '100px' : '108px'">
          <el-input v-model="updateform.groupName"
                    :placeholder="$t('deviceControl.groupName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceControl.groupDescription') + '：'" prop="description"
                      :label-width="$i18n.locale == 'zh'? '100px' : '141px'">
          <el-input v-model="updateform.description"
                    :placeholder="$t('deviceControl.groupDescription')"></el-input>
        </el-form-item>
        <!-- 需修改 -->
        <el-form-item :label="$t('deviceList.classify') + '：'" prop="classify" v-if="updateClassify">
            <el-select v-model="updateform.classify" :placeholder="$t('deviceList.classify')" filterable>
              <el-option
                v-for="(item,index) in areaClassify"
                :key="index"
                :label="item.categoryName"
                :value="item.categoryNo">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.longitude') + '：'" prop="lng" v-if="updateLng">
            <el-input v-model="updateform.lng"
                      :placeholder="$t('deviceList.longitude')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deviceList.latitude') + '：'" prop="lat" v-if="updateLat">
            <el-input v-model="updateform.lat"
                    :placeholder="$t('deviceList.latitude')"></el-input>
        </el-form-item>

        <el-form-item class="sub">
          <el-button type="primary" @click="cancelupdatedialogVisible">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="updateForm">{{$t('common.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除提示模态框 -->
    <el-dialog :title="$t('deviceControl.deleteGroup')"
               :visible.sync="deletedialogVisible"
               width="575px"
               :before-close="canceldeletedialogVisible"
               class="deletedialogVisible">
      <div class="deleteTop"><i class="el-icon-warning"></i>{{$t('deviceControl.cantDelete')}}</div>
      <div class="deleteBottom">
        <div class="deletelook"><span @click="findgroupinner">{{$t('deviceControl.viewGroup')}}</span></div>
        <div class="deleteinfoconfirm">
          <el-button type="primary" @click="canceldeletedialogVisible" size="small">{{$t('common.ok')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 查看组内设备模态框 -->
    <el-dialog :title="$t('deviceControl.inGroup')" :visible.sync="innerdialogVisible" width="575px" :before-close="cancelinnerdialogVisible">
      <el-table
      :data="deletegroupNoDevices"
      height="280px">
      <el-table-column
        type="index"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('deviceList.deviceName')"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="ip"
        align="center">
      </el-table-column>
    </el-table>
      <div class="sub" style="margin-top: 15px;">
        <el-button type="primary" @click="cancelinnerdialogVisible" size="small">{{$t('common.ok')}}</el-button>
      </div>
    </el-dialog>
    <!-- 批量导入设备弹窗 -->
      <el-dialog
        :title="$t('deviceControl.import')"
        :visible.sync="dialogImportExcel"
        width="900px"
        :close-on-click-modal="false"
        :before-close="closeDialogImportExcel">
        <import-device @closeImportExcel="closeImportExcel" ref="importDeviceRef"></import-device>
      </el-dialog>
      </div>
  </div>
</template>
<script>
import videoCamera from "./video_camera";
// import videoRecorder from "./video_recorder";
import intelligentHardware from "./intelligent_hardware";
import selectGroup from "./select_group.vue"
import importDevice from "./importDevice";
export default {
   components: {

    videoCamera,
    // videoRecorder,
    intelligentHardware,
    selectGroup,
    importDevice
  },
  data() {
    return {

      /*Api接口*/
      // api: null,
      showLongtitude: false,
      areaClassify: [],
      TabNames: [
        {
          zhName: '摄像机',
          enName: 'Camera',
          active: true,
          tabs: true
        },
        // {
        //   zhName: '录像机',
        //   enName: 'Recorder',
        //   active: false,
        //   tabs: true
        // },
        {
          zhName: '智能硬件',
          enName: 'Intelligent Hardware',
          active: false,
          tabs: true
        }
      ],
      // 默认选择的tab
      // activeTabName: 'camera',
      // tab的imgUrl
      tabsImgSrcArr: [
        {
          default: '../../assets/img/icon_camera_selected.png',
          active: '../../assets/img/camera_selected.png'
        },
        {
          default: '../../assets/img/icon_vcr_default.png',
          active:  '../../assets/img/vcr_default.png',
        },
        {
          default:  '../../assets/img/icon_hardware_default.png',
          active:  '../../assets/img/hardware_default.png',
        }
      ],
      netAPI: '',
      netAPI2: null,
      netAPI3: null,
      updateAndDeleteId: '',
      updateClassify: '',
      updateLat: '',
      updateLng: '',
      deleteId: '',
      //创建设备类型
      createEquipmentType: "",
      adddisabled: true,
      disabledProp: true,
      isneedlinkage: true,
      dialogImportExcel: false,
      // 设备组上方搜索框参数
      treeSearchValue: '',
      parentNo: '',
      navber: [],
      form: {},
      adddialogVisible: false,
      updatedialogVisible: false,
      deletedialogVisible: false,
      innerdialogVisible: false,
      createform: {
        groupName: '',
        // parentNo: '',
        description: '',  //必须携带
        classify: '',
        lng: '',
        lat: '',
        // createDate: ''
      },
      updateform: {
        groupName: '',  //必须携带
        // parentNo: '',   //必须携带
        description: '',  //必须携带
        groupNo: '', //必须携带
        classify: '',
        lng: '',
        lat: '',
      },
      searchform: {
        // groupNo: ''
      },
      deleteform: [],
      deletegroupNo: '',
      deleteName: '',
      // 所删除组组下设备
      deletegroupNoDevices: [],
      groupinnerdetail: [],
      nodedetail: {},
      screenWidth: document.body.clientWidth
    }
  },
 created() {
    // this.netAPI = apiConfig().get("device_group");
    // this.netAPI2 = apiConfig().get("monitorSystem").deviceManage;
    // this.netAPI3 = apiConfig().get("device");
    // console.log(this.$route.query.back)
    // if(this.$route.query.back == 1) {
    //   // console.log(1111)
    //   this.TabNames.forEach(item => {
    //     item.active = false;
    //   })
    //   this.TabNames[2].active = true;
    // }
  },
  mounted() {
    // console.log(this.$i18n.locale)
    // this.$EventBus.$on('linkage', (data) => {
    //   if(this.$refs.cameraPage) {
    //     // console.log(data.groupNo)
    //     this.$refs.cameraPage.$data.search.groupNo = data.groupNo
    //     this.$refs.cameraPage.searchtabledata('search');
    //   } else if (this.$refs.recorderPage) {
    //     this.$refs.recorderPage.$data.search.groupNo = data.groupNo
    //     this.$refs.recorderPage.searchtabledata('search');
    //   } else if (this.$refs.hardwarePage) {
    //     this.$refs.hardwarePage.$data.search.groupNo = data.groupNo
    //     this.$refs.hardwarePage.searchtabledata('search');
    //   }
    // })
    // const that = this;
    // window.addEventListener("resize", function() {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth;
    //     that.screenWidth = window.screenWidth;
    //   })();
    // });
    // this.findArea();
  },
  methods: {
    findArea() {
      this.$http.get(this.netAPI.area, {
        params: {
          categoryNo: '1002'
        }
      }).then(res => {
        if(res.body.status == 200) {
          // console.log(JSON.stringify(res.body.data))
          this.areaClassify = res.body.data
        }
      })
    },
    // 添加和编辑后更新树
    initTree() {
      this.$refs.treemenu.initData();
    },
    // 设备组搜索框远程搜索
    querySearchAsync(queryString, cb) {
      let promise = new Promise((resolve, reject) => {
        // 按输入的值查询分组
        this.$http.get(this.netAPI2.findGroup, {params: {groupName: queryString}}).then(
            res => {
              if(res.body.status == 200) {
                // console.log(JSON.stringify(res.body.data))
                res.body.data.forEach(item => {
                  item.value = item.groupName
                })
                resolve(res.body.data)
              }
            }
          )
      })
      promise.then(res => {
        let sugessQuery = res;
        // console.log(JSON.stringify(sugessQuery))
        let results = queryString ? sugessQuery.filter(this.createStateFilter(queryString)) : res;
        // console.log(JSON.stringify(results))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      })
    },
    // 远程搜索条件过滤
    createStateFilter(queryString) {
      return (state) => {
        console.log(state)
        return (state.groupName.indexOf(queryString) == 0);
      };
    },
    // 树形菜单搜索后点击事件
    handleSelect(item) {
      // console.log(JSON.stringify(item))
      this.$refs.treemenu.initData();
      if(this.$refs.cameraPage) {
        this.$refs.cameraPage.$data.search.groupNo = item.groupNo
        this.$refs.cameraPage.$data.search.ip = ''
        this.$refs.cameraPage.searchtabledata('search')
        this.$refs.cameraPage.$data.search.groupNo = ''
        this.treeSearchValue = '';
      }
      if(this.$refs.recorderPage) {
        this.$refs.recorderPage.$data.search.groupNo = item.groupNo
        this.$refs.recorderPage.searchtabledata('search')
        this.$refs.recorderPage.$data.search.groupNo = ''
        this.treeSearchValue = '';
      }
      if(this.$refs.hardwarePage) {
        this.$refs.hardwarePage.$data.search.groupNo = item.groupNo
        this.$refs.hardwarePage.searchtabledata('search')
        this.$refs.hardwarePage.$data.search.groupNo = ''
        this.treeSearchValue = '';
      }
    },
    // tabs默认图片
    filterImgDefaultUrl(index) {
      switch(index) {
        case 0:
          return this.tabsImgSrcArr[0].default;
        case 1:
          return this.tabsImgSrcArr[1].default;
        case 2:
          return this.tabsImgSrcArr[2].default;
        default:
          break;
      }
    },
    // tabs激活图片
    filterImgActiveUrl(index) {
      switch(index) {
        case 0:
          return this.tabsImgSrcArr[0].active;
        case 1:
          return this.tabsImgSrcArr[1].active;
        case 2:
          return this.tabsImgSrcArr[2].active;
        default:
          break;
      }
    },
    // 点击选项卡
    handletabsClick(index) {
      this.$refs.treemenu.initData();
      this.$store.commit('changeDiveceType', index + 1)
      this.TabNames.forEach((item, i) => {
        if(index == i) {
          item.active = true
        }else{
          item.active = false
        }
      })
    },
    // 打开导入
    doimport(data1, data2) {
      if(this.$refs.importDeviceRef) {
        this.$refs.importDeviceRef.initData()
      }
      // 导入设备类型
      // this.$store.state.importDviceType = data2
      // debugger
      this.$store.commit('changeimportDeviceType', data2)
      this.dialogImportExcel = data1;
    },
    // 关闭批量导入
    closeImportExcel(data1, data2) {
      console.log(data1, data2)
      if(data2 == 1) {
        // console.log('search Camera')
        this.$refs.cameraPage.searchtabledata()
      }
      if(data2 == 2) {
        // console.log('search recorder')
        this.$refs.recorderPage.searchtabledata()
      }
      if(data2 == 3) {
        this.$refs.hardwarePage.searchtabledata()
      }
      this.dialogImportExcel = data1;
    },
    // 点击右上角关闭批量导入模态框
    closeDialogImportExcel(done) {
      done()
    },
    // 接受子组件传递的参数，改变添加按钮的状态
    receiveBoolean (data1, data2) {
      // console.log(data2.groupNo)
      if(data2.label == '设备分组' || data2.label == 'Device group') {
        this.adddisabled = !this.adddisabled
      }else{
        this.adddisabled = data1
      }
      if(data2.label !== "设备分组" || data2.label == 'Device group') {
        this.disabledProp = data1
      } else {
        this.disabledProp = true
      }
      this.createform.parentNo = data2.groupNo;
      this.parentNo = data2.groupNo
      // this.updateform.groupName = data2.label;
      let index = data2.label.indexOf(' <')
      let groupName = data2.label.slice(0, index)
      this.updateform.groupName = groupName;
      // console.log(JSON.stringify(this.updateform.groupName))
      this.updateform.parentNo = data2.parentNo;
      this.updateform.description = data2.description;
      this.updateform.groupNo = data2.groupNo;
      this.deletegroupNo = data2.groupNo;
      this.deleteName = data2.label;
      // 批量导入所用到的设备组编号
      this.$store.state.importDeviceNo = data2.groupNo;
    },
    tableClick(tab, event) {
      this.createEquipmentType = tab;
    },
    // 点击添加，打开添加设备组模态框
    opencreateform() {
      // console.log(JSON.stringify(this.parentNo))
      this.adddialogVisible = true
    },
    // 点击确定，添加设备组
    createForm() {
      console.log(JSON.stringify(this.createform))
      // 判断
      if(this.showLongtitude == false) {
        console.log(1111111111)
        delete this.createform.classify;
        delete this.createform.lng;
        delete this.createform.lat;
        // delete this.createform.parentNo;
        this.$http.post(this.netAPI.insert, this.createform).then(
        res => {
          if (res.body.status == 200) {
            this.$message.success(this.$t('deviceControl.insertSuccess'))
            this.$refs.treemenu.initData()
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
      )
      }else{
        console.log(222222222222)
        console.log(JSON.stringify(this.createform))
        let newCreateform = JSON.parse(JSON.stringify(this.createform))
        delete this.createform.classify;
        delete this.createform.lng;
        delete this.createform.lat;
        // delete this.createform.parentNo;
        // 第一次请求
        this.$http.post(this.netAPI.insert, this.createform).then(
        res => {
          if (res.body.status == 200) {
            console.log(res.body.data)
            // 第二次请求时用到的设备组编号
            newCreateform.deviceGroupNo = res.body.data.groupNo
            // 第二次请求时用到的时间
            newCreateform.createDate = moment().format('YYYY-MM-DD')
            // 第二次请求时需要的经纬度，格式化
            if(newCreateform.lng) {
              newCreateform.lng = (parseFloat(newCreateform.lng))
            }else{
              delete newCreateform.lng
            }
            if(newCreateform.lat) {
              newCreateform.lat = (parseFloat(newCreateform.lat))
            }else{
              delete newCreateform.lat
            }
            // 第二次请求
            delete newCreateform.groupName;
            delete newCreateform.description;
            delete newCreateform.parentNo;
            console.log(JSON.stringify(newCreateform))
            this.$http.post(this.netAPI.insert2, newCreateform).then(
            res => {
              if (res.body.status == 200) {
                this.$message.success(this.$t('deviceControl.insertSuccess'))
                this.$refs.treemenu.initData()
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
          )
          }
        }
      )
      }
      this.$refs.createform.resetFields();
      this.adddialogVisible = false
      this.adddisabled = true;
    },
    // 点击编辑，打开编辑设备组模态框
    openupdateform() {
      this.$http.get(this.netAPI.find2, {
        params: {
          deviceGroupNo: this.updateform.groupNo
        }
      }).then(
        res => {
          if(res.body.status == 200) {
            console.log(res.body.data)
            if(res.body.data.classify) {
              this.updateform.classify = res.body.data.classify
            }
            if(res.body.data.lat) {
              this.updateform.lat = (parseFloat(res.body.data.lat))
            }
            if(res.body.data.lng) {
              this.updateform.lng = (parseFloat(res.body.data.lng))
            }
            this.updateAndDeleteId = res.body.data.id
            this.updateClassify = res.body.data.classify
            this.updateLng = res.body.data.lng
            this.updateLat = res.body.data.lat
            console.log(JSON.stringify(this.updateform))
            console.log(JSON.stringify(this.updateClassify))
            this.updatedialogVisible = true
          }
        }
      )
    },
    // 点击确定，编辑设备组
    updateForm() {
      console.log(JSON.stringify(this.updateform))
      if(this.updateform.classify) {
        // 选择了区域发两次请求
        let newUpdateform = JSON.parse(JSON.stringify(this.updateform));
        delete this.updateform.classify;
        delete this.updateform.lng;
        delete this.updateform.lat;
        delete this.updateform.createDate;
        this.$http.post(this.netAPI.update, this.updateform).then(
          res => {
            if(res.body.status == 200) {
              newUpdateform.deviceGroupNo = newUpdateform.groupNo;
              newUpdateform.id = this.updateAndDeleteId;
              newUpdateform.createDate = moment().format('YYYY-MM-DD');
              if(newUpdateform.lng) {
                newUpdateform.lng = (parseFloat(newUpdateform.lng))
              }else{
                delete newUpdateform.lng
              }
              if(newUpdateform.lat) {
                newUpdateform.lat = (parseFloat(newUpdateform.lat))
              }else{
                delete newUpdateform.lat
              }
              delete newUpdateform.groupNo;
              delete newUpdateform.groupName;
              delete newUpdateform.description;
              delete newUpdateform.parentNo;
              this.$http.post(this.netAPI.update2, newUpdateform).then(
                res => {
                  if(res.body.status == 200) {
                    this.$message.success(this.$t('deviceControl.modifiedSuccess'));
                    this.$refs.treemenu.initData();
                  }else{
                    this.$message.warning(this.$t('common.updateFailed') + res.body.message);
                  }
                },
                err => {
                  this.$message({
                    message: this.$t('common.serviceError') + err,
                    type: "warning"
                  });
                }
              )
            }
          }
        )
      }else{
        // 没选择区域发一次请求
        delete this.updateform.classify;
        delete this.updateform.lng;
        delete this.updateform.lat;
        delete this.updateform.createDate;
        this.$http.post(this.netAPI.update, this.updateform).then(
          res => {
            if(res.body.status == 200) {
              this.$message.success(this.$t('deviceControl.modifiedSuccess'));
              this.$refs.treemenu.initData();
            }else{
              this.$message.warning(this.$t('common.updateFailed') + res.body.message);
            }
          },
          err => {
            this.$message({
              message: this.$t('common.serviceError') + err,
              type: "warning"
            });
          }
        )
      }
      this.updatedialogVisible = false
      this.adddisabled = true;
      // if(!this.updateform.classify) {
      //   this.$http.post(this.netAPI.update, this.updateform).then(
      //   res => {
      //     if (res.body.status == 200) {
      //       // console.log(JSON.stringify(res.body.data))
      //       this.$message.success(this.$t('deviceControl.modifiedSuccess'))
      //       this.$refs.treemenu.initData()
      //     } else {
      //       this.$message.warning(this.$t('common.updateFailed') + res.body.message);
      //     }
      //   },
      //   err => {
      //     this.$message({
      //       message: this.$t('common.serviceError') + err,
      //       type: "warning"
      //     });
      //   }
      // )
      // }else{
      //   console.log(JSON.stringify(this.updateform))
      //   let newUpdateform = JSON.parse(JSON.stringify(this.updateform))
      //   delete this.updateform.classify;
      //   delete this.updateform.lat;
      //   delete this.updateform.lng;
      //   this.$http.post(this.netAPI.update, this.updateform).then(
      //     res => {
      //       if(res.body.status == 200) {
      //         newUpdateform.deviceGroupNo = newUpdateform.groupNo;
      //         newUpdateform.id = this.updateAndDeleteId;
      //         newUpdateform.createDate = moment().format('YYYY-MM-DD')
      //         delete newUpdateform.groupName;
      //         delete newUpdateform.description;
      //         delete newUpdateform.parentNo;
      //         delete newUpdateform.groupNo;
      //         if(newUpdateform.lng) {
      //           newUpdateform.lng = (parseFloat(newUpdateform.lng)).toFixed(5);
      //         }else{
      //           delete newUpdateform.lng
      //         }
      //         if(newUpdateform.lat) {
      //           newUpdateform.lat = (parseFloat(newUpdateform.lat)).toFixed(5);
      //         }else{
      //           delete newUpdateform.lat
      //         }
      //         this.$http.post(this.netAPI.update2, newUpdateform).then(
      //           res => {
      //             if (res.body.status == 200) {
      //             // console.log(JSON.stringify(res.body.data))
      //               this.$message.success(this.$t('deviceControl.modifiedSuccess'))
      //               this.$refs.treemenu.initData()
      //             } else {
      //               this.$message.warning(this.$t('common.updateFailed') + res.body.message);
      //             }
      //           }
      //         )
      //       }
      //     }
      //   )
      // }
    },
    // 点击取消，关闭添加设备组模态框
    cancelcreatedialogVisible() {
      this.adddialogVisible = false
    },
    // 点击右上角和取消，关闭删除提示模态框
    canceldeletedialogVisible() {
      this.deletedialogVisible = false
    },
    // 点击右上角和取消，关闭组内设备模态框
    cancelinnerdialogVisible() {
      this.innerdialogVisible = false
      this.deletedialogVisible = false
    },
    // 查看组内设备
    findgroupinner() {
      this.innerdialogVisible = true
    },
    // 点击取消，关闭编辑设备组模态框
    cancelupdatedialogVisible() {
      this.updatedialogVisible = false
    },
    // 点击删除，弹出是否删除
    opendeleteform() {
      this.$confirm(this.$t('deviceControl.needTodelete'), this.$t('delete.prompt'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('common.delete'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
      })
      .then(
        () => {
          // debugger
          console.log(JSON.stringify(this.deletegroupNo))
          // 判断设备组下是否存在设备
          let queryform = {};
          queryform.groupNo = this.deletegroupNo;
          let typeArr = [1, 2, 3];
          let promises = typeArr.map(item =>
            this.$http.get(this.netAPI3.find, {
              params: {
                groupNo: this.deletegroupNo,
                type: item
              }
            })
          );
          Promise.all(promises).then(
            res => {
              // 判断是否能删除设备组
              let canDelete = true;
              for(let i = 0; i < res.length; i++) {
                if(res[i].body.data.length > 0) {
                  canDelete = false;
                  break;
                }
              }
              if(canDelete) {
                // console.log('delete')
                // 如果能删除
                this.$http.get(this.netAPI.find2, {
                  params: {
                    deviceGroupNo: this.updateform.groupNo
                  }
                }).then(
                  res => {
                    if(res.body.status == 200) {
                      this.deleteId = res.body.data.id;
                      this.$http.post(this.netAPI.delete, [{groupNo: this.deletegroupNo}]).then(
                        res => {
                          if(res.body.status == 200) {
                            if(this.deleteId) {
                              this.$http.post(this.netAPI.delete2, {id: this.deleteId}).then(
                                resp => {
                                  if(resp.body.status == 200) {
                                    this.$message.success(this.$t('delete.success'))
                                    this.$refs.treemenu.initData()
                                    // 如果删除成功，默认查找所处设备类型根分组下的设备
                                    if(this.$refs.cameraPage) {
                                      this.$refs.cameraPage.$data.search.groupNo = '1005'
                                      this.$refs.cameraPage.searchtabledata('search')
                                    }else if(this.$refs.recorderPage) {
                                      this.$refs.recorderPage.$data.search.groupNo = '1005'
                                      this.$refs.recorderPage.searchtabledata('search')
                                    }else if(this.$refs.hardwarePage) {
                                      this.$refs.hardwarePage.$data.search.groupNo = '1005'
                                      this.$refs.hardwarePage.searchtabledata('search')
                                    }
                                  }else{
                                    this.$message.warning(resp.body.message)
                                  }
                                  this.deletegroupNo = null;
                                }
                              )
                            }else{
                              this.$message.success(this.$t('delete.success'))
                              this.$refs.treemenu.initData()
                              // 如果删除成功，默认查找所处设备类型根分组下的设备
                              if(this.$refs.cameraPage) {
                                this.$refs.cameraPage.$data.search.groupNo = '1005'
                                this.$refs.cameraPage.searchtabledata('search')
                              }else if(this.$refs.recorderPage) {
                                this.$refs.recorderPage.$data.search.groupNo = '1005'
                                this.$refs.recorderPage.searchtabledata('search')
                              }else if(this.$refs.hardwarePage) {
                                this.$refs.hardwarePage.$data.search.groupNo = '1005'
                                this.$refs.hardwarePage.searchtabledata('search')
                              }
                              this.deletegroupNo = null;
                            }
                          }
                        }
                      )
                      // if(res.body.data.id) {
                      //   this.$http.post(this.netAPI.delete, [{group: this.deletegroupNo}]).then(
                      //     res => {
                      //       if(res.body.status == 200) {
                      //         this.$http.post(this.netAPI.delete2, {id: res.body.data.id}).then(
                      //           res => {
                      //             if(res.body.status == 200) {
                      //               this.$message.success(this.$t('delete.success'))
                      //               this.$refs.treemenu.initData()
                      //               // 如果删除成功，默认查找所处设备类型根分组下的设备
                      //               if(this.$refs.cameraPage) {
                      //                 this.$refs.cameraPage.$data.search.groupNo = '1005'
                      //                 this.$refs.cameraPage.searchtabledata('search')
                      //               }else if(this.$refs.recorderPage) {
                      //                 this.$refs.recorderPage.$data.search.groupNo = '1005'
                      //                 this.$refs.recorderPage.searchtabledata('search')
                      //               }else if(this.$refs.hardwarePage) {
                      //                 this.$refs.hardwarePage.$data.search.groupNo = '1005'
                      //                 this.$refs.hardwarePage.searchtabledata('search')
                      //               }
                      //             }else{
                      //               this.$message.warning(res.body.message)
                      //             }
                      //             this.deletegroupNo = null;
                      //           }
                      //         )
                      //       }
                      //     }
                      //   )
                      // }
                    }
                  }
                )
                // this.$http.post(this.netAPI.delete, [{groupNo: this.deletegroupNo}]).then(
                //   res => {
                //     if(res.body.status == 200) {
                //       this.$message.success(this.$t('delete.success'))
                //       this.$refs.treemenu.initData()
                //       // 如果删除成功，默认查找所处设备类型根分组下的设备
                //       if(this.$refs.cameraPage) {
                //         this.$refs.cameraPage.$data.search.groupNo = '1005'
                //         this.$refs.cameraPage.searchtabledata('search')
                //       }else if(this.$refs.recorderPage) {
                //         this.$refs.recorderPage.$data.search.groupNo = '1005'
                //         this.$refs.recorderPage.searchtabledata('search')
                //       }else if(this.$refs.hardwarePage) {
                //         this.$refs.hardwarePage.$data.search.groupNo = '1005'
                //         this.$refs.hardwarePage.searchtabledata('search')
                //       }
                //     }else{
                //       this.$message.warning(res.body.message)
                //     }
                //     this.deletegroupNo = null;
                //   }
                // )
              }else{
                // console.log('cant-delete')
                // 如果不能删除（所删除的组组下有设备）
                this.deletegroupNoDevices = []; // 不能删除设备组组下设备
                // console.log(res)
                res.forEach(item => {
                  item.body.data.forEach(i => {
                    // 将查询到的组下设备保存
                    this.deletegroupNoDevices.push(i)
                  })
                })
                // 弹出不能删除提示框
                this.deletedialogVisible = true
              }
            }
          ).catch(
            err => {
              this.$message.warning(err)
            }
          )
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: this.$t('delete.canceledDeletion')
        });
      });
      this.adddisabled = true;
    },
  }
};
</script>

<style lang="scss">
#deviceList{
  height: 100%;
}
.deviceControl-Page{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .bread-div{
    margin-left: 5px;
  }
  .deviceControl-Main-content{
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 10px;
    .select_group{
    width: 240px;
    min-width: 190px;
    // height: 96%;
    // float: left;
    margin-right: 15px;
    border: 1px solid #dedede;
    box-sizing: border-box;
    background: white;
    box-shadow:#D1D1D1 0 2px 4px 0;
    border-radius: 5px;
        .tree-search-box{
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 10px;
          .el-autocomplete{
            height: 48px;
            width: 100%;
            .el-input__inner{
            height: 48px;
            border-radius: 0;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border: none;
            border-bottom: 1px solid #E9EAEB;
          }
          }
      }
      .operation{
        box-sizing: border-box;
        padding: 10px;
        >div{
          text-align: center;
          margin-bottom: 5px;
          >button{
            // width: 200px;
            // color: rgb(96, 98, 102) !important;
            width: 100%;
            height: 34px;
          }
        }
      }
      .select{
        width: 100%;
        height: 72%;
        box-sizing: border-box;
        padding: 10px;
        padding-top: 0;
        overflow-y: scroll;
      }
    }
  .deviceContent-right{
    flex: 1;
    width: 960px;
    @media screen  and(max-width: 1650px) {
      width: 800px;
    }
    height: 100%;
    display: flex;
    flex-direction: column;
      .deviceContent-route {
        width: 100%;
        height: 100%;
        background:rgba(255,255,255,1);
        border:1px solid rgba(233,233,233,1);
        box-shadow:#D1D1D1 0 2px 4px 0;
        border-radius:5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px;
        padding-top: 15px;
        padding-bottom: 0;
        #tags-box{
          min-height: 60px;
          width: 100%;
          display: flex;
          .per-tag{
            height: 40px;
            border-radius: 0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0.2rem;
            cursor: pointer;
            .tags-img-box{
              margin-right: 0.1rem;
            }
            .tags-txt-box{
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(132,132,132,1);
            }
          }
          .active-tag{
            background: #4383DC;
            .tags-txt-box{
              font-family:MicrosoftYaHei;
              font-weight:400;
              color: #fff;
            }
          }
        }
        #device-route-box{
          flex: 1;
        }
      }
  }
  }
  .sub{
    text-align: right;
    margin-bottom: 0;
  }
}
.deleteTop{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
  .el-icon-warning{
    color: #FFBE00;
  }
}
.deleteBottom{
  display: flex;
  justify-content: space-between;
  .deletelook{
    margin-left: 50px;
    span{
      color: #4383DC;
      cursor: pointer;
    }
  }
  .deleteinfoconfirm{
    margin-right: 15px;
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
.deviceControl-Page{
.el-form-item__label{
  padding: 0;
}
#tags-box{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  .per-tag{
    height: 40px;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.2rem;
    padding: 0 30px;
    .tags-img-box{
      margin-right: 0.1rem;
    }
    .tags-txt-box{
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(132,132,132,1);
    }
  }
  .active-tag{
    background: #4383DC;
    .tags-txt-box{
      font-family:MicrosoftYaHei;
      font-weight:400;
      color: #fff;
    }
  }
}
#device-route-box{
  flex: 1;
}
$h: 1.2rem;
.el-tabs{
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  .el-tabs__header{
    height: 1.2rem !important;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background: #fff;
    border-bottom: none;
    box-sizing: border-box;
    padding-top: 0.3rem;
    padding-left: 0.3rem;
    border-radius: 0.1rem;
  .el-tabs__item {
    padding: 0 0 !important;
    border: none !important;
    margin: 0 0.1rem !important;
    width: 3rem !important;
      >div{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.4rem;
      }
  }
}
  .el-tabs__content {
    flex: 1;
    padding-bottom: 0;
    .el-tab-pane{
      width: 100%;
      height: 100%;
      .active{
        background: #4383DC !important;
        // color: #fff !important;
      }
    }
  }
}
}
</style>
