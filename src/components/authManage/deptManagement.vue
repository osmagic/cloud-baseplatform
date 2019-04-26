<template>
  <el-card class="deptManagement">
    <div class="head">
      <p>单位管理</p>
    </div>
    <div class="content">
      <div class="innerCont">
        <div class="item">
          <span>顶部logo</span>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="item">
          <span>单位名称</span>
          <el-input placeholder="请输入单位名称" style="width: 300px"></el-input>
        </div>
          <div class="item">
            <span>主页logo</span>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        <div class="item">
          <span>公司标语</span>
          <el-input placeholder="请输入公司标语" style="width: 300px"></el-input>
        </div>
        <div class="item">
          <span>公司简介</span>
          <el-input placeholder="请输入公司简介" style="width: 300px" type="textarea"></el-input>
        </div>

        <div class="imgOuter">
          <span>上传场景图</span>
          <div class="imgBox">
            <div class="imgGroup">
              <div class="imgDiv">
                <el-carousel height="200px" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="(item,key) in imgArr" :key="key">
                    <!--<img :src="item.url" alt="">-->
                    <img src="./../../assets/img/pic.png" alt="">
                  </el-carousel-item>
                </el-carousel>
                <!--<img src="./../../assets/img/pic.png" alt="">-->
                <span class="views">全景</span>
                <p>宿舍</p>
                <p style="color: #99a9bf">描述内容</p>
                <div class="btmIcon">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div class="imgDiv">
                <el-carousel height="200px" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="(item,key) in imgArr" :key="key">
                    <!--<img :src="item.url" alt="">-->
                    <img src="./../../assets/img/pic.png" alt="">
                  </el-carousel-item>
                </el-carousel>
                <!--<img src="./../../assets/img/pic.png" alt="">-->
                <span class="views">全景</span>
                <p>宿舍</p>
                <p style="color: #99a9bf">描述内容</p>
                <div class="btmIcon">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div class="imgDiv">
                <el-carousel height="200px" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="(item,key) in imgArr" :key="key">
                    <!--<img :src="item.url" alt="">-->
                    <img src="./../../assets/img/pic.png" alt="">
                  </el-carousel-item>
                </el-carousel>
                <!--<img src="./../../assets/img/pic.png" alt="">-->
                <span class="views">全景</span>
                <p>宿舍</p>
                <p style="color: #99a9bf">描述内容</p>
                <div class="btmIcon">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div class="imgDiv">
                <el-carousel height="200px" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="(item,key) in imgArr" :key="key">
                    <!--<img :src="item.url" alt="">-->
                    <img src="./../../assets/img/pic.png" alt="">
                  </el-carousel-item>
                </el-carousel>
                <!--<img src="./../../assets/img/pic.png" alt="">-->
                <span class="views">全景</span>
                <p>宿舍</p>
                <p style="color: #99a9bf">描述内容</p>
                <div class="btmIcon">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div class="imgDiv">
                <el-carousel height="200px" arrow="always" indicator-position="none">
                  <el-carousel-item v-for="(item,key) in imgArr" :key="key">
                    <!--<img :src="item.url" alt="">-->
                    <img src="./../../assets/img/pic.png" alt="">
                  </el-carousel-item>
                </el-carousel>
                <!--<img src="./../../assets/img/pic.png" alt="">-->
                <span class="views">全景</span>
                <p>宿舍</p>
                <p style="color: #99a9bf">描述内容</p>
                <div class="btmIcon">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <el-button icon="el-icon-upload">上传</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btmBtn">
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'deptManagement',
    data() {
      return {
        imageUrl: '',
        imgArr:[{url:'./../../assets/img/pic.png'},{url:'./../../assets/img/pic.png'},{url:'./../../assets/img/pic.png'}]
      }
    },
  }
</script>
<style scoped lang="scss">
  .deptManagement {
    height: 86vh;
    width: 100%;
    position: relative;

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

    .content {
      height: 75vh;
      .innerCont {
        padding: 30px 500px;
        .item{
          width: 320px;
          height: 60px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          white-space: nowrap;
          margin: 5px 0;
          span{
            margin-right: 20px;
          }
        }
      }
    }
    .btmBtn{
      text-align: center;
    }
  }

  .avatar-uploader {
    width: 60px;
    height: 60px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    /*overflow: hidden;*/
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .imgOuter{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    white-space: nowrap;
    margin: 5px 0;
    span{
      margin-right: 10px;
    }
    .imgBox{
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .imgGroup{
        width: 800px;
        height: 300px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow-y: scroll;
        align-items: flex-end;
        .imgDiv{
          width: 230px;
          height: 300px;
          border-radius: 5px;
          box-shadow: 0 0 5px #99a9bf;
          position: relative;
          overflow: hidden;
          margin: 10px 10px;
          img{
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .views{
            color: white;
            position: absolute;
            top: 170px;
            right: 0;
            z-index: 100000;
          }
          p{
            margin-left: 10px;
          }
          .btmIcon{
            width: 100%;
            height: 40px;
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            i{
              font-size: 16px;
              margin: 0 5px;
              &:hover{
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .img-list-box{
    margin-left: -10px;
    // width: 100%;
    width: 1044px;
    height: 55%;
    display: flex;
    @media screen and(max-width: 1450px) {
      width: 100%;
    }
    .img-info-label{
      flex: 1.5;
    }
    .img-info-box{
      flex: 9;
      height: 100%;
      overflow-x: hidden;
      .el-row{
        display: flex;
        flex-wrap: wrap;
        >.card{
          width: 230px;
          height: 280px;
          margin: 0;
          margin-right: 6px;
          margin-top: 5px;
        }
        .add-icon {
          margin-top: 89px;
          margin-left: 7.48095%;
          text-align: center;
          width: 3.5%;
          cursor: pointer;
          transition: all 0.4s;
          width: 147px;
          height: 147px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // margin-top: 100px;
          // margin-bottom: 40px;
          cursor: pointer;
          transition: all 0.4s;
          position: relative;
          &.add-icon:hover {
            box-shadow: 6px 8px 37px -2px;
          }
          .el-card{
            width: 100%;
            height:100%;
            i{
              // height: 67px;
              height: 100%;
              width: 100%;
              color: rgb(222, 222, 222);
              font-size: 28px;
              // line-height: 67px;
              display: flex;
              justify-content: center;
              align-items: center;
              // text-align: center;
            }
          }
        }

      }
    }
  }
</style>
