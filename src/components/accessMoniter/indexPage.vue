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
      date:''
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
