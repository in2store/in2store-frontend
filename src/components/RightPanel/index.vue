<template>
    <div class="right-wrapper">
        <explore-widget></explore-widget>
        <tag-cloud></tag-cloud>
        <most-stars></most-stars>
    </div>
</template>

<script>
    import ExploreWidget from '@/components/Widget/explore'
    import TagCloud from '@/components/Widget/tag-cloud'
    import MostStars from '@/components/Widget/most-stars'

    export default {
        name: "index",
        components: {
            ExploreWidget,
            TagCloud,
            MostStars,
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .index-wrapper {
        .right-wrapper {
            position: absolute;
            top: 61px;
            right: 0;
            width: 230px;
            padding-top: 20px;

            .widget-wrapper {
                padding-top: 20px;
            }
        }
    }
</style>
