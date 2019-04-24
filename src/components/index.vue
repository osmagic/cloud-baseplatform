<template>
  <div id="index">
    <el-container>
      <el-header>
        <div style="width:100%;height:100%">
          <img
            src="../assets/img/新logouran.png"
            alt=""
            style="width:76px;height:20px"
          />
          <span class="logoname">考拉悠然科技</span>
          <div class="Hright">
            <div class="headerBtn" style="margin-right:9px">
              <img src="../assets/img/组 935.png" alt="" class="btnIcon" />
            </div>
            <div class="headerBtn">
              <img src="../assets/img/组 282.png" alt="" class="btnIcon" />
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="256px">
           <Menu theme="dark" active-name="1-2" :open-names="['1']" >
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
                Navigation One
            </template>
            <MenuGroup title="Item 1">
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
            </MenuGroup>
            <MenuGroup title="Item 2">
                <MenuItem name="1-3">Option 3</MenuItem>
                <MenuItem name="1-4">Option 4</MenuItem>
            </MenuGroup>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing" />
                Navigation Two
            </template>
            <MenuItem name="2-1">Option 5</MenuItem>
            <MenuItem name="2-2">Option 6</MenuItem>
            <Submenu name="3">
                <template slot="title">Submenu</template>
                <MenuItem name="3-1">Option 7</MenuItem>
                <MenuItem name="3-2">Option 8</MenuItem>
            </Submenu>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-cog" />
                Navigation Three
            </template>
            <MenuItem name="4-1">Option 9</MenuItem>
            <MenuItem name="4-2">Option 10</MenuItem>
            <MenuItem name="4-3">Option 11</MenuItem>
            <MenuItem name="4-4">Option 12</MenuItem>
        </Submenu>
    </Menu>
         </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.el-main {
  padding: 30px;
}
.el-header {
  background: rgba(53, 63, 77, 1);
  padding: 0 30px;
  line-height: 60px;
}
#index {
  .logoname {
    font-size: 22px;
    font-family: PingFang SC;
    color: rgba(255, 255, 255, 1);
  }
  .Hright {
    float: right;
    display: inline-block;
  }
  .headerBtn {
    margin-top: 12px;
    width: 36px;
    height: 36px;
    background: rgba(53, 63, 77, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    opacity: 1;
    border-radius: 18px;
    display: inline-block;
    position: relative;
  }
  .btnIcon {
    width: 14px;
    height: 16px;
    left: 50%;
    top: 50%;
    margin: -8px 0 0 -7px;
    display: block;
    position: absolute;
  }
}
</style>
