<template>
    <div class="index-wrapper">
        <top-nav></top-nav>
        <div class="container main">
            <left-nav></left-nav>
            <div class="main-wrapper">
                <el-card v-if="loading" shadow="never" style="height: 100px" v-loading="loading"></el-card>
                <el-card v-else v-for="book in books" :key="book.bookID" shadow="hover" style="margin-bottom: 20px">
                    <h3>{{ book.title }}</h3>
                </el-card>
            </div>
            <right-panel></right-panel>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/components/TopNav'
    import LeftNav from '@/components/LeftNav'
    import RightPanel from '@/components/RightPanel'
    import {getBooksMeta} from '@/api/books'

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
                getBooksMeta("", categoryKey, selected, this.size, offset).then(resp => {
                    this.loading = false
                    this.books.push(...resp.data)
                })
            },
        },
        created() {
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
</style>
