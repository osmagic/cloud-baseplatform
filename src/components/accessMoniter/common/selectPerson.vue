<template>
<!--  -->
<div class="select-person">
  <div class="wait-sel-person">
    <div class="wait-sel-person-tree">
      <div class="type-option">
        <!-- {{typeValue}} -->
        <div class="person-type-tro">人员类型：</div>
        <div class="type-option-sel">
          <el-select v-model="typeValue" placeholder="请选择人员类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
       <div class="group-tree">
          <el-tree
            :data="treeData"
            :highlight-current="true"
            default-expand-all
            node-key="id"
            ref="tree"
           @node-click="handleNodeClick"
            :check-on-click-node="true"
            highlight-current>
          </el-tree>
       </div>
    </div>
      
    <div class="wait-sel-table">
      <el-table
            ref="waitpeopleListTable"
            id="out-table-list"
            :data="waittableData"
            height="250"
            @selection-change="handleSelectionChange"
            :header-cell-style="{ background: 'rgba(245,248,252,1)' }"
            :default-sort="{ prop: 'id', order: 'ascending' }"
            :row-key="getRowKeys"
          >
            <el-table-column  type="selection" reserve-selection>
            </el-table-column>
            <el-table-column
              v-for="(tab, index) in tableDataLabel"
              :key="index"
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
                  <img
                    :src="scope.row.urls[0]"
                    style="width:50px;height:50px;"
                    v-if="scope.row.urls !== null"
                  />
                  <div v-else></div>
                </div>
                <div v-else>
                  {{ scope.row[tab.property] }}
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-box">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentTablePage"
              :page-sizes="[5, 10, 20]"
              :page-size="tablePageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tabletotal"
            >
            </el-pagination>
        </div>
    </div>

   </div>
  <div class="selected-person">
    <div>
       <div>
          已选择人员
       </div>
       <el-table
                ref="selpeopleListTable"
                id="out-table-list"
                :data="selPersonTable"
                height="250"
                :header-cell-style="{ background: 'rgba(245,248,252,1)' }"
                :default-sort="{ prop: 'id', order: 'ascending' }"
                :row-key="getRowKeys"
              >
              <el-table-column
                prop="type"
                label="类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="group"
                label="分组"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="number"
                label="编号"
                >
              </el-table-column>
              <el-table-column
                prop="photo"
                label="照片">
                  <template slot-scope="scope">
                    <img
                          :src="scope.row.photo"
                          style="width:50px;height:50px;"
                      />
                  </template>
              </el-table-column>
       </el-table>
    </div>
  </div>
