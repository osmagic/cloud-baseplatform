<template>
  <el-card class="myMessage">
    <div class="head">
      <p>我的消息</p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" lazy>
      <el-tab-pane label="全部消息" name="allNews">
        <allNews ref="allNews"></allNews>
      </el-tab-pane>
      <el-tab-pane label="未读消息" name="unreadNews">
        <unreadNews ref="unreadNews"></unreadNews>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="readNews">
        <readNews ref="readNews"></readNews>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import allNews from "./allNews.vue";
import unreadNews from "./unreadNews.vue";
import readNews from "./readNews.vue";
export default {
  name: "myMessage",
  components: { allNews, unreadNews, readNews },
  data() {
    return {
      activeName: "allNews"
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == "unreadNews") {
        this.$refs.unreadNews.getMessageList();
      }
      if (tab.name == "readNews") {
        this.$refs.readNews.getMessageList();
      }
      if (tab.name == "allNews") {
        this.$refs.allNews.getMessageList();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.myMessage {
  height: 86vh;
  width: 100%;
  position: relative;
  .head {
    width: 100%;
    height: 30px;
    text-align: left;
    font-size: 20px;
    line-height: 30px;
    position: relative;
    left: -20px;
    p {
      margin-left: 30px;
    }
    p:before {
      content: "";
      position: absolute;
      left: 0px;
      width: 10px;
      height: 30px;
      background-color: #4383dc;
    }
  }
}
</style>
