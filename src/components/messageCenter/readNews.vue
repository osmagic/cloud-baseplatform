<template>
  <div>
    <div>//=========（已读消息）原型未出========</div>
    <el-table
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
        width="100">
      </el-table-column>
      <el-table-column
        prop="newsType"
        label="消息类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newsContent"
        label="消息内容">
      </el-table-column>
      <el-table-column
        prop="newsSender"
        label="发送人">
      </el-table-column>
      <el-table-column
        prop="receivedTime"
        label="接收时间">
      </el-table-column>
      <el-table-column
        prop="newsState"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="handler"
        label="处理人">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">设置为已处理</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "readNews",
    data(){
      return{
        tableData: [{
          num: '1',
          newsType: '平台预警',
          newsContent: '消息内容',
          newsSender:'sshAdmin',
          receivedTime:'2019-04-28',
          newsState:'已处理',
          handler:'admin',
        }, {
          num: '2',
          newsType: '设备预警',
          newsContent: '消息内容',
          newsSender:'sshAdmin',
          receivedTime:'2019-04-28',
          newsState:'待处理',
          handler:'admin',
        }, {
          num: '3',
          newsType: '管理员申请',
          newsContent: '消息内容',
          newsSender:'sshAdmin',
          receivedTime:'2019-04-28',
          newsState:'未处理',
          handler:'admin',
        }, {
          num: '4',
          newsType: '访客申请',
          newsContent: '消息内容',
          newsSender:'sshAdmin',
          receivedTime:'2019-04-28',
          newsState:'已处理',
          handler:'admin',
        }]
      }
    },
  }
</script>

<style scoped>

</style>
