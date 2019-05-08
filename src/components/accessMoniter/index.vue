<template>
  <div id="accessIndex">
    <el-container>
      <el-header>
        <img src="../../assets/img/7620.png" alt="" />
        <span class="name">考拉智能门禁系统</span>
        <span class="exit" @click="toIndex">
          退出登录
        </span>
      </el-header>
      <el-container>
        <el-aside width="244px">
          <Menu :active-name="activeName" width="244px">
            <MenuItem name="1" style="margin:20px 0 10px 0" to="/accessMonitor/index">
              <Icon type="md-document" />
              主页
            </MenuItem>
            <div class="line"></div>
            <MenuGroup title="门禁系统管理">
              <MenuItem name="2" to="/accessMonitor/accessDevice">
                <Icon type="md-document" />
                门禁设备
              </MenuItem>
              <MenuItem name="3" to="/accessMonitor/accessAuth">
                <Icon type="md-chatbubbles" />
                门禁权限
              </MenuItem>
              <MenuItem name="4" to="/accessMonitor/accessRecord">
                <Icon type="md-chatbubbles" />
                通行记录
              </MenuItem>
              <MenuItem name="5" to="/accessMonitor/alarmRecord">
                <Icon type="md-chatbubbles" />
                告警记录
              </MenuItem>
            </MenuGroup>
          </Menu>
          <div class="line"></div>
        </el-aside>
        <el-main>
           <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import APICONFIG from "../../../../../../config/api.js";

export default {
  data() {
    return {
      activeName: '1'
    };
  },
  methods:{
    toIndex(){
      this.$router.push('/appList')
    }
  },
  mounted() {
    let path = this.$route.path
    console.log(path)
    switch(path) {
      case '/accessMonitor/index':
        this.activeName = '1'
        break;
      case '/accessMonitor/accessDevice':
        this.activeName = '2'
        break;
      case '/accessMonitor/accessAuth':
        this.activeName = '3'
        break;
      case '/accessMonitor/accessRecord':
        this.activeName = '4'
        break;
      case '/accessMonitor/alarmRecord':
        this.activeName = '5'
        break;
    }
  }
};
</script>
<style lang="scss" >
#accessIndex {
  .name {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(77, 79, 92, 0.5);
  }
  .line {
    margin: 0 auto;
    width: 204px;
    height: 0px;
    border: 1px solid rgba(77, 79, 92, 0.1);
  }
  .el-main{
    margin-left: 244px
  }
  .el-aside {
    position: absolute;
    top: 0;
    bottom: 0;
     border-right: 1px solid rgba(77,79,92,0.2);
    overflow:visible
  }
  .el-container {
    position: relative;
  }
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    display: none;
  }
  .el-header {
    padding: 15px 30px;
    height: 60px;
    border-bottom: 1px solid rgba(77, 79, 92, 0.1);
  }
  .ivu-menu-item-selected {
    background: #4c83ff;
    color: white;
  }
  .ivu-menu-vertical .ivu-menu-item-group-title {
    color: #4d4f5c;
  }
  .ivu-menu-item {
    padding: 10px 24px;
  }
  .exit {
    font-size: 14px;
    font-family: PingFang SC;
    color: rgba(77, 79, 92, 1);
    float: right;
    cursor: pointer;
  }
}
</style>