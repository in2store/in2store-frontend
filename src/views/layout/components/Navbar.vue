<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        <breadcrumb />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar'
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        }
    }
}
</script>
