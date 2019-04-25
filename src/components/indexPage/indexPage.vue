<template>
  <div id="indexPage">
    <div>
      <div class="compile">
        <el-row class="row1">
          <el-col :span="8">
            <div class="col1"></div>
          </el-col>
          <el-col :span="8">
            <div class="col2"></div>
          </el-col>
          <el-col :span="8">
            <div class="col3"></div>
          </el-col>
        </el-row>
        <div class="echarts">
          <div class="ecTitle">
            平台预警
          </div>
          <div class="ecContainL">
            <div>
              <p
                style="font-family:PingFang SC;
font-weight:bold;color:rgba(32,38,46,0.7);
line-height:35px;
"
              >
                累计预警数
              </p>
              <p
                style="font-size:40px;
font-family:PingFang SC;
font-weight:bold;
line-height:35px;
color:rgba(32,38,46,1);"
              >
                4320<span style="font-size:16px">次</span>
              </p>
              <p
                style="font-size:12px;
font-family:PingFang SC;
font-weight:bold;
line-height:35px;
color:rgba(43,51,62,1);"
              >
                10%同比上调
              </p>
            </div>
            <div style="margin-top:74px">
              <p
                style="font-family:PingFang SC;
font-weight:bold;color:rgba(32,38,46,0.7);
line-height:35px;
"
              >
                累计预警数
              </p>
              <p
                style="font-size:40px;
font-family:PingFang SC;
font-weight:bold;
line-height:35px;
color:rgba(32,38,46,1);"
              >
                4320<span style="font-size:16px">次</span>
              </p>
              <p
                style="font-size:12px;
font-family:PingFang SC;
font-weight:bold;
line-height:35px;
color:rgba(43,51,62,1);"
              >
                10%同比上调
              </p>
            </div>
          </div>
          <div class="ecContainR">
            <div style="padding:20px 25px;width:100%">
              <span class="ectr">近一周活动发布</span>
              <div style="float:right">
                <el-button type="text">今日</el-button>
                <el-button type="text">本周</el-button>
                <el-button type="text" style="margin-right:20px"
                  >本月</el-button
                >
                <el-date-picker
                  size="small"
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </div>
            <div id="echarts"></div>
          </div>
        </div>
      </div>
      <div class="description">
        <div style="margin:40px 0 11px 29px">
          <img src="../../assets/img/组 295.png" alt="" />
        </div>
        <p class="desp1">专注于人工智能技术研究和应用的高科技企业</p>
        <p class="desp2">
          成都考拉悠然科技有限公司，是一家专注于人工智能技术研究和应用的高科技企业。由国家“千人计划”特聘专家、澳大利亚昆士兰大学教授、电子科技大学计算机技术与工程学院院长、教授、博士生导师、未来媒体研究中心主任申恒涛领衔16位海外名校博士创立。
        </p>
        <div style="margin:20px 0 0 30px;color:rgba(76,131,255,1);">
          了解更多
        </div>
        <div style="position:absolute;bottom:0;right:0">
          <img src="../../assets/img/考拉云平台图标 [已恢复].png" alt="" />
        </div>
      </div>
      <div style="height:288px;clear:both;">
        <el-row class="row2" :gutter="20">
          <el-col :span="12">
            <div class="bcwhite">
              <div class="ecTitle" style="border:none">
                <span>消息中心</span
                ><span
                  style="color:#3B86FF;font-size:14px;
font-family:PingFang SC;float:right;margin-right:20px"
                  >更多</span
                >
              </div>
              <div class="messageList">
                <div class="messageItem">
                  <div class="mitemL">
                    <div class="itemL1">设备告警</div>
                    <div class="itemL2">啦啦啦啦啦啦啦啦啦啦</div>
                  </div>
                  <div class="mitenR">
                    <span class="mtime">2019-04-19</span>
                    <el-button round>待处理</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="bcwhite">
            <div class="ecTitle" style="border:none">
                <span>消息中心</span
                ><span
                  style="color:#3B86FF;font-size:14px;
font-family:PingFang SC;float:right;margin-right:20px"
                  >更多</span
                >
              </div>
              <div style="padding:0 20px">
                 <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作类型">
      </el-table-column>
      <el-table-column
        prop="address"
        label="日志内容">
      </el-table-column>
    </el-table>
              </div>
          </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateRange: ""
    };
  },
  mounted() {
    this.drawcharts();
  },
  methods: {
    drawcharts: function() {
      let myChart = this.$echarts.init(document.getElementById("echarts"));
      myChart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ],
        grid: {
          left: 50,
          top: 30,
          right: 40,
          bottom: 30
        }
      });
    }
  }
};
</script>
<style lang="scss">
#indexPage {
  .desp1 {
    padding-left: 30px;
    font-size: 14px;
    font-family: PingFang SC;
    color: rgba(43, 51, 62, 1);
  }
  .mtime{
    font-size:12px;
font-family:PingFang SC;
font-weight:400;
line-height:20px;
color:rgba(43,51,62,0.5);
margin-right: 16px;
  }
  .itemL1 {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 20px;
    color: rgba(43, 51, 62, 1);
  }
  .itemL2 {
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 20px;
    color: rgba(43, 51, 62, 0.5);
  }
  .row2{
    .el-button{
   width:84px;
height:24px;
background:linear-gradient(90deg,rgba(48,214,253,1) 0%,rgba(74,132,251,1) 100%);
border-radius:12px;
color:rgba(248,251,255,1);
  }
  }
  .el-button.is-round{
    padding: 0
  }
  .mitemL {
    float: left;
  }
  .mitenR {
    float: right;
  }
  .desp2 {
    padding: 0 30px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 24px;
    color: rgba(43, 51, 62, 0.5);
  }
  .messageList {
    padding: 0 20px;
  }
  .compile {
    width: 71%;
    float: left;
    margin-bottom: 20px;
  }
  .bcwhite {
    background: white;
    height: 100%;
  }
  #echarts {
    height: 349px;
  }
  .el-button--text {
    color: #2b333e;
  }
  .ectr {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 35px;
    color: rgba(43, 51, 62, 1);
  }
  .el-date-editor--daterange {
    width: 268px;
    border-radius: 20px;
  }
  .el-range-editor--small .el-range-separator {
    width: 12%;
  }
  .ecContainL {
    padding-top: 74px;
    width: 22%;
    height: 420px;
    padding-left: 20px;
    border-right: 1px solid rgba(233, 233, 233, 1);
    float: left;
  }
  .ecContainR {
    float: left;
    width: 78%;
    height: 424px;
  }
  .description {
    width: 27%;
    height: 652px;
    float: left;
    position: relative;
    background: white;
    margin-left: 20px;
  }
  .row1 {
    .el-col {
      height: 165px;
    }
    .el-col div {
      height: 100%;
      width: 100%;
    }
  }
  .row2 {
    .el-col {
      height: 288px;
    }
  }
  .col1 {
    background: url("../../assets/img/组931.png") no-repeat;
  }
  .col2 {
    background: url("../../assets/img/组932.png") no-repeat;
  }
  .col3 {
    background: url("../../assets/img/组933.png") no-repeat;
  }
  .echarts {
    width: 100%;
    height: 486px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
  }
  .ecTitle {
    height: 62px;
    padding-left: 19px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 62px;
    color: rgba(32, 38, 46, 1);
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
}
</style>