</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: {
    setSelPersons: {
      type: Array,
      default: () => {
        return []
      }
    }
   },
  data(){
    return{
      currentTablePage: 1,
      tabletotal: 0,
      typeOptions: [
      ],
      treeData: [
      ],
      waittableData:[],
      typeValue: '',
      tableDataLabel: [],
      tablePageSize: 10,
      currentGroupNo: '', // 当前选中的分组编号
      currentGroupName: '', // 当前选中的分组名称
      selPersonTable: [] // 已选中的人员列表
    }
  },
  methods: {
    // 初始化相关参数
    initParam() {
      this.currentTablePage = 1;
      this.tabletotal = 0;
      this.tablePageSize = 10;
      this.currentGroupNo = '';
    },
    // 选中表单的时候
    handleSelectionChange(val) {
      this.selPersonTable = []
      let personIds = []
      val.forEach(item => {
        this.selPersonTable.push({
          type: this.typeValue.split('-')[2],
          group: this.currentGroupNo,
          name: item.name,
          number: item.code,
          photo: `data:image/jpeg;base64,${item.base64}`
        })
        personIds.push(item)
      })
      this.$emit('seletPerson', personIds)
      // console.log(this.selPersonTable)
    },
    handleSizeChange(pageSize) {
      this.tablePageSize = pageSize;
      this.getPersonList()
    },
    handleCurrentChange(current) {
      this.currentTablePage = current
      this.getPersonList()
    },
    getRowKeys(row) {
      return row.id;
    },
    // 获取类型的字段
    getTypeKeys() {
      let typeCode = this.typeValue.split('-')[0];
      this.$http.personAttrlist( { typeNo: typeCode })
        .then(
          res => {
            if (res.data.status == 200) {
              this.tableDataLabel = []
              res.data.data.forEach((item, index) => {
                // this.peopleTypefield = res.data.data;
                this.tableDataLabel.push({
                  name: localStorage.language === 'en' && item.hasOwnProperty('descriptionEn') ? item.descriptionEn : item.hasOwnProperty('descriptionZh') ? item.descriptionZh : item.description,
                  property: item.name,
                  no: item.no,
                  width: 150,
                  type: "input",
                  required: JSON.parse(item.value).required === '0'
                });
                let name = (localStorage.language === 'en' && item.hasOwnProperty('descriptionEn')) ? item.descriptionEn : item.hasOwnProperty('descriptionZh') ? item.descriptionZh : item.description
              })
            } else {
              this.$message.warning(JSON.stringify(res.data.message));
            }
          }
        );
    },
    getTypeList() {
      // 获取人员类型
      return new Promise((resolve, reject) => {
        this.$http.getPersonType({}).then(res => {
          if(res.data.status==200) {
            res.data.data.forEach(item => {
                let groupNo = JSON.parse(item.value).group
                this.typeOptions.push({
                  value: `${item.no}-${groupNo}-${item.name}`,
                  label: item.name
                })
            });
            resolve()
          }
        })
      })
    },
    getTypeByGroup(groupNo) {
      this.$http.personGroupList({
        no: groupNo
      }).then(res => {
        this.treeData = JSON.parse(
          JSON.stringify(res.data.data).replace(/nameZh/g, "label")
        );
        
        this.currentGroupNo = this.treeData[0].no
        this.currentGroupName = this.treeData[0].name
      })
    },
    getPersonList() {
      this.$http.getPersonList({
        pageSize: this.tablePageSize,
        pageNo: this.currentTablePage,
        typeNo: this.typeValue.split('-')[0],
        groupNo: this.currentGroupNo
      }).then(res => {
        this.waittableData = res.data.data;
        // 获取表单总条数
        this.tabletotal = res.data.total

        this.setSelPersons.forEach(row => {
          this.$refs.waitpeopleListTable.toggleRowSelection(row);
        })
      })
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    handleNodeClick(data, isTrue) {
      this.currentGroupNo = data.no
      this.getPersonList()
    }
  },
  watch: {
    setSelPersons(newVal, oldVal) {
      console.log(newVal)
    },
    typeValue(newVal, oldVal) {
      if(newVal) {
        this.initParam()
        // 获取查询分组的id
        let groupNo = newVal.split('-')[1]
        // 获取人员分组
        if(groupNo !== "undefined") {
          this.getTypeByGroup(groupNo)
        }
        // 获取类型的字段
        this.getTypeKeys()
        // 获取当前类型的人员列表
        this.getPersonList('')
      }
    }
  },
  mounted() {
     // 查询设备分组
    this.getTypeList().then(() => {
      this.typeValue = this.typeOptions[0].value
      this.getTypeKeys()
    })
     
  }
}
</script>

<style lang="scss">
.select-person {
  .el-table__empty-block {
    min-width: 460px !important;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #4C83FF !important;
    color: #fff;
  }
  .el-table__header, .el-table__header-wrapper {
      // background: rgb(245, 248, 252) !important;
      // border:1px solid rgba(77,79,92,0.4);
  }
  .wait-sel-person{
    display: flex;
    margin-bottom: 10px;
    .wait-sel-person-tree {
      flex: 3;
      margin-right: 10px;
      // background-color: #f5f8fc;
      .person-type-tro {
        display: inline-block;
      }
      .type-option-sel {
        display: inline-block;
        width: 165px;
      }
      .group-tree {
        overflow: auto;
        width: 240px;
        height: 255px;
        margin-top: 10px;
        margin-right: 10px;
        border: 1px solid rgba(77, 79, 92, 0.4);
      }
    }
    .wait-sel-table {
      flex: 7;
      padding-top: 41px;
      width: 600px;
      .pagination-box {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
  .selected-person {

  }
}
</style>
