<template>
  <div id="accessIndexPage">
     <div class="dateSelect">
      <div style="margin:10px 0 20px 0px;font-size:20px;
font-family:PingFang SC;
font-weight:bold;
color:rgba(77,79,92,1);">{{$t('accessSystem.menjintongji')}}</div>
      <!-- <el-date-picker
        class="datepick"
        v-model="date"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker> -->
      <span class="dateQ">今日</span>
      <span class="dateQ">本周</span>
      <span class="dateQ" style="margin-right:40px">本月</span>
      <el-date-picker
        class="picker"
        v-model="date"
        unlink-panels
        type="daterange"
        :clearable='false'
        :range-separator="$t('accessSystem.zhi')"
        value-format="yyyy-MM-dd"
        :start-placeholder="$t('accessSystem.kaishiriqi')"
        :end-placeholder="$t('accessSystem.jieshuriqi')"
        :default-time="['00:00:00', '23:59:59']"
        >
      </el-date-picker>
      <el-button
        round
        type="primary"
        class="btn"
        @click ="findData"
      >{{$t('accessSystem.chaxun')}}</el-button>
      <div class="lineH"></div>

    </div>
    <div class="acount">
      <div class=" box1 ac_contain">
        <p>{{$t('accessSystem.yuangongtongxingtongji')}}</p>
        <div class="line2"></div>
        <div>
          <div class="accessNumber">
            通行人数
          </div>
          <div class="number">
            24000
          </div>
          <div class="accessTime">
            通行人次
          </div>
        </div>
      </div>
      <div class="ac_contain">
        <p>{{$t('accessSystem.fangketongxingtongji')}}</p>
        <div class="line2"></div>
         <div>
          <div class="accessNumber">
            通行人数
          </div>
          <div class="number">
            24000
          </div>
          <div class="accessTime">
            通行人次
          </div>
        </div>
      </div>
      <div class="ac_contain">
        <p>{{$t('accessSystem.heimingdanjujuetongji')}}</p>
        <div class="line2"></div>
         <div>
          <div class="accessNumber">
            通行人数
          </div>
          <div class="number">
            24000
          </div>
          <div class="accessTime">
            通行人次
          </div>
        </div>
      </div>
    </div>
    <div class="charts">
      <p style="margin-left:0.46rem;padding-top:29px">{{$t('accessSystem.renliuqushitongji')}}</p>
      <div id="echarts">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
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
    }
  },
  created() {
    // this.netAPI = APICONFIG().get("accessSystem");
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
   
  },
  mounted() {
    this.drawline()
    this.findData()
  },
  methods: {
    // 查询
    findData() {
      this.$http.findTimes({startDate: this.date[0], endDate: this.date[1], personType: this.personTypeArr[2].No})
      .then(
        res => {
          if(res.data.status == 200) {
            // console.log(JSON.stringify(res.data.data))
            this.persionNumber3 = res.data.data.personNumber
            this.persionTime3 = res.data.data.personTime
          } else{
            this.$message.warning(this.$t('accessSystem.chaxunshibai') + res.data.message)
          }
        }
      )

      this.$http.findFlowrate({startDate: this.date[0], endDate: this.date[1]})
        .then(
          res => {
            if(res.data.status == 200) {
              this.recordTime = []
              this.personTimes = []
              for (const key in res.data.data) {
                if (res.data.data.hasOwnProperty(key)) {
                  const element = res.data.data[key];
                  this.recordTime.push(key)
                  this.personTimes.push(element)
                }
              }
              this.drawline()
            } else{
              this.$message.warning(this.$t('accessSystem.chaxunshibai') + res.data.message)
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
}
</script>
<style lang="scss">
#accessIndexPage{
  #echarts {
  height: 330px;

  margin: 76px 0 0 0;
}
.accessNumber{
font-size:14px;
font-family:PingFang SC;

color:rgba(77,79,92,0.6);
margin: 20px 0 0 30px
}
.line2{
  border:1px solid rgba(77,79,92,0.1);
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
  font-size:30px;
  font-family: PingFang SC;
  color: rgba(77,79,92,1);
  line-height: 36px;
  margin-left: 30px;
}
.accessTime{
  margin-top: 87px;
  margin-left: 30px;
  font-size:14px;
font-family:PingFang SC;
font-weight:400;
line-height:35px;
color:rgba(77,79,92,0.6);

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
.lineH {
  background: rgba(203, 203, 203, 1);
  margin-left:-20px;
  border: 1px solid rgba(203, 203, 203, 1);
  opacity: 0.5;
  margin-top: 20px;
}
.btn {
  box-shadow: 0px 5px 6px 0px rgba(179, 209, 241, 1);
  margin-left: 13px;
}
.acount {
  display: flex;
  height: 274px;
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
  margin: 0.33rem 0 0.33rem 0.6rem;
  color: rgba(39, 39, 39, 1);
}
.dateQ{
  display: inline-block;
  width: 85px;
  height: 34px;
  border:1px solid rgba(219,220,222,1);
  text-align: center;
  font-size:14px;
font-family:PingFang SC;
color:rgba(77,79,92,1);
line-height: 34px
}
.el-date-editor .el-range-separator{
  width: 7%
}
}

</style>
