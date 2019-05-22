<template>
    <div class="index-wrapper">
        <top-nav></top-nav>
        <div class="container main">
            <div class="sidebar-wrapper">
                <categories></categories>
            </div>
            <div class="main-wrapper">
                <el-card v-if="loading" shadow="never" style="height: 100px" v-loading="loading"></el-card>
                <el-card v-else v-for="book in books" :key="book.bookID" shadow="hover" style="margin-bottom: 20px">
                    <div class="book-cover">
                        <router-link :to="'/users/' + book.user.userID + '/books/' + book.bookID">
                            <el-image style="width:80px;height:80px" fit="scale-down">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </router-link>
                    </div>
                    <div class="book-meta">
                        <h2>
                            <router-link :to="'/users/' + book.user.userID + '/books/' + book.bookID">
                                {{ book.title }}
                            </router-link>
                            <el-tag v-if="book.selected" size="mini" type="danger">精选</el-tag>
                        </h2>
                        <p>
                            <el-tag v-for="tag in book.tags" :key="tag.tagID" size="mini">{{tag.name}}</el-tag>
                        </p>
                        <p>
                            <el-link :underline="false" type="info">{{book.user.name}}</el-link>
                            <el-divider direction="vertical"></el-divider>
                            <el-link :underline="false" type="info">{{book.categoryKey}}</el-link>
                            <el-divider direction="vertical"></el-divider>
                            <span>{{$moment(book.createTime).fromNow()}}</span>
                        </p>
                    </div>
                    <div class="book-stars">
                        <el-button icon="el-icon-star-off" size="mini" round>239</el-button>
                    </div>
                </el-card>
                <el-card v-if="!loading && books.length === 0" shadow="never" class="not-found"><i
                        class="el-icon-search"></i> 暂时没有找到文档
                </el-card>
            </div>
            <div class="right-wrapper">
                <tag-cloud></tag-cloud>
            </div>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/components/TopNav'
    import TagCloud from '@/components/Widget/tag-cloud'
    import Categories from '@/components/Widget/categories'
    import {getBooksByTagWithDetail} from '@/api/tags'
    import moment from 'moment'

    export default {
        name: "tag",
        components: {
            TopNav,
            TagCloud,
            Categories,
        },
        data: function () {
            return {
                books: [],
                loading: true,
                size: 10,
                offset: 0
            }
        },
        watch: {
            '$route': function (val) {
                this.books.length = 0
                this.offset = 0
                if (val.params.tagName !== undefined) {
                    this.getBooksMeta(val.params.tagName, this.offset)
                }
            },
        },
        methods: {
            getBooksMeta(tag, offset) {
                this.loading = true
                getBooksByTagWithDetail(tag, this.size, offset).then(resp => {
                    this.loading = false
                    this.books.push(...resp.data)
                })
            },
        },
        created() {
            moment.locale('zh-cn')
            this.$moment = moment
            if (this.$route.params.tagName !== undefined) {
                this.getBooksMeta(this.$route.params.tagName, this.offset)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
