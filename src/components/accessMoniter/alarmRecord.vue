<template>
  <div class="accessAuth">
      <div class="selectGroup">
        <span>{{$t('accessSystem.gaojingshijian')}}</span>
       <el-date-picker
        v-model="dateTime"
        type="datetimerange"
        align="right"
        unlink-panels
         :clearable='false'
        :start-placeholder="$t('accessSystem.kaishiriqi')"
        :end-placeholder="$t('accessSystem.jieshuriqi')"
        :default-time="['12:00:00', '08:00:00']"
        value-format='yyyy-MM-dd HH:mm:ss'
        @change="consolechange"
      >
      </el-date-picker>
        <span style="margin-left:20px">{{$t('accessSystem.gaojingleixing')}}：</span>
         <el-select
        v-model="searchType"
        :placeholder="$t('accessSystem.qingxuanze')"
        clearable
      >

        <el-option
          v-for="item in typeList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
         <el-button style="margin-left:20px" class="search" @click="getAlertList">{{$t('accessSystem.chaxun')}}</el-button>
         <div class="editGroup">
           <el-button @click="ruleSet">告警规则设置</el-button>

         </div>
      </div>
      <div class="table">
           <el-table
        :data="alertData"
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
          prop="id"
          :label="$t('accessSystem.xuhao')"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          :label="$t('accessSystem.gaojingleixing')"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          :label="$t('accessSystem.gaojingshijian')"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('accessSystem.gaojingdidian')"
        >
        </el-table-column>
        <el-table-column :label="$t('accessSystem.zhuapaizhaopian')">
          <template slot-scope="imgScope">
            <img
              :src="imgScope.row.url"
              alt=""
            >

          </template>
        </el-table-column>
        <el-table-column
          prop="person.name"
          :label="$t('accessSystem.xingming')"
        >
        </el-table-column>
        <el-table-column :label="$t('accessSystem.caozuo')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="getAlertDetail(scope.row)"
            >{{$t('accessSystem.xiangqing')}}</el-button>
            <!-- @click="handleEdit(scope.$index, scope.row)" -->

            <el-button
              size="mini"
              type="text"
              @click="deleteAlert(scope.row)"
            >{{$t('accessSystem.shanchu')}}</el-button>
            <!-- @click="handleDelete(scope.$index, scope.row)" -->
          </template>
        </el-table-column>
      </el-table>
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
    
       <dialog-container :di="isDShow" top="0" @saveDialog="saveDialog" @closeDialog="closeDialog">
          <div slot="container">
              <div class="dia-content">
                <div class="dia-content-h">
                  <span class="t-tro">陌生人告警</span> 
                  <span class="s-tro">
                    <el-switch
                      v-model="diaForm.swiPush"
                     
                      :active-value='1'
                      :inactive-value='0'
                     >
                    </el-switch>
                  </span>
                  <span class="c-tro">
                    关闭后, 系统将不再推送该类型告警消息
                  </span>
                </div>

                <div class="dia-content-time">
                  <div class="t-tro">
                    告警时间段设置
                  </div>
                  <div class="c-com">
                    <singgle-time-sel @getTime="getTime" :setWeekTime='setWeekTime'></singgle-time-sel>
                  </div>
                </div>
              </div>
          </div>
      </dialog-container>

  </div>
</template>
<script>
import DialogContainer from './common//DialogWrapper.vue'
import singgleTimeSel from './common/singgleTimeSel'

