<template>
  <div id="accessRecords">
    <!-- 详情 -->
    <el-dialog
      :title="$t('accessSystem.xiangqing')"
      :visible.sync="detailsDialog"
      width="35%"
      :before-close="detailsDialogClose"
    >

      <el-row>
        <el-col
          :span="8"
          v-if="detailInfo.type!='陌生人闯入告警'"
        >
          <div class="grid-contentFir"> <img
              :src="detailInfo.urls"
              class="snapduibi"
              alt='暂无'
            ></div>
        </el-col>
        <el-col
          :span="8"
          style="margin-top:100px"
          v-if="detailInfo.type!='陌生人闯入告警'"
        >
          <div class="grid-contentFir"><span class="score">{{detailInfo.score*100+'%'}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-contentFir"> <img
              :src="detailInfo.snapPhoto"
              class="snapduibi"
            ></div>
        </el-col>

      </el-row>
      <el-row>
        <div class="grid-content ">{{$t('accessSystem.renyuanxingming')}}:<label class="value">{{detailInfo.name}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.renyuanbianhao')}}:<label class="value">{{detailInfo.id}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.shenfenzhenghao')}}:<label class="value">{{detailInfo.code}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.renyuanleixing')}}:<label class="value">{{detailInfo.personType}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.tongxingshijian')}}:<label class="value">{{detailInfo.recordDate}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.tongxingshebei')}}:<label class="value">{{detailInfo.deviceName}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.jinchuleixing')}}:<label class="value">{{detailInfo.divergenceType}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.tongxingfangshi')}}:<label class="value">{{detailInfo.passageWay}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.yanzhengjieguo')}}:<label class="value">{{detailInfo.validateResult}}</label></div>

        <!-- <el-col :span="12" v-for="(item,index) in tableDataLabel" :key="index"><div  class="grid-content ">{{item.name}}:<label class="value">{{detailsShow[item.property]}}</label></div></el-col> -->

      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="detailsDialog = false">{{$t('accessSystem.guanbi')}}</el-button>
      </span>
    </el-dialog>
    <div class="contantHeader">

