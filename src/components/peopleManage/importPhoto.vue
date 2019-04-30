<template>
  <div class="import-photo">
    <div class="step">
      <el-steps :active="active" finish-status="success">
        <el-step :title="$t('peopleManageList.uploadPhoto')"></el-step>
        <el-step :title="$t('common.complete')"></el-step>
      </el-steps>
    </div>
    <div v-if="active === 0">
      <div class="sel-radio">
        <el-radio v-model="uploadType" label="0" border>{{$t('peopleManageList.personCode')}}</el-radio>
      </div>
      <div class="sel-radio">
        <el-radio v-model="uploadType" label="1" border>{{$t('peopleManageList.personPhoto')}}</el-radio>
      </div>
      <div class="upload-file">
        <el-upload
            ref="uploadInfo"
            action=""
            accept=".jpg,.png,.bmp"
            :on-remove="uploadInfoRemove"
            :on-change="uploadInfoChange"
            :http-request="parseXlsORx"
            :multiple="true"
            :auto-upload="false">
                <el-button size="small" type="primary">{{$t('peopleManageList.uploadFile')}}</el-button>
                <div slot="tip" class="upload-tip">
                  <div v-for="(item, index) in $t('peopleManageList.careFul')" :key="index">{{ item }}</div>
                </div>
        </el-upload>
      </div>
    </div>

     <!-- 完成 -->
    <div class="data-preview" v-if="active === 1">
      <div class="data-preview-word">
        <el-row>
          <el-col :span="5">
            <div>
              <span class="import-scc-excel">{{$t('peopleManageList.importList')}} | </span>
              <span>{{ sucPersonNum + fieldPersonNum }}{{$t('peopleManageList.piecesData')}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="color:#409eff">{{$t('peopleManageList.importedPeople')}}:{{ sucPersonNum }}</div>
          </el-col>
          <el-col :span="15">
            <div class="import-fail-excel">
               {{$t('peopleManageList.importFailPeople')}}: {{ fieldPersonNum }}{{$t('peopleManageList.people')}}
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 列表展示 -->
      <div>
        <div class="not-import-word">{{$t('peopleManageList.importFailPeopleList')}}:</div>
        <el-table
            id="out-table2"
            ref="table"
            height="350"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
            prop="name"
            :label="$t('peopleManageList.photoName')">
            </el-table-column>
            <el-table-column
              prop="photo"
              :label="$t('peopleManageList.photo')">
               <template slot-scope="scope" >
                  <img :src="scope.row.photo" style="width: 100px; height: 100px">
              </template>
            </el-table-column>
            <el-table-column
            prop="error"
            :label="$t('peopleManageList.errorReason')"
            >
              <template slot-scope="scope" >
                <div style="color: red">{{scope.row.error}}</div>
              </template>
            </el-table-column>
        </el-table>
      </div>

    </div>

    <div class="fixed-btn">
      <el-button type="primary" @click="next" v-if="active === 0" :disabled="fileListData.length === 0">{{$t('peopleManageList.nextStep')}}</el-button>
      <el-button type="primary" @click="upStep" v-if="active === 1">{{$t('peopleManageList.upStep')}}</el-button>
      <el-button type="primary" @click="complate" v-if="active === 1">{{$t('common.complete')}}</el-button>
      <el-button class="next-btn" type="primary" v-if="active === 1" :disabled="fieldPersonNum === 0" @click="importOutFieldExcel">{{$t('peopleManageList.exportFailList')}}</el-button>
    </div>
 </div>
</template>

<script>
// import APICONFIG from "../../../../config/api.js"
import FileSaver from 'file-saver'
import XLSX from "xlsx"

export default {
  name: "import_people",
  props: {
    activeTabs: {
      type: String,
      default: true
    },
    dialogImportPhoto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      netAPI: '',
      active: 0,
      uploadType: '0',
      fileListData: [],
      tableData: [],
      sucPersonNum: 0, // 导入成功的人数
      fieldPersonNum: 0 // 导入失败的人数
    }
  },
  created() {
    // this.netAPI = APICONFIG().get("people_manage");
  },
  watch: {
    dialogImportPhoto() {
      this.resetData()
    }
  },
  methods: {
    resetData() {
      this.fileListData = []
      this.tableData = []
      this.uploadType = '0'
      this.active = 0
      this.sucPersonNum = 0
      this.fieldPersonNum = 0
    },
    upStep() {
      this.resetData()
    },
    next() {
      let self = this
      this.active++
      this.fileListData.forEach(item => {
        let form = new FormData()
        // if(this.uploadType === '0') {
        //   form.append('attr', true)
        // } else {
        //   form.append('attr', false)
        // }
        // form.append('attr', true)
        // form.append('attr', this.uploadType === '0')
        // form.append('code', 101103)
        form.append('picturesBinary', item.raw)
        form.append('typeNo', this.activeTabs)
        form.append('mode', 2)

        this.$http.personPhotoUpload( form).then(res => {
          if(res.data.status === 200) {
            let tipInfo = JSON.parse(res.data.data)
            if(tipInfo.failed !== 0) {
              let reader = new FileReader()
              reader.readAsDataURL(item.raw)
              let This = this
              reader.onload = function(e) {
                This.tableData.push({
                  photo: this.result,
                  name: item.name,
                  error: self.$t('peopleManageList.photoErrorTips')
                })
              }
              this.fieldPersonNum++
            } else {
              this.sucPersonNum++
            }
          }
        })
      })
    },
    uploadInfoRemove(file, fileList) {
      this.fileListData = fileList
    },
    uploadInfoChange(file, fileList) {
      this.fileListData = fileList
    },
    parseXlsORx() {
    },
    complate() {
      this.$emit("closeImportExcel", 2)
    },
    importOutFieldExcel() {
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table2'))
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${this.$t('peopleManageList.uploadErrorPeopleList')}.xlsx`)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    }
  }
}
</script>

<style lang="scss">
  .import-photo {
    .step {
      width: 50%;
    }
    .sel-radio {
      margin-top: 10px;
    }
    .upload-file {
      .upload-tip {
        margin-top: 5px;
        font-size: 12px;
        color: red;
      }
      .el-upload-list--text {
       overflow: auto !important;
       max-height: 300px  !important;
      }
      margin-top: 10px;
    }
    .fixed-btn {
      text-align: right;
      margin-top: 10px;
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
        img {
          width: 100px;
        }
        font-size: 16px;
        margin-top: 24px;
      }
      margin-top: 10px;
    }
  }
</style>
