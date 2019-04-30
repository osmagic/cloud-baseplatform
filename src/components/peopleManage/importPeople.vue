<template>
  <div class="import-people">
    <el-steps :active="active" finish-status="success">
      <el-step :title="$t('peopleManageList.uploadFile')"></el-step>
      <el-step :title="$t('peopleManageList.dataPreview')"></el-step>
      <el-step :title="$t('common.complete')"></el-step>
    </el-steps>
    <div class="tip-word" v-if="active === 0">
      <div>{{ $t("peopleManageList.tips") }}</div>
      <!-- <div>{{tablePeopleLabel}}</div> -->
      <div class="step-word">
        {{ $t("peopleManageList.firstStep")
        }}<span @click="downTemplate" class="step-template">{{
          $t("peopleManageList.excelTemplate")
        }}</span>
      </div>
      <div class="step-word">
        {{ $t("peopleManageList.secondStep") }}
      </div>
      <div class="step-word">
        {{ $t("peopleManageList.thirdStep") }}
      </div>

      <div class="upload-excel">
        <el-upload
          ref="uploadInfo"
          action=""
          accept=".xls,.xlsx"
          :on-remove="uploadInfoRemove"
          :on-change="uploadInfoChange"
          :http-request="parseXlsORx"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">{{
            $t("peopleManageList.uploadFile")
          }}</el-button>
          <div slot="tip" style="font-size: 12px">
            {{ $t("peopleManageList.careTips") }}
          </div>
        </el-upload>
      </div>
    </div>
    <!-- 数据预览 -->
    <div class="data-preview" v-if="active === 1">
      <div class="data-preview-word">
        <el-row>
          <el-col :span="5">
            <div>
              <span class="import-scc-excel"
                >{{ $t("peopleManageList.importList") }} |
              </span>
              <span
                >{{ sucPersonNum + fieldPersonNum
                }}{{ $t("peopleManageList.piecesData") }}</span
              >
            </div>
          </el-col>
          <el-col :span="4">
            <div style="color:#409eff">
              {{ $t("peopleManageList.kImportPeople") }}:{{ sucPersonNum }}
            </div>
          </el-col>
          <el-col :span="15">
            <div class="import-fail-excel">
              {{ $t("peopleManageList.noImportPeople") }}: {{ fieldPersonNum }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="not-import-word">
          {{ $t("peopleManageList.noImPeopleList") }}:
        </div>
        <el-table
          id="out-table-people"
          ref="table"
          height="350"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            v-for="(tab, index) in tablePeopleLabel"
            :key="index"
            :prop="tab.property"
            :label="tab.name"
          >
          </el-table-column>
          <el-table-column
            prop="error"
            :label="$t('peopleManageList.errorReason')"
          >
            <template slot-scope="scope">
              <div style="color: red">{{ scope.row.error }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 导入成功 -->
    <div class="import-success" v-if="active === 2 && secondUploadPeople">
      <div>{{ $t("peopleManageList.dataImCom") }}!</div>
      <div>
        {{ $t("peopleManageList.successImport") }}{{ sucPersonNum
        }}{{ $t("peopleManageList.peronnelData") }}
      </div>
    </div>

    <div class="next">
      <el-button
        class="next-btn"
        type="primary"
        @click="nextstep(1)"
        v-if="active === 0"
        :disabled="isDisableNext"
        >{{ $t("peopleManageList.nextStep") }}</el-button
      >
      <el-button
        class="up-btn"
        type="primary"
        @click="upstep"
        v-if="active === 1"
        >{{ $t("peopleManageList.upStep") }}</el-button
      >
      <el-button
        class="next-btn"
        type="primary"
        @click="nextstep(2)"
        v-if="active === 1"
        :disabled="sucPersonNum === 0"
        >{{ $t("peopleManageList.import") }}</el-button
      >
      <el-button
        class="next-btn"
        type="primary"
        v-if="active === 1"
        :disabled="fieldPersonNum === 0"
        @click="importOutFieldExcel"
        >{{ $t("peopleManageList.exportFailList") }}</el-button
      >
      <el-button
        class="next-btn"
        type="primary"
        @click="complate"
        v-if="active === 2"
        >{{ $t("common.complete") }}</el-button
      >
    </div>
  </div>
</template>

<script>
// import APICONFIG from "../../../../config/api.js"
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "import_people",
  props: {
    activeTabs: {
      type: String,
      default: true
    },
    peopleTypefield: {
      type: Array,
      default: []
    },
    organizationId: {
      type: String,
      default: ""
    },
    typeName: {
      type: String,
      default: ""
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    tableDataLabel: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      active: 0,
      netAPI: null,
      fileList: [],
      tablePeopleLabel: this.tableDataLabel,
      tableData: [],
      sucPersonNum: 0, // 可导入人数
      fieldPersonNum: 0, // 不可导入人数
      isDisableNext: true, // 是否下一步
      uploadForm: {},
      secondUploadPeople: false,
      personJsonStr: "",
      validDataC: [],
      validDataE: []
    };
  },
  created() {
    // this.netAPI = APICONFIG().get("people_manage");
    // this.tablePeopleLabel.push({
    //   name: '对应图片名称',
    //   property: 'picName',
    //   width: 150,
    //   type: 'input'
    // })
  },
  methods: {
    complate() {
      this.$emit("closeImportExcel", 1)
    },
    uploadInfoChange(file) {
      //取得文件
      //fileReader
      // let reader = new FileReader();
      // //开始读取指定的Blob中的内容
      // reader.readAsBinaryString(file.raw);
      // //读取完成
      // reader.onload = e => {
      //   let data = e.target.result;
      //   let workbook = XLSX.read(data, {
      //     type: "binary"
      //   });
      //   const wsname = workbook.SheetNames[0];
      //   let wsJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
      //   // 每个对象里面加一个type字段
      //   let wsString = JSON.stringify(wsJson);
      //   this.peopleTypefield.forEach(item => {
      //     let reName = new RegExp(item.description, "g");
      //     wsString = wsString.replace(reName, `${item.name}`);
      //   });
      //   console.log(wsString);

      //   let picname = new RegExp(this.$t("peopleManageList.pictureName"), "g");

      //   wsString = wsString.replace(picname, "picName");
      //   let form = new FormData();
      //   // form.append('code', 101103)
      //   form.append("typeNo", this.activeTabs);
      //   form.append("personJsonStr", wsString);
      //   form.append("token", "7d1e52d3cf0142e19b5901eb1ef91372");
      //   form.append("mode", 1);
      //   this.uploadForm = form;
      //   this.uploadPeopleExcel();
      // };
      var form = new FormData();
      var xhr = new XMLHttpRequest();

      form.append("typeNo", this.activeTabs);
      form.append("personExcel", file.raw);
      form.append("token", "7d1e52d3cf0142e19b5901eb1ef91372");
      xhr.open("post", "/api/v2/personnel/info/verify", true);
      var self = this;
      xhr.onload = function() {
        var response = JSON.parse(xhr.response);
        self.personJsonStr = response;
        if (response.status == 200) {
          //  self.uploadPeopleExcel()
          var a = JSON.parse(response.data);
          console.log(a);
          self.validDataC = a.correct;
          self.validDataE = a.error;
          self.uploadPeopleExcel();
        }
      };
      xhr.send(form);
    },
    uploadPeopleExcel() {
      // this.$http.post(this.netAPI.uploadPeopleExcel, this.uploadForm).then(res => {
      //   if (res.data.status === 200) {
      //     if(this.active === 2) {
      //       this.secondUploadPeople = true
      //       this.$message.success(this.$t('peopleManageList.succImport'))
      //     } else {
      //       let jsonData = JSON.parse(res.data.data)
      //       this.sucPersonNum = jsonData['succeed'].length
      //       this.fieldPersonNum = jsonData['failed'].length
      //       this.tableData = jsonData['failed']
      //       this.isDisableNext = false
      //     }
      //   }
      // })
      var form = new FormData();
      var xhr = new XMLHttpRequest();
      form.append("mode", 1);
      form.append("typeNo", this.activeTabs);
      var str = JSON.stringify(this.validDataC);
      form.append("personJsonStr", str);
      form.append("token", "7d1e52d3cf0142e19b5901eb1ef91372");
      xhr.open("post", "/api/v2/personnel/info/upload", true);
  console.log(this.tableDataLabel)
      var self = this;
      xhr.onload = function() {
        var response = JSON.parse(xhr.response);
        console.log(response);
        if (response.status == 200) {
          self.isDisableNext = false;
          self.tableData = self.validDataE;
          self.sucPersonNum = self.validDataC.length;
          self.fieldPersonNum = self.validDataE.length;
        }
      };
      xhr.send(form);
    },
     importOutFieldExcel() {
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table-people'))
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${this.$t('peopleManageList.uploadErrorPeopleList')}.xlsx`)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    initData() {
      this.fileList = [];
      this.tableData = [];
      this.sucPersonNum = this.fieldPersonNum = 0;
      this.isDisableNext = true;
      this.uploadForm = {};
      this.secondUploadPeople = false;
      this.active = 0;
    },
    upstep() {
      this.initData();
    },
    nextstep(val) {
      this.active++;
      if (val === 2) {
        // this.uploadForm.set("attr", true);
        // this.uploadPeopleExcel();
      }
    },
    // 下载魔板
    downTemplate() {
      ////old--------------------------------
      var self = this;
      this.$axios({
        // 用axios发送post请求
        method: "get",
        url: "/api/v2/personnel/info/download", // 请求地址
        params: { mode: 1, typeNo: self.activeTabs }, // 参数
        responseType: "blob" // 表明返回服务器返回的数据类型
      }).then(res => {
        const content = res.data;
        const blob = new Blob([content]);
        const fileName = "template.xlsx";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    parseXlsORx() {},
    uploadInfoRemove() {
      this.isDisableNext = true;
    },
    evil(fn) {
      let Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
      return new Fn("return " + fn)();
    },

    importOutFieldExcel() {
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table-people")
      );
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${this.$t("peopleManageList.uploadErrorPeopleList")}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    complate() {
      this.$emit("closeImportExcel", 1);
    }
  },
  watch: {
    showDialog() {
      this.initData();
    }
  }
};
</script>

<style lang="scss">
.import-people {
  .tip-word {
    .step-word {
      .step-template {
        color: #66b1ff;
        cursor: pointer;
      }
    }
    .upload-excel {
      margin-top: 10px;
      width: 40%;
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
    color: #409eff;
    font-size: 16px;
  }
  .next {
    .up-btn {
      margin-right: 10px;
    }
    text-align: right;
  }
}
</style>
