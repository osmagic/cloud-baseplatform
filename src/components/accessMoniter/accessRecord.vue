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
          :label="item.name"
          :value="item.no"
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
              :src="imgScope.row.pictureUrl"
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
      detailsDialog: false,
      imgApi:'/api/v2/file/image-download?code=101106&objectId='
    };
  },
    created() {
    //格式化当前时间
    Date.prototype.Format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    this.dateTime = [
      new Date().Format("yyyy-MM-dd 00:00:00"),
      new Date().Format("yyyy-MM-dd 23:59:59")
    ];
    // this.netAPI = APICONFIG().get("accessSystem");
    //   this.getTypeList()
    // this.getRecordList();
    const getAll = new Promise((resolve, reject) => {
      this.$http.getPersonType().then(res => {
        if (res.data.status == 200) {
          resolve(res.data.data);
          this.typeList = res.data.data;
          for (const key in this.typeList) {
            if (this.typeList.hasOwnProperty(key)) {
              const element = this.typeList[key].no;
              this.typeAll += element + ",";
            }
          }
          console.log(this.typeAll);
          this.personType = this.typeAll;
        } else {
          this.$message.error(res.body.message);
        }
      });
    });
    getAll.then(res => {
      this.getRecordList();
    });
  },
  methods: {
    showDetail(row) {
      this.$http
        .accessPeopleDetail({ id: row.id } )
        .then(res => {
          if (res.data.status == 200) {
            this.$set(this.detailInfo, "urls", res.data.data.urls[0]);

            console.log(this.detailInfo);
          } else {
            this.$message.error(res.data.message);
          }
        });
      this.detailInfo = row;
      this.detailsDialog = true;
    },
    detailsDialogClose() {
      this.detailInfo = {};
      this.detailsDialog = false;
    },
    //表格数据格式化
    formatValidite(row, column) {
      return row.validateResult == 1
        ? this.$t('accessSystem.tongguo')
        : row.sex == 0
        ?  this.$t('accessSystem.weitongguo')
        : this.$t('accessSystem.weizhiz');
    },
    formatDivergence(row, column) {
      return row.divergenceType == 1
        ? this.$t('accessSystem.jin')
        : row.divergenceType == 0
        ? this.$t('accessSystem.chu')
        : this.$t('accessSystem.weizhiz')
    },
    exportExcel() {
      for (const key in this.multipleSelection) {
        if (this.multipleSelection.hasOwnProperty(key)) {
          const element = this.multipleSelection[key];
          this.ids += element.id + ",";
        }
      }
      console.log(this.ids);
      var params = { ids: this.ids };
      console.log(params);
      // this.$http.get(this.netAPI.accessRecords.accessExport,{params:params}).then(res=>{

      // })
      //
      this.$http({
        url: '/api/v2/door/passage-record/export',
        method: "get",
        params: params,
        responseType: "blob"
      }).then(res => {
        
        var fileName = this.$t('accessSystem.daochuwenjian');
        console.log(res);
        var blob = new Blob([res.body], { type: "application/octet-stream" });
        if (window.navigator.msSaveOrOpenBlob) {
          //msSaveOrOpenBlob方法返回bool值
          navigator.msSaveBlob(blob, fileName); //本地保存
        } else {
          var link = document.createElement("a"); //a标签下载
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          //兼容火狐
          document.body.appendChild(link);

          var evt = document.createEvent("MouseEvents");
          evt.initEvent("click", false, false);
          link.dispatchEvent(evt);
          document.body.removeChild(link);
          ///
        }
      });
      //
    },
    handleSelectionChange(val) {
      if (val.length) {
        this.multipleSelection = val;
      } else {
        this.multipleSelection = [];
      }
    },
    removeRecord(row) {
      console.log(row);
      console.log(this.multipleSelection);
      if (row.id) {
        console.log(1);
        this.ids = [{ id: row.id }];
      } else {
      
            for (const key in this.multipleSelection) {
          if (this.multipleSelection.hasOwnProperty(key)) {
            const element = this.multipleSelection[key];
            this.ids.push({ id: element.id });
          }
        }
        
        
      }
   
      if(this.ids.length==0){
          this.$message.error(this.$t('accessSystem.qingxuanzeshanchuxiang'))
        }else{
          this.$http
        .accessRemove(this.ids)
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success(this.$t('accessSystem.shanchuchenggong'));
            if (this.recordData.length == 1) {
              this.pageNumber =
                this.pageNumber - 1 > 0 ? this.pageNumber - 1 : 1;
            }
            this.getRecordList()
          }
        });
        }
      
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getRecordList();
    },
    handleCurrentChange(pageNumber) {
      this.pageNumber = pageNumber;
      this.getRecordList();
    },
    getRecordList() {
      console.log(this.dateTime);
      var params = {
        startDate: this.dateTime[0],
        endDate: this.dateTime[1],
        passageResult: this.passageResult,
        personType: this.personType,
        divergenceType: this.divergenceType,
        name: this.name,
        code: this.code,
        pageNo: this.pageNumber,
        pageSize: this.pageSize,
        // sort:"id",
        // order:"asc"
      };
      this.$http
        .accessList( params )
        .then(res => {
          if (res.data.status == 200) {
            
            this.recordData = res.data.data;
            this.total = res.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    getTypeList() {
      this.$http.findPeopleType().then(res => {
        if (res.data.status == 200) {
          this.typeList = res.data.data;
          for (const key in this.typeList) {
            if (this.typeList.hasOwnProperty(key)) {
              const element = this.typeList[key].name;
              this.typeAll += element + ",";
            }
          }
          console.log(this.typeAll);
          this.personType = this.typeAll;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
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
 
   padding: 3px 0 3px 10px
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