<div>
      <el-date-picker
        v-model="dateTime"
        type="datetimerange"
        align="right"
        :start-placeholder="$t('accessSystem.kaishiriqi')"
        :end-placeholder="$t('accessSystem.jieshuriqi')"
        :default-time="['12:00:00', '08:00:00']"
        value-format='yyyy-MM-dd HH:mm:ss'
        unlink-panels
      >
      </el-date-picker>

      <span style="font-size:14px;margin-left:0.32rem">{{$t('accessSystem.tongxingjieguo')}}:</span>
      <el-select
        class="select"
        v-model="passageResult"
        :placeholder="$t('accessSystem.qingxuanze')"
      >
        <el-option
          key="全部"
          :label="$t('accessSystem.quanbu')"
          value="0,1"
        >
        </el-option>
        <el-option
          key="通过"
          :label="$t('accessSystem.tongguo')"
          value="1"
        >
        </el-option>
        <el-option
          key="未通过"
          :label="$t('accessSystem.weitongguo')"
          value="0"
        >
        </el-option>
      </el-select>
      <span style="font-size:14px;margin-left:0.32rem">{{$t('accessSystem.renyuanleixing')}}:</span>
      <el-select
        class="select"
        v-model="personType"
        :placeholder="$t('accessSystem.qingxuanze')"
      >
        <el-option
          :key="typeAll"
          :label="$t('accessSystem.quanbu')"
          :value="typeAll"
        >
        </el-option>
        <el-option
          v-for="item in typeList"
          :key='item.categoryNo'
          :label="item.categoryName"
          :value="item.categoryNo"
        >

        </el-option>
      </el-select>
      <div style="display:inline-block;float:right">
        <el-button>批量删除</el-button>
        <el-button>导出记录</el-button>
      </div>
      </div>
      <div style="margin-top:20px">
         <span style="font-size:14px;">{{$t('accessSystem.jinchuleixing')}}：</span>
      <el-select
        class="select"
        v-model="divergenceType"
        :placeholder="$t('accessSystem.qingxuanze')"

      >
        <el-option
          key="全部"
          :label="$t('accessSystem.quanbu')"
          value="0,1"
        >
        </el-option>
        <el-option
          key="进"
          :label="$t('accessSystem.jin')"
          value="1"
        >
        </el-option>
        <el-option
          key="出"
          :label="$t('accessSystem.chu')"
          value="0"
        >
        </el-option>
      </el-select>
      <el-button class="search">查询</el-button>
      </div>



      <!-- <div style="float:right;margin-right:0.7rem;margin-top:10px">
        <el-button
          type="primary"
          @click="getRecordList"
        >{{$t('accessSystem.chaxun')}}</el-button>
        <el-button
          type="primary"
          @click="removeRecord"
        >{{$t('accessSystem.shanchu')}}</el-button>
        <el-button
          type="primary"
          @click="exportExcel"
        >{{$t('accessSystem.daochu')}}</el-button>
      </div> -->

    </div>
    <div class="contantTable">
      <el-table
        :data="recordData"
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
          :label="$t('accessSystem.xuhao')"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('accessSystem.xingming')"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          :label="$t('accessSystem.renyuanbianhao')"
        >
        </el-table-column>
        <el-table-column
          prop="personType"
          :label="$t('accessSystem.renyuanleixing')"
        >
        </el-table-column>
        <el-table-column
          prop="recordDate"
          :label="$t('accessSystem.shijian')"
        >
        </el-table-column>
        <el-table-column
          prop="deviceName"
          :label="$t('accessSystem.shebei')"
        >
        </el-table-column>
        <el-table-column
          prop="passageWay"
          :label="$t('accessSystem.tongxingfangshi')"
        >
        </el-table-column>
        <el-table-column
          prop="validateResult"
          :label="$t('accessSystem.yanzhengjieguo')"
          :formatter="formatValidite"
        >
        </el-table-column>
        <el-table-column
          prop="passageResult"
          :label="$t('accessSystem.tongxingjieguo')"
          :formatter="formatValidite"
        >
        </el-table-column>
        <el-table-column
          prop="score"
          :label="$t('accessSystem.duibidafen')"
        >
        </el-table-column>
        <el-table-column
          prop="divergenceType"
          :label="$t('accessSystem.jinchuleixing')"
          :formatter="formatDivergence"
        >
        </el-table-column>

        <el-table-column :label="$t('accessSystem.zhuapaizhaopian')">
          <template slot-scope='imgScope'>
            <img
              :src="imgScope.row.snapPhoto"
              alt=""
              class='snapPhoto'
            >
          </template>
        </el-table-column>

        <el-table-column :label="$t('accessSystem.caozuo')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="showDetail(scope.row)"
            >{{$t('accessSystem.xiangqing')}}</el-button>
            <!-- @click="handleEdit(scope.$index, scope.row)" -->

            <el-button
              size="mini"
              type="text"
              @click="removeRecord(scope.row)"
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
        :current-page="pageNumber"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      recordData: [],
      currentPage: 1,
      total: 1,
      dateTime: "",
      passageResult: "0,1",
      personType: "",
      divergenceType: "0,1",
      name: "",
      code: "",
      typeList: [],
      typeAll: "",
      pageNumber: 1,
      total: 1,
      pageSize: 5,
      ids: [],
      getRowKeys(row) {
        return row.id;
      },
      detailInfo: {},
      detailsDialog: false
    };
  }
};
</script>
<style lang="scss" >
#accessRecords{
  padding: 20px;
  height: 800px;
  .grid-contentFir{
  text-align: center;
  margin-top: 10px
}
.contantHeader{
  .el-input {
  width: 2.5rem;
}
}
.search{
  margin-left: 20px;
  background:rgba(76,131,255,1);
  color: white
}
.date {
  width: 6.4rem;
}
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width: 268px;
}
.select {
  width: 4rem;
  .el-input{
    width: 200px;
  }
}
#accessRecords {
  height: 800px;
  background-color: white;

}
.title {
  margin-left: 32px;
}
.contantHeader {
  font-size: 20px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(39, 39, 39, 1);

}
.contantTable {
  padding-top: 20px;
}
.pagination {
  float: right;
  margin-top: 25px;
  margin-right: 0.62rem;
}
.snapPhoto {
  width: 70px;
}
.score {
  color: red;
  font-size: 20px;
  margin-top: 100px;
}
.snapduibi {
  width: 160px;
  height: 240px;
  display: inline-block;
  margin: 0 auto;
}
.grid-content {
  text-align: left;
  margin-top: 10px;
}
.imgpreviewL {
  width: 300px;
}
.value {
  margin-left: 10px;
}
}

</style>
