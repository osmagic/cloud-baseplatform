<template>
  <el-card class="operationLogs">
    <div class="head">
      <p>操作日志</p>
    </div>
    <div class="operation">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="flexCon">
            <span>事件时间</span>
            <el-date-picker
              v-model="dataPick"
              type="daterange"
              value-format='yyyy-MM-dd'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="flexCon">
            <span>管理员账号</span>
            <el-input v-model="adminAccount" placeholder="请输入管理员账号"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="flexCon">
            <span>主功能</span>
            <el-input v-model="mainFunc" placeholder="请输入主功能"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="">
            <el-button type="primary" @click="getOperationLogs">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="310">
        </el-table-column>
        <el-table-column
          prop="timestamp"
          label="事件时间"
          width="310">
        </el-table-column>
        <el-table-column
          prop="adminUsername"
          label="管理员账户"
          width="310">
        </el-table-column>
        <el-table-column
          prop="op"
          label="主功能"
          width="310">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="具体操作">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name: "operationLogs",
    data() {
      return {
        dataPick: '',
        adminAccount: '',
        mainFunc: '',
        tableData: [],
        
      }
    },
    created(){
      this.getOperationLogs()
    },
    methods:{
      getOperationLogs(){
        var form = {
          startDate:this.dataPick[0],
          endDate:this.dataPick[1],
          op:this.mainFunc,
          adminUsername:this.adminAccount
        }
        this.$http.getOperationLogs(form).then(res=>{
          if(res.data.status == 200){
            this.tableData = res.data.data
          }else{
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .operationLogs {
    height: 86vh;
    width: 100%;
    position: relative;
    .el-pagination{
      position: absolute;
      bottom: 10px;
      left: 0;
      margin-left: calc(50% - 205px);
    }
  }

  .head {
    width: 100%;
    height: 30px;
    text-align: left;
    font-size: 20px;
    line-height: 30px;
    position: relative;
    left: -20px;
    p {
      margin-left: 30px;
    }
    p:before {
      content: '';
      position: absolute;
      left: 0px;
      width: 10px;
      height: 30px;
      background-color: #4383DC;
    }
  }
  .flexCon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      white-space:nowrap;
      margin-right: 10px;
    }
  }

  .el-row {
    margin-bottom: 20px;
    margin-top: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<style>
  .operationLogs .el-range-separator{
    width: 8%;
  }
</style>
