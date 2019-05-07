<template>
<!--  -->
   <div class="select-divice">
       <el-table
        ref="tableData"
        :data="tableData"
        style="width: 100%"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :reserve-selection="true"
        >
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
        >

        </el-table-column>
        <el-table-column
          prop="deviceName"
          :label="$t('accessSystem.shebeimingcheng')"
        >
        </el-table-column>
        <el-table-column
          prop="deviceType"
          :label="$t('accessSystem.leixing')"
          :formatter="formatType"
        >
        </el-table-column>
        <el-table-column :label="$t('accessSystem.gongzuoshijian')">
          <template slot-scope="timeScope">

            <el-popover
              placement="left-start"
              trigger="hover"
            >
              <span slot="reference">{{$t('accessSystem.zhouyi')}} {{timeScope.row.mon}}{{$t('accessSystem.dian')}}......</span>
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
      
      </el-table>

      <div class="footer-bottom">
        <el-pagination
          class="pagination"
          @size-change="diviceTableSizeChange"
          @current-change="diviceCurrentChange"
          :current-page="diviceCurrentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size.sync="divicePageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="diviceTotal"
        >
        </el-pagination>
      </div>
   </div>
</template>

<script>
export default {
  props: {
    setSelDivices: {
      type: Array,
      default: () => {
        return []
      }
    }
   },
  data(){
    return{
      tableData: [],
      typeData: [],
      multipleSelection: [],
      diviceTotal: 0,
      divicePageSize: 10,
      diviceCurrentPage: 1
    }
  },
  methods: {
    diviceTableSizeChange(val) {
      console.log(val)
      this.divicePageSize = val
      this.getDeviceList()
    },
    diviceCurrentChange(val) {
      this.diviceCurrentPage = val
      this.getDeviceList()
      console.log(val)
    },
    formatType(row, column) {
      switch (row.deviceType) {
        case 1:
          return this.$t('accessSystem.zhaoxiangji');
          break;
        case 2:
          return this.$t('accessSystem.luxiangji');
          break;
        case 3:
          return this.$t('accessSystem.zhinengyingjian');
          break;
      }
    },
     //表格多选处理
    handleSelectionChange(val) {
      console.log(val)
      this.$emit('getSeletedDivice', val)
    },
     getRowKeys(row) {
      return row.id;
     },
     getDeviceList() {
      this.$http
        .findDeviceAll({
            pageSize: this.divicePageSize,
            pageNo: this.diviceCurrentPage,
            sort: "id",
            order: "asc"
          })
        .then(res => {
          this.tableData = res.data.data;
          this.diviceTotal = res.data.total;

          this.setSelDivices.forEach(row => {
            this.tableData.forEach(item => {
              if(row.diviceId === item.diviceId) {
                 this.$refs.tableData.toggleRowSelection(item);
              }
            })
            
          })
        });
    },
  },
  watch: {
    setSelDivices(newVal, oldVal) {
      this.getDeviceList()
    }
  },
  mounted() {
     // 查询设备分组
    this.getDeviceList()

    console.log(this.setSelDivices)
  }
}
</script>

<style lang="scss">
.select-divice {
   .footer-bottom {
     text-align: right;
     margin-top: 10px;
   }
}
</style>
