<template>
  <div id="deviceManager">
    <div class="admin-content">
      <div class="operation-box">
        <i class="blue"></i>
        <div class="title">
          <span>{{ $t("deviceAdministrator.administrator") }}</span>
        </div>
        <div class="operation">
          <!-- <el-button @click="openaddAdministrator"
                       :disabled="!$route.meta['add']"
                       class="addButton">{{$t("deviceAdministrator.added")}}</el-button> -->
          <el-button @click="openaddAdministrator" class="addButton">{{
            $t("deviceAdministrator.added")
          }}</el-button>
        </div>
      </div>
      <!-- 详情列表 -->
      <div class="table-box">
        <el-table
          :data="moniterList"
          v-loading="tableBoxLoading"
          height="500"
          :header-cell-style="{ background: 'rgba(245,248,252,1)' }"
          @selection-change="handleSelectionChange"
          ref="admintable"
          :row-key="getRowKeys"
        >
          <!-- <el-table-column type="selection" width="55">
              </el-table-column> -->
          <el-table-column
            fixed
            type="selection"
            width="80"
            align="center"
            reserve-selection
            :selectable="filterselectable"
          >
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center">
          </el-table-column>
          <el-table-column
            prop="photo"
            :label="$t('deviceAdministrator.photo')"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                title=""
                ref="popover"
                trigger="click"
              >
                <!-- 放大图片 -->
                <img
                  :src="scope.row.photo"
                  alt=""
                  style="max-width:800px;max-height:600px;"
                />
                <!-- 缩略图 -->
                <img
                  :src="scope.row.photo"
                  v-if="scope.row.photo"
                  alt=""
                  srcset=""
                  style="width:50px;height:50px;cursor:pointer;"
                  slot="reference"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="password"
            :label="$t('deviceAdministrator.password')"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="deviceNames" label="关联设备" align="center">
          </el-table-column>
          <el-table-column :label="$t('common.operation')" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" @click="updateopen(scope.row)" :disabled="!$route.meta['modify']">{{$t("common.edit")}}</el-button> -->
              <el-button
                type="text"
                size="small"
                @click="updateopen(scope.row)"
                >{{ $t("common.edit") }}</el-button
              >
              <!-- <el-button type="text" size="small" @click="deleteRow(scope.row)" :disabled="!$route.meta['remove']">{{$t("common.delete")}}</el-button> -->
              <el-button
                type="text"
                size="small"
                @click="deleteRow(scope.row)"
                >{{ $t("common.delete") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size.sync="pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 新增模态框 -->
      <el-dialog
        :title="$t('deviceAdministrator.modify')"
        :visible.sync="adddialogVisible"
        width="575px"
        :before-close="createFileHandleClose"
      >
        <el-form
          ref="createform"
          :rules="updateRules"
          :model="createform"
          label-width="100px"
          label-position="left"
        >
          <el-form-item :label="$t('deviceAdministrator.nameA')" prop="name">
            <el-input
              v-model="createform.name"
              :placeholder="$t('deviceAdministrator.enterName')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('deviceAdministrator.photoA')" prop="photo">
            <el-upload
              ref="createFile"
              :class="createFilelist.length == 1 ? 'noShow' : 'show'"
              :before-upload="beforeCreateUpload"
              :on-remove="createEtformRemove"
              :on-change="createchange"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :file-list="createFilelist"
              list-type="picture-card"
              :multiple="false"
              :http-request="createExhibition"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 图片模态框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-form-item
            :label="$t('deviceAdministrator.passwordA')"
            prop="password"
          >
            <el-input
              v-model="createform.password"
              :placeholder="$t('deviceAdministrator.passwordA')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('deviceAdministrator.associated')"
            :label-width="$i18n.locale == 'zh' ? '100px' : '130px'"
          >
            <el-select
              v-model="createHardwareNameArr"
              clearable
              multiple
              filterable
              :placeholder="$t('deviceAdministrator.associated')"
            >
              <el-option
                v-for="(item, index) in allNotIncludeHardware"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- {{createHardwareNameArr}} -->
          <el-form-item class="sub" style="text-align:right">
            <el-button @click="canceldialogVisible('createform')">{{
              $t("common.cancel")
            }}</el-button>
            <el-button type="primary" @click="createdfrom('createform')">{{
              $t("common.ok")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog
        title="修改管理员"
        :visible.sync="updateialogVisible"
        width="575px"
        :before-close="updateformHandleClose"
      >
        <el-form
          ref="updateform"
          :rules="createRules"
          :model="updateform"
          label-width="100px"
          label-position="left"
        >
          <el-form-item :label="$t('deviceAdministrator.nameA')" prop="name">
            <el-input v-model="updateform.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('deviceAdministrator.photoA')" prop="photo">
            <el-upload
              ref="updateFile"
              :class="updateFilelist.length == 1 ? 'noShow' : 'show'"
              :before-upload="beforeUpdateUpload"
              :on-remove="updateEtformRemove"
              :on-change="updatechange"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :file-list="updateFilelist"
              action=""
              list-type="picture-card"
              :multiple="false"
              :http-request="updateExhibition"
            >
              <img
                v-if="updateform.photo"
                :src="updateform.photo"
                class="avatar"
                width="100%"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 图片模态框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-form-item
            :label="$t('deviceAdministrator.passwordA')"
            prop="password"
          >
            <el-input v-model="updateform.password"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('deviceAdministrator.associatedA')"
            :label-width="$i18n.locale == 'zh' ? '100px' : '130px'"
          >
            <el-select
              v-model="adminIncludeHardwareNames"
              clearable
              multiple
              filterable
            >
              <el-option
                v-for="(item, index) in allNotIncludeHardware"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="sub" style="text-align:right">
            <el-button @click="updatecanceldialogVisible('updateform')">{{
              $t("common.cancel")
            }}</el-button>
            <el-button type="primary" @click="updatedForm('updateform')">{{
              $t("common.ok")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allNotIncludeHardware: [],
      // 管理员关联的智能硬件信息
      adminIncludeHardware: [],
      // 管理员关联的智能硬件名
      adminIncludeHardwareNames: [],
      adminNotIncludeHardWare: [],
      createHardwareNameArr: [],
      updateHardwareNameArr: [],
      updateDeviceArr: [],
      multipleSelection: [],
      batchdisabled: true,
      tableBoxLoading: false,
      adminId: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      // 添加
      createform: {
        name: "",
        photo: "",
        password: "",
        deviceIds: []
      },
      // 编辑
      updateform: {
        id: "",
        name: "",
        photo: "",
        password: "",
        deviceIds: [],
        mappingIds: []
      },
      deleteData: [],
      // 查询管理员和设备管理员关联
      deviceManagerDtosform: {
        id: ""
      },
      // 查询管理员列表
      search: {},
      adddialogVisible: false,
      updateialogVisible: false,
      dialogVisible: false,
      dialogImageUrl: "",
      netAPI: "",
      hardwareNetAPI: "",
      tableData: [],
      allAdministrator: [],
      // 管理员和设备管理员关联列表
      deviceManagerDtosData: [],
      ids: 0,
      form: "",
      createFilelist: [],
      updateFilelist: [],
      createfilechange: false,
      imageUrl: true,
      filechange: false,
      validUpdate: false,
      pageNumber: 0,
      pageNo: 1,
      isUp: true,
      moniterList: [],
      // 设置row-key
      getRowKeys(row) {
        return row.id;
      }
    };
  },
  computed: {},
  created() {
    this.getManagerList();
    this.getNotIncludeHardware();
  },
  mounted() {},
  methods: {
      // 查询设备管理员已关联智能硬件
    findAdminIncludeHardWare() {
      this.adminIncludeHardwareNames = [];
      this.updateform.mappingIds = [];
      this.$http.getRelatedDevice( {id: this.adminId}).then(
        res => {
          if(res.data.status == 200) {
            console.log(res.data.data)
            this.adminIncludeHardware = res.data.data
            res.data.data.forEach(item => {
              console.log(item)
              this.adminIncludeHardwareNames.push(item.deviceName)
            })
            this.allNotIncludeHardware.forEach(item => {
              res.data.data.forEach(i => {
                if(item.name == i.deviceName) {
                  this.updateform.mappingIds.push(i.id)
                }
              })
            })
          } else {
            this.$message.warning(this.$t('common.findFailed') + res.data.message);
          }
        },
        err => {
          this.$message({
            message: this.$t('common.serviceError') + err,
            type: "warning"
          });
        }
      )
    },
     // 添加时删除图片
    createEtformRemove () {
      this.createFilelist = [];
      delete this.createform.photo
    },
    // 编辑时删除图片
    updateEtformRemove () {
      this.updateFilelist = [];
      // this.updateform.photo = "";
      delete this.updateform.photo
      this.imageUrl = false
    },
    // 添加照片文件状态改变时调用
    createchange (file, fileList) {
      let reader = new FileReader()
      // 异步读取存储在用户计算机上的文件(上传的文件)，结果用data:url的字符串形式表示
      reader.readAsDataURL(file.raw)
      let This = this
      // 读取完成后触发：(result里是URL格式的字符串(base64)以表示所读取文件的内容)
      reader.onload = function(e) {
        This.createform.photo = this.result
      }
      this.createFilelist.push(file)
    },
    // 编辑照片文件状态改变时调用,file:图片信息,fileList:所有图片信息(数组)
    updatechange (file, fileList) {
      console.log(123)
      // if(this.isUp) {
      console.log(345)
      let reader = new FileReader()
      // 异步读取存储在用户计算机上的文件(上传的文件)
      reader.readAsDataURL(file.raw)
      let This = this
      // 读取完成后，触发：(result里是URL格式的字符串(base64)以表示所读取文件的内容)
      reader.onload = function(e) {
        This.updateform.photo = this.result
      }
      this.updateFilelist.push(file)
      // }
    },
     createdfrom (formName) {

      let newCreate = JSON.parse(JSON.stringify(this.createform))

      // console.log(JSON.stringify(newCreate))
      // 选择关联的设备id
      this.$refs[formName].validate(valid => {
        if(valid) {
          newCreate.deviceIds = [];

          this.allNotIncludeHardware.forEach(item => {
            this.createHardwareNameArr.forEach(i => {
              if(item.name == i) {
                newCreate.deviceIds.push(item.id)
              }
            })
          })
          this.$http.managerInsert( newCreate).then(
          res => {
            if (res.data.status == 200) {
              this.$refs.createform.resetFields();
              this.$refs.createFile.clearFiles();

              this.adddialogVisible = false;
              this.$message.success(this.$t('common.insertSuccess'));
              this.getManagerList();
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
        )
        } else {
          return false;
        }
      })
    },
    createExhibition(content) {
      console.log(content);
    },
    updateExhibition(content) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;

      this.dialogVisible = true;
    },
    getNotIncludeHardware(v) {
      this.$http.getNotRelatedDevice().then(res => {
        if (res.data.status == 200) {
          this.allNotIncludeHardware = res.data.data;
          if (v == "update") {
            console.log(v)
            this.findAdminIncludeHardWare();
          }
        } else {
          this.$message.warning(
            this.$t("common.findFailed") + res.data.message
          );
        }
      });
    },
    // 点击取消,关闭添加模态框
    canceldialogVisible(formName) {
      this.$refs.createFile.clearFiles();
      this.$refs[formName].resetFields();
      this.createFilelist = [];
      this.createHardwareNameArr = [];
      this.adddialogVisible = false;
    },
    // 点击右上角,关闭添加模态框
    createFileHandleClose(done) {
      this.$refs.createform.resetFields();
      this.$refs.createFile.clearFiles();
      this.createFilelist = [];
      this.createHardwareNameArr = [];
      done();
    },
    // 点击取消,关闭编辑模态框
    updatecanceldialogVisible(formName) {
      this.$refs.updateform.resetFields();
      this.$refs.updateFile.clearFiles();
      this.updateialogVisible = false;
      this.updateDeviceArr = [];
      this.updateFilelist = [];
    },
    // 点击右上角,关闭编辑模态框
    updateformHandleClose(done) {
      this.$refs.updateform.resetFields();
      this.$refs.updateFile.clearFiles();
      this.updateDeviceArr = [];
      this.updateFilelist = [];
      done();
    },
    getManagerList() {
      this.$http.getManagerList().then(res => {
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          for (let index2 = 0; index2 < element.devices.length; index2++) {
            const elementD = element.devices[index2];
            if(!element.deviceNames){
              element.deviceNames = elementD.deviceName
            }else{
              element.deviceNames = elementD.deviceName+'/'
            }

          }
        }
        this.moniterList = res.data.data;
      });
    },
    openaddAdministrator() {
      this.createHardwareNameArr = [];
      this.createFilelist = [];
      this.adddialogVisible = true;
    },
    updateopen(row) {
      // console.log(row.photo)
      this.adminId = row.id;
      this.updateform.id = row.id;
      this.updateform.name = row.name;
      this.updateform.photo = row.photo;
      this.updateform.password = row.password;
      this.getNotIncludeHardware('update');
      this.updateialogVisible = true;
    },
    // 删除行
    deleteRow(row) {
      // console.log(JSON.stringify(row))
      this.deleteData = [];
      //判断类型
      let rowType =  row instanceof Array
      if (rowType == true) {
        for (let index in row) {
          this.deleteData.push({ id: row[index].id });
        }
      } else {
        this.deleteData.push({ id: row.id });
      }
      // console.log(JSON.stringify(this.deleteData))
      this.$confirm(this.$t("delete.deleteRow"), this.$t("delete.tips"), {
        confirmButtonText: this.$t("delete.ok"),
        cancelButtonText: this.$t("delete.cancel"),
        type: "warning"
      })
        .then(() => {
          this.$http.managerDelete(this.deleteData).then(
            res => {
              if (res.data.status == 200) {
                if (this.deleteData.length == this.tableData.length) {
                  this.currentPage =
                    this.currentPage - 1 > 0 ? this.currentPage - 1 : 1;
                  this.getManagerList();
                } else {
                  this.getManagerList();
                }
                this.$message.success(this.$t("delete.success"));
                this.$refs.admintable.clearSelection();
              } else {
                this.$message.warning(
                  this.$t("common.deleteFailed") + res.data.message
                );
              }
            },
            err => {
              this.$message({
                message: this.$t("common.serviceError") + err,
                type: "warning"
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("delete.canceledDeletion")
          });
        });
    },
    // 点击确定,编辑设备管理员信息
    updatedForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateform.deviceIds = [];
          this.allNotIncludeHardware.forEach(item => {
            this.adminIncludeHardwareNames.forEach(i => {
              if (item.name == i) {
                this.updateform.deviceIds.push(item.id);
              }
            });
          });
          // console.log(JSON.stringify(this.updateform))
          this.$http.managerModify(this.updateform).then(
            res => {
              if (res.data.status == 200) {
                this.$message.success(this.$t("common.updateSuccess"));
                this.getManagerList();
              } else {
                this.$message.warning(
                  this.$t("common.updateFailed") + res.data.message
                );
              }
              this.updateialogVisible = false;
            },
            err => {
              this.$message({
                message: this.$t("common.serviceError") + err,
                type: "warning"
              });
              this.updateialogVisible = false;
            }
          );
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" >
#deviceManager {
  height: 100%;
  width: 100%;
  .admin-content {
    height: 94.5%;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: #d1d1d1 0 2px 4px 0;
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .operation-box {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 20px 20px;
      padding-right: 30px;
      padding-top: 10px;
      height: 70px;
      .blue {
        width: 12px;
        height: 20px;
        background: rgba(67, 131, 220, 1);
        border-radius: 0px 3px 3px 0px;
        position: absolute;
        left: 0;
        top: 19px;
      }
      .title {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .table-box {
      box-sizing: border-box;
      padding: 0 30px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .pagination-box {
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

