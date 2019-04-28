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
              v-loading="tableBoxLoading"
              :data="showData"
              :header-cell-style="{background:'rgba(245,248,252,1)'}"
              height="631">
              <el-table-column
                :label="$t('allocation.index')"
                type="index"
                width="150"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="$t('personnelType.title')"
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
                    :disabled="filterName(scope.row)"
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
export default {
  data(){
    return{

    }
  },
  created(){
    this.getTypeList()
  },
  mounted(){

  },
  methods:{
    getTypeList:function(){
      this.$http.getPersonType({}).then(res=>{
        console.log(res)
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
