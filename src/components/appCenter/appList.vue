<template>
  <el-card class="appList">
    <div class="head">
      <p>应用列表</p>
    </div>
    <div class="appList-inner">
      <div class="container">
        <div class="leftBox" @click="toAccess">
          <div class="textBox">
            <img src="./../../assets/img/door.png" alt="门禁系统">
            <div>
              <h2>门禁系统</h2>
              <p>应用描述，应用描述，应用描述,应用描述，应用描述，应用描述,应用描述，应用描述，应用描述,应用描述，应用描述，应用描述</p>
            </div>
          </div>
          <div class="btns">
            <div>应用详情</div>
            <div>移除应用</div>
          </div>
        </div>
        <div class="rightBox">
          <div class="innerRight">
            <i class="el-icon-plus"></i>
            <span>添加应用</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'appList',
    data() {
      return {}
    },
    methods:{
      toAccess(){
        this.$router.push('/accessMonitor/index')
      }
    }
  }
</script>

<style scoped lang="scss">
.leftBox{
  cursor: pointer;
}
  .appList {
    height: 86vh;
    width: 100%;
    position: relative;
    &-inner {
      position: absolute;
      width: 97%;
      height: 86%;
      top: 80px;
      /*装左右两个大盒子的容器*/
      .container {
        display: flex;
        justify-content: space-between;
        width: 49%;
        /*左边盒子*/
        .leftBox {
          width: 370px;
          height: 175px;
          border: 1px solid #E9E9E9;
          position: relative;
          /*内部上下布局，文字和图片盒子*/
          .textBox {
            display: flex;
            justify-content: space-between;
            width: 90%;
            h2{
              margin-top: 5px;
            }
            img {
              width: 60px;
              height: 60px;
            }
          }
          /*内部上下布局，底部按钮盒子*/
          .btns{
            position: absolute;
            width: 100%;
            height: 40px;
            bottom: 0;
            background-color: #E9E9E9;
            display: flex;
            justify-content: space-around;
            line-height: 40px;
            color: #596f7d;
            div{
              width: 49.8%;
              text-align: center;
            }
            div:hover{
              color: #2B333E;
              cursor: pointer;
            }
            /*中间分割线*/
            &:after{
              content: '';
              position: absolute;
              top: 7px;
              width: 0.5px;
              height: 26px;
              border: 1px dashed #DBDBDB;
            }
          };
        }
        /*右边盒子*/
        .rightBox {
          width: 370px;
          height: 175px;
          border: 1px dashed #E9E9E9;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            border: 1px dashed #4C83FF;
          }
          .innerRight{
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:hover{
              cursor: pointer;
            }
          }
        }
      ;
      }
    }
    /*大标题样式*/
    .head {
      width: 100%;
      height: 30px;
      text-align: left;
      font-size: 20px;
      line-height: 30px;
      position: relative;
      left: -20px;
      p {
        margin-left: 30px;
      }
      p:before {
        content: '';
        position: absolute;
        left: 0px;
        width: 10px;
        height: 30px;
        background-color: #4383DC;
      }
    }
  }
</style>
