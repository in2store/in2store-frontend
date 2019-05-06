<template>
    <div class="widget-wrapper">
        <h3><i class="el-icon-search"></i> 热门标签</h3>
        <div>
            <el-tag size="small">云计算</el-tag>
            <el-tag size="small">开发运维</el-tag>
            <el-tag size="small">数据库</el-tag>
            <el-tag size="small">golang</el-tag>
            <el-tag size="small">java</el-tag>
            <el-tag size="small">c++</el-tag>
            <el-tag size="small">MongoDB</el-tag>
            <el-tag size="small">redis</el-tag>
            <el-tag size="small">php</el-tag>
            <el-tag size="small">blockchain</el-tag>
            <el-tag size="small">test</el-tag>
            <el-tag size="small">production</el-tag>
            <el-tag size="small">深度学习</el-tag>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tag-cloud"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .index-wrapper {
        .right-wrapper {
            .widget-wrapper {
                .el-tag {
                    margin-left: 10px;
                    margin-top: 10px;
                }
            }
        }
    }
</style>
