<template>
    <vue-markdown class="markdown-container" v-bind:source="source" @rendered="refreshMarkdown"></vue-markdown>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import {getBookByBookID, getBookContent} from '@/api/books'
    import '@/styles/markdown-theme-sspai.scss'

    import highlight from 'highlight.js'
    import 'highlight.js/styles/tomorrow.css'

    export default {
        name: "bookPage",
        components: {
            VueMarkdown
        },
        data: function () {
            return {
                source: '',
            }
        },
        computed: {
            bookInfo() {
                return this.$store.state.book.info
            },
        },
        watch: {
            '$route': function () {
                let path = this.$route.params.pathMatch
                getBookContent(this.bookInfo, path).then(v => {
                    this.source = v.data
                })
            },
            bookInfo: function () {
                this.refreshBookContent()
            }
        },
        methods: {
            refreshMarkdown() {
                this.$nextTick(() => {
                    let elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code')
                    elements.forEach(value => {
                        highlight.highlightBlock(value)
                    })
                })
            },
            refreshBookContent: async function() {
                let bookID = this.$route.params.bookID
                if (this.bookInfo.bookID === undefined || this.bookInfo.bookID !== bookID) {
                    let book = await getBookByBookID(bookID)
                    this.$store.dispatch('setBookInfo', book)
                }
                let path = this.$route.params.pathMatch
                let bookContent = await getBookContent(this.bookInfo, path)
                this.source = bookContent.data
            }
        },
        created() {
            let bookID = this.$route.params.bookID
            if (this.bookInfo.bookID !== undefined && this.bookInfo.bookID === bookID) {
                let path = this.$route.params.pathMatch
                getBookContent(this.bookInfo, path).then(v => {
                    this.source = v.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
