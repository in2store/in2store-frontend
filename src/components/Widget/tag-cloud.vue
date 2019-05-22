<template>
    <div class="widget-wrapper">
        <h3><i class="el-icon-search"></i> 热门标签</h3>
        <div v-if="loadingTags" v-loading="loadingTags" style="height: 100px;"></div>
        <div v-else-if="tags.length > 0">
            <router-link v-for="tag in tags" :key="tag.tagID" :to="'/tag/' + tag.name"><el-tag size="small">{{tag.name}}</el-tag></router-link>
        </div>
        <el-card v-else shadow="never" class="not-found">
            <p>暂时没有数据</p>
        </el-card>
    </div>
</template>

<script>
    import {getTags} from '@/api/tags'

    export default {
        name: "tag-cloud",
        data: function () {
            return {
                loadingTags: false,
                tags: [],
            }
        },
        created() {
            this.loadingTags = true
            getTags().then(resp => {
                if(resp !== null) {
                    this.tags = resp
                }
                this.loadingTags = false
            }).catch(() => {
                this.loadingTags = false
            })
        }
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
                .not-found {
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    background: #f5f7fa;
                    color: #909399;
                    font-size: 18px;
                }
            }
        }
    }
</style>
