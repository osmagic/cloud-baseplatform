<template>
  <div id="accessDevice">
    <div class="groupAside">
      <div class="asideT">门禁设备分组</div>
      <div class="group">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </div>
    <div class="deviceContain">
      <div class="selectGroup">
        <span>进出类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option key="1" label="进" value="in"> </el-option>
        </el-select>
        <span style="margin-left:20px">门禁状态</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option key="1" label="开启" value="true"> </el-option>
        </el-select>
         <el-button style="margin-left:20px" class="search">查询</el-button>
         <div class="editGroup">
           <el-button >新增门禁设备</el-button>
           <el-button >批量删除</el-button>
           <el-button >批量设置</el-button>
           <el-button >消防开门</el-button>
         </div>
      </div>
      <div class="table" style="margin-top:20px">
        <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
      type="index"
      width="50"
      label='序号'>
    </el-table-column>
      <el-table-column
        prop="date"
        label="设备名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="进出类型">
      </el-table-column>
      <el-table-column
        prop="address"
        label="门禁状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="关联人员">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">一键开门</el-button>
        <el-button type="text" size="small">设置</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:[],
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.asideT {
  font-size: 16px;
  font-family: PingFang SC;
  color: rgba(77, 79, 92, 1);
  padding: 17px 20px;
  border-bottom: 2px solid rgba(77, 79, 92, 0.1);
}
.editGroup{
  display: inline-block;
  float: right;
}
.groupAside {
  float: left;
  width: 13%;
  height: 960px;
  border-right: 1px solid rgba(77, 79, 92, 0.1);
}
.group {
  margin: 20px 0 0 20px;
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
.deviceContain{
  margin-left: 20px;
  float: left;
  width: 85%
}
.search{
  background:rgba(76,131,255,1);
  color: white
}
</style>
