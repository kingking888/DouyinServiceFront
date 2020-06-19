<template>
    <div id="Index">
        <div class="information_info">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="配置中心" name="first"><filter_main></filter_main></el-tab-pane>
                <el-tab-pane label="监控中心" name="second"><console_window></console_window></el-tab-pane>
<!--                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
<!--                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
            </el-tabs>
        </div>


    </div>

</template>

<script>
    import SearchBar from '../components/SearchBar'
    import FilterMain from '../components/FilterMain'
    import TableData from '../components/TableData'
    import ConsoleWindow from '../components/ConsoleWindow'
    export default {
        name: "Index",
        components:{
            "search_bar":SearchBar,
            "table_data":TableData,
            "filter_main":FilterMain,
            "console_window":ConsoleWindow,
        },

        data() {
            return {
                isCollapse: true,

                restaurants: [],
                icon:'',
                state:'',
                placeholder:'',
                x:null,
                activeName: 'second',
                tag_list:[
                    {
                        id: '0',
                        name: '本地'
                    },{
                        id: '1',
                        name: '抖音'
                    }
                ],
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }

    }
</script>

<style scoped>
    .information_info{
        width: 1700px;
        height: 900px;
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

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 900px;
        float: left;
        margin-left: 5px;

    }
    /deep/
    .el-menu-vertical-demo[data-v-b4b32730]:not(.el-menu--collapse) {
        height: 900px;
    }
    /deep/
    .el-col-12 {
        width: 250px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 900px;
        float: left;
        margin-left: 5px;

    }
    /deep/
    .el-menu-vertical-demo[data-v-b4b32730]:not(.el-menu--collapse) {
        height: 900px;
    }

    /deep/
    .tac{
        width: 250px;
    }

    /deep/
    .el-menu{
        box-shadow: 0.5rem 0.875rem 2.375rem rgba(39,44,49,.06), 0.0625rem 0.1875rem 0.5rem rgba(39,44,49,.03);
        border-radius: .5rem;
        background-color: #fff;
        border: solid 1px #e6e6e6;
        margin-top: 1.125rem;


    }
</style>
