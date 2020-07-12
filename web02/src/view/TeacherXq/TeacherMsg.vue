<template>
  <div id="TeacherMsg">
      <!-- 1.页面头部 -->
      <div class="teacher-head">
            <van-nav-bar id="nav-bar"
                title="讲师详情"
                left-arrow
                @click-left="onClickLeft"
                :border=bool
                            />
      </div>
      <!-- 2. 绝对定位讲师图片级略微介绍部分 -->
      <div class="teacher-hot">
            <div class="teacher-hot-div">
                <img :src="TeacherHeader.avatar" alt="">
                <div>
                    <p>
                        <span>{{TeacherHeader.teacher_name}}</span>
                        <font>{{TeacherHeader.level_name}}</font>
                    </p>
                    <p>
                        {{sex|sex1}}
                        <span>{{TeacherHeader.teach_age}}年教龄</span>
                    </p>
                </div>
                <button @click="guanzhu()">{{guanzhuText}}</button>
            </div>
      </div>
      <!-- 3.老师具体介绍 -->
      <div class="teacher-content">
          <div>
             <van-tabs animated line-width='20px'>
                 <!--讲师介绍部分 -->
                    <van-tab title="讲师介绍">
                        <div class="teacher-text" >
                            <ul>
                                <li v-for="(v,i) in TeacherList.attr" :key="i">
                                    <template  v-if='(v.attr_name!="年级") && (v.attr_name!="学科")'  >
                                        <span>{{v.attr_name}}</span>
                                        <font v-for="(a,b) in v.attr_value" :key="b">{{a.attr_value_name}}</font>
                                    </template>
                                </li>
                                <li>
                                    <span>老师介绍</span>
                                    <font>{{TeacherList.intro}}</font>
                                </li>
                            </ul>
                        </div>
                    </van-tab>
                    <!-- 主讲课程部分 -->
                    <van-tab title="主讲课程">
                          <div class="pan-good">
                                <div v-for="(item, index) in Curriculum" 
                                    :key="index"
                                    class="pan-good-content">
                                <div class="pan-good-content-wrapper">
                                    <div>{{item.title}}</div>
                                    <div>共{{item.total_periods}}课时</div>
                                    <div v-for="(v,i) in item.teachers_list" :key="i">
                                        <img :src="v.teacher_avatar" alt="">
                                        <span>{{v.teacher_name}}</span>
                                    </div>
                                    <div>
                                    <div class="wrapper-apply">{{item.sales_num}}人已报名</div>
                                    <div :class="item.price =='免费'?'wrapper-offer-red':'wrapper-offer'">{{item.price|IndexHomePrice}}</div>
                                    </div>
                                </div>
                                </div>
                          </div>
                    </van-tab>
                    <!-- 学院评价部分 -->
                    <van-tab title="学院评价">

                         <div v-if="TeacherAppraise.length>0">
                        
                         </div>  
                         <div v-else class="Appraise-no">
                             <div class="Appraise-img">  
                                 <img src="../../assets/img/zanwu.png" alt="">
                                 <p>暂无数据</p>
                             </div>
                         </div>
                        
                    </van-tab>
            </van-tabs>
          </div>
      </div>

      <!-- 立即预约 -->
      <div class="SendYuyue">
          立即预约
      </div>
  </div>
</template>

