<template>
    <el-card class="operationLogs">
      <div class="head">
        <p>操作日志</p>
      </div>
      <div class="operation">
        <div>
          <div>
            <span>事件时间</span>
            <el-date-picker
              v-model="dataPick"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div>
            <span>管理员账号</span>
            <el-input v-model="adminAccount" placeholder="请输入管理员账号"></el-input>
          </div>

          <div>
            <span>主功能</span>
            <el-input v-model="mainFunc" placeholder="请输入主功能"></el-input>
          </div>
        </div>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "operationLogs",
      data(){
          return{
            dataPick:'',
            adminAccount:'',
            mainFunc:'',
          }
      }
    }
</script>

<style scoped lang="scss">
  .operationLogs{
    height: 100%;
    width: 100%;
  }
  .head{
    width: 100%;
    height: 30px;
    text-align: left;
    font-size: 20px;
    line-height: 30px;
    position: relative;
    left: -20px;
    p{
      margin-left: 30px;
    }
    p:before{
      content: '';
      position: absolute;
      left: 0px;
      width: 10px;
      height: 30px;
      background-color: #4383DC;
    }
  }
  .operation{
    margin: 20px 0;
  }
</style>
