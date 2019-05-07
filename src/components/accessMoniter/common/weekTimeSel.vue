<template>
  <div class="w-time-sel">
   <div class="time-sel-b" v-for="(item1, index1) in selTimes">
      <div class="time-name">{{ item1.name }}</div>
      <div class="time-right">
         <div v-for="(item2, index2) in item1.times" class="s-week-time">
              <div class="time-contro">
                  <el-time-select
                    class="start-time-sel"
                    placeholder="start"
                    :picker-options="{
                      start: '00:10',
                      step: '00:10',
                      end: '24:00'
                    }"
                    v-model="item2.startTime"
                    >
                  </el-time-select>
                  <span class="zhi">
                    至
                  </span>
                  <el-time-select
                    class="end-time-sel"
                    placeholder="end"
                    v-model="item2.endTime"
                    :picker-options="{
                      start: '00:10',
                      step: '00:10',
                      end: '24:00'
                    }">
                  </el-time-select>
              </div>
              <div v-show="index2 !== 0" class="two-fix-time">
                <div class="fix-b" @click="delTime(index1, index2)">
                  <div class="fix-del"></div>
                </div>
                <div class="fix-line"></div>
                <div class="fix-b" @click="addTime(index1, index2)">
                  <div class="fix-add"></div>
                </div>
              </div>
              <div v-show="index2 === 0" class="one-fix-time" @click="addTime(index1, index2)">
                  <div class="fix-add"></div>
              </div>
          </div>
      </div>
      
     
   </div>
     
  </div>
</template>

<script>

export default {
  props: {
    setWeekTime: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  data() {
      return {
        weeks: [{
          name:'周一',
          file: 'mon'
        },
        {
          name:'周二',
          file: 'tue'
        },
        {
          name:'周三',
          file: 'wed'
        },
        {
          name:'周四',
          file: 'thu'
        },
        {
          name:'周五',
          file: 'fri'
        },
        {
          name:'周六',
          file: 'sat'
        },
        {
          name:'周日',
          file: 'sun'
        }],
      
        selTimes: []
      }
  },
  watch:{
    'setWeekTime': {
       handler: function(newVal, oldVal) {
          this.changeTimeStrToArr()
       },
       deep: true
    },
    'selTimes': {
      handler:function(newVal, oldVal) {
        if(newVal.length > 0) {
         let date = {}
         this.weeks.forEach((item1, index1) => {
           let t =[]
           newVal[index1].times.forEach(time => {
              t.push(`${time.startTime}-${time.endTime}`)
           })
           date[item1.file] = t.toLocaleString()
         })
         this.$emit('getTime', date)
        }
      },
      deep: true
    }
  },
  methods: {
    addTime(dex1, dex2) {
      this.selTimes[dex1].times.splice(dex2 + 1, 0, {
        startTime: '',
        endTime: '',
      })
    },
    delTime(dex1, dex2) {
      this.selTimes[dex1].times.splice(dex2, 1)
    },
    changeTimeStrToArr() {
      let selTimes = []
      this.weeks.forEach(item => {
        let times = []
        this.setWeekTime[item.file].split(';').forEach((item2) => {
          times.push({
            startTime: item2.split('-')[0],
            endTime: item2.split('-')[1]
          })
        })
        selTimes.push({
          name: item.name,
          times
        })
      })
      this.selTimes = selTimes
    }
  },
  mounted() {
    this.changeTimeStrToArr()
  }
}
</script>

<style lang="scss">
.w-time-sel {
  display: inline-block;
  .start-time-sel {
  }
  .end-time-sel {
  }
  .time-sel-b {
    margin-top: 6px;
    width: 350px;
    display: flex;
  }
  .time-name {
    flex: 1;
    margin-right: 5px;
  }
  .time-right {
    flex: 9; 
  }
  .s-week-time {
    display: inline-block;
  }
  
  .time-contro {
    border: 1px solid #DBDCDE;
    display: inline-block;
    height: 34px;
    line-height: 34px;
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
  .one-fix-time {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 34px;
    border: 1px solid #dbdcde;
    text-align: center;
    text-align: center;
    .fix-add {
          background-image: url('../../../assets/img/add.png') ; 
          background-repeat:no-repeat; 
          background-size:100% 100%;
          -moz-background-size:100% 100%;
          width: 12px;
          height: 12px;
          display: inline-block;
      }
  }
  .two-fix-time {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 34px;
    border: 1px solid #dbdcde;
    text-align: center;
    .fix-line {
      display:inline-block;
      height: 18px;
      width: 1px;
      margin-top: 3px;
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
