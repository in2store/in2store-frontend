<template>
    <el-menu-item v-if="source.children.length === 0" v-bind:key="source.path" v-bind:index="baseUrl + source.path">
        <span>{{ source.title }}</span>
    </el-menu-item>
    <el-submenu v-else v-bind:key="source.path" v-bind:index="baseUrl + source.path">
        <template #title>
            <span>{{ source.title }}</span>
        </template>
        <menu-item v-for="child in source.children" v-bind:source="child" v-bind:key="child.path" v-bind:base-url="baseUrl"></menu-item>
    </el-submenu>
</template>

<script>
    export default {
        name: "MenuItem",
        props: [
            'source',
            'baseUrl',
        ],
    }
</script>

<style scoped>

</style>
