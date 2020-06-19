module.exports = {
  // 模块介绍
  summary: 'my customized rule for AnyProxy',
  // 发送请求前拦截处理
  *beforeSendRequest(requestDetail) {
    const url = requestDetail.url;

  },
  *beforeSendResponse(requestDetail, responseDetail) {
    const url = requestDetail.url;
    if (url.startsWith('https://api.m.jd.com/client.action?functionId=getLimitTimeCouponInfo')) {
          let js = JSON.stringify(responseDetail.response.body);
          let cu = new Buffer(JSON.parse(js));
          let data = cu.toString();
          sx = JSON.parse(data);
          for (const coupon in sx['result']){
              console.log('-----------------------------优惠卷数据-----------------------------');
              console.log(sx['result'][coupon][0]);
              console.log(typeof sx['result'][coupon][0]);
              console.log('-----------------------------优惠卷数据-----------------------------')

          }
    }

  },
  // 请求出错的事件
  *onError(requestDetail, error) { /* ... */ },
  // https连接服务器出错
  *onConnectError(requestDetail, error) { /* ... */ }
};
