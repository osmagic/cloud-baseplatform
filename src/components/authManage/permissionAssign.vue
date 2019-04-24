<template>
  <el-card class="operationLogs">
    <div class="head">
      <p>权限分配</p>
    </div>
    <div class="operation">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="flexCon">
            <span>账号</span>
           <el-input v-model="account" placeholder="请输入账号"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="flexCon">
            <span>账户角色</span>
            <el-select v-model="accountRole" placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="flexCon">
            <span>状态</span>
            <el-select v-model="state" placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="">
            <el-button type="primary">查询</el-button>
          </div>
        </el-col>
        <el-col :span="2" :offset="4">
          <div class="">
            <el-button disabled>批量开启</el-button>
          </div>
        </el-col>
        <el-col :span="2" >
          <div class="">
            <el-button disabled>批量停用</el-button>
          </div>
        </el-col>
        <el-col :span="2" >
          <div class="">
            <el-button>新增账号</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="num"
          label="序号"
          width="210">
        </el-table-column>
        <el-table-column
          prop="account"
          label="登录账户"
          width="210">
        </el-table-column>
        <el-table-column
          prop="affiliateTo"
          label="所属租户"
          width="210">
        </el-table-column>
        <el-table-column
          prop="roles"
          label="账号角色"
          width="200">
        </el-table-column>
        <el-table-column
          prop="accountState"
          label="账号状态"
          width="210">
        </el-table-column>
        <el-table-column
          label="角色操作"
          width="210">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">授权角色</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
          </template>
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
    name: "permissionAssign",
    data() {
      return {
        account: '',
        accountRole: '',
        state: '',
        stateOptions: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        roleOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        tableData: [{
          num: '1',
          account: 'admin',
          affiliateTo: '深圳公安局',
          roles: '超级管理',
          accountState: ' 启用',
        }, {
          num: '2',
          account: 'admin',
          affiliateTo: '深圳公安局',
          roles: '超级管理',
          accountState: ' 启用',
        }, {
          num: '3',
          account: 'admin',
          affiliateTo: '深圳公安局',
          roles: '超级管理',
          accountState: ' 启用',
        }, {
          num: '4',
        account: 'admin',
        affiliateTo: '深圳公安局',
        roles: '超级管理',
        accountState: ' 启用',
        }],
        multipleSelection:[],
      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
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

</style>
