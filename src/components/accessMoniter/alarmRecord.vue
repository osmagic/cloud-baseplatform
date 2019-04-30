<template>
  <div class="accessAuth">
     <!-- <div class="selectGroup">
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
      </div> -->
    
       <dialog-container :di="isDShow" top="0" @saveDialog="saveDialog" @closeDialog="closeDialog">
          <div slot="container">
              <div class="dia-content">
                <div class="dia-content-h">
                  <span class="t-tro">陌生人告警</span> 
                  <span class="s-tro">
                    <el-switch
                      v-model="diaForm.swiPush"
                      active-color="#4C83FF"
                      inactive-color="#ffffff">
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
                    <singgle-time-sel @getTime="getTime"></singgle-time-sel>
                  </div>
                </div>
              </div>
          </div>
      </dialog-container>

  </div>
</template>
<script>
import DialogContainer from './common//DialogWrapper.vue'
import singgleTimeSel from './common/singgleTimeSel.vue'

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
      nowSelTime: ''
    }
  },
  methods: {
    getTime(v) {
      console.log(v)
      this.nowSelTime = v
    },
    saveDialog() {
      this.nowSelTime = ""
    },
    closeDialog() {

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
