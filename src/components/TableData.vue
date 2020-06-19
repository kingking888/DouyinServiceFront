<template>
    <div id="tables">
        <div class="table_info">
            <div class="line_01" style="color: #409EFF; margin-bottom: 30px">搜索结果</div>
            <el-table
                    ref="multipleTable"
                    tooltip-effect="dark"
                    :data="this.$store.state.tableData"
                    style="width: 100%"
                    height="700"
                    :border="true"
                    @selection-change="handleSelectionChange"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    v-loading="this.$store.state.table_loading"
                    element-loading-text="正在获取数据，请耐心等待"
                    element-loading-spinner="el-icon-loading">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="author_name"
                        label="姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="author_unique_id"
                        label="抖音ID"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="author_gender"
                        label="性别"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="author_fans_num"
                        label="粉丝数"
                        width="120"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="author_favorited"
                        label="获赞数"
                        width="120"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="author_aweme_count"
                        label="作品数"
                        width="120"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="follow_num"
                        label="脚本已关注数"
                        width="250"
                        sortable>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="toggleSelection()">取消选择</el-button>
                <el-button @click="clearTable()">清空列表</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../bus'
    import SearchBar from '../components/SearchBar'
    import {mapMutations} from 'vuex';

    export default {
        name: "tables",
        components:{
            "search_bar":SearchBar,
        },
        data() {
            return {
                multipleSelection: [],
                loading:''
            }
        },
        methods: {
            ...mapMutations(['ChangeTableLoading','ChangeTableData', 'ClearTableData']),
            clearTable(){
                this.ClearTableData()
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                bus.$emit('multipleSelection', this.multipleSelection)
            }
        },
        created(){
            bus.$on('table_info', (table_data)=>{
                if(table_data){
                    this.ChangeTableLoading(2);
                    for (const i in table_data.results) {
                        this.ChangeTableData(table_data.results[i])
                    }
                }
            })
        }
    }
</script>

<style scoped>
    .table_info{
        width: 1000px;
        height: 800px;
        padding: 0 20px 20px 20px;
        margin-top: 1.125rem;
        box-shadow: 0.5rem 0.875rem 2.375rem rgba(39,44,49,.06), 0.0625rem 0.1875rem 0.5rem rgba(39,44,49,.03);
        background-color: #fff;
        border-radius: .5rem;
        margin-bottom: 9px;
        float: left;
        margin-left: 20px;
        border: solid 1px #e6e6e6;
    }

    .line_01{
        padding: 0 20px 0;
        margin: 20px 0;
        line-height: 1px;
        border-left: 200px solid #ddd;
        border-right: 200px solid #ddd;
        text-align: center;

    }
</style>
