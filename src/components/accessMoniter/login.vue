<template>
  <div id="accessLogin">
    <div class="header">
      <img src="../../assets/img/7620.png" alt="" />
      <span>考拉智能门禁系统</span>
    </div>
    <div class="loginContainer">
      <div class="cLeft">
        <img src="../../assets/img/平台图标.png" alt="" />
        <p
          style="font-size:42px;
font-family:PingFang SC;
color:rgba(255,255,255,1);padding:12% 0 0 12%"
        >
          门禁系统
        </p>
        <div
          style="width:30px;border:4px solid rgba(255,255,255,1);margin:23px 0 38px 12%"
        ></div>
        <p
          style="font-size:28px;
font-family:PingFang SC;
color:rgba(255,255,255,1);padding-left:12%"
        >
          欢迎登录门禁系统
        </p>
      </div>
      <div class="cRight">
        <p>帐号登录</p>
        <div class="cR1">欢迎登录门禁系统</div>
        <div class="loginGroup">
          <div class="account">
            <span class="loginLabel">用户名</span
            ><input type="text" class="loginContain" />
          </div>
           <div class="account">
            <span class="loginLabel">密码</span
            ><input type="password" class="loginContain" />
          </div>
          <div style="margin-top:43px">
             <Checkbox v-model="checked">记住密码</Checkbox>
          </div>
          <div style="margin-top:64px"><Button long style="height:50px">登录</Button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      checked:false
    }
  }
};
</script>
<style lang="scss" scoped>
#accessLogin {
  .loginGroup {
    width: 400px;
    margin: 44px auto;
  }
  .ivu-btn{
    background-color: #43425D;
    color:white
  }
  .loginLabel {
    font-size: 16px;
    font-family: PingFang SC;
    color: #43425D;
    width: 50px;
    display: inline-block
  }
  .loginContain{
    border: none;
    outline:none;
    margin-left: 50px;
  }
  .account{
    padding: 10px 0;
    border-bottom: 2px solid rgba(233,233,240,1);
  }
}
.header {
  margin: 44px 0 30px 124px;
}
.header img {
  width: 76px;
  height: 20px;
}
.header span {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 30px;
  color: rgba(67, 66, 93, 0.5);
}
.loginContainer {
  width: 87%;
  height: 740px;
  margin: 0 auto;
}
.cLeft {
  float: left;
  width: 58%;
  height: 100%;
  background: linear-gradient(
    315deg,
    rgba(102, 63, 213, 1) 0%,
    rgba(93, 201, 249, 1) 100%
  );
  box-shadow: 10px 10px 10px rgba(76, 131, 255, 0.09);
  position: relative;
}
.cLeft img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
}
.cRight {
  float: right;
  width: 42%;
  p {
    margin-top: 190px;
    text-align: center;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(67, 66, 93, 1);
    letter-spacing: 10px;
  }
  .cR1 {
    text-align: center;
    font-size: 18px;
    font-family: PingFang SC;
    color: rgba(77, 79, 92, 0.5);
  }
}
</style>

