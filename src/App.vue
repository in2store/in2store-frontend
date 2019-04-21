<template>
    <div id="app" style="position:absolute; left:0; top:0; right: 0;bottom: 0">
        <router-view></router-view>
    </div>
</template>

<script>
    import router from './routers/router'
    import store from './store'

    export default {
        name: 'app',
        router,
        store
    }
</script>

<style>
    body {
        margin: 0;
    }
    /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    /*}*/
</style>
