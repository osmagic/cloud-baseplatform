<template>
  <div class="accessAuth">
     <div class="selectGroup">
        <span>告警时间</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option key="1" label="进" value="in"> </el-option>
        </el-select>
        <span style="margin-left:20px">告警类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option key="1" label="开启" value="true"> </el-option>
        </el-select>
         <el-button style="margin-left:20px" class="search">查询</el-button>
         <div class="editGroup">
           <el-button >告警规则设置</el-button>

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
        label="告警类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="告警时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="告警地点">
      </el-table-column>
      <el-table-column label="抓拍照片">
          <template slot-scope='imgScope'>
            <img
              :src="imgScope.row.snapPhoto"
              alt=""
              class='snapPhoto'
            >
          </template>
        </el-table-column>
         <el-table-column
        prop="address"
        label="姓名">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
</style>
