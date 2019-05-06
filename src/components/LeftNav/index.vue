<template>
    <div class="sidebar-wrapper">
        <el-menu :default-active="$route.path" router v-loading="loading">
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">精选</span>
            </el-menu-item>
            <el-menu-item v-for="cat in categories" :key="cat.categoryKey" :index="'/cat/' + cat.categoryKey">
                <i :class="cat.iconClassName"></i>
                <span slot="title">{{ cat.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {getCategories} from '@/api/categories'

    export default {
        name: "index",
        data: function () {
            return {
                categories: [],
                loading: true,
            }
        },
        created() {
            getCategories().then(resp => {
                this.categories = resp.data
                this.loading = false;
            })
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .sidebar-wrapper {
        position: fixed;
        background-color: #AAAAAA;
        width: 140px;
        top: 61px;

        .el-menu {
            border-right: none;
        }
    }
</style>