<script>
export default {
name:"TeacherMsg",
data() {
return {
  bool:false,
  id:this.$route.query.id,
  TeacherList:[],
  TeacherHeader:[],
  Curriculum:[],
  TeacherAppraise:[],
  guanzhuText:'关注',
  guanzhuBool:false,
  sex:''
}
},
filters:{
    // 根据字段 0 1来判断是男是女
    sex1(val){
        if(val==0){
            return "男"
        }else if(val.sex==1){
            return "女"
        }
        return val
    },
    // 过滤器判断 如果价格val为0就返回免费 如果大于0 就保留两位小数点
      IndexHomePrice(val){
          // console.log(val)
          if(val==0){
            return "免费"
          }else{
            return `$:${(val/100).toFixed(2)}`;
          }
          return val;
      }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    // 在实例被渲染之前优先在这里进行调用方法数据
    this.message()
    this.teacherHead()
    this.techerClass()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

        // 点击课程 进行数据的请求
        this.http({
            url:'https://www.365msmk.com/api/app/teacher/mainCourse',
            method:"post",
            data:{
                limit:10,
                page:1,
                teacher_id:this.id
            }
        }).then((msg)=>{
            this.Curriculum=msg.data.data.list;
            // console.log(msg.data.data.list)
        })

        // 用户评价的数据请求
        this.http({
            url:'https://www.365msmk.com/api/app/courseComment',
            method:'post',
            data:{
                id:this.id,    
                limit:10,  
                page:1
            }
        }).then((msg)=>{
            // console.log(msg.data.data.list)
            this.TeacherAppraise=msg.data.data.list;
        })
},
methods:{
    // 请求数据老师介绍
    async  message(){
       let { data }= await this.http.get("https://www.365msmk.com/api/app/teacher/info/"+this.id);
       this.TeacherList=data.data;
    //    console.log(data.data)
    },
    // 请求数据老师头部图片
    async teacherHead(){
       let { data }= await this.http.get("https://www.365msmk.com/api/app/teacher/"+this.id);
       this.TeacherHeader=data.data.teacher;
       this.sex=data.data.teacher.sex;
    //    console.log(data.data)
    },
    // 请求主讲课程部分
    async techerClass(){
       let{ data }= await this.http.get('/api/app/teacher/mainCourse'+this.id);
    //    console.log(data)
    },
    // 点击左箭头进心页面返回
    onClickLeft(){
       window.history.go(-1)
    },
    // 关注
    guanzhu(){
        // 点击关注切换状态 如果为true则已关注 反之亦然
        this.guanzhuBool=!this.guanzhuBool;
        if(this.guanzhuBool){
            this.guanzhuText="已关注"
        }else{
            this.guanzhuText='关注'
        }
    }
}

}
</script>
<style lang='scss'>
/* @import url(); 引入css类 */
/* 页面全局配置 */
#TeacherMsg{
     min-height: 100vh;
    background: #f0f2f5;
    padding-bottom: 1.6rem;
    padding-bottom: 16vw;
    box-sizing: border-box;
}

