<template>
  <div id="PassWorld">
      <van-nav-bar
            title="设置密码"
            left-text="返回"
            right-text="跳过"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <div class="box-pass">
            <!-- 请设置登陆密码 -->
                <div class="login-password">
                    <input type="text" v-model="ps1"  placeholder="请设置登录密码" >
                </div>
                <!-- 请设置登录密码 -->
                <div class="login-password">
                    <input type="text" v-model="ps2"  placeholder="请再次输入密码" >
                </div>
        </div>

     <!-- 登录提交按钮 -->
        <div class="login-submit">
            <van-button @click="send" color="linear-gradient(to right, #4bb0ff, #6149f6)" size='large' round>
                 确定
            </van-button>
        </div>
  </div>
</template>

<script>
export default {
name:"PassWorld",
data() {
return {
   ps1:'',
   ps2:''
}
},
methods:{
    onClickLeft(){
        alert(1)
        window.history.go(-1)
    },
    onClickRight(){
        alert(2)
    },
    // 点击确定进行设置密码并进行页面跳转
   send(){
        var UserMessage=localStorage.getItem('L1uEanLogin');
        var UserJsonParse=JSON.parse(UserMessage)
        if(this.ps1==this.ps2){
            // alert(1)
              this.axios({
                    url:'/api/app/password',
                    method:'post',
                    data:{
                        mobile:UserJsonParse.usertel,
                        password:this.ps2,
                        sms_code :UserJsonParse.useryanzheng
                    }
                }).then((msg)=>{
                    console.log(msg)
                    this.$router.push('/home/person')
                })
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
/* // 输入密码框 */
.login-password{
   height: 1.33333rem;
   height: 13.33333vw;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
}
.login-password>input{
     box-sizing: border-box;
    padding: .4rem 0;
    padding: 4vw 0;
    border: 0;
    width: 7.2rem;
    width: 72vw;
    height: 100%;
    font-size: .4rem;
    font-size: 4vw;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: .53333rem;
    line-height: 5.33333vw;
    float: left;
    outline: none;
}



.box-pass{   
    background-color: #fff;
    margin-top: .13333rem;
    margin-top: 1.33333vw;
    padding: 0 .53333rem;
    padding: 0 5.33333vw;
}

/* //登录按钮 */
.login-submit{
  width: 3.3rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  color: #fff;
  font-weight: 500;
}


</style>