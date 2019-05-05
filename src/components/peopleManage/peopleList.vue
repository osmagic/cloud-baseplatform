<template>
  <div id="peopleList">
    <div class="peopleList-content">
      <!-- {{tableDataLabel}} -->
      <div
        class="people_type_sel"
        :style="
          currentPeopleType.name == '100010001001'
            ? 'margin-left:0'
            : 'margin-left:-30px'
        "
      >
        <el-tabs
          type="card"
          v-model="activeTabs"
          @tab-click="tabsClick"
          class="people_type_tabs"
        >
          <el-tab-pane
            :label="pe.nameZh"
            :name="pe.no"
            v-for="(pe, index) in peopleTypes"
            :key="pe.no"
          >
            <div slot="label" style="display:flex;align-items:center">
              <img
                :src="filterImgDefaultUrl(index)"
                alt=""
                v-show="activeTabs !== pe.no"
                style="margin-top:-2px;"
              />
              <img
                :src="filterImgActiveUrl(index)"
                alt=""
                v-show="activeTabs == pe.no"
                style="margin-top:-2px;"
              />
              <span style="margin-left:5px;">{{ pe.nameZh }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="content">
        <div class="bottom-show">
          <div class="show-tree">
            <div class="search-tree-input">
              <el-input
                :placeholder="$t('peopleManageList.queryGroup')"
                v-model="filterGroupText"
                suffix-icon="el-icon-search"
                :disabled="treeData.length === 0"
              >
              </el-input>
            </div>
            <el-tree
              :data="treeData"
              node-key="id"
              default-expand-all
              :highlight-current="true"
              @node-click="handleNodeClick"
              :filter-node-method="filterTreeNode"
              ref="treeGroup"
              class="people-tree"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
            <div class="fix-sz">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="groupForm.code === ''"
                  @click="addGroup"
                  >{{ $t("peopleManageList.newGroup") }}</el-button
                >
              </div>
              <div>
                <el-button
                  size="mini"
                  :disabled="groupForm.code === ''"
                  @click="editGroup"
                  >{{ $t("peopleManageList.editGroup") }}</el-button
                >
              </div>
              <div>
                <el-button
                  size="mini"
                  :disabled="groupForm.code === '' || treeData[0].children.length === 0"
                  @click="deleteGroup"
                  >{{ $t("peopleManageList.deleteGroup") }}</el-button
                >
              </div>
            </div>
          </div>
          <div
            class="space"
            v-if="currentPeopleType.name == '100010001001'"
          ></div>
          <div class="table-box">
            <div class="operation-panel">
              <div class="search">
                <el-input
                :placeholder="$t('peopleManageList.name')"
                  style="width:200px"
                  v-model="searchobj.name"
                ></el-input>
                <!-- <el-input :placeholder="$t('peopleManageList.code')" style="width:100px;margin-left:10px" v-model="searchobj.code"></el-input> -->
                <el-button
                  type="primary"
                  class="search-button"
                  icon="el-icon-search"
                  @click="search"
                  >{{ $t("peopleManageList.search") }}</el-button
                >
              </div>
              <div class="util">
                <el-button
                  @click="openBatch(multipleSelection)"
                  :disabled="
                    multipleSelection.length === 0 || treeData.length === 0
                  "
                  >{{ $t("peopleManageList.batchgrouping") }}</el-button
                >
                <el-button icon="el-icon-plus" @click="createPeople">{{
                  $t("peopleManageList.addPeople")
                }}</el-button>
                <el-dropdown @command="importInType">
                  <el-button>
                    {{ $t("peopleManageList.batchImport")
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="excel">{{
                      $t("peopleManageList.importPeopleInfoFile")
                    }}</el-dropdown-item>
                    <el-dropdown-item command="photo">{{
                      $t("peopleManageList.importPeoplePhotoFifle")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button
                  icon="el-icon-download"
                  :disabled="multipleSelection.length === 0"
                  @click="exportExcel(multipleSelection)"
                  >{{ $t("peopleManageList.export") }}</el-button
                >
                <el-button
                  icon="el-icon-delete"
                  @click="deleteRow(multipleSelection)"
                  :disabled="multipleSelection.length === 0"
                  style="margin: 0"
                  >{{ $t("peopleManageList.batchDelet") }}</el-button
                >
              </div>
            </div>
            <!-- <div>{{tableDataLabel}}</div> -->
            <template v-show="false">
              <el-table
                v-show="isShowTable"
                v-loading="tableBoxLoading"
                ref="peopleListTable"
                id="out-table-list"
                :data="tableData"
                height="250"
                @selection-change="handleSelectionChange"
                :header-cell-style="{ background: 'rgba(245,248,252,1)' }"
                style="width: 100%"
                :default-sort="{ prop: 'id', order: 'ascending' }"
                :row-key="getRowKeys"
              >
                <el-table-column fixed type="selection" reserve-selection>
                </el-table-column>
                <el-table-column
                  v-for="(tab, index) in tableDataLabel"
                  :key="tab.name"
                  :prop="tab.property"
                  :label="tab.name"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div
                      v-if="
                        scope.row.hasOwnProperty('urls') &&
                          tab.name === $t('peopleManageList.photo')
                      "
                    >
                      <!-- <el-popover
                                      placement="bottom"
                                      title=""
                                      ref="popover"
                                      trigger="click">
                                      <img :src="scope.row.photo" alt=""
                                            style="max-width:800px;max-height:600px;">
                                      <img :src="scope.row.photo" v-if="scope.row.photo" alt="" srcset=""
                                          style="width:50px;height:50px;cursor:pointer;"
                                          slot="reference">
                                    </el-popover> -->
                      <img
                        :src="scope.row.urls[0]"
                        style="width:50px;height:50px;"
                        v-if="scope.row.urls.length !== 0"
                      />
                      <div v-else></div>
                    </div>
                    <div v-else>
                      {{ scope.row[tab.property] }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click="peopleDetails(scope.row)"
                      type="text"
                      size="small"
                    >
                      {{ $t("common.details") }}
                    </el-button>
                    <el-button
                      @click="editPeople(scope.row)"
                      type="text"
                      class="del-btn"
                      size="small"
                    >
                      {{ $t("common.edit") }}
                    </el-button>
                    <el-button
                      @click="deleteRow(scope.row)"
                      type="text"
                      class="del-btn"
                      size="small"
                    >
                      {{ $t("common.delete") }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <div class="pagination-box">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框统一管理 -->
    <!-- <people-attr-config-dialog :isShow="pacShow" @active="peopleAttrConfig" ></people-attr-config-dialog>
            <new-people-type-dialog :isShow="nptShow" @active="newPeopleType"></new-people-type-dialog> -->
    <create-people-dialog
      v-show="cpShow.show"
      :isShow="cpShow"
      @active="createPeople"
      :selectInfo="selectInfo"
      :isEditPeo="isEditPeo"

    ></create-people-dialog>
    <!-- <people-details-dialog  :isShow="pdShow" @active="peopleDetails"></people-details-dialog>
            <edit-people-dialog :isShow="epShow" @active="editPeople"></edit-people-dialog> -->
    <!-- 新增分组弹窗 -->
    <el-dialog
      :title="dialogGroupName"
      :visible.sync="dialogAddGroup"
      width="30%"
      :before-close="closeDialogGroup"
    >
      <el-form ref="form" :model="groupForm" label-width="140px">
        <el-form-item :label="$t('peopleManageList.groupName')">
          <el-input
            v-model="groupForm.groupName"
            :maxlength="20"
            :placeholder="$t('peopleManageList.pleaseEnterGroupName')"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('peopleManageList.groupDescription')">
          <el-input
            type="textarea"
            :rows="2"
            :maxlength="200"
            :placeholder="$t('peopleManageList.pleaseEnterDis')"
            v-model="groupForm.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogGroup">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="confirmDialogGroup">{{
          $t("common.ok")
        }}</el-button>
      </span>
    </el-dialog>

    <!-- 新增导入人员弹窗 -->
    <el-dialog
      :title="$t('peopleManageList.importPeopleInfoFile')"
      :visible.sync="dialogImportExcel"
      width="50%"
      :close-on-click-modal="false"
      :before-close="closeDialogImportExcel"
    >
      <import-people
        @closeImportExcel="closeImportExcel"
        :showDialog="dialogImportExcel"
        :activeTabs="activeTabs"
        :peopleTypefield="peopleTypefield"
        :organizationId="organizationId"
        :tableDataLabel="tableDataLabel"
        :typeName="selectInfo.typeName"
      ></import-people>
    </el-dialog>
    <!-- 新增导入照片弹窗 -->
    <el-dialog
      :title="$t('peopleManageList.importPhotoInfo')"
      :visible.sync="dialogImportPhoto"
      width="50%"
      :close-on-click-modal="false"
      :before-close="closeDialogImportPhoto"
    >
      <!-- <import-people></import-people> -->
      <import-photo
        @closeImportExcel="closeImportExcel"
        :dialogImportPhoto="dialogImportPhoto"
        :activeTabs="activeTabs"
      ></import-photo>
    </el-dialog>
    <!-- 批量分组弹窗 -->
    <el-dialog
      :title="$t('peopleManageList.batchgrouping')"
      :visible.sync="batchGroupialogVisible"
      width="20%"
      :close-on-click-modal="false"
      :before-close="batchGroupHandleClose"
    >
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        :highlight-current="true"
        @node-click="handleBtachTreeClick"
        ref="treebatchGroup"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
      <div style="text-align:right">
        <el-button
          type="primary"
          @click="cancelbatchGroupialogVisible"
          size="small"
          >{{ $t("common.cancel") }}</el-button
        >
        <el-button type="primary" @click="doBatch" size="small">{{
          $t("common.ok")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import peopleAttrConfigDialog from "./peopleAttrConfigDialog";
import newPeopleTypeDialog from "./newPeopleTypeDialog";
import createPeopleDialog from "./createPeopleDialog";
import peopleDetailsDialog from "./peopleDetailsDialog";
import editPeopleDialog from "./editPeopleDialog";
import importPeople from "./importPeople";
import importPhoto from "./importPhoto";
export default {
  components: {
    peopleAttrConfigDialog,
    newPeopleTypeDialog,
    createPeopleDialog,
    peopleDetailsDialog,
    editPeopleDialog,
    importPeople,
    importPhoto
  },
  data() {
    return {
      // 设置row-key
      getRowKeys(row) {
        return row.id;
      },
      tabsdefaultImg: [
        "./static/img/frequent guest_default.png",
        "./static/img/visitor_defaulit.png",
        "./static/img/blacklist_default.png"
      ],
      tabsActiveImg: [
        "./static/img/frequent guest.png",
        "./static/img/visitor.png",
        "./static/img/blacklist.png"
      ],
      selectInfo: {
        groupNo: null,
        groupName: null,
        typeNo: null,
        typeName: null,
        pictures: []
      },
      activeTabs: "", //选择的分类
      tableDataLabel: [],
      currentPeopleType: {}, //当前选择的人员类型
      peopleTypes: [], //人员类型列表
      netAPI: null,
      exportAPI: null,
      tabLoading: true,
      batchGroupialogVisible: false,
      searchobj: {}, //搜索对象
      tableData: [],
      pacShow: { show: false }, //人员配置弹框状态
      multipleSelection: [], //选中的row
      nptShow: {
        show: false
      }, //人员新增弹框状态
      cpShow: { show: false, tableDataLabel: [] }, // 添加人员
      pdShow: { show: false }, //人员详情
      epShow: { show: false },
      pageSize: 10, //当前分页
      currentPage: 1, //当前页
      total: 0, //一共多少条数据
      defaultTableDataLabel: [], //初始化的字段
      tableBoxLoading: false,
      groupValueId: "", // 分组id
      organizationId: "", // 每个组织的id
      treeData: [],
      dialogAddGroup: false, // 新增分组的弹窗
      filterGroupText: "", // 搜索分组的字段
      editGroupName: "", // 编辑时分组的名字
      handleDialogClose: false, // 人员分组弹出窗口
      dialogGroupName: this.$t("peopleManageList.newGroup"),
      dialogGroupType: 0,
      tabIndex: 0, // 默认选择第一类人员类型
      groupForm: {
        groupName: "",
        code: "",
        description: ""
      },
      deleteform: [],
      batchgroupfrom: [],
      batchgroupCode: "",
      dialogImportExcel: false,
      dialogImportPhoto: false,
      tHeader: [],
      peopleTypefield: [], // 在不同人员类型下的字段
      isEditPeo: -1, // 0表示新增, 1表示编辑, 2表示查看详情
      isShowTable: false
    };
  },
  created() {
    this.getTypeList();
  },
  mounted() {},
  methods: {
      handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getDataList({ pageSize: this.pageSize, pageNo: this.currentPage });
    },
    handleCurrentChange(Current) {
      this.currentPage = Current;
      this.getDataList({ pageSize: this.pageSize, pageNo: this.currentPage });
    },
     // 关闭新增分组窗口
    closeDialogGroup() {
      this.dialogAddGroup = false;
    },
    // 新增分组接口
    addGroup() {
      this.dialogAddGroup = true
      this.groupForm.groupName = ''
      this.dialogGroupName = this.$t('peopleManageList.newGroup')
      this.groupForm.description = ''
      this.dialogGroupType = 0
    },
    // 修改分组接口
    editGroup() {
      this.dialogAddGroup = true
      this.groupForm.groupName = this.editGroupName
      this.dialogGroupName = this.$t('peopleManageList.editGroup')
      this.dialogGroupType = 1
    },
    deleteGroup() {
      this.$confirm(this.$t('peopleManageList.isDeleteGroup'), this.$t('delete.prompt'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('common.delete'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
      }).then(
        () => {
          this.deleteform = [];
          this.deleteform.push({
            no: this.organizationId,
            typeNo: this.peopleTypes[this.tabIndex].no
          })
          this.$http.personGroupDelete(this.deleteform).then(
            res => {
              if(res.data.status == 200) {
                this.$message.success(this.$t('peopleManageList.delGroupSucess'))
                this.groupForm.code = ''
                this.getGroupList()
              }else{
                this.$message.warning(`${this.$t('delete.deleteFail')}${res.data.message}`)
              }
            }
          )
        }).catch(() => {
          this.$message({
            type: "info",
            message: this.$t('disable.cancelO')
          });
        });
    },
    // 取消新增或者修改
    cancelDialogGroup() {
      this.dialogAddGroup = false
    },
    // 确定新增或修改
    confirmDialogGroup() {
      if(!this.groupForm.groupName) {
        this.$message.warning(this.$t('peopleManageList.pleaseEnterGroupName'))
        return
      }
      this.dialogAddGroup = false
      if(this.dialogGroupType === 0) {
        // 新增
        let params = {
          typeNo: this.activeTabs,
          name: this.groupForm.groupName,
          parentNo: this.groupForm.code,
          description: this.groupForm.description
        }
        this.$http.personGroupInsert(params).then(res => {
          // this.getGroupList()
          if(res.data.status == 200) {
            this.$message.success(this.$t('peopleManageList.addGroupSuccess'))
            this.groupForm.code = ''
            this.getGroupList()
          }else{
            this.$message.warning(`${this.$t('peopleManageList.addGroupSuccess')}${res.data.message}`)
          }
        })
      } else if(this.dialogGroupType === 1) {
        let params = {
          name: this.groupForm.groupName,
          no: this.groupForm.code,
          description: this.groupForm.description
        }
        // 修改
        this.$http.personGroupModify( params
        ).then(res => {
          // this.getGroupList()
          if(res.data.status == 200) {
            this.$message.success(this.$t('peopleManageList.editGroupSuccess'))
            this.groupForm.code = ''
            this.getGroupList()
          }else{
            this.$message.warning(this.$t('peopleManageList.editGroupFail') + res.data.message)
          }
        })
      }
    },
      // 搜索树
    filterTreeNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
     // 点击树
    handleNodeClick(data) {

      // 获取点击的是哪个类型
      let dex = this.currentPeopleType.index
      this.selectInfo = {
        groupNo: data.no,
        groupName: data.label,
        typeNo: this.peopleTypes[dex].no,
        typeName: this.peopleTypes[dex].name,
        pictures: []
      }
      this.organizationId = data.no
      this.editGroupName = data.label
      this.addGroupId = this.editGroupId = data.no
      this.groupForm.description = data.description
      // this.groupForm.code = data.no // 选中的id
      this.$set(this.groupForm,'code',data.no)
        console.log( this.groupForm.code)
      this.getPeopleList();
    },
      openBatch(row) {
      this.batchGroupialogVisible = true;
      this.batchgroupfrom = [];
      row.forEach(item => {
        this.batchgroupfrom.push({
          id: item.id
        })
      })
    },
    createPeople(str) {
      this.isEditPeo = 0
      // if (!this.currentPeopleType) {
      //   this.$message({
      //     message: "请选择一个人员类型",
      //     type: "warning"
      //   });
      //   return;
      // }
       // 拥有的字段
      this.tableDataLabel.forEach(item => {
        this.selectInfo[item.property] = ''
      })
      this.cpShow.show = !this.cpShow.show;
      if (str == "refresh") {
        this.currentPage = 1
        this.getPeopleList({ pageSize: this.pageSize, pageNo: this.currentPage });
      }
      if (this.cpShow.show) {
        // 加入当前类型的字段
        this.cpShow.no = this.currentPeopleType.name;
        this.cpShow.tableDataLabel = this.tableDataLabel;
      }
    },
     handleSelectionChange(val) {
      if (val.length) {
        this.multipleSelection = val;
      } else {
        this.multipleSelection = [];
      }
      //val 选中的row
    },
    filterImgDefaultUrl(index) {
      switch (index) {
        case 0:
          return this.tabsdefaultImg[0];
        case 1:
          return this.tabsdefaultImg[1];
        case 2:
          return this.tabsdefaultImg[2];
        default:
          break;
      }
    },
    filterImgActiveUrl(index) {
      switch (index) {
        case 0:
          return this.tabsActiveImg[0];
        case 1:
          return this.tabsActiveImg[1];
        case 2:
          return this.tabsActiveImg[2];
        default:
          break;
      }
    },
    getTypeList: function() {
      this.$http.getPersonType().then(res => {
        if (res.data.status == 200) {
          this.tabLoading = false;
          this.peopleTypes = res.data.data;
          this.activeTabs = this.peopleTypes[0].no;
          this.currentPeopleType.name = this.peopleTypes[0].no;
          // 传给子组件的数据
          this.selectInfo.typeNo = this.peopleTypes[0].no;
          this.selectInfo.typeName = this.peopleTypes[0].name;

          this.tabsClick({
            name: this.peopleTypes[0].no,
            index: 0
            // name: this.peopleTypes[0].no,
          });
          // 访客类型获取完毕后，获取第一个分组
          this.groupValueId = JSON.parse(this.peopleTypes[0].value).group;
        }
      });
    },
    // 点击选项卡时执行
    tabsClick(tab, event) {
      this.isShowTable = false;
      this.groupForm = {
        groupName: "",
        code: "",
        description: ""
      };
      // 传给子组件的数据
      this.selectInfo = {
        groupNo: null,
        groupName: null,
        typeNo: this.peopleTypes[tab.index].no,
        typeName: this.peopleTypes[tab.index].name,
        pictures: []
      };

      this.resetData();
      this.currentPeopleType = tab;
      // 重新加载分组
      this.tabIndex = tab.index;
      // 清空之前的内容
      this.tableDataLabel.length = 0;
      //初始化（检查后defaultTableDataLabel为空）
      this.tableDataLabel = JSON.parse(
        JSON.stringify(this.defaultTableDataLabel)
      );
      this.pageSize = 10; //当前分页
      this.currentPage = 1; //当前页
      this.total = 0; //一共多少条数据

      this.getGroupList(); //调用映射
    },
    getGroupList() {

      let isGroup = JSON.parse(
        this.peopleTypes[parseInt(this.tabIndex)].value
      ).hasOwnProperty("group");
      if (!isGroup) {
        // 如果没有分组，直接清空树，对数据进行查询
        this.treeData = [];
        this.getTypeKeys();

        return;
      }
      this.groupValueId = JSON.parse(
        this.peopleTypes[this.tabIndex].value
      ).group;

      this.$http.personGroupList({ no: this.groupValueId }).then(res => {
        let groups = res.data.data;
        // 获取根目录的id
        this.selectInfo.groupNo = this.organizationId = res.data.data[0].no;
        this.selectInfo.groupName = res.data.data[0].name;

        this.treeData = JSON.parse(
          JSON.stringify(groups).replace(/nameZh/g, "label")
        );
          this.getTypeKeys();
      });
    },
    getTypeKeys(){
       let typeCode = this.currentPeopleType.name;
      this.$http.personAttrlist( { typeNo: typeCode })
        .then(
          res => {
            if (res.data.status == 200) {
              this.tableDataLabel = []

              // let zhLabel = ['姓名', '编号', '照片'];

              res.data.data.forEach((item, index) => {
                this.peopleTypefield = res.data.data;
                // console.log(localStorage.language === 'en' && item.hasOwnProperty('descriptionEn'))
                // console.log(item.hasOwnProperty('descriptionZh'))
                // console.log(localStorage.language)
    ////adwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                this.tableDataLabel.push({
                  // name: localStorage.language === 'en' ? item.descriptionEn : item.descriptionZh,
                  name: localStorage.language === 'en' && item.hasOwnProperty('descriptionEn') ? item.descriptionEn : item.hasOwnProperty('descriptionZh') ? item.descriptionZh : item.description,
                  property: item.name,
                  no: item.no,
                  width: 150,
                  type: "input",
                  required: JSON.parse(item.value).required === '0'
                });
                let name = (localStorage.language === 'en' && item.hasOwnProperty('descriptionEn')) ? item.descriptionEn : item.hasOwnProperty('descriptionZh') ? item.descriptionZh : item.description

                // console.log(name)
                // console.log({
                //   // name: localStorage.language === 'en' ? item.descriptionEn : item.descriptionZh,
                //   name: (localStorage.language === 'en' && item.hasOwnProperty(item.descriptionEn)) ? item.descriptionEn : item.hasOwnProperty(item.descriptionZh) ? item.descriptionZh : item.description,
                //   property: item.name,
                //   no: item.no,
                //   width: 150,
                //   type: "input",
                //   required: JSON.parse(item.value).required === '0'
                // })

                // if(this.$i18n.locale == 'en') {

                // }else{
                //   this.tableDataLabel.push({
                //     name: zhLabel[index],
                //     property: item.name,
                //     no: item.no,
                //     width: 150,
                //     type: "input",
                //     required: JSON.parse(item.value).required === '0'
                //   });
                // }
              })
            } else {
              this.$message.warning(JSON.stringify(res.data.message));
            }
          }
        );
        this.getPeopleList()
    },
    getPeopleList(page = { pageSize: this.pageSize, pageNo: this.currentPage, typeNo: "" }){
      page.typeNo = this.currentPeopleType.name;
      page.groupNo = this.organizationId;
      this.$http.getPersonList(page).then(res=>{
         let self = this
          if (res.data.status == 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.tableBoxLoading = false;

            this.$nextTick(() => {
              setTimeout(() => {
                self.isShowTable = true
              }, 180)
            })
          }else{
             this.$message.warning(res.data.message);
          }
      },)
    },
    resetData() {
      // 姓名/编号
      this.searchobj = {
        name: "",
        code: ""
      };
      // 表单数据置为空
      this.tableData = [];
      this.organizationId = "";
      this.groupValueId = "";
      this.pageSize = 5;
      this.currentPage = 1;
    }
  }
};
</script>
<style lang="scss" scoped>
#peopleList {
  height: 100%;
  width: 100%;
  .peopleList-content {
    height: 95%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
.people_type_sel {
  height: 55px;
  margin-top: 10px;
  padding: 0 5px;
}
.people_type_tabs {
  width: 100%;
  display: inline-block;
  span {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    width: 100px;
  }
}
.people_type_buttons {
  float: right;
  margin-top: 10px;
}
.operation-panel {
  padding-top: 15px;
  padding-bottom: 5px;
  height: 60px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #fff;
  @media screen and(max-width: 1600px) {
    height: 120px;
  }
  @media screen and(max-width: 1100px) {
    height: 150px;
  }
}
.content {
  height: 94%;
  display: flex;
  flex-direction: column;
}
.util-bar {
  padding: 5px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.picker {
  margin-right: 15px;
}
.search {
  float: left;
  display: flex;
  @media screen and(max-width: 1600px) {
    float: none;
  }
}
.util {
  float: right;
  @media screen and(max-width: 1600px) {
    float: none;
    margin-top: 20px;
  }
}
.search-button {
  margin-left: 10px;
}
.short-input {
  width: 15%;
  margin-right: 15px;
}
.mini-input {
  width: 12%;
  margin-right: 15px;
}

.bottom-show {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  .show-tree {
    border: 1px solid #dedede;
    box-sizing: border-box;
    background: white;
    box-shadow: #d1d1d1 0 2px 4px 0;
    border-radius: 5px;
    width: 256px;
    // flex: 1.6;
    // width: 16%;
    .search-tree-input {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .el-input__inner {
        border-radius: 0;
      }
    }
    .people-tree {
      height: 450px;
      overflow-y: scroll;
    }
    .fix-sz {
      box-sizing: border-box;
      padding: 10px;
      height: 140px;
      > div {
        text-align: center;
        margin-bottom: 5px;
        > button {
          width: 100%;
          height: 34px;
        }
      }
    }
  }
  .space {
    // flex: 0.2;
    width: 2%;
  }
  .table-box {
    width: 100%;
    // position: absolute;
    // height: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #dedede;
    box-sizing: border-box;
    background: white;
    box-shadow: #d1d1d1 0 2px 4px 0;
    border-radius: 5px;
    .el-table {
      // position: absolute;
      max-width: 1337px;
      left: 0;
      right: 0;
    }
    .pagination-box {
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<style lang="scss">
#peopleList {
  .people_type_tabs {
    height: 60px !important;
    ::-webkit-scrollbar-track-piece {
      background-color: #f5f8fc;
    }
    .el-tabs__header {
      height: 100% !important;
      width: 100% !important;
      overflow-x: scroll;
      border: none !important;
      margin: 0;
      background: #f5f8fc;
      .el-tabs__nav {
        border: none;
        display: flex;
        .el-tabs__item {
          width: 150px;
          height: 40px;
          border: none;
          border-radius: 0.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.2rem;
          color: #909399;
        }
        .is-active {
          background: #4383dc;
          color: #fff;
        }
      }
    }
  }
  .search-tree-input {
    .el-input__inner {
      border: 0;
      border-bottom: 1px solid #e9e9e9;
    }
  }
  .people_type_tabs {
    .el-tabs__header {
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            > div {
              position: relative;
            }
          }
        }
      }
    }
  }
}
</style>

