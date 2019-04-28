<template>
  <div class="accessAuth">
    <div class="selectGroup">
       <el-input v-model="input" placeholder="请输入内容" class="searchI"></el-input>
        <el-button class="searchB">查询</el-button>
        <div class="editGroup">
          <el-button >新增权限组</el-button>
          <el-button >批量删除权限组</el-button>
        </div>
      </div>
      <div class="table">
           <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column
      type="selection"
      width="40">
    </el-table-column>
     <el-table-column
      type="index"
      width="50"
      label='序号'>
    </el-table-column>
      <el-table-column
        prop="date"
        label="权限组名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="关联人员"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="可通行设备">
      </el-table-column>
      <el-table-column
        prop="address"
        label="允许通行时间">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑权限组</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
      </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.accessAuth{
  padding: 20px;
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
</style>
