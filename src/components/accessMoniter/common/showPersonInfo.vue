<template>
    <div class="show-person-info">
        <el-row>
        <el-col
          :span="8"
          v-if="detailPersonInfo.type!='陌生人闯入告警'"
        >
          <div class="grid-contentFir"> <img
              :src="detailPersonInfo.urls"
              class="snapduibi"
              alt='暂无'
            ></div>
        </el-col>
        <el-col
          :span="8"
          style="margin-top:50px"
          v-if="detailPersonInfo.type!='陌生人闯入告警'"
        >
          <div class="grid-contentFir"><span class="score">{{detailPersonInfo.score*100+'%'}}</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-contentFir"> <img
              :src="detailPersonInfo.pictureUrl"
              class="snapduibi"
            ></div>
        </el-col>

      </el-row>
      <el-row>
        <div class="grid-content ">{{$t('accessSystem.renyuanxingming')}}:<label class="value">{{detailPersonInfo.name}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.renyuanbianhao')}}:<label class="value">{{detailPersonInfo.id}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.shenfenzhenghao')}}:<label class="value">{{detailPersonInfo.code}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.renyuanleixing')}}:<label class="value">{{detailPersonInfo.personType}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.tongxingshijian')}}:<label class="value">{{detailPersonInfo.recordDate}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.tongxingshebei')}}:<label class="value">{{detailPersonInfo.deviceName}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.jinchuleixing')}}:<label class="value">{{detailPersonInfo.divergenceType}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.tongxingfangshi')}}:<label class="value">{{detailPersonInfo.passageWay}}</label></div>
        <div class="grid-content ">{{$t('accessSystem.yanzhengjieguo')}}:<label class="value">{{detailPersonInfo.validateResult}}</label></div>
      </el-row>
    </div>
</template>

<script>
export default {
  props: {
    detailPersonInfo: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  data(){
    return{
    }
  }
}
</script>

<style lang="scss">
  .show-person-info {
     .snapPhoto {
      width: 100px;
    }
    .score {
      color: red;
      font-size: 20px;
      margin-top: 50px;
    }
    .snapduibi {
      width: 200px;
      display: inline-block;
      margin: 0 auto;
    }
    .grid-content {
      text-align: left;
      margin-top: 10px;
    }
    .imgpreviewL {
      width: 300px;
    }
    .value {
      margin-left: 10px;
    }
  }
</style>
