<template>
  <div id="Details">
    <!-- 导航头部 -->
    <div class="Details_top">
      <van-nav-bar title="课程详情" left-arrow id="nav" @click-left="onClick" @click-right="navRight">
       <template #title>
         <!-- 如果滚动距离超过50px 课程详情就出现 特色课隐藏 -->
            <div v-show="!flag">
                特色课
            </div>
            <div v-show="flag" class="flagbox">
                <span @click="flagIscroll1" >课程介绍</span>
                <span @click="flagIscroll2" >课程大纲</span>
                <span @click="flagIscroll3" >课程评价</span>
            </div>
        </template>
        <!-- 右边的导航 -->
        <template #right>
          <van-icon  name="weapp-nav" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 点击分享显示二维码 -->
    <van-dialog v-model="show" title="You can add me wechat" show-cancel-button class="wechat">
      <img src="../../assets/img/liuyanWechat.jpg" alt />
    </van-dialog>
    <div class="course-class">
      <!-- 课程内容介绍 -->
      <div class="course-content">
        <p>{{CourseLits.title}}</p>
        <van-icon name="star-o" class="start nav-active" color="#ccc" @click="shoucang1" v-if="scId==0"/>
         <van-icon name="star-o" class="start nav-active" color="red" @click="shoucang2" v-if="scId==1"/>
        <p>
          <img
            src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
            alt
          />
          {{CourseLits.price}}
        </p>
        <div>
          <p>共{{CourseLits.total_periods}}课时</p>
          <p>共:{{CourseLits.sales_num}}人报名</p>
        </div>
      </div>

      <!-- 教学团队 -->
      <div class="course-team">
        <p>教学团队</p>
        <ul>
          <li v-for="(item,index) in CourseTeachList" :key="index">
            <img :src="item.avatar" alt />
            <span>{{item.teacher_name}}</span>
          </li>
        </ul>
      </div>

      <!-- 课程介绍 -->
      <div class="course-hot"  ref="KechengJs">
        <p>课程介绍</p>
        <div v-html="CourseLits.course_details"></div>
      </div>

      <!-- 课程大纲 -->
      <div class="course-outline"  ref="KechengDg">
        <p>课程大纲</p>
        <section class="period">
          <div  class="charp-title" v-html="CourseLits.course_details">
          </div>
          <p  class="charp-time">
            
          </p>
        </section>
      </div>

      <!-- 课程评论 -->
      <div class="course-commet"  ref="KechengPl">
            <p>课程评论</p>
            <div>
                <ul>
                    <li v-for="(item,index) in CourseListComment" :key="index">
                        <div>
                            <!-- 评论头像 -->
                            <img :src="item.avatar" alt="">
                            <!-- 用户手机号以及好评度 -->
                            <div>
                                <div>
                                    <span>{{item.nickname}}</span>
                                    <div>
                                        <van-rate v-model="value" :count="5" color=' rgb(234, 122, 47)' size='15px' gutter='0px' readonly />
                                    </div>
                                    <span>{{date|ChinaTime}}</span>
                                </div>
                                <div>
                                    太棒了
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
      </div>

      <!-- 立即报名 -->
      <div class="SendYuyue">
          立即报名
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      show: false,
      id: this.$route.query.id,
      CourseLits: [],
      CourseTeachList: [],
      value:5,
      CourseListComment:[],
      date:new Date(),
      scId:0,
      shoucang_id:'',
      flag:false,
      flageList:[
        '课程详情',
        '课程大纲',
        '课程评价'
      ]
    };
  },
  filters:{
    // 将时间进行过滤
    ChinaTime(input){
          // 将管道符前的时间获取到
                var date=input;
                //年
                var year=date.getFullYear();
                // 月
                var month=date.getMonth()+1;
                // 日
                var day=date.getDate();
                // 小时
                var hours=date.getHours();
                // 分
                var min=date.getMinutes()
                //秒  padStart()方法用于时间补零：参数1为增加后的字符串长度，参数2为填充的字符串
                var hm=date.getSeconds().toString().padStart(2,'0');
                return year+'-'+month+'-'+day+''+"  "+hours+":"+min;
    }
  },
  methods: {
    onClick() {
      this.$router.go(-1);
    },
    navRight() {
      this.show = !this.show;
    },
    // 收藏
   async shoucang1() {
       // 请求收藏的后台接口 它会自动改变is_collect内的值
     let {data:res} = await this.http.post('/api/app/collect/',{course_basis_id:this.id,type:1})
    // 请求is_collect数据 进行实时更新 如果是0则是取消 如果是1为收藏
     this.http.get('api/app/courseInfo/basis_id='+this.id).then((msg)=>{
      //  console.log(msg)
          this.scId=msg.data.data.info.is_collect;
     })
    },
    //取消收藏
     async shoucang2() {
       // 请求取消收藏的后台接口 它会自动改变is_collect内的值
       let {data:res}= await this.http.put(`/api/app/collect/cancel/${this.shoucang_id}/1`)
    // 请求is_collect数据 实时更新 如果是0则是取消 如果是1为收藏
      this.http
      .get("/api/app/courseInfo/basis_id=" + this.id)
      .then(msg => {
            // console.log(msg)
          this.scId=msg.data.data.info.is_collect;
      });
    },
    // 滚动距离的设置
    handleScrollx(){
        // 如果它滚动的距离超过50的话就为true 反之亦然
        this.flag=window.pageYOffset>50;
    },
    // 点击导航栏进入指定的位置
    flagIscroll1(){
        this.$refs.KechengJs.scrollIntoView();
    },
     flagIscroll2(){
        this.$refs.KechengDg.scrollIntoView();
    },
     flagIscroll3(){
        this.$refs.KechengPl.scrollIntoView();
    },
  },


  mounted() {
    
    console.log('老师课程的id',this.id)

    // 给滚动绑定一个监听事件,监听到我们滚动的距离 
    window.addEventListener('scroll',this.handleScrollx,true);//调用我们的handleScrollx方法并且
    //   请求课程详情数据获取
    this.http
      .get("/api/app/courseInfo/basis_id=" + this.id)
      .then(msg => {
        //获取收藏的id
        // console.log(msg.data.data.info.is_collect)
        this.CourseLits = msg.data.data.info;
        this.CourseTeachList = msg.data.data.teachers;
         this.shoucang_id=msg.data.data.info.collect_id;
        // console.log(msg.data.data);

      });

    //   请求课程详情的评论设置
    this.http({
        url:'/api/app/courseComment',
        method:'post',
        data:{
            id:this.id,
            limit:10,
            page:1
        }
    }).then((msg)=>{
        // console.log(msg)
        this.CourseListComment=msg.data.data.list
    })
  },
  created() {
      // 滚动默认初始化
      document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
};
</script>

