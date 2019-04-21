<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
                :default-active="$route.path"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                mode="vertical" :router="isRouterMode"
                :collapse="isCollapse">
            <el-submenu index="/eden/my">
                <template #title>
                    <i class="el-icon-star-Iioff"></i>
                    <span>我的</span>
                </template>
                <el-menu-item index="/eden/my/dashboard">仪表盘</el-menu-item>
                <el-menu-item index="/eden/my/role">人物信息</el-menu-item>
                <el-menu-item index="/eden/my/skills">技能训练</el-menu-item>
                <el-menu-item index="/eden/my/mails">邮件</el-menu-item>
                <el-menu-item index="/eden/my/favorites">收藏夹</el-menu-item>
            </el-submenu>
            <el-menu-item index="/eden/vault">
                <i class="el-icon-sort"></i>
                <span>库存</span>
            </el-menu-item>
            <el-menu-item index="/eden/wallet">
                <i class="el-icon-goods"></i>
                <span>钱包</span>
            </el-menu-item>
            <el-menu-item index="/eden/log">
                <i class="el-icon-edit-outline"></i>
                <span>任务记录</span>
            </el-menu-item>
            <el-menu-item index="/eden/equipment">
                <i class="el-icon-news"></i>
                <span>舰船装配</span>
            </el-menu-item>
            <el-menu-item index="/eden/industry">
                <i class="el-icon-refresh"></i>
                <span>工业生产</span>
            </el-menu-item>
            <el-menu-item index="/eden/legion">
                <i class="el-icon-service"></i>
                <span>军团</span>
            </el-menu-item>
            <el-menu-item index="/eden/map">
                <i class="el-icon-location"></i>
                <span>星图</span>
            </el-menu-item>
            <el-menu-item index="/eden/planet">
                <i class="el-icon-view"></i>
                <span>行星开发</span>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import { mapGetters } from 'vuex'
    import variables from '@/styles/variables.scss'

    export default {
        data: function () {
            return {
                isRouterMode: true
            }
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            routes() {
                return this.$router.options.routes
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>
