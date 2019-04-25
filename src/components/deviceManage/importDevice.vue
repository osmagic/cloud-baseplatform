<template>
  <div class="import-device">
    <el-steps :active="active" finish-status="success">
      <el-step :title="$t('importDevice.upload')+selectedDeviceType"></el-step>
      <el-step :title="$t('importDevice.preview')"></el-step>
      <el-step :title="$t('importDevice.done')"></el-step>
    </el-steps>
    <div class="tip-word" v-if="active === 0">
      <div>{{$t('delete.tips')}}：</div>
      <div class="step-word">
        {{$t('importDevice.stepOne')}}<span @click="downTemplate" class="step-template">{{$t('importDevice.template')}}</span>
      </div>
      <div class="step-word step-word2">
        {{$t('importDevice.stepTwo')}}
      </div>
      <!-- <div class="step-word">
        第三步: 点击下方的"添加文件"按钮导入数据；
      </div> -->
      <div class="selectdevice">
        <span>{{$t('importDevice.selectType')}}</span>
        <el-select v-model="selectedDeviceType" :placeholder="$t('importDevice.plzType')">
            <el-option
            v-for="(item,index) in deviceType"
            :key="index"
            :label="$i18n.locale == 'zh'?item.zhName:item.enName"
            :value="item.type">
            </el-option>
        </el-select>
      </div>
      <div class="upload-excel">
        <span>{{$t('importDevice.file')}}</span>
        <el-upload
          ref="uploadInfo"
          action=""
          accept=".xls,.xlsx"
          :on-remove="uploadInfoRemove"
          :on-change="uploadInfoChange"
          :http-request="parseXlsORx"
          :file-list="fileList"
          :multiple="false"
          :limit='1'
          :auto-upload="false">
              <el-button size="small" type="primary">{{$t('importDevice.upload')}}</el-button>
        </el-upload>
      </div>
    </div>
    <!-- 数据预览 -->
    <div class="data-preview" v-if="active === 1">
      <div class="data-preview-word">
        <el-row>
          <el-col :span="5">
            <div>
              <span class="import-scc-excel">{{this.$t('importDevice.importList')}} | </span>
              <span v-if="$i18n.locale == 'zh'">共{{ sucPersonNum + fieldPersonNum }}条数据</span>
              <span v-else>Total:{{ sucPersonNum + fieldPersonNum }}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="color:#409eff"
                 v-if="$i18n.locale == 'zh'">本次可导入:{{ sucPersonNum }}条数据</div>
            <div style="color:#409eff"
                 v-else>Success:{{ sucPersonNum }}</div>
          </el-col>
          <el-col :span="15">
            <div class="import-fail-excel" v-if="$i18n.locale == 'zh'">
               本次不可导入: {{ fieldPersonNum }}条数据
            </div>
            <div class="import-fail-excel" v-else>
               Failed:{{ fieldPersonNum }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
            id="out-table"
            ref="table"
            height="350"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
             prop="name"
             :label="$t('deviceList.deviceName')">
            </el-table-column>
            <el-table-column
             prop="ip"
             :label="$t('deviceList.ip')">
            </el-table-column>
            <el-table-column
             prop="port"
             :label="$t('deviceList.port')">
            </el-table-column>
            <el-table-column
             prop="user"
             :label="$t('deviceList.user')">
            </el-table-column>
            <el-table-column
             prop="password"
             :label="$t('deviceList.passWord')">
            </el-table-column>
            <el-table-column
            prop="error"
            :label="$t('importDevice.error')"
            >
              <template slot-scope="scope" >
                <div style="color: red">{{scope.row.error}}</div>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 导入成功 -->
    <div class="import-success" v-if="active === 2 && secondUploadDevice">
      <div>{{$t('importDevice.importSuccess')}}</div>
      <div v-if="$i18n.locale == 'zh'">你已成功导入{{ sucPersonNum }}条设备数据。</div>
      <div v-else>You have successfully imported {{ sucPersonNum }} device data.</div>
    </div>

    <div class="next">
      <el-button class="next-btn" type="primary" @click="nextstep(1)" v-if="active === 0" :disabled="isDisableNext">{{$t('importDevice.nextStep')}}</el-button>
      <el-button class="up-btn" type="primary" @click="upstep" v-if="active === 1">{{$t('importDevice.lastStep')}}</el-button>
      <el-button class="next-btn" type="primary" @click="nextstep(2)" v-if="active === 1" :disabled="sucPersonNum === 0">{{$t('importDevice.import')}}</el-button>
      <el-button class="next-btn" type="primary" v-if="active === 1" :disabled="fieldPersonNum === 0" @click="importOutFieldExcel">{{$t('importDevice.export')}}</el-button>
      <el-button class="next-btn" type="primary" @click="complete" v-if="active === 2">{{$t('importDevice.done')}}</el-button>
    </div>

  </div>
</template>

<script>

// import FileSaver from 'file-saver'
// import XLSX from "xlsx"

export default {
  name: "import_device",
  data() {
    return {
      active: 0,
      netAPI: null,
      fileList: [],
    //   tablePeopleLabel: this.tableDataLabel,
      tableData: [],
      sucPersonNum: 0, // 可导入人数
      fieldPersonNum: 0, // 不可导入人数
      isDisableNext: true, // 是否下一步
      uploadForm: {},
      secondUploadDevice: false,
      selectedDeviceType: this.$store.state.importDeviceType,
      correct: [],
      wrong: [],
      code: 102103,
      deviceType: [{
        zhName: '摄像机',
        enName: 'Camera',
        type: 1
      },
      {
        zhName: '录像机',
        enName: 'Recorder',
        type: 2
      },
      {
        zhName: '智能硬件',
        enName: 'HardWare',
        type: 3
      },
      ]
    }
  },
  created() {
    // this.netAPI = APICONFIG().get("device");
  },
  updated() {
    // 更改导入设备类型
    this.selectedDeviceType = this.$store.state.importDeviceType
  },
  methods: {
    initData() {
      this.fileList = []
      this.tableData = []
      this.sucPersonNum = this.fieldPersonNum = 0
      this.isDisableNext = true
      this.uploadForm = {}
      this.secondUploadDevice = false
      this.active = 0
    },
    upstep() {
      this.initData()
    },
    nextstep(val) {
      this.active++
      console.log(this.active)
      if(val === 2) {
        this.uploadForm.attr = this.selectedDeviceType
        this.uploadForm.json = this.correct
        this.uploadForm.code = this.code
        this.uploadDeviceExcel('add')
      }
    },
    // 下载模板
    downTemplate() {
      let language = this.$i18n.locale == 'zh' ? null : 'en_US'
      console.log(`${this.netAPI.export}?code=${102101}&attr=${this.selectedDeviceType}`)
      window.location.href = `${this.netAPI.export}?code=${102101}&attr=${this.selectedDeviceType}&language=${language}`
      this.$http({
        url: this.netAPI.export,
        method: 'get',
        responseType: 'blob',
        params: {
          code: '102101',
          attr: this.selectedDeviceType,
          language: language
        }
      }).then(({data}) => {
        // console.log(data)
        var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //xlsx类型
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = 'Camera upload template.xlsx'; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      })
    },
    parseXlsORx () {
    },
    uploadInfoRemove() {
      console.log(this.selectedDeviceType)
      this.isDisableNext = true
    },
    evil(fn) {
      let Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
      return new Fn('return ' + fn)();
    },
    uploadInfoChange(file) {
      let form = new FormData();
      form.append('code', 102103);
      form.append('excel', file.raw);
      form.append('attr', this.selectedDeviceType);
      this.uploadForm = form;
      this.uploadDeviceExcel();
    },
    uploadDeviceExcel(v) {
      if (v == 'add') {
        // this.uploadForm.append('groupNo')
        console.log(11111)
        let no = this.$store.state.importDeviceNo.toString();
        this.uploadForm.append('groupNo', no)
        console.log(JSON.stringify(this.uploadForm))
        this.$http.post(this.netAPI.import, this.uploadForm).then(
              res => {
                // console.log(11111)
                if(res.body.status == 200) {
                  this.sucPersonNum = res.body.data
                  this.secondUploadDevice = true
                  this.$message.success(this.$t('common.importSuccess'))
                } else {
                  this.$message.warning(this.$t('common.importFailed') + res.body.message)
                }
              }
          )
      }else {
    // 获取能添加的数据和不能添加的数据
        console.log(222222)
        let no = this.$store.state.importDeviceNo.toString();
        this.uploadForm.append('groupNo', no)
        console.log(JSON.stringify(this.uploadForm))
        this.$http.post(this.netAPI.import, this.uploadForm).then(res => {
          if(res.body.status == 200) {
            // console.log(JSON.parse(res.body.data))
            let jsonData = JSON.parse(res.body.data)
            this.sucPersonNum = jsonData['correct'].length
            this.fieldPersonNum = jsonData['wrong'].length
            this.tableData = jsonData['wrong']
            // 打印上传失败的数据
            console.log(JSON.stringify(this.tableData))
            this.isDisableNext = false
            let form = new FormData();
            form.append('code', 102103);
            form.append('attr', this.selectedDeviceType);
            form.append('json', JSON.stringify(JSON.parse(res.body.data).correct));
            this.correct = JSON.stringify(JSON.parse(res.body.data).correct);
            this.uploadForm = form
          } else {
            this.$message.warning(this.$t('common.importFailedInfo'))
          }
        }
      )
      }
    },
    // 导出失败数据
    importOutFieldExcel() {
      let excelTitle = '';
      switch(this.selectedDeviceType) {
        case 1:
          excelTitle = 'Camera Upload Failure Data'
          break;
        case 2:
          excelTitle = 'Recorder Camera Upload Failure data'
          break;
        case 3:
          excelTitle = 'Intelligent Hardware Upload Failure Data'
          break;
        default:
          break;
      }
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      console.log(wb)
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${excelTitle}.xlsx`)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    // 点击完成
    complete() {
      console.log(this.selectedDeviceType)
      this.$emit("closeImportExcel", false, this.selectedDeviceType)
    }
  },
  watch: {
    showDialog() {
      this.initData()
    }
  }
}
</script>

<style lang="scss">
.import-device {
  .tip-word {
    font-size: 16px;
    .step-word {
      margin: 10px 0;
      .step-template {
        color: #66b1ff;
        cursor: pointer;
      }
    }
    .step-word2{
      margin-bottom: 15px;
    }
    .upload-excel {
      width: 600px;
      margin-top: 10px;
      >span{
        float: left;
        margin-right: 20px;
        line-height: 34px;
      }
    }
  }
  .data-preview {
    .data-preview-word {
      .import-scc-excel {
        font-size: 16px;
      }
      .import-fail-excel {
        color: red;
      }
    }
    .not-import-word {
      font-size: 16px;
      margin-top: 24px;
    }
    margin-top: 10px;
  }
  .import-success {
    margin-top: 10px;
    color: #409EFF;
    font-size:16px
  }
  .next {
    padding-top: 10px;
    text-align: right;
    .up-btn {
      margin-right: 10px;
    }
  }
}
</style>
