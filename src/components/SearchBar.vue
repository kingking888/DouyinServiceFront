<template>
    <div id="SearchBar">
        <div class="tags">
            <div v-for="(item, index) in tag_list" :key="index"
                 @click="clickChangeColor(item, index)"
                 :class="{red:x === index}" style="display: inline-block;
                font-size: 16px;
                margin-right: 5px;
                letter-spacing: 2px;
                border-radius: 4px;
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
                margin-left: 70px;
                position: relative;">
                {{item.name}}
            </div>
        </div>
        <div class="search">
            <el-autocomplete
                    class="inline-input"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    :placeholder = "placeholder"
                    :trigger-on-focus="false"
                    :prefix-icon="icon"
                    @select="handleSelect"
                    :select-when-unmatched="true">
            </el-autocomplete>
        </div>
    </div>

</template>

<script>
    import {mapMutations} from 'vuex';
    import TableData from '../components/TableData'
    import bus from '../bus'

    export default {
        name: "SearchBar",
        components:{
            "table_data":TableData,
        },
        data() {
            return {
                restaurants: [],
                icon:'',
                state:'',
                placeholder:'',
                x:null,

                tag_list:[
                    {
                        id: '0',
                        name: '本地搜索'
                    },{
                        id: '1',
                        name: '抖音搜索'
                    },
                ],
            };
        },

        props:{
            author_psc:{
                type:Number,
                required:true
            }
        },


        methods: {
            ...mapMutations(['ChangeSearchVal', 'ChangeComponent', 'ChangeSearchType', 'ChangeTableLoading']),
            /**
             * 监听搜索提示的补全的内容，并把搜索栏的内容清空
             * @param item: 搜索栏里面的内容
             */
            handleSelect(item) {
                this.ChangeSearchVal(item.value);
                this.state = '';

                if (this.$store.state.search_type === 1){
                    this.ChangeTableLoading(1);
                    this.$axios.get('/api/author/local/', {
                        params:{'search':item.value} })
                        .then(response =>{
                            bus.$emit('table_info', response.data)
                        });

                }else if (this.$store.state.search_type === 2){
                    this.ChangeTableLoading(1);
                    for (let i = 0; i < (parseInt(this.author_psc) / 10); i++) {
                        this.$axios.get('/api/author/douyin/', {
                            params:{'keyinput':item.value, 'curosr':i} })
                            .then(response =>{
                                bus.$emit('table_info', response.data)
                            });
                        }
                    }
                },
            /**
             * 使点击的搜索类型标签高亮，并且更改搜索内容提示和图标
             * @param item
             * @param index 搜索类型下标，用作判断
             */
            clickChangeColor (item, index) {
                if (index===0) {
                    this.placeholder = "从本地搜索";
                    this.ChangeSearchType(1)
                }else if (index===1){
                    this.placeholder = "从抖音搜索";
                    this.ChangeSearchType(2)
                }
                this.x = index;
            },
            /**
             * element-ui封装函数
             * @param queryString
             * @param cb
             */
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            /**
             * element-ui封装函数
             * @param queryString
             * @returns {function(*): boolean}
             */
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            loadAll() {
                return [

                ];
            },


        },
        mounted() {
            this.restaurants = this.loadAll();
        },

        /**
         * 进入网站时，先把搜索图标改成el-icon-search
         */
        created(){
            this.icon ="el-icon-search";
            // this.x = 0;
            this.placeholder = "从本地搜索";
        }
    }

</script>

<style scoped >
    .red{
        background-color: #409EFF;
        color: white;
        border-radius:5px;
    }

    .logo{
        height: 300px;
        width: 300px;
        margin: 0 auto;
    }
    .tags{
        height: 40px;
        width: 548px;
        margin: 0 auto;
        padding-left: 70px;
    }

    .search{
        height: 60px;
        width: 548px;
        margin: 0 auto;
    }

    /deep/
    .el-autocomplete{

    }
    /deep/
    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 550px;
        box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
        border-radius: 10px;
        height: 44px;

    }
    /deep/
    .el-input__inner {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 10px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        height: 44px;
        margin: 0 auto;

    }
    /deep/
    .el-input__inner:focus {
        border-color: #DCDFE6;
        outline: 0;
    }

    .el-scrollbar /deep/ .b {border-radius: 10px;}





</style>
