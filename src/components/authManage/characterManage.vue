<template>
  <el-card class="characterManage">
    <div class="head">
      <p>角色管理</p>
      <el-button>创建角色</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="num"
        label="序号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="characterName"
        label="角色名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="characterDepict"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name: "characterManage",
    data(){
      return{
        tableData: [{
          num: '1',
          characterName: '王小虎',
          characterDepict: '上海市普陀区金沙江路 1518 弄',
        }, {
          num: '2',
          characterName: '王小虎',
          characterDepict: '上海市普陀区金沙江路 1518 弄',
        }, {
          num: '3',
          characterName: '王小虎',
          characterDepict: '上海市普陀区金沙江路 1518 弄',
        }, {
          num:'3',
          characterName: '王小虎',
          characterDepict: '上海市普陀区金沙江路 1518 弄',
        }]
      }
    },
  }
</script>

<style scoped lang="scss">
  .characterManage {
    height: 86vh;
    width: 100%;
    position: relative;
    .el-pagination{
      position: absolute;
      bottom: 10px;
      left: 0;
      margin-left: calc(50% - 205px);
    }
    .head {
      width: 100%;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      p {
        margin-left: 10px;
      }
      p:before {
        content: '';
        position: absolute;
        left: -20px;
        width: 10px;
        height: 30px;
        top: 5px;
        background-color: #4383DC;
      }
    }
  }
</style>
