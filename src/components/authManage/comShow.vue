<template>
  <el-card class="comShow">
    <div class="head">
      <p>单位展示</p>
    </div>
    <div class="content">
      <div class="textCont">
        <div class="title">
          <p>ABOUT US</p>
          <p>考拉悠然科技</p>
        </div>
        <div class="innerCont">
          <h2>踏破人类行知的边界</h2>
          <p>
            成都考拉悠然科技有限公司，是一家专注于人工智能技术研究和应用的高科技企业。
            由国家“千人计划”特聘专家、澳大利亚昆士兰大学教授、电子科技大学计算机技术
            与工程学院院长、教授、博士生导师、未来媒体研究中心主任申恒涛领衔16位海外
            名校博士创立。
            
          </p>
          <p>
            成都考拉悠然科技有限公司，是一家专注于人工智能技术研究和应用的高科技企业。
            由国家“千人计划”特聘专家、澳大利亚昆士兰大学教授、电子科技大学计算机技术
            与工程学院院长、教授、博士生导师、未来媒体研究中心主任申恒涛领衔16位海外
            名校博士创立。
          </p>
          <p>
            公司在机器学习、计算机视觉、多媒体、大数据等人工智能相关领域拥有近20年的研究
            积累。团队拥有发达国家院士3人、国家“千人计划 ”特聘专家6人、四川省“千人计划
            ”特聘专家7人。在机器学习、计算机视觉研究尤其是多模态识别领域均取得了世界
            领先的技术突破。
            2007年，考拉科技团队研发了世界上第一个实时的近重复视频检测系统，实现了基于视频
            内容的精准搜索；2014年，世界上第一个提出了基于深度学习的实时物体跟踪算法，实
            现了最高精度的实时物体深度跟踪；2015年首次提出离散哈希搜索算法，解决了困扰行
            业已久的视频内容精准查找问题，成功实现视频内容的快速索引。自主研发的深度学习框架......
          </p>
        </div>
      </div>
      <div class="textCont">
        <div class="title">
          <p>SHOW</p>
          <p>场景展示</p>
        </div>
        <div class="innerCont">
          <h2>场景图</h2>
          <div class="scenario">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
            <img src="./../../assets/img/set.png" alt="场景">
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "comShow",
    data(){
      return{
        urls:[],
        detail:''
      }
    },
    created(){
      this.$http.getCompanyDetail().then(res=>{
        if(res.data.status==200){
          this.detail = res.data.data[0].biography
          for (let index = 0; index < res.data.data[0].scenes.length; index++) {
            const element = res.data.data[0].scenes[index].urls;
            for (let indexA = 0; indexA < element.length; indexA++) {
              const elementA = element[indexA];
              this.urls.push(elementA)
            }
          }
        }
      })
      console.log(this.urls)
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  .comShow {
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
      /*border: 1px solid red;*/
      height: 79vh;
      overflow-y: scroll;

      .textCont {
        margin-top: 20px;

        .title {
          text-align: center;

          p:nth-child(1) {
            font-size: 60px;
            color: #E9E9E9;
          }

          p:nth-child(2) {
            color: #000000;
            font-size: 24px;
            margin-top: -50px;
          }
        }

        .innerCont {
          margin-top: 30px;
          padding: 0 300px 0 300px;

          p {
            margin: 10px 0;
            line-height: 30px;
          }

          .scenario {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            img {
              margin: 16px 0;
            }
          }
        }
      }
    }
  }
</style>
