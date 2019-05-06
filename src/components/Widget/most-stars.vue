<template>
    <div class="widget-wrapper">
        <h3><i class="el-icon-search"></i> 大家关注的作者</h3>
        <ul>
            <li>
                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100"
                     class="avatar">
                <span>johnnyeven</span>
            </li>
            <li>
                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100"
                     class="avatar">
                <span>johnnyeven</span>
            </li>
            <li>
                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100"
                     class="avatar">
                <span>johnnyeven</span>
            </li>
            <li>
                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100"
                     class="avatar">
                <span>johnnyeven</span>
            </li>
            <li>
                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100"
                     class="avatar">
                <span>johnnyeven</span>
            </li>
            <li>
                <img src="https://oss.love2.io/e6e093ce-568f-11e9-9766-00163e0f8adb.png?x-oss-process=style/100x100"
                     class="avatar">
                <span>johnnyeven</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "most-stars"
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .index-wrapper {
        .right-wrapper {
            .widget-wrapper {
                ul {
                    list-style: none;
                    padding-left: 10px;

                    li {
                        height: 40px;
                        line-height: 40px;
                        box-sizing: border-box;

                        img.avatar {
                            width: 20px;
                            height: 20px;
                            border-radius: 100%;
                            float: left;
                            margin-top: 10px;
                        }

                        span {
                            line-height: 20px;
                            padding-left: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
