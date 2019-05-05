<template>
  <div id="accessIndex">
    <el-container>
      <el-header>
        <img src="../../assets/img/7620.png" alt="" />
        <span class="name">考拉智能门禁系统</span>
        <span class="exit">
          退出登录
        </span>
      </el-header>
      <el-container>
        <el-aside width="244px">
          <Menu active-name="1" width="244px">
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
    };
  },
};
</script>
<style scoped>
#echarts {
  height: 330px;

  margin: 76px 0 0 0;
}
.charts {
  clear: both;
  font-weight: 500;
  height: 540px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(211, 211, 211, 1);
  border-radius: 5px;
  margin-top: 0.32rem;
}
.round {
  width: 2rem;
  height: 0.68rem;
  border: 1px solid rgba(203, 203, 203, 1);
  border-radius: 0.34rem;
  text-align: center;
  vertical-align: middle;
  line-height: 0.68rem;
  margin: 0 auto;
  margin-top: 0.74rem;
  color: rgba(132, 132, 132, 1);
}
.box {
  font-size: 0.28rem;
  flex: 1;
  text-align: center;
  margin-top: 16px;
}
.number {
  font-size: 1.2rem;
  font-family: PingFang-SC-Bold;
  /* font-weight:bold; */
  color: rgba(39, 39, 39, 1);
  line-height: 36px;
}
.box1 {
  margin-left: 0 !important;
}
.dateSelect {
  margin-top: 0.2rem;
  font-size: 0.4rem;
  font-family: "PingFang SC";
  font-weight: 500;
}
.datepick {
  margin-left: 140px;
}
.line {
  background: rgba(203, 203, 203, 1);

  border: 1px solid rgba(203, 203, 203, 1);
  opacity: 0.5;
  margin-top: 10px;
}
.btn {
  box-shadow: 0px 5px 6px 0px rgba(179, 209, 241, 1);
  margin-left: 13px;
}
.acount {
  display: flex;
  height: 220px;
  margin-top: 16px;
}
.ac_contain {
  flex: 1;
  background-color: white;
  margin-left: 17px;
  box-shadow: 0px 2px 10px 0px rgba(211, 211, 211, 1);
  border-radius: 5px;
}
p {
  font-size: 0.4rem;
  font-family: PingFang-SC;
  font-weight: 500;

  margin-left: 0.4rem;
  color: rgba(39, 39, 39, 1);
}
</style>
