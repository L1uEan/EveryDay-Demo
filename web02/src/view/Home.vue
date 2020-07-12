<template>
  <div id="LyHome">
    <router-view/>

      <!-- 尾部导航栏部分 -->
      <div class="ly-foot">
             <van-tabbar route active-color="orange" inactive-color="black">
                    <van-tabbar-item replace to="/home/index" icon="wap-home">
                        首页
                    </van-tabbar-item>
                    <van-tabbar-item replace to="/home/kecheng" icon="send-gift">
                        课程
                    </van-tabbar-item>
                    <van-tabbar-item replace to="/home/yueke" icon="gift">
                        约课记录
                    </van-tabbar-item>
                    <van-tabbar-item replace to="/home/lianxi" icon="like">
                        练习
                    </van-tabbar-item>
                     <van-tabbar-item replace @click="getMe" icon="manager">
                        我的
                    </van-tabbar-item>
         </van-tabbar>
      </div>

  </div>
</template>

<script>
export default {
name:"LyHome",
data() {
return {
  active:''
}
},
methods:{

  getMe(){
    if(localStorage.getItem('token')){
      this.$router.push('/home/person')
    }else{
      this.$router.push('/me')
    }
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
</style>