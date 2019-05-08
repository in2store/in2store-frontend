<template>
    <div class="index-wrapper">
        <top-nav></top-nav>
        <div class="container main">
            <left-nav></left-nav>
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
                <el-card v-if="!loading && books.length === 0" shadow="never" class="book-not-found"><i class="el-icon-search"></i> 暂时没有找到文档</el-card>
            </div>
            <right-panel></right-panel>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/components/TopNav'
    import LeftNav from '@/components/LeftNav'
    import RightPanel from '@/components/RightPanel'
    import {getBooksMetaWithDetail} from '@/api/books'
    import moment from 'moment'

    export default {
        name: "category",
        components: {TopNav, LeftNav, RightPanel},
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
            this.$moment = moment
            this.$moment.locale('zh-cn')
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
        > .container {
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
        .book-not-found {
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
