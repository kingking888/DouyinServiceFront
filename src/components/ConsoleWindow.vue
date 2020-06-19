<template>
    <div id="ConsoleWindow">
        <div class="information_info">
            <div class="line_01" style="color: #409EFF; margin-bottom: 50px">监控</div>
            <el-tabs v-model="editableTabsValue"  type="card" editable @edit="handleTabsEdit">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item) in editableTabs"
                        :label="item.title"
                        :name="item.name">
                    {{item.content}}

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import bus from '../bus'
    import { Notification } from 'element-ui';


    export default {
        name:"ConsoleWindow",
        data() {
            return {
                editableTabsValue: '2',
                editableTabs: [],
                tabIndex: 2,
                userId:1,
            }
        },
        methods: {

            // axios post请求跨域设置
            getCookie(name) {
                let value = '; ' + document.cookie;
                let parts = value.split('; ' + name + '=');
                if (parts.length === 2) return parts.pop().split(';').shift()
            },
            // 向后端发送post请求，发送需要爬取或获取的数据，
            localSearch(author_list, fan_psc, operating_time, watch_time, fake_follow_time, max_fake_follow,
                        script_time, follow_time, fast_follow_time, control_phone, url, info_message, error_message)
            {
                this.handleTabsEdit('add', 'add', control_phone);
                this.$axios.post(url, {
                        fan_psc: fan_psc,
                        search_val: this.$store.state.search_val,
                        operating_time: operating_time,
                        watch_time: watch_time,
                        fake_follow_time: fake_follow_time,
                        max_fake_follow: max_fake_follow,
                        script_time: script_time,
                        follow_time: follow_time,
                        fast_follow_time: fast_follow_time,
                        authors: author_list
                    },{headers: {'X-CSRFToken': this.getCookie('csrftoken')}},
                    Notification.info({
                        title: '信息',
                        message: info_message,
                        duration:3000
                    }))
                    .then(function (response) {
                        if (parseInt(response.data.msg.code) === 101){
                            Notification.error({
                                title: '错误',
                                message: error_message
                            });
                            // ----- 逻辑 -------
                            console.log(response.data.msg)

                        }
                        else if (parseInt(response.data.msg.code) === 0){
                            Notification.success({
                                title: '成功',
                                message: '粉丝爬取完毕',
                                type: 'success'
                            });
                            // ----- 创建长连接  -------

                        }
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            // 添加新标签
            handleTabsEdit(targetName, action, title) {
                if (action === 'add') {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: title,
                        name: newTabName,
                        content: 'New Tab content'
                    });
                    this.editableTabsValue = newTabName;
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                }
            },

            //初始化weosocket
            initWebSocket() {
                if (typeof WebSocket === "undefined") {
                    alert("您的浏览器不支持WebSocket");
                    return false;
                }
                const wsuri = 'ws://127.0.0.1:8000/link/';
                this.websock = new WebSocket(wsuri);
                this.websock.onopen = this.websocketonopen;
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;

            },
            //连接成功
            websocketonopen() {
                console.log("WebSocket连接成功");
                this.websock.send(JSON.stringify({
                    'message': 'firework',
                    'userId': this.userId}));
            },
            //接收后端返回的数据，可以根据需要进行处理
            websocketonmessage(e) {
                console.log(JSON.parse(e.data)['msg'])
            },
            //连接建立失败重连
            websocketonerror(e) {
                console.log(`连接失败的信息：`, e);
                this.initWebSocket(); // 连接失败后尝试重新连接
            },
            //关闭连接
            websocketclose(e) {
                console.log("断开连接", e);
            },
        },
        created(){
            // 从TableData组件中获取表格中选中数据的参数
            bus.$on('phone', (phone)=>{
                // 从本地搜索
                if (this.$store.state.search_type === 1){
                    this.initWebSocket();
                    this.localSearch(phone.authors, phone.fan_psc, phone.operating_time, phone.watch_time, phone.fake_follow_time,
                        phone.max_fake_follow, phone.script_time, phone.follow_time, phone.fast_follow_time, phone.control_phone, '/api/author/local/', '后台正在筛选粉丝，请稍等',
                        '爬虫爬取超过上限, 未爬取完毕, 请移步本地搜索查询库存，或联系管理员')
                }
                // 从抖音搜索
                else if(this.$store.state.search_type === 2){
                    this.initWebSocket();
                    this.localSearch(phone.authors, phone.fan_psc, phone.operating_time, phone.watch_time, phone.fake_follow_time,
                        phone.max_fake_follow, phone.script_time, phone.follow_time, phone.fast_follow_time, phone.control_phone, '/api/author/douyin/', '后台正在爬取粉丝，请稍等',
                        '爬虫爬取超过上限, 未爬取完毕, 请移步本地搜索查询库存，或联系管理员');
                }

            })
        },
        destroyed() {
            //页面销毁时关闭ws连接
            if (this.websock) {
                this.websock.close(); // 关闭websocket
            }
        }

    }
</script>

<style scoped>
    .information_info{
        width: 1610px;
        height: 500px;
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

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .line_01{
        padding: 0 20px 0;
        margin: 20px 0;
        line-height: 1px;
        border-left: 500px solid #ddd;
        border-right: 500px solid #ddd;
        text-align: center;

    }
</style>