/* 讲师头部部分 */
.teacher-head{
    width: 100%;
      height: 2.66667rem;
    height: 26.66667vw;
    line-height: 1.17333rem;
    line-height: 11.73333vw;
    background: linear-gradient(180deg,#63b7fe,#4e7de3);
}
.teacher-head>div{
    background: none;
    border-bottom-width: 0;
}
#nav-bar /deep/ .van-nav-bar__title {
    color: white !important;
}
#nav-bar /deep/ i{
    color: white !important;
}
/* 绝对定位讲师部分 */
.teacher-hot{
     margin: -1.52rem auto 0;
    margin: -15.2vw auto 0;
    width: 9.46667rem;
    width: 94.66667vw;
    padding: 0 .4rem;
    padding: 0 4vw;
    background: #fff;
    border-radius: .10667rem;
    border-radius: 1.06667vw;
    box-sizing: border-box;
    >.teacher-hot-div{
            height: 2.02667rem;
            height: 20.26667vw;
            display: flex;
            align-items: center;
            >img{
                width: 1.06667rem;
                width: 10.66667vw;
                height: 1.06667rem;
                height: 10.66667vw;
                margin-right: .32rem;
                margin-right: 3.2vw;
                border-radius: 50%;
                flex: none
            }
            >div{
                flex: 1;
                >p:nth-of-type(1){
                        line-height: 0%;
                        padding-bottom: .08rem;
                         padding-bottom: .8vw;
                         text-align: left;
                         >span{
                                font-size: .4rem;
                                font-size: 4vw;
                                color: #595959;
                                line-height: .56rem;
                                line-height: 5.6vw;
                                padding-right: .13333rem;
                                padding-right: 1.33333vw;
                         }
                         >font{
                                   font-size: .29333rem;
                                    font-size: 2.93333vw;
                                    color: #ea7a2f;
                         }
                }
                >p:nth-of-type(2){
                    font-size: .32rem;
                    font-size: 3.2vw;
                    color: #b7b7b7;
                    text-align: left;
                    line-height: .45333rem;
                    line-height: 4.53333vw;
                }
            }
            >button{
                    width: 1.65333rem;
                    width: 16.53333vw;
                    height: .74667rem;
                    height: 7.46667vw;
                    background: #ebeefe;
                    border-radius: .41333rem;
                    border-radius: 4.13333vw;
                    font-size: .34667rem;
                    font-size: 3.46667vw;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #4169ff;
                    color: #eb6100;
                    border: 0;
            }
    }
}
// 老师具体介绍部分
.teacher-content{
    width: 100%;
    background: white;
    margin-top: 0.1rem;
}
.teacher-text{
    >ul{
            padding: 0 .4rem;
            padding: 0 4vw;
            box-sizing: border-box;
            >li{
                    display: flex;
                    line-height: 1.06667rem;
                    line-height: 10.66667vw;
                    font-size: .34667rem;
                    font-size: 3.46667vw;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #8c8c8c;
                    padding-top: .26667rem;
                    padding-top: 2.66667vw;
                    >span{
                          margin-left: .13333rem;
                            margin-left: 1.33333vw;
                            margin-right: .53333rem;
                            margin-right: 5.33333vw;
                    }
                    >font{
                            padding-top: .13333rem;
                            padding-top: 1.33333vw;
                            line-height: .8rem;
                            line-height: 8vw;
                            flex: 1;
                        }
                } 
            }
}

// 主将课程
.pan-good
{
  width: 94%;
  padding:0 3%;
  margin-bottom:0.2rem;
}
.pan-good-title
{
   border-left:3px solid red;
  padding-left:2%;
  font-size:0.16rem;
}
.pan-good-content
{
  width: 100%;
  height: 2rem;
  background-color: #fff;
  margin-top:0.15rem;
  border-radius: 0.1rem;
  display:flex;
  justify-content: center;
  border: 1px solid whitesmoke;
}
.pan-good-content-wrapper
{
  width: 94%;
  height: 1.8rem;
  /* background-color: red; */
  margin-top:0.2rem;
}
.pan-good-content-wrapper>div:nth-child(1)
{
  font-size:0.16rem;
  margin-bottom:0.03rem
}
.pan-good-content-wrapper>div:nth-child(2)
{
  font-size:0.13rem;
  color:#414040
}
.pan-good-content-wrapper>div:nth-child(3)
{
  width: 100%;
  height: 0.7rem;
  font-size:0.13rem;
  color:#646363;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom:1px solid rgb(233, 230, 230);
}
.pan-good-content-wrapper>div:nth-child(3)>img
{
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  margin-right:3%;
}
.pan-good-content-wrapper>div:nth-child(4)
{
  width: 100%;
  height: 0.47rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper-apply
{
  color:#A1A1A1;
}
.wrapper-offer
{
  color:green;
  font-size:0.165rem;
}
.wrapper-offer-red
{
  color:red;
   font-size:0.165rem; 
}


// 立即预约
.SendYuyue{
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 0.5rem;
    background: #ea7a2f;
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    color: white;
    font-size: 0.16rem;
    font-weight: 500;
}

// 用户价暂无的界面 图片
.Appraise-no{
    width: 100%;
    height: 2.2rem;
    padding: 0.2rem;
    box-sizing: border-box;
}
.Appraise-img{
    height: 2rem;
}
.Appraise-img>img{   
    width: 40vw;
    height: 40vw;
    display: block;
    margin:  0 auto;
}
.Appraise-img>p{
     font-size: .4rem;
    font-size: 4vw;
    color: #8c8c8c;
}



</style>