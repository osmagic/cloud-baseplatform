<template>
  <div class="time-sel">
   
   <div class="time-sel-b" v-for="(item, dex) in selTimes">
      <span class="time-name">{{ item.name }}</span>
      <div class="time-contro">
        <el-time-select
          class="start-time-sel"
          placeholder="start"
          v-model="item.startTime"
          >
        </el-time-select>
        <span class="zhi">
          至
        </span>
        <el-time-select
          class="end-time-sel"
          placeholder="end"
          v-model="item.endTime"
          :picker-options="{
            minTime: item.startTime
          }">
        </el-time-select>
     </div>
      <div class="fix-time">
        <div class="fix-b" @click="delTime(dex)">
          <div class="fix-del"></div>
        </div>
        <div class="fix-line"></div>
        <div class="fix-b" @click="addTime(dex)">
          <div class="fix-add"></div>
        </div>
      </div>
   </div>
     
  </div>
</template>

<script>
export default {
  data() {
      return {
        // startTime: '',
        // endTime: '',
        selTimes: [
         {
           name: '周一',
           startTime: '',
           endTime: '',
           isRequire: true
         },
         {
           name: '周二',
           startTime: '',
           endTime: '',
           isRequire: true
         }        
        ]
      }
  },
  watch:{
    'selTimes': {
      handler:function(newVal, oldVal) {
        //  console.log(newVal)
         this.$emit('getTime', newVal)
      },
      deep: true
    }
  },
  methods: {
    addTime(dex) {
      this.selTimes.splice(dex+1, 0, {
        startTime: '',
        endTime: '',
      })
    },
    delTime(dex) {
      this.selTimes.splice(dex, 1)
    }
  }
}
</script>

<style lang="scss">
.time-sel {
  display: inline-block;
  .start-time-sel {
  }
  .end-time-sel {
  }
  .time-sel-b {
    margin-top: 14px;
  }
  .time-name {
    margin-right: 5px;
  }
  .time-contro {
    border: 1px solid #DBDCDE;
    display: inline-block;
    height: 34px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 10px;
    width: 80px;
    border: none;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 80px;
  }
  .el-input__inner {
    height: 30px !important;
    width: 192px;
  }
  .el-range__icon {
    display: none;
  }
  .el-range-input {
    width: 80px;
  }
  .el-range-separator {
    line-height: 27px;
    width: 20px;
  }
  .el-range__close-icon, .el-icon-time {
    display: none;
  }
  .fix-time {
    display: inline-flex;
    width: 90px;
    height: 34px;
    border:1px solid rgba(219,220,222,1);
    
    .fix-line {
      display:inline-block;
      height: 18px;
      width: 1px;
      margin-top: 8px;
      background: rgba(77,79,92,0.2);
    }
    .fix-b {
      display: inline-block;
      flex: 1;
      text-align: center;
      cursor: pointer;
      @mixin img-class{
        background-repeat:no-repeat; 
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        width: 12px;
        height: 12px;
        
        display: inline-block;
      }
      .fix-del {
          background-image: url('../../../assets/img/del.png') ; 
          @include img-class()
      }
      .fix-add {
          background-image: url('../../../assets/img/add.png') ; 
          @include img-class()
      }
    }
  }
}
</style>
