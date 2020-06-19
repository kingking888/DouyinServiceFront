<template>
    <div id="Information">
        <div class="information_info">
            <div class="line_01" style="color: #409EFF; margin-bottom: 50px">搜索功能</div>
            <search_bar v-bind:author_psc="author_psc"></search_bar>
            <div class="input_num" style="margin-top: 10px">
                <span style="color: #606266"> 搜索作者数 (t)：</span>
                <el-input-number size="mini" v-model="author_psc" @change="handleAuthorPsc" :min="1" :max="1000000" :step="10" step-strictly></el-input-number>
                <span style="margin-left: 20px;color: #606266">需要粉丝数 (t)：</span>
                <el-input-number size="mini" v-model="fan_psc" @change="handleFanPsc" :min="1" :max="1000000" :step="100" step-strictly></el-input-number>
            </div>
            <div class="line_01" style="color: #409EFF; margin-top: 50px">相关功能</div>
            <div class="open_obstacle">
                <span style="color: #606266">开启关注过开休眠：</span>
                <el-switch v-model="sleep_value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
            <div class="line_01" style="margin-top: 40px;margin-bottom: 30px;color: #409EFF">关注账号属性</div>
            <div class="select_gender">
<!--                <el-checkbox class="fl" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
<!--                <div style="margin: 15px 0;"></div>-->
                <el-checkbox-group style="width: 400px;color: #606266" v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox style="color: #606266" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="line_01" style="margin-top: 40px;margin-bottom: 30px;color: #409EFF">操作相关参数</div>
            <div class="input_num" style="margin-top: 10px">
                <span style="color: #606266"> 操作间隔 (ms)：</span>
                <el-input-number  size="mini" v-model="operating_time" @change="handleChangeOperating" :min="1" :max="1000000"></el-input-number>
                <span style="margin-left: 20px;color: #606266">观看视频时间 (ms)：</span>
                <el-input-number size="mini" v-model="watch_time" @change="handleWatch" :min="1" :max="1000000"></el-input-number>
            </div>
            <div class="input_num" style="margin-top: 20px">
                <span style="color: #606266">假关注间隔 (t)：</span>
                <el-input-number size="mini" v-model="fake_follow_time" @change="handleChangeFakeFollowTime" :min="1" :step="5" :max="1000000" step-strictly></el-input-number>
                <span style="margin-left:20px;color: #606266">假关注退出上限 (t)：</span>
                <el-input-number size="mini" v-model="max_fake_follow" @change="handleChangeMaxFakeFollow" :min="1" :max="1000000"></el-input-number>
            </div>
            <div class="input_num" style="margin-top: 20px">
                <span style="color: #606266">脚本流程数 (t)：</span>
                <el-input-number size="mini" v-model="script_time" @change="handleChangeScriptTime" :min="1" :step="5" :max="1000000" step-strictly></el-input-number>
                <span style="margin-left: 20px;color: #606266">流程关注粉丝数 (t)：</span>
                <el-input-number size="mini" v-model="follow_time" @change="handleChangeFollowTime" :min="1" :max="1000000"></el-input-number>
            </div>
            <div class="input_num" style="margin-top: 20px">
                <span style="color: #606266">关注过快休眠时间 (min)：</span>
                <el-input-number size="mini" v-model="fast_follow_time" @change="handleChangeFastFollowTime" :min="1" :max="1000000"></el-input-number>
            </div>
            <div style="margin-top:30px;padding-left: 200px">
                <el-button type="text" @click="dialogVisible = true">选择手机</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">

                        <div>
                            <span>选择执行操作的手机：    </span>
                            <el-select v-model="value" clearable placeholder="请选择" value="">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="click_choose_phone()">确 定</el-button>
                </span>
                </el-dialog>
            </div>
        </div>

        <table_data></table_data>
    </div>
</template>

