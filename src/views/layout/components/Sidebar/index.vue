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
                    <span>我的</span>
                </template>
                <el-menu-item index="/eden/my/dashboard">仪表盘</el-menu-item>
                <el-menu-item index="/eden/my/role">人物信息</el-menu-item>
                <el-menu-item index="/eden/my/skills">技能训练</el-menu-item>
                <el-menu-item index="/eden/my/mails">邮件</el-menu-item>
                <el-menu-item index="/eden/my/favorites">收藏夹</el-menu-item>
            </el-submenu>
            <el-menu-item index="/eden/vault">
                <span>库存</span>
            </el-menu-item>
            <el-menu-item index="/eden/wallet">
                <span>钱包</span>
            </el-menu-item>
            <el-menu-item index="/eden/log">
                <span>任务记录</span>
            </el-menu-item>
            <el-menu-item index="/eden/equipment">
                <span>舰船装配</span>
            </el-menu-item>
            <el-menu-item index="/eden/industry">
                <span>工业生产</span>
            </el-menu-item>
            <el-menu-item index="/eden/legion">
                <span>军团</span>
            </el-menu-item>
            <el-menu-item index="/eden/map">
                <span>星图</span>
            </el-menu-item>
            <el-menu-item index="/eden/planet">
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