<style lang='scss'>

.nav-active{
 color: #eb6100;
}

#nav {
  color: gray;
}
.van-dialog__content > img {
  width: 100%;
}
.course-class {
  background: #f0f2f5;
  padding-bottom: 1.33333rem;
  padding-bottom: 13.33333vw;
  box-sizing: border-box;
  min-height: 92vh;
}

// 课程内容的介绍
.course-content {
  padding: 0.4rem;
  padding: 4vw;
  background: #fff;
  position: relative;
  .start {
    position: absolute;
    right: 0.18rem;
    top: 0.1rem;
    font-size: 0.23rem;
    font-weight: 600;
  }
  > p:nth-of-type(1) {
    font-size: 0.42667rem;
    font-size: 4.26667vw;
    font-family: PingFangSC-Medium;
    font-weight: 400;
    color: #333;
    padding-right: 1.06667rem;
    padding-right: 10.66667vw;
    line-height: 0.61333rem;
    line-height: 6.13333vw;
  }
  > p:nth-of-type(2) {
    font-size: 0.45333rem;
    font-size: 4.53333vw;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #ee1f1f;
    line-height: 0.85333rem;
    line-height: 8.53333vw;
    > img {
      width: 0.21333rem;
      width: 2.13333vw;
      margin: 0 0.10667rem;
      margin: 0 1.06667vw;
    }
  }
  > div {
      flex: 1;
    > p {
      font-size: 0.4rem;
      font-size: 4vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 0.8rem;
      line-height: 8vw;
    }
  }
}
// 导航栏固定
.Details_top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .flagbox{
    display: flex;
    justify-content: space-between;
    width: 2.2rem;
    >span{
      color: #8c8c8c;
      font-weight: 500;
      font-size: .42667rem;
      font-size: 4.26667vw;
      display: inline-block;
      text-align: center;
    }
  }
}


// 课程内容
.course-content{
  margin-top: 0.5rem;
}