export default {
  components: {
    DialogContainer,
    singgleTimeSel
  },
  data() {
    return {
      diaForm: {
        swiPush: true  
      },
      isDShow: {
          Visible: false,
          Title: '告警规则设置',
          Width: '574px',
          isshowfooter: true
      },
      nowSelTime: '',
        value: "",
      value5: "",
      certainTime: "",
      dateTime: "",
      tableData: [],
      alertData: [],
      typeList: [],
      searchType: "",
      deviceAddress: "",
      alertIds: [],
      multipleSelection: [],
      pageSize: 5,
      total: 1,
      pageNumber: 1,
      detailInfo: {},
      getRowKeys(row) {
        return row.id;
      },
      ruleTime:'',
      setWeekTime:{mon: "00:00-24:00",},
      isEdit:false,
      id:''
    }
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
    console.log(this.dateTime);
    // //
    // this.netAPI = APICONFIG().get("accessSystem");
    this.getAlertList();
    this.getAlertType();
    this.getAlertRule()
  },
  methods: {
    ruleSet(){
      this.isDShow.Visible = true
    },
    getAlertRule(){
      this.$http.getAlertSet().then(res=>{
        if(res.data.status==200){
         this.diaForm.swiPush = res.data.data[0].stranger;
         this.setWeekTime = {mon:res.data.data[0].timeInterval};
        this.id = res.data.data[0].id;
         if(res.data.data.length>0){
           this.isEdit = true
         }
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    getTime(v) {
      console.log(v)
      this.ruleTime = v.mon
      console.log(this.ruleTime)
      // var time = ''
    
      // this.ruleTime = time
    },
    saveDialog() {
      if(this.ruleTime==''){
        this.ruleTime=this.setWeekTime.mon
      }
      if(this.isEdit == false){
        this.$http.alertSetAdd({timeInterval:this.ruleTime,stranger:this.diaForm.swiPush}).then(res=>{
        if(res.data.status == 200){
          this.$message.success(res.data.message)
        }else{
           this.$message.error(res.data.message)
        }
      })
      }else{
        this.$http.alertSetModify({timeInterval:this.ruleTime,stranger:this.diaForm.swiPush,id:this.id}).then(res=>{
          if(res.data.status == 200){
            this.$message.success(res.data.message)
          }else{
            this.$message.error(res.data.message)
          }
        })
      }
      
      this.nowSelTime = ""
       this.ruleTime = ''
       this.isDShow.Visible = false
    },
    closeDialog() {
      this.isDShow.Visible = false
    },
      getAlertDetail(row) {
      this.detailsDialog = true;
      this.detailInfo = row;
      if (row.type == "黑名单闯入告警") {
        console.log("查询人员");
        this.$http
          .accessPeopleDetail( { id: row.person.id }
          )
          .then(res => {
            if (res.data.status == 200) {
              console.log(res.data.data.code, res.data.data.name);
              this.$set(this.detailInfo, "code", res.data.data.code);
              this.$set(this.detailInfo, "personName", res.data.data.name);
              this.$set(this.detailInfo, "urls", res.data.data.urls[0]);
              this.$set(this.detailInfo, "code", res.data.data.code);

              console.log(this.detailInfo);
            } else {
              this.$message.error(res.data.message);
            }
          });
      }

      console.log(this.detailInfo);
    },
    detailsDialogClose() {
      this.detailInfo = {};
      this.detailsDialog = false;
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getAlertList();
    },
    handleCurrentChange(pageNumber) {
      this.pageNumber = pageNumber;
      this.getAlertList();
    },
    //多选数据收集
    handleSelectionChange(val) {
      console.log(val);
      if (val.length) {
        this.multipleSelection = val;
      } else {
        this.multipleSelection = [];
      }
    },
    deleteAlert(row) {
      if (!row.id && this.multipleSelection.length < 1) {
        this.$message.warning(this.$t('accessSystem.qingxuanzeshanchuxiang'));
      } else {
        
        if (row.id) {
          this.alertIds = [{ id: row.id }];
         
        } else {
          for (const key in this.multipleSelection) {
            if (this.multipleSelection.hasOwnProperty(key)) {
              const element = this.multipleSelection[key];
              this.alertIds.push({id:element.id});
            }
          }
        }
        console.log(this.alertIds);
        this.$http
          .alertRemove(this.alertIds)
          .then(res => {
            if (res.data.status == 200) {
              this.$message.success(this.$t('accessSystem.shanchuchenggong'));
              if (this.alertData.length == 1) {
                this.pageNumber =
                  this.pageNumber - 1 > 0 ? this.pageNumber - 1 : 1;
              }
              this.getAlertList();
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
    //告警类型查询
    getAlertType() {
      this.$http.alertType().then(res => {
        if (res.data.status == 200) {
          this.typeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    consolechange() {
      console.log(this.dateTime);
    },
    getAlertList() {
      if(this.dateTime ==null){
         var params = {
       
        types: this.searchType,
        address: this.deviceAddress,
        pageNo: this.pageNumber,
        pageSize: this.pageSize,
        sort: "id",
        order: "asc"
      };
      }else{
        var params = {
        startTime: this.dateTime[0],
        endTime: this.dateTime[1],
        types: this.searchType,
        address: this.deviceAddress,
        pageNo: this.pageNumber,
        pageSize: this.pageSize,
        sort: "id",
        order: "asc"
      };
      }
      
      this.$http
        .alertList( params )
        .then(res => {
          if (res.data.status == 200) {
            this.alertData = res.data.data;
            this.total = res.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.accessAuth{
  padding: 20px;
}
.selectGroup{
  span{
    font-size:14px;
font-family:PingFang SC;
font-weight:400;
color:rgba(77,79,92,1);
margin-right: 20px;
  }
}

.searchI{
  width: 200px;
}
.searchB{
  background:rgba(76,131,255,1);
  color: white;
  margin-left: 20px;
}
.editGroup{
  display: inline-block;
  float: right;
}
.table{
  height: 850px;
  margin-top: 20px;
}
.dia-content {
  .dia-content-h {
    line-height: 34px;
    margin-top: 12px;
    .t-tro {
      margin-left: 27px;
      margin-right: 12px;
    }
    .c-tro {
      display: inline-block;
      width: 230px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color:rgba(230,81,0,1);
      background:rgba(255,159,0,0.16);
    } 
    
  }
  .dia-content-time {
    display: flex;
    line-height: 34px;
    .t-tro {
      flex: 2;
    }
    .c-com {
      flex: 8;
    }
    .s-tro {
      margin-right: 5px;
    }
   
    
  }
}
</style>
