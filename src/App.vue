<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',

    created() {
      // //在页面加载时读取localStorage里的状态信息
      localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));

      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
      })
    }
  }


</script>
<style lang="scss">
  .container{
    padding: 1.5625rem 2rem;
    margin-top: 1.125rem;
    box-shadow: 0.5rem 0.875rem 2.375rem rgba(39,44,49,.06), 0.0625rem 0.1875rem 0.5rem rgba(39,44,49,.03);
    background-color: #fff;
    border: none;
    border-radius: .5rem;
    margin-bottom: 9px;
  }
  .fl{
    float: left;

  }
  .fr{
    float: right;
  }

</style>
