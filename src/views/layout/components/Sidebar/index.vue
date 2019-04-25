<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
                :default-active="$route.path"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                mode="vertical" :router="isRouterMode"
                :collapse="isCollapse">
            <menu-item v-for="item in summary" v-bind:source="item" v-bind:key="item.path"
                       v-bind:base-url="baseURL"></menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {getBookSummary} from '@/api/books'
    import {mapGetters} from 'vuex'
    import variables from '@/styles/variables.scss'
    import showdown from 'showdown'
    import cheerio from 'cheerio'
    import MenuItem from './MenuItem'

    export default {
        components: {
            MenuItem
        },
        data: function () {
            return {
                baseURL: "",
                isRouterMode: true,
                summary: [],
                summaryMap: new Map(),
            }
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            routes() {
                return this.$router.options.routes
            },
            bookInfo() {
                return this.$store.state.book.info
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        },
        watch: {
            bookInfo: function (val) {
                getBookSummary(val).then(v => {
                    this.generateSummary(v.data)
                })
            },
            '$route': function (val) {
                this.baseURL = '/users/' + val.params.userID + '/books/' + val.params.bookID + '/'
            },
        },
        created() {
            this.baseURL = '/users/' + this.$route.params.userID + '/books/' + this.$route.params.bookID + '/'
        },
        methods: {
            generateSummary(summaryContent) {
                let converter = new showdown.Converter()
                let html = converter.makeHtml(summaryContent)
                const $ = cheerio.load(html)

                this.summaryMap.clear()
                this.summary.length = 0
                this.summary.push(...this.parseSummary($))
            },
            parseSummary($, el) {
                let children = []
                let vue = this
                let target
                if (el !== undefined) {
                    target = $(el).find('ul > li')
                } else {
                    target = $('ul > li')
                }
                target.each(function () {
                    let link = $(this).find('> a').attr('href')
                    if (link !== undefined && vue.summaryMap.has(link)) {
                        return
                    }
                    children.push({
                        title: $(this).find('> a').text(),
                        path: link,
                        children: vue.parseSummary($, this)
                    })
                    vue.summaryMap.set(link, true)
                })
                return children
            }
        }
    }
</script>
