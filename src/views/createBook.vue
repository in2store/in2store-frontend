<template>
    <div style="padding: 50px 20%">
        <el-form ref="form" :model="form" :rules="formValidationRules" label-width="80px">

            <el-form-item label="GIT服务" prop="currentChannelID">
                <el-radio-group v-model="form.currentChannelID">
                    <el-radio-button v-for="channel in channels" v-bind:key="channel.channelID"
                                     :label="channel.channelID">{{
                        channel.name }}
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="代码仓库" prop="currentRepoFullName">
                <el-select v-model="form.currentRepoFullName" filterable placeholder="请选择代码仓库"
                           @change="checkRepoSummary"
                           style="width: 400px">
                    <el-option
                            v-for="repo in reposResult.data"
                            :key="repo.fullName"
                            :label="repo.fullName"
                            :value="repo.fullName">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="分支名" prop="currentBranchName">
                <el-select v-model="form.currentBranchName" filterable placeholder="请选择分支名，默认master"
                           style="width: 400px">
                    <el-option
                            v-for="repo in branchesResult.data"
                            :key="repo.name"
                            :label="repo.name"
                            :value="repo.name">
                    </el-option>
                </el-select>
                <p>* 将会检查所属代码仓库及分支名下是否包含 SUMMARY.md 文件</p>
                <p v-if="noneSummaryRepo" style="color: #f22f27;">* 指定代码仓库及分支下未找到 SUMMARY.md 文件</p>
            </el-form-item>

            <el-form-item label="书名" prop="bookName">
                <el-input v-model="form.bookName" placeholder="请输入书籍名称"></el-input>
            </el-form-item>

            <el-form-item label="书籍分类" prop="currentCategoryKey">
                <el-select v-model="form.currentCategoryKey" filterable placeholder="请选择书籍分类">
                    <el-option
                            v-for="cat in categoryKeys"
                            :key="cat.categoryKey"
                            :label="cat.name"
                            :value="cat.categoryKey">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="简介" prop="bookComment">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 10}"
                        placeholder="请输入简介"
                        v-model="form.bookComment">
                </el-input>
            </el-form-item>

            <el-form-item label="书籍语言" prop="currentBookLanguage">
                <el-select v-model="form.currentBookLanguage" filterable placeholder="请选择书籍语言">
                    <el-option
                            v-for="repo in bookLanguages"
                            :key="repo.value"
                            :label="repo.label"
                            :value="repo.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="代码语言" prop="currentCodeLanguage">
                <el-select v-model="form.currentCodeLanguage" filterable placeholder="请选择代码语言">
                    <el-option
                            v-for="repo in codeLanguages"
                            :key="repo.value"
                            :label="repo.label"
                            :value="repo.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="createBook">立即创建</el-button>
                <el-button @click="resetForm">重置</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getChannels} from '@/api/channels'
    import {getRepos, getBranches, getRepoSummary} from '@/api/repos'
    import {createBook, getBookMetas} from '@/api/books'
    import {getCategories} from '@/api/categories'

    export default {
        name: "createBook",
        data: function () {
            return {
                channels: [],
                reposResult: {},
                branchesResult: {},
                noneSummaryRepo: false,
                categoryKeys: [],
                bookLanguages: [],
                codeLanguages: [],
                form: {
                    currentChannelID: "",
                    currentRepoFullName: "",
                    currentBranchName: "",
                    currentSummaryPath: "",
                    bookName: "",
                    currentCategoryKey: "",
                    bookComment: "",
                    currentBookLanguage: "",
                    currentCodeLanguage: "",
                },
                formValidationRules: {
                    currentChannelID: [
                        {required: true, message: '请选择GIT服务', trigger: 'blur'}
                    ],
                    currentRepoFullName: [
                        {required: true, message: '请选择代码仓库', trigger: 'blur'}
                    ],
                    currentBranchName: [
                        {required: true, message: '请选择代码分支', trigger: 'blur'}
                    ],
                    bookName: [
                        {required: true, message: '请输入书籍名称', trigger: 'blur'}
                    ],
                    currentCategoryKey: [
                        {required: true, message: '请选择书籍分类', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            checkRepoSummary() {
                if (this.form.currentRepoFullName !== "" && this.form.currentBranchName !== "") {
                    getRepoSummary(this.form.currentRepoFullName, this.form.currentBranchName).then(() => {
                        this.noneSummaryRepo = false
                    }, () => {
                        this.noneSummaryRepo = true
                    })
                }
            },
            createBook() {
                this.$refs['form'].validate((valid) => {
                    if (valid && !this.noneSummaryRepo) {
                        createBook({
                            channelID: this.form.currentChannelID,
                            repoFullName: this.form.currentRepoFullName,
                            repoBranchName: this.form.currentBranchName,
                            summaryPath: this.form.currentSummaryPath,
                            title: this.form.bookName,
                            categoryKey: this.form.currentCategoryKey,
                            comment: this.form.bookComment,
                            bookLanguage: this.form.currentBookLanguage,
                            codeLanguage: this.form.currentCodeLanguage,
                        }).then(resp => {
                            let userID = resp.userID
                            this.$router.push({path:'/users/' + userID + '/books/' + resp.bookID})
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['form'].resetFields();
            },
        },
        watch: {
            'form.currentChannelID': function (channelID) {
                getRepos(channelID, 50, 1).then(data => {
                    this.reposResult = data
                })
            },
            'form.currentRepoFullName': function (repoFullName) {
                getBranches(this.form.currentChannelID, repoFullName, 50, 1).then(data => {
                    this.branchesResult = data
                })
            },
            'form.currentBranchName': function () {
                this.checkRepoSummary()
            },
        },
        created() {
            getChannels().then(data => {
                this.channels = data
            })
            getBookMetas().then(data => {
                this.bookLanguages = data.bookLanguage
                this.codeLanguages = data.codeLanguage
            })
            getCategories().then(data => {
                this.categoryKeys = data.data
            })
        }
    }
</script>

<style scoped>

</style>
