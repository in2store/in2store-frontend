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
                <explore-widget></explore-widget>
                <tag-cloud></tag-cloud>
                <most-stars></most-stars>
            </div>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/components/TopNav'
    import ExploreWidget from '@/components/Widget/explore'
    import TagCloud from '@/components/Widget/tag-cloud'
    import MostStars from '@/components/Widget/most-stars'
    import Categories from '@/components/Widget/categories'
    import {getBooksMetaWithDetail} from '@/api/books'
    import moment from 'moment'
    import {Loading} from 'element-ui';
    import {authorize} from '@/api/channels'
    import {setToken} from '@/utils/auth'

    export default {
        name: "category",
        components: {
            TopNav,
            ExploreWidget,
            TagCloud,
            MostStars,
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
                if (val.params.categoryName === undefined) {
                    this.getBooksMeta("", "TRUE", this.offset)
                } else {
                    this.getBooksMeta(val.params.categoryName, "", this.offset)
                }
            },
        },
        methods: {
            getBooksMeta(categoryKey, selected, offset) {
                this.loading = true
                getBooksMetaWithDetail("", categoryKey, selected, this.size, offset).then(resp => {
                    this.loading = false
                    this.books.push(...resp.data)
                })
            },
        },
        created() {
            if (this.$route.query.code !== undefined && this.$route.query.state !== undefined) {
                let loadingInstance = Loading.service({
                    fullscreen: true,
                    text: '正在认证',
                })
                authorize(this.$route.query.code, this.$route.query.state).then(resp => {
                    loadingInstance.close()
                    setToken('INNER:' + resp.sessionID)
                }).catch(() => {
                    loadingInstance.close()
                })
            }
            moment.locale('zh-cn')
            this.$moment = moment
            if (this.$route.params.categoryName === undefined) {
                this.getBooksMeta("", "TRUE", this.offset)
            } else {
                this.getBooksMeta(this.$route.params.categoryName, "", this.offset)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .index-wrapper {

        .right-wrapper {
            position: absolute;
            top: 61px;
            right: 0;
            width: 230px;
            padding-top: 20px;

            .widget-wrapper {
                margin-bottom: 30px;
            }
        }

        > .container {

            .sidebar-wrapper {
                position: fixed;
                background-color: #AAAAAA;
                width: 140px;
                top: 61px;
            }

            &.main {
                padding-top: 61px;

                .main-wrapper {
                    padding-top: 20px;
                    margin-left: 150px;
                    width: 610px;
                }
            }
        }
    }

    .main-wrapper {
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

        .book-cover, .book-meta {
            float: left;
        }

        .book-cover {
            .image-slot {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: #f5f7fa;
                color: #909399;
                font-size: 30px;
                cursor: pointer;
            }
        }

        .book-meta {
            margin-left: 20px;
            width: 70%;

            h2 {
                margin: 0;
            }

            p {
                color: #909399;
                margin: 5px 0 0 0;
                font-size: 12px !important;
            }

            .el-link {
                font-size: inherit;
            }

            .el-tag + .el-tag {
                margin-left: 10px;
            }
        }

        .book-stars {
            position: absolute;
            right: 10px;
            top: 35px;
        }
    }

    .el-card__body {
        position: relative;
        padding: 10px !important;
        overflow: hidden;
    }
</style>
