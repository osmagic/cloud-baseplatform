<template>
  <div id="accessIndexPage">
     <div class="dateSelect">
      <span>{{$t('accessSystem.menjintongji')}}</span>
      <!-- <el-date-picker
        class="datepick"
        v-model="date"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker> -->
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
      <div class="line"></div>

    </div>
    <div class="acount">
      <div class=" box1 ac_contain">
        <p>{{$t('accessSystem.yuangongtongxingtongji')}}</p>
        <div style="display:flex;">
          <div
            class="box"
            style="border-right: 2px solid rgba(228,228,228,1)"
          >
            <span class="number">{{persionNumber1}}</span>{{$t('accessSystem.ren')}}
            <div class="round">{{$t('accessSystem.tongxingrenshu')}}</div>
          </div>
          <div class="box">
            <span class="number">{{persionTime1}}</span>{{$t('accessSystem.ci')}}
            <div class="round">{{$t('accessSystem.tongxingrenci')}}</div>
          </div>
        </div>
      </div>
      <div class="ac_contain">
        <p>{{$t('accessSystem.fangketongxingtongji')}}</p>
        <div style="display:flex;">
          <div
            class="box"
            style="border-right: 2px solid rgba(228,228,228,1)"
          >
            <span class="number">{{persionNumber2}}</span>{{$t('accessSystem.ren')}}
            <div class="round">{{$t('accessSystem.tongxingrenshu')}}</div>
          </div>
          <div class="box">
            <span class="number">{{persionTime2}}</span>{{$t('accessSystem.ci')}}
            <div class="round">{{$t('accessSystem.tongxingrenci')}}</div>
          </div>
        </div>
      </div>
      <div class="ac_contain">
        <p>{{$t('accessSystem.heimingdanjujuetongji')}}</p>
        <div style="display:flex;">
          <div
            class="box"
            style="border-right: 2px solid rgba(228,228,228,1)"
          >
            <span class="number">{{persionNumber3}}</span>{{$t('accessSystem.ren')}}
            <div class="round">{{$t('accessSystem.tongxingrenshu')}}</div>
          </div>
          <div class="box">
            <span class="number">{{persionTime3}}</span>{{$t('accessSystem.ci')}}
            <div class="round">{{$t('accessSystem.tongxingrenci')}}</div>
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

}
</script>
<style lang="scss" scoped>
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
