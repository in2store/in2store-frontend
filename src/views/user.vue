<template>
    <div style="padding: 20px 20%">
        <router-link :to="'/users/' + book.userID + '/books/' + book.bookID" v-for="book in books" v-bind:key="book.bookID">
            <el-card shadow="hover" style="margin-bottom: 20px">
                <p>{{ book.title }}</p>
            </el-card>
        </router-link>
    </div>
</template>

<script>
    import {getBooksMeta} from '@/api/books'

    export default {
        name: "user",
        data: function () {
            return {
                books: [],
            }
        },
        methods: {
            getCurrentUserBooksMeta() {
                let userID = this.$route.params.userID
                getBooksMeta(userID, "", 10, 0).then(resp => {
                    this.books = resp.data
                })
            }
        },
        watch: {
            '$route': function() {
                this.getCurrentUserBooksMeta()
            }
        },
        created() {
            this.getCurrentUserBooksMeta()
        }
    }
</script>

<style scoped>

</style>
