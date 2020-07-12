<template>
  <div id="Me">
      <div class="Me-login">
          <!-- 登录log -->
          <div class="login-head-img">
              <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png" alt="">
          </div>
          <!-- 电话输入框 -->
          <div class="login-num">
              <input type="text" v-model="tel" placeholder="请输入你的手机号码" maxlength="11">
          </div>
          <!-- 密码输入框 -->
          <div class="login-password">
              <input type="password" v-model="password" placeholder="请输入你的密码" >
          </div>
          <!-- 登录选项内容 -->
          <div class="login-set">
              <span>找回密码</span>
              <span @click="zhuce">注册/验证码登录</span>
          </div>
      </div>
       <!-- 登录提交按钮 -->
        <div class="login-submit">
            <van-button @click="SignIn" color="linear-gradient(to right, #4bb0ff, #6149f6)" size='large' round>
                 登录
            </van-button>
        </div>
  </div>
</template>

<script>
export default {
name:"Me",
data() {
return {
    tel:'17630582941',
    password:'123456'
}
},
methods:{
    zhuce(){
        this.$router.push('/login')
    },
    // 登录
    SignIn(){
        this.axios({
            url:"/api/app/login",
            method:'post',
            data:{
                mobile:this.tel,
                password:this.password,
                type:1,
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.code==200){
                localStorage.setItem("token",res.data.data.remember_token)
                this.$router.push('/home/person')
            }else{
                alert(res.data.msg)
            }           
        })
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
<style lang='scss'>
/* @import url(); 引入css类 */
.Me-login{
   padding-left: 0.3rem;
   padding-right: 0.3rem;
   box-sizing: border-box;
}

/* login头部图片 */
.login-head-img{
  width: 100%;
}
.login-head-img>img{
    display: block;
    width: 80%;
    margin: 13.3333vw auto;
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;
}

/*手机号  */
.login-num{
    height: 1.33333rem;
    height: 13.33333vw;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
}
.login-num>input{
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
      color: red;
}

// 输入密码框
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


// 找回密码 注册登录
.login-set{
  display: flex;
  justify-content: space-between;
  margin-top: 0.1rem;
}
.login-set>span{
    font-size: .32rem;
    font-size: 3.2vw;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #999;
}

//登录按钮
.login-submit{
  width: 3.3rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  color: #fff;
  font-weight: 500;
}
</style>