<script>
    const cityOptions = ['男性', '女性', '未知', '私密账号'];
    import SearchBar from '../components/SearchBar'
    import TableData from '../components/TableData'
    import bus from '../bus'
    import { Notification } from 'element-ui';

    export default {
        name: "Information",
        components:{
            "search_bar":SearchBar,
            "table_data":TableData,
        },
        data(){
            return {
                sleep_value: true,

                checkAll: false,
                checkedCities: ['男性', '未知'],
                cities: cityOptions,
                isIndeterminate: true,

                // 脚本操作参数
                operating_time: 2500,
                watch_time: 2000,
                fake_follow_time:5,
                max_fake_follow:5,
                script_time:20,
                follow_time:20,
                fast_follow_time:240,
                author_psc:10,
                fan_psc:1000,


                drawer: false,

                multipleSelection: [],

                fans_attr:[],
                author_list: [],

                dialogVisible: false,

                // 选中手机
                options: [{
                    value: '手机1',
                    label: '手机1'
                }, {
                    value: '手机2',
                    label: '手机2'
                }, {
                    value: '手机3',
                    label: '手机3'
                }, {
                    value: '手机4',
                    label: '手机4'
                }, {
                    value: '手机5',
                    label: '手机5'
                }],
                value: '',
            }
        },
        methods:{
            click_choose_phone(){
                this.dialogVisible = false;
                const author_list = [];
                for (const key in this.multipleSelection){
                    author_list.push({
                        'author_name':  this.multipleSelection[key]['author_name'],
                        'author_uid': this.multipleSelection[key]['uid'],
                        'author_sec_uid': this.multipleSelection[key]['sec_uid'],
                        'author_unique_id': this.multipleSelection[key]['author_unique_id'],
                        'author_gender': this.multipleSelection[key]['author_gender'],
                        'author_favorited': this.multipleSelection[key]['author_favorited'],
                        'author_short_id': this.multipleSelection[key]['short_id'],
                        'author_aweme_count': this.multipleSelection[key]['author_aweme_count'],
                        'author_fans_num': this.multipleSelection[key]['author_fans_num'],
                    })
                }
                const request_data = {
                    fan_psc: this.fan_psc,
                    search_val: this.$store.state.search_val,
                    operating_time: this.operating_time,
                    watch_time: this.watch_time,
                    fake_follow_time: this.fake_follow_time,
                    max_fake_follow: this.max_fake_follow,
                    script_time: this.script_time,
                    follow_time: this.follow_time,
                    fast_follow_time: this.fast_follow_time,
                    authors: author_list,
                    control_phone: this.value
                };

                bus.$emit('phone', request_data)
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();})
                    .catch(_ => {});
                },

            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
                console.log(this.checkedCities)
            },

            handleCheckedCitiesChange(value) {
                // this.fans_attr.length = 0;
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                for (let i = 0; i < checkedCount; i++) {
                   this.fans_attr.push(value[i]);
                }
            },
            // 监控input框值
            handleChangeOperating(value) {
                this.operating_time = value;
            },
            handleWatch(value) {
                this.watch_time = value;
            },
            handleChangeFakeFollowTime(value) {
                this.fake_follow_time = value
            },
            handleChangeMaxFakeFollow(value) {
                this.max_fake_follow = value;
            },
            handleChangeScriptTime(value) {
                this.script_time = value;
            },
            handleChangeFollowTime(value) {
                this.follow_time = value;
            },
            handleChangeFastFollowTime(value) {
               this.fast_follow_time = value;
            },
            handleAuthorPsc(value){
                this.author_psc = value;
            },
            handleFanPsc(value){
               this.fan_psc = value;
            },

        },
        created(){
            // 从TableData组件中获取表格中选中数据的参数
            bus.$on('multipleSelection', (multipleSelections)=>{
                this.multipleSelection = multipleSelections

            })
        }
    }
</script>

<style scoped>
    /deep/
    .el-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #409EFF;
        color: #409EFF;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    .information_info{
        width: 550px;
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
