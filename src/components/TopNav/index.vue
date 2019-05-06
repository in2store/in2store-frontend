<template>
    <header>
        <div class="container">
            <div class="header-container">
                <div class="header-panel">
                    <el-menu :default-active="$route.path" mode="horizontal" router>
                        <el-menu-item index="/">首页</el-menu-item>
                        <el-menu-item index="/booklists">书单</el-menu-item>
                        <el-menu-item index="/tags">标签</el-menu-item>
                        <el-menu-item index="/teams">团队</el-menu-item>
                    </el-menu>
                </div>
                <div class="header-panel">
                    <div class="header-panel-item">
                        <el-input size="small" placeholder="搜索" suffix-icon="el-icon-search"></el-input>
                    </div>
                    <div class="header-panel-item">
                        <el-tooltip effect="dark" content="新建书籍" placement="bottom">
                            <el-button icon="el-icon-plus" size="small"></el-button>
                        </el-tooltip>
                    </div>
                    <div class="header-panel-item">
                        <el-tooltip effect="dark" content="我的消息" placement="bottom">
                            <el-button icon="el-icon-message" size="small" type="primary"></el-button>
                        </el-tooltip>
                    </div>
                    <div class="header-panel-item">
                        <el-dropdown>
                            <el-button size="small">
                                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100" class="avatar">
                                <span style="margin-left: 20px">johnnyeven</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-menu">我的主页</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-more-outline" divided>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .header-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;

        > .header-panel {
            display: -webkit-inline-flex;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            height: 60px;

            > .header-panel-item {
                display: -webkit-inline-flex;
                display: -ms-inline-flexbox;
                display: inline-flex;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                -ms-flex-direction: row;
                flex-direction: row;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                margin-left: 10px;

                img {
                    &.avatar {
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        top: 21px;
                        left: 6px;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
</style>
