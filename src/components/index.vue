<template>
  <div id="index">
    <el-container>
      <el-header>
        <div style="width:100%;height:100%">
          <img src="../assets/img/新logouran.png" alt style="width:76px;height:20px">
          <span class="logoname">考拉悠然科技</span>
          <div class="Hright">
            <div class="headerBtn" style="margin-right:30px">
              <el-popover placement="bottom" width="316" trigger="click">
                <div class="messageH">未读({{messageList.length}}条)</div>
                <div class="hMessageList">
                  <div class="hMessageListItem" v-for="(item,index) in messageList" :key="index">
                    <div class="itemL">
                      <img src="../assets/img/组 1051.png" alt="">
                    </div>
                    <div class="itemR">
                      <div class="itemRH"><span>{{item.eventName}}</span><span style="color:rgba(43,51,62,0.5);">{{item.eventDetail}}</span></div>
                      <div class="itemRB">{{item.eventTime}}</div>
                    </div>
                  </div>
                </div>
                <div class="messageF" @click="readAll">全部设置为已读</div>
                <img src="../assets/img/组 935.png" alt class="btnIcon" slot="reference">
              </el-popover>
            </div>
            <div class="headerBtn">
              <img src="../assets/img/组 282.png" alt class="btnIcon">
            </div>
            <div style="float:right">
              <Dropdown style="margin-left: 17px;">
                <a href="javascript:void(0)">
                  Avatar
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>修改密码</DropdownItem>
                  <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="avaterD">
              <img src="../assets/img/QQ截图20190125174844.png" alt class="avater">
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="256px">
          <Menu theme="dark" active-name="1-2" :open-names="['1']" width="256px">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-analytics"/>工作台
              </template>

              <MenuItem name="1-1" to="/indexPage">主页</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-filing"/>设备管理
              </template>
              <MenuItem name="2-1" to="/deviceList">设备列表</MenuItem>
              <MenuItem name="2-2" to="/deviceManager">设备管理员</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-cog"/>人员管理
              </template>
              <MenuItem name="3-1" to="/peopleList">人员列表</MenuItem>
              <MenuItem name="3-2" to="/peopleType">人员类型</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-cog"/>数据管理
              </template>
              <MenuItem name="4-1" to="/operationLogs">操作日志</MenuItem>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-cog"/>权限管理
              </template>
              <MenuItem name="5-1" to="/deptManagement">单位管理</MenuItem>
              <MenuItem name="5-2" to="/comshow">单位展示</MenuItem>
              <MenuItem name="5-3" to="/characterManage">角色管理</MenuItem>
              <MenuItem name="5-4" to="/permissionAssign">权限分配</MenuItem>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="ios-cog"/>消息中心
              </template>
              <MenuItem name="6-1" to="/myMessage">我的消息</MenuItem>
            </Submenu>
            <Submenu name="7">
              <template slot="title">
                <Icon type="ios-cog"/>应用中心
              </template>
              <MenuItem name="7-1" to="/appList">应用列表</MenuItem>
            </Submenu>
          </Menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      messageList:[],

    }
  },
  created(){
    this.$http.getMessage({readStatus:0}).then(res=>{
      if(res.data.status==200){
        this.messageList = res.data.data
        console.log(this.messageList)
    var ws = new WebSocket("ws://192.168.2.181:18082/websocket/message");
    ws.onopen = function() {
      // Web Socket 已连接上，使用 send() 方法发送数据
     
    };

    ws.onmessage = function(evt) {
     
       this.messageList.unshift( JSON.parse(evt.data))
    };

    ws.onclose = function() {
      // 关闭 websocket
      alert.log("连接已关闭...");
    };
      }
    })
   
  },
  mounted(){

  },
  methods:{
    getMessage(){
       this.$http.getMessage({readStatus:0}).then(res=>{
         if(res.data.status==200){
            this.messageList = res.data.data
         }else{
           this.$message.error(res.data.message)
         }
           
       })
    },
    readAll(){
      for (let index = 0; index < this.messageList.length; index++) {
        const element = this.messageList[index];
        element.readStatus = 1
        this.$http.changeMassage(element).then(res=>{
        if(res.data.status == 200){
         
        }
      })
      
      }
       this.getMessage()
    }
  }
};
</script>
<style lang="scss">
.el-popper[x-placement^="bottom"] {
  padding: 0 0;
}
.messageH {
  height: 41px;
  background: rgba(247, 247, 247, 1);
  text-align: center;
  font-size: 16px;
  line-height: 40px;
}
.hMessageList {
  height: 323px;
  overflow-y: auto;
}
.messageF{
  height:40px ;
  font-size:12px;
font-family:PingFang SC;
color:rgba(76,131,255,1);
text-align: center;
background:rgba(247,247,247,1);
line-height:40px
}
.hMessageListItem{
  padding: 20px 37px 20px 10px;
  overflow: hidden;
  .itemL{
    float: left;
    margin-right: 10px
  }
  .itemR{
    float: left;
    font-size: 13px;
    .itemRB{
      margin-top: 7px;
    }
  }
}
#index {
  .el-main {
    padding: 30px;
    height: 1020px;
    background: #f5f8fc;
    overflow: visible;
    margin-left: 256px;
  }
  .el-container {
    position: relative;
  }
  .el-header {
    background: rgba(53, 63, 77, 1);
    padding: 0 30px;
    line-height: 60px;
  }
  .el-aside {
    position: absolute;
    top: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(43, 51, 62, 1) 0%,
      rgba(54, 64, 77, 1) 100%
    );
  }
  .ivu-dropdown-rel a {
    color: rgba(255, 255, 255, 0.7);
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #252c35;
  }
  .ivu-menu-item {
    background: #252c35;
  }
  .ivu-menu-submenu-title {
    background: #2f3844;
  }
  .avater {
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }
  .avaterD {
    float: right;
    margin: 6px 0px 6px 30px;
    width: 48px;
    height: 48px;
  }
  .logoname {
    font-size: 22px;
    font-family: PingFang SC;
    color: rgba(255, 255, 255, 1);
  }
  .Hright {
    float: right;
    display: inline-block;
  }
  .headerBtn {
    margin-top: 12px;
    width: 36px;
    height: 36px;
    background: rgba(53, 63, 77, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    opacity: 1;
    border-radius: 18px;
    display: inline-block;
    position: relative;
  }
  .btnIcon {
    width: 14px;
    height: 16px;
    left: 50%;
    top: 50%;
    margin: -8px 0 0 -7px;
    display: block;
    position: absolute;
    cursor: pointer;
  }
}
</style>
