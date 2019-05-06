<template>
    <div :class="classObj" class="reader-wrapper">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
        <sidebar class="sidebar-container"/>
        <div class="main-container">
            <navbar/>
            <app-main/>
        </div>
    </div>
</template>

<script>
    import {Navbar, Sidebar, AppMain} from './components'
    import {getBookByBookID} from '@/api/books'

    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            bookInfo() {
                return this.$store.state.book.info
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        watch: {
            '$route': function (val) {
                let bookID = val.params.bookID
                if (this.bookInfo.bookID === undefined || this.bookInfo.bookID !== bookID) {
                    getBookByBookID(bookID).then(v => {
                        this.$store.dispatch('setBookInfo', v)
                    })
                }
            },
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('CloseSideBar', {withoutAnimation: false})
            }
        },
        created() {
            let bookID = this.$route.params.bookID
            if (this.bookInfo.bookID === undefined || this.bookInfo.bookID !== bookID) {
                getBookByBookID(bookID).then(v => {
                    this.$store.dispatch('setBookInfo', v)
                })
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";

    .reader-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
