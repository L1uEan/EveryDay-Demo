<template>
  <div id="login">
      <div class="Me-login">
          <!-- 登录log -->
          <div class="login-head-img">
              <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png" alt="">
          </div>
          <!-- 电话输入框 -->
          <div class="login-num">
              <input type="text" placeholder="请输入你的手机号码" maxlength="11" v-model="tel">
               <span @click="place" :class="PlaceCodeClice?'placeYanzheng':'placeYanzheng2'">{{PlaceText}}</span>
          </div>
          <!-- 验证码输入框 -->
          <div class="login-password">
              <input type="text" v-model="msg"  placeholder="请输入短信验证码" >
          </div>
          <!-- 登录选项内容 -->
          <div class="login-set">
              <span>*未注册的手机号将自动注册</span>
              <span @click="pas">使用密码登录</span>
          </div>
      </div>
       <!-- 登录提交按钮 -->
        <div class="login-submit">
            <van-button @click="denglu" color="linear-gradient(to right, #4bb0ff, #6149f6)" size='large' round>
                 登录
            </van-button>
        </div>
  </div>
</template>

<script>
export default {
name:"login",
data() {
return {
  tel:'',
  msg:'',
  PlaceText:"请输入验证码",
  PlaceCodeClice:true,
  PlaceNum:60,
  TimeOut:""
}
},
methods:{

  // 发送验证码
  place(){
    // 防止定时器被无限次点击
      if(this.PlaceCodeClice){
        // 点击按钮发送一个axios请求
        this.http({
           url:"/api/app/smsCode",
           method:"post",
           params:{
                    // 根据接口的要求 传入我们必传的参数
                    mobile:this.tel,
                    sms_type:"login"
                  }
        }).then((msg)=>{
          // 当我们的数据请求成功时 我们将定时器进行设置
            console.log(msg.data)
            // 设置一个周期的定时器
            this.TimeOut= setInterval(()=>{
              //  当计时器开始进行时 我们将管理定时器的状态转为false
                this.PlaceCodeClice=false;
                // 从60递减
                this.PlaceNum--;
                // 改变倒计时内部的内容,并进行拼接
                this.PlaceText=`获取验证码(${this.PlaceNum})`;
                // 为了防止当递减到0还继续减的时候 我们需要做一个if判断 
                if(this.PlaceNum<=0){
                  // 当小于等于0时 倒计时初始化 改变验证码内部的内容  并将定时器内部的状态改为true
                  this.PlaceText='获取验证码'
                  this.PlaceNum=60;
                  this.PlaceCodeClice=true;
                  // 当小于0时 防止继续递减 我们将定时器的进行关闭
                  clearInterval(this.TimeOut)
                }
            },500)
        })
      }
    
  },
  // 点击登录 根据短信开始
  denglu(){
    //  alert(1)
      this.http({
         url:"/api/app/login",
         method:"post",
         params:{
            mobile:this.tel,
            sms_code:this.msg,
            type:2,
            client:1
         }
      }).then((res)=>{
         console.log(res)
         var user={
           userid:res.data.data.id,
           useryanzheng:this.msg,
           usertel:this.tel
         }
         localStorage.setItem('L1uEanLogin',JSON.stringify(user))
         if(res.data.msg=='操作成功'){
           this.$router.push('/passworld')
         }
      })
  },
    pas(){
        this.$router.push('/home/me')
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
    position: relative;
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
      color: blueviolet;
}

// 点击获取验证码
.placeYanzheng{
  color: orange;
  font-size: 0.13rem;
  position: absolute;
  right: 0;
  bottom: 0.15rem;
}
.placeYanzheng2{
  color: #999;
  font-size: 0.13rem;
  position: absolute;
  right: 0;
  bottom: 0.15rem;
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
      color: blueviolet;
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