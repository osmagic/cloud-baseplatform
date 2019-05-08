<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="searchForm.eventLevel" placeholder="消息类型">
          <el-option
            v-for="item in newsTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="searchForm.status" placeholder="消息状态">
          <el-option
            v-for="item in newsStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="searchForm.eventDetail" placeholder="请输入关键字"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="getMessageList">查询</el-button>
      </el-col>
      <div style="float:right;margin-right:30px">
        <el-button @click="batchConfirm">设为已处理</el-button>
        <el-button @click="deleteMessage">批量删除</el-button>
      </div>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="eventLevelName" label="消息类型" width="180"></el-table-column>
      <el-table-column prop="eventDetail" label="消息内容"></el-table-column>
      <el-table-column prop="sourceName" label="事件来源"></el-table-column>
      <el-table-column prop="eventTime" label="接收时间"></el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
      <el-table-column prop="userName" label="处理人"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
           <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="confirm(scope.row)"
            :disabled="scope.row.status==1"
          >设置为已处理</el-button>
          <el-button type="text" size="small" @click="deleteMessage(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "unreadNews",
  data() {
    return {
      newsTypeOptions: [
        {
          value: 0,
          label: "平台预警"
        },
        {
          value: 1,
          label: "终端预警"
        }
      ],
      newsState: "",
      newsStateOptions: [
        {
          value: "1",
          label: "已处理"
        },
        {
          value: "0",
          label: "未处理"
        }
      ],
      searchForm: {
        readStatus: 0
      },
      tableData: [
        {
          num: "1",
          newsType: "平台预警",
          newsContent: "消息内容",
          newsSender: "sshAdmin",
          receivedTime: "2019-04-28",
          newsState: "已处理",
          handler: "admin"
        },
        {
          num: "2",
          newsType: "设备预警",
          newsContent: "消息内容",
          newsSender: "sshAdmin",
          receivedTime: "2019-04-28",
          newsState: "待处理",
          handler: "admin"
        },
        {
          num: "3",
          newsType: "管理员申请",
          newsContent: "消息内容",
          newsSender: "sshAdmin",
          receivedTime: "2019-04-28",
          newsState: "未处理",
          handler: "admin"
        },
        {
          num: "4",
          newsType: "访客申请",
          newsContent: "消息内容",
          newsSender: "sshAdmin",
          receivedTime: "2019-04-28",
          newsState: "已处理",
          handler: "admin"
        }
      ]
    };
  },
  created() {
    this.getMessageList();
  },
  methods: {
    deleteMessage(row) {
      var form = [];
      console.log(row);
      if (row.id) {
        form = [{ id: row.id }];
      } else {
        console.log("jin");
        for (let index = 0; index < this.selectionList.length; index++) {
          const element = this.selectionList[index];
          let a = { id: element.id };
          form.push(a);
        }
      }
      this.$http.deleteMessage(form).then(res => {
        if (res.data.status == 200) {
          this.$message.success("删除成功");
          this.getMessageList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
     batchConfirm() {
      if (this.selectionList.length < 1) {
        this.$message.warning("请至少选择一个项目");
      } else {
        for (let index = 0; index < this.selectionList.length; index++) {
          const element = this.selectionList[index];
          element.status = 1;
          element.readStatus = 1;
          element.userName = "admin";
          element.userId = "1";
          this.$http.changeMassage(element).then(res => {
            if (res.data.status == 200) {
            } else {
            }
          });
        }
        // this.$message.success('修改成功')
      }
    },
    handleClick() {},
    handleSelectionChange(list) {
      this.selectionList = list;
    },

    confirm(row) {
      row.status = 1;
      row.readStatus = 1;
      row.userName = "admin";
      row.userId = "1";
      this.$http.changeMassage(row).then(res => {
        if (res.data.status == 200) {
          this.$message.success("success");
          this.getMessageList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getMessageList() {
      this.$http.getMessage(this.searchForm).then(res => {
        if (res.data.status == 200) {
          for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index];
            if (element.status == "0") {
              element.statusName = "未处理";
            } else if (element.status == "1") {
              element.statusName = "已处理";
            }
            if (element.eventName == "0") {
              element.eventLevelName = "平台预警";
            } else if (element.eventName == "1") {
              element.eventLevelName = "终端预警";
            }
            if (element.eventSource == "0") {
              element.sourceName = "平台";
            } else if (element.eventSource == "1") {
              element.sourceName = "终端";
            }
          }
          this.tableData = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
