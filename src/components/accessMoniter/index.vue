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
      date: "",
      netAPI: '',
      personType1: 100010001001,
      personType2: 100010001002,
      personType3: 100010001003,
      personTypeArr: [
        {
          name: '员工',
          No: 100010001001
        },
        {
          name: '访客',
          No: 100010001002
        },
        {
          name: '黑名单',
          No: 100010001003
        },
      ],
      persionNumber1: 0,
      persionTime1: 0,
      persionNumber2: 0,
      persionTime2: 0,
      persionNumber3: 0,
      persionTime3: 0,
      recordTime: [],
      personTimes: [],
    };
  },
  created() {
    this.netAPI = APICONFIG().get("accessSystem");
      //格式化当前时间
    Date.prototype.Format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
    this.date = [
      new Date().Format("yyyy-MM-dd 00:00:00"),
      new Date().Format("yyyy-MM-dd 23:59:59")
    ];
    this.findData()
  },
  mounted() {
    this.drawline()
  },
  methods: {
    // 查询
    findData() {
      this.$http.get(this.netAPI.index.findTimes, {params: {startDate: this.date[0], endDate: this.date[1], personType: this.personTypeArr[0].No}})
        .then(
          res => {
            if(res.body.status == 200) {
              // console.log(JSON.stringify(res.body.data))
              this.persionNumber1 = res.body.data.personNumber
              this.persionTime1 = res.body.data.personTime
            } else{
              this.$message.warning(this.$t('accessSystem.chaxunshibai') + res.body.message)
            }
          }
        )
      this.$http.get(this.netAPI.index.findTimes, {params: {startDate: this.date[0], endDate: this.date[1], personType: this.personTypeArr[1].No}})
        .then(
          res => {
            if(res.body.status == 200) {
              // console.log(JSON.stringify(res.body.data))
              this.persionNumber2 = res.body.data.personNumber
              this.persionTime2 = res.body.data.personTime
            } else{
              this.$message.warning(this.$t('accessSystem.chaxunshibai') + res.body.message)
            }
          }
        )
      this.$http.get(this.netAPI.index.findTimes, {params: {startDate: this.date[0], endDate: this.date[1], personType: this.personTypeArr[2].No}})
        .then(
          res => {
            if(res.body.status == 200) {
              // console.log(JSON.stringify(res.body.data))
              this.persionNumber3 = res.body.data.personNumber
              this.persionTime3 = res.body.data.personTime
            } else{
              this.$message.warning(this.$t('accessSystem.chaxunshibai') + res.body.message)
            }
          }
        )

      this.$http.get(this.netAPI.index.findFlowrate, {params: {startDate: this.date[0], endDate: this.date[1]}})
        .then(
          res => {
            if(res.body.status == 200) {
              // console.log(JSON.stringify(res.body.data))
              this.recordTime = []
              this.personTimes = []
              // res.body.data.forEach(item => {
              //   this.recordTime.push(item.recordDate)
              //   this.personTimes.push(item.persionTime)
              // })
              for (const key in res.body.data) {
                if (res.body.data.hasOwnProperty(key)) {
                  const element = res.body.data[key];
                  this.recordTime.push(key)
                  this.personTimes.push(element)
                }
              }
              this.drawline()
            } else{
              this.$message.warning(this.$t('accessSystem.chaxunshibai') + res.body.message)
            }
          }
        )
    },
    //横纵坐标轴留空数据处理
    formatterData() {
      this.recordTime = [];
      this.personTimes = [];
      //计算相距多少天
    },
    dateMinus() {
      var sdate = new Date(this.date[0]);
        　　var now = new Date(this.date[1]);
        　　var days = now.getTime() - sdate.getTime();
        　　var day = parseInt(days / (1000 * 60 * 60 * 24));

        　　return day;
    },

    drawline() {
      let myChart = this.$echarts.init(document.getElementById("echarts"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          // data: ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"]
          data: this.recordTime
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          splitLine: {
            show: false
          },
          max: function(value) {
            return value.max * 2
          }
        },
        tooltip: {
          triggerOn: 'mousemove',
          formatter: function (params) {
            console.log(params)
            return params.name + '<br />' + params.value + this.$t('accessSystem.ci')
          }
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330],
            data: this.personTimes,
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                width: 5,
                color: '#E7A640',
                shadowColor: '#CBCBCB',
                shadowBlur: 10,
                shadowOffsetY: 10
              }
            },
          }
        ]
      });
    }
  }
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
