<template>
  <div id="peopleType">
    <div class="people-type-style">

      <div class="type-content">
        <div class="top-box">
          <i class="blue"></i>
          <div class="title">
            <span>{{$t("personnelType.title")}}</span>
          </div>
          <div class="type-content-fix">
            <el-button type="primary" @click="addPeopleType">{{$t("personnelType.add")}}</el-button>
            <el-button type="primary" @click="fixPeopleField">{{$t("personnelType.field")}}</el-button>
          </div>
        </div>
        <div class="show-table">
           <el-table
               :row-key="getRowKeys"
              :data="typeData"
              :header-cell-style="{background:'rgba(245,248,252,1)'}"
              height="631">
              <el-table-column
                :label="$t('allocation.index')"
                type="index"
                width="150"
                align="center">
              </el-table-column>
              <el-table-column
                prop="nameZh"
                :label="$t('personnelType.title')"
                align="center">
              </el-table-column>
              <el-table-column
                prop="total"
                label="数量"
                align="center">
              </el-table-column>
              <el-table-column
                :label="$t('common.operation')"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope)"
                    type="text"
                    size="small">
                    {{$t("common.edit")}}
                  </el-button>
                  <el-button
                      @click.native.prevent="deleteRow(scope.row)"
                    type="text"
                    size="small">
                    {{$t("common.delete")}}
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
            <div class="pagination-box">
                <el-pagination
                  :current-page="currentPage"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5,10,20]"
                  :page-size.sync="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
        </div>
      </div>
    </div>
    <!-- <new-people-type-dialog :isShow="true"></new-people-type-dialog> -->
    <el-dialog
      :title="dialogPeopleTitle"
      :visible.sync="dialogAddPeopleType"
      width="30%">
        <new-people-type-dialog :isEditPersonType="isEditPersonType"
                                :dialogAddPeopleType="dialogAddPeopleType"
                                :peopleTypeInfo="peopleTypeInfo"
                                :peopleBaseInfo="peopleBaseInfo"
                                @dialogClosePeopleType="dialogClosePeopleType"></new-people-type-dialog>
    </el-dialog>

     <el-dialog
      :title="$t('personnelType.field')"
      :visible.sync="dialogFixField"
      width="35%">
        <people-attr-config-dialog :dialogFixField="dialogFixField" @closeDialogFixField="closeDialogFixField"></people-attr-config-dialog>
    </el-dialog>
  </div>
</template>
<script>
import newPeopleTypeDialog from './newPeopleTypeDialog';
import peopleAttrConfigDialog from "./peopleAttrConfigDialog";
export default {
   components: {
    newPeopleTypeDialog,
    peopleAttrConfigDialog
  },
  data(){
    return{
      typeData:[],
        currentPage: 1,
      pageSize: 10,
      total: 6,
      tableData: [],
      showData: [],
      dialogPeopleTitle: '新增人员类型',
      dialogAddPeopleType: false,
      dialogFixField: false,
      tableBoxLoading: false,
      peopleTypeInfo: [],
      newTableData: [],
      peopleBaseInfo: {
        peopleTypeName: '', // 人员类型的名字
        peopleTypeNo: '', // 人员类型编号
        categoryValue: '' // 包含是否分组
      },
      isEditPersonType: false, // 是否编辑人员类型
      deleteform: {
        no: ''
      }
    }
  },
  created(){
    this.getTypeList()
  },
  mounted(){

  },
  methods:{
     getRowKeys(row) {
        return row.id;
     },
     dialogClosePeopleType() {
      // 关闭窗口
      this.dialogAddPeopleType = false
      this.getTypeList()
    },
      handleSizeChange(pageSize) {
    },
    handleCurrentChange(Current) {
      this.currentPage = Current
    },
     editRow(val) {
      console.log(val)
      this.dialogAddPeopleType = true
      console.log(val.row.children)
      this.peopleTypeInfo = val.row.children
      this.peopleBaseInfo.id = val.row.id
      // 人员类型的名字
      this.peopleBaseInfo.peopleTypeName = val.row.name
      // 人员类型的编号
      this.peopleBaseInfo.categoryNo = val.row.no
      this.peopleBaseInfo.categoryValue = val.row.value
      // 处于编辑状态
      this.isEditPersonType = true
      this.dialogPeopleTitle = this.$t("personnelType.edit")
    },
    deleteRow(row) {
      this.deleteform.no = row.no;
      this.deleteform.name = row.name;
      this.$http.personTypeDelete( [this.deleteform]).then(
        res => {
          if(res.data.status == 200) {
            // this.initParam()
            this.$message.success(this.$t("delete.success"))
            this.getTypeList()
          } else {
            // this.$message.warning(`${res.body.message}`);
            // this.$message.warning('Delete failed. Maybe this person has a type of existing person.')
          }
        },
        err => {
          this.$message.warning(`${err}`);
        }
      )
    },
    addPeopleType() {
      this.dialogAddPeopleType = true
      this.isEditPersonType = false
      this.peopleBaseInfo.peopleTypeName = ''
      this.dialogPeopleTitle = this.$t('personnelType.addPersonType')
    },
    fixPeopleField() {
      this.dialogFixField = true
    },
    closeDialogFixField() {
      this.dialogFixField = false
    },
    getTypeList:function(){
      this.$http.getPersonType({}).then(res=>{
        console.log(res.data)
        if(res.data.status==200){

          for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index];

            // delete element.children
            //  console.log(element)
          }
          this.typeData = res.data.data
          console.log(this.typeData)
        }
      })
    }
  },
}
</script>
<style lang="scss">
  #peopleType {
    margin: 0;
    .people-type-style {
      // position: absolute;
      // top: 9px;
      // right: 0;
      // left: 0;
      // margin: auto;
      // background: #ffffff;
      // height: 92%;
      // width: 95%;
      // border-radius: 5px;
      // padding: 10px;
      .type-content {
        background:rgba(255,255,255,1);
        border:1px solid rgba(233,233,233,1);
        box-shadow:#D1D1D1 0 2px 4px 0;
        border-radius:5px;
        margin-top: 10px;
        .top-box{
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          padding: 20px 30px;
          .blue{
          width:12px;
          height:30px;
          background:rgba(67,131,220,1);
          border-radius:0px 3px 3px 0px;
          position: absolute;
          left: 0;
          top: 23px;
          }
          .title{
            height: 38.5px;
              display: flex;
              align-items: center;
              font-size: 20px;
              font-weight: bolder;
              float: left;
          }
          .type-content-fix {
          text-align: right;
          float: right
          }
        }
        .show-table{
          margin-top: 10px;
          box-sizing: border-box;
          padding: 0 30px;
          .pagination-box{
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
        }
      }
    }
    height: 100%;
    vertical-align: top;
    position: relative;
  }
</style>
