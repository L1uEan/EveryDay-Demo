<template>
  <div id="PerSon">
      <div class="Person-top-box">
          <!-- user用户img界面部分 -->
          <div class="Person-user">
                <h3>已经登录</h3>
          </div>
      </div>
  </div>
</template>

<script>
export default {
name:"PerSon",
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
#PerSon{
    overflow: hidden;
    padding-bottom: 2rem;
    padding-bottom: 20vw;
}

.Person-top-box{
    height: 5.8rem;
    height: 58vw;
    background: url('../../assets/img/user_bg.png') no-repeat no-repeat;
    background-size: 100% 1.3rem;
    background-color: #fff;
    position: relative;
    padding: 0 .4rem;
    padding: 0 4vw;
}
</style>