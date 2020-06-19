<template>
  <div id="HmFilter">
      <label>
          <input v-model="userId" type="text">
      </label>

      <button @click="clickfun()">点我</button>
        <button @click="closes()">关闭连接</button>

      {{userId}}
  </div>
</template>

<script>
  export default {
    name:'HmFilter',
      data() {
          return{
              // 用户Id
              userId:'',
              appid:'',
              // 事件类型
              type:'',
              msg:'',
              wsUrl:''
          }
      },
      methods: {
          clickfun(){
              this.websock.send(JSON.stringify({
                                'message': 'firework',
                                'userId': this.userId}));
          },
          closes(){
              this.websock.onclose
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
              // console.log("WebSocket连接成功");
              // // 添加心跳检测，每30秒发一次数据，防止连接断开（这跟服务器的设置有关，如果服务器没有设置每隔多长时间不发消息断开，可以不进行心跳设置）
              // let self = this;
              // this.timer = setInterval(() => {
              //     try {
              //         self.websock.send('我爱你');
              //         console.log('发送消息');
              //     }catch(err){
              //         console.log('断开了：' + err);
              //         self.connection()
              //     }
              // }, 30000)
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
          }
      },
      created() {
          if (this.websock) {
              this.websock.close(); // 关闭websocket连接
          }
          this.initWebSocket();
      },
      destroyed() {
          //页面销毁时关闭ws连接
          if (this.websock) {
              this.websock.close(); // 关闭websocket
          }
      }
  };

</script>