// 教学团队
.course-team {
  margin-top: 0.4rem;
  margin-top: 4vw;
  background: #fff;
  padding: 0.13333rem 0.26667rem;
  padding: 1.33333vw 2.66667vw;
  > p {
    font-size: 0.4rem;
    font-size: 4vw;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #262626;
    padding-top: 0.26667rem;
    padding-top: 2.66667vw;
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0.26667rem 0;
    padding: 2.66667vw 0;
    li {
      padding: 0.26667rem 0;
      padding: 2.66667vw 0;
      width: 20%;
      height: 2.4rem;
      height: 24vw;
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      > img {
        width: 1.04rem;
        width: 10.4vw;
        height: 1.04rem;
        height: 10.4vw;
        border-radius: 50%;
      }
      > span {
        padding: 0.21333rem 0.08rem 0;
        padding: 2.13333vw 0.8vw 0;
        padding-top: 0.21333rem;
        padding-top: 2.13333vw;
        font-size: 0.32rem;
        font-size: 3.2vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #595959;
      }
    }
  }
}

// 课程介绍
.course-hot {
  margin-top: 0.4rem;
  margin-top: 4vw;
  background: #fff;
  padding: 0.13333rem 0.26667rem;
  padding: 1.33333vw 2.66667vw;
  > p:nth-of-type(1) {
    font-size: 0.4rem;
    font-size: 4vw;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #262626;
    padding-top: 0.26667rem;
    padding-top: 2.66667vw;
  }
  > div {
    font-size: 0.37333rem;
    font-size: 3.73333vw;
    padding: 0.4rem 0.13333rem;
    padding: 4vw 1.33333vw;
  }
}
// 课程大纲
.course-outline{
     margin-top: .4rem;
    margin-top: 4vw;
    background: #fff;
    padding: .13333rem .26667rem;
    padding: 1.33333vw 2.66667vw;
    >p:nth-of-type(1){
        font-size: .4rem;
        font-size: 4vw;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #262626;
        padding-top: .26667rem;
        padding-top: 2.66667vw;
    }
   .period{
            padding: .26667rem 0 0 0;
             padding: 2.66667vw 0 0 0;
             >div{
                     position: relative;
                    padding-left: .4rem;
                    padding-left: 4vw;
                    line-height: .8rem;
                    font-size: .32rem;
                    font-size: 3.2vw;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #595959;
             }
             >div:after{
                     content: "";
                    position: absolute;
                    left: .05333rem;
                    left: .53333vw;
                    top: 50%;
                    transform: translateY(-50%);
                    width: .10667rem;
                    width: 1.06667vw;
                    height: .10667rem;
                    height: 1.06667vw;
                    border-radius: 50%;
                    background: #eb6100;
             }
        }
}
.course-commet{
    margin-top: .4rem;
    margin-top: 4vw;
    background: #fff;
    padding: .13333rem .26667rem;
    padding: 1.33333vw 2.66667vw;
    >p:nth-of-type(1){
            font-size: .4rem;
            font-size: 4vw;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #262626;
            padding-top: .26667rem;
            padding-top: 2.66667vw;
    }
    >div{
        ul{
            li{
                padding: .26667rem .26667rem;
                padding: 2.66667vw 2.66667vw;
                >div{
                    display: flex;
                    img{
                            width: .66667rem;
                            width: 6.66667vw;
                            height: .66667rem;
                            height: 6.66667vw;
                            border-radius: 50%;
                    }
                    >div{
                                flex: 1;
                        >div:nth-of-type(1){
                                display: flex;
                                padding-left: .26667rem;
                                padding-left: 2.66667vw;
                                align-items: center;
                                >span:nth-of-type(1){
                                        font-size: .37333rem;
                                        font-size: 3.73333vw;
                                        font-family: PingFangSC-Regular;
                                        font-weight: 400;
                                        color: #333;
                                }
                                >div:nth-of-type(1){
                                    margin-left: .26667rem;
                                    margin-left: 2.66667vw;
                                    margin-top: 0;
                                    height: .4rem;
                                    height: 4vw;
                                    box-sizing: border-box;
                                }
                                >span:nth-of-type(2){
                                            flex: 1;
                                            font-size: .29333rem;
                                            font-size: 2.93333vw;
                                            font-weight: 500;
                                            color: #999;
                                            text-align: right;
                                }

                        }
                         >div:nth-of-type(2){
                                    padding-top: .13333rem;
                                    padding-top: 1.33333vw;
                                    line-height: .64rem;
                                    line-height: 6.4vw;
                                    color: #999;
                                    margin-left: 0.1rem;
                                }
                    }
                }
            }
        }
    }
}

.SendYuyue{
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 0.4rem;
    background: #eb6100;
    text-align: center;
    line-height: 0.4rem;
    color: white;
    font-size: 0.16rem;
    font-weight: 500;
}
</style>