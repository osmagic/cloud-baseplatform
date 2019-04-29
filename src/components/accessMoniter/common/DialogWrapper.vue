<template>
    <el-dialog
        :visible="di.Visible"
        :close-on-click-modal="false"
        :title="di.Title"
        :width="di.Width"
        top="0"
        class="createDialogWrapper"
        @close="closeDialogVis">
        <slot name="container"></slot>
        <slot name="showfooter">
            <span v-show="di.isshowfooter" slot="footer" class="dialog-footer">
                <el-button :disabled="isDisabled" class="set-width" type="primary" @click="createDashBoard" v-text="footerBtn.ok"></el-button>
                <el-button class="set-width" @click.stop="closeDialogVis" v-text="footerBtn.cancel"></el-button>
            </span>
        </slot>
    </el-dialog>
</template>

<script>

export default {
    name: 'DialogWrapper',
    components: {},
    props: {
        di: {
            type: Object,
            default: () => {
                return {
                    Visible: false,
                    Title: '新建',
                    Width: '640px',
                    height: '490px',
                    isshowfooter: false
                }
            }
        },
        footerBtn: {
            type: Object,
            default: () => {
                return {
                    cancel: '取 消',
                    ok: '确 定'
                }
            }
        },
        // 是否禁止点击确定按钮
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        createDashBoard() {
            console.log('调用确定接口，成功后关闭窗口')
            this.$emit('saveDialog')
        },
        closeDialogVis() {
            console.log('close前，数据清空处理')
            this.$emit('closeDialog')
        }
    }
}
</script>

<style lang="scss">
.createDialogWrapper{
    .el-icon-close:before {
        color: #fff;
        background: #4C83FF;
    }
    .el-dialog__footer {
        padding: 45px 20px 20px !important;
        text-align: center;
    }
    .el-dialog{
        // border-right: 1px solid #43434D;
        position: absolute;
        display: flex;
        flex-direction: column;
        max-height: 80%;
        margin: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow:0px 6px 20px rgba(0,0,0,0.4);
        .el-dialog__header{
            border-radius: 4px;
            background-color: #ffffff;
            // border-bottom: 1px solid #D3E2FE;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            padding: 0 20px;
            height: 66px;
            line-height: 46px;
            color: #CCCCCC;
            button[type='button'].el-dialog__headerbtn{
                top: 0;
            }
            .el-dialog__title{
                position: absolute;
                top: 40px;
                font-family: 'PingFang SC';
                font-weight:bold;
                font-size: 22px;
                color: #4D4F5C;
            }
        }
        .el-dialog__body{
            padding: 20px 20px 0;
        }
        .addLogBox{
            .infoList{
                margin-top: 10px;
                max-height: 200px;
                overflow-y: scroll;
                ul{
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    li{
                        color: #5A6D82;
                        font-size: 12px;
                        height: 40px;
                        line-height: 40px;
                        text-indent: 10px;
                        i.el-icon-check{
                            display: none;
                            margin-right: 10px;
                            color: #2db7f5;
                            font-size: 18px;
                            height: 40px;
                            line-height: 40px;
                        }
                    }
                    li:hover{
                        background-color: #409EFF;
                        color: #FFFFFF;
                        i.el-icon-check{
                            display: none;
                            color: #2db7f5;
                            font-size: 18px;
                            height: 40px;
                            line-height: 40px
                        }
                    }
                    li.is-active{
                        background-color: #409EFF;
                        color: #FFFFFF;
                        i.el-icon-check{
                            float: right;
                            color: #FFFFFF;
                            display: inline-block;
                            font-size: 18px;
                            height: 36px;
                            line-height: 36px
                        }
                    }
                }
            }
        }
    }
    .dialog-footer {
      .set-width {
          width: 85px;
      }
      .el-button--default {
          background-color: rgba(255,255,255,0.2);
          color: #4D4F5C;
          border:1px solid rgba(77,79,92,0.2);
          height: 34px;
          line-height: 8px;
          &:hover {
              border:1px solid rgba(49,148,255,0.5019607843137255);
              color: #3194FF;
          }
      }

    }
    .el-button--primary {
        height: 34px;
        line-height: 8px;
        margin-left: 16px;
    }
}
</style>
