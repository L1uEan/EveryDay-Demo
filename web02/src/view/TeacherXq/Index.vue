<template>
  <div id="Index">

  
    <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.banner_img" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 类型 -->
      <div class="pan-kinds">
        <ul>
          <li
            v-for="(item, index) in kindList"
            :key="index"
            @click="onClcikTo(index)">
            <span>
              <img :src="item.image" />
            </span>
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>


  <!-- 名师阵容 -->
  <div class="pan-teacher">
    <div class="pan-title">名师阵容</div>
    <div v-for="(item, index) in teacherList"   :key="index" class="pan-teacher-content" @click="getTeacher(item.teacher_id)" >
      <div><img :src="item.teacher_avatar" alt=""></div>
      <div class="pan-teacher-text">
        <div class="content-name">{{item.teacher_name}}</div>
        <div class="content-intro">{{item.introduction}}</div>
      </div>
    </div>
  </div>

  <!-- 精品课程 -->
  <div class="pan-good">
    <div class="pan-good-title">精品课程</div>
    <div v-for="(item, index) in goodList" 
         :key="index"
         class="pan-good-content">
      <div class="pan-good-content-wrapper">
        <div>{{item.title}}</div>
        <div>共{{item.sales_num}}课时</div>
        <div>
          <img :src="item.teachers_list[0].teacher_avatar" alt="">
          <span>{{item.teachers_list[0].teacher_name}}</span>
        </div>
        <div>
          <div class="wrapper-apply">{{item.sales_num}}人已报名</div>
          <div :class="item.price =='免费'?'wrapper-offer-red':'wrapper-offer'">{{item.price|IndexHomePrice}}</div>
        </div>
      </div>
    </div>
  </div>

    <!-- 推荐课程 -->
    <div class="pan-good">
      <div class="pan-good-title">推荐课程</div>
      <div v-for="(item, index) in recommendList" 
          :key="index"
          class="pan-good-content">
        <div class="pan-good-content-wrapper">
          <div>{{item.title}}</div>
          <div>共{{item.sales_num}}课时</div>
          <div v-for="(v,i) in item.teachers_list " :key="i">
            <img :src="v.teacher_avatar" alt="">
            <span>{{v.teacher_name}}</span>
          </div>
          <div>
            <div class="wrapper-apply">{{item.sales_num}}人已报名</div>
            <div :class="item.price == 0?'wrapper-offer-red':'wrapper-offer'">{{item.price|IndexHomePrice}}</div>
          </div>
        </div>
      </div>
    </div>

  <!-- 明星讲师 -->
  <div class="pan-teacher">
    <div class="pan-title">名师阵容</div>
    <div v-for="(item, index) in superList" 
         :key="index"
         class="pan-teacher-content">
      <div><img :src="item.teacher_avatar" alt=""></div>
      <div class="pan-teacher-text">
        <div class="content-name">{{item.teacher_name}} <span>{{item.grade}}</span></div>
        <div class="content-intro">{{item.introduction}}</div>
      </div>
    </div>
  </div>
  <div class="pan-empty"></div>

  </div>
</template>

<script>

export default {
  name:"Index",
  data() {
    return {
      swiperList:[],
      kindList:[
        {
          image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA8CAYAAADSfGxZAAAFZUlEQVRoQ+1bW2xUVRRd68xMeZPaFESeBkuLhkekk6IfxDEEMQqUmWGMwcQPE5FEo9GYGONP/TIh8UH88BsNwTDObR0CGsUImGDAGVEQIn1JIBYqBSwtr5m5Z5tbaDLYoXPb28d8nPs1ybl7n7PXXWedk8leRN6zfv3pSr/f9wypN4uwlhAheJKQvVnNfblc2fkLFy72ptPBbH5cqf0OhcQ/ZcqJaWVl02dRsmtJrtPQywmQwG+AfJG1M98mk0s7+9dO50dDg6jjx5vrofE2qFYC4htYnPQC6gREpwl1BD5/KpF48DRAKQ0ghNFoexVsvVKAWlCCAJYDmDZwfbQBSYPqo2XLHoo3NFD3AbEp3FKvIZ8CmFesKBE4hfcQuASgTSi7/f7pTfH4AxeLxY7G+MaNV8qV6opSEBVIjQgqSU4FRBWbTwSdCmproqmqibG1Jyv05EBCgFCxwHuNk8hCuF+RO5Dhz7dU9koyWXMNoB5uzsJxomKxi5Ntu7tcCR63oV8g1NOATPAwz8GcrTczGm2Lira/BOD3kOxOaN82+UegjwE4qrRKZcVOJ5OLO7zk3rCh/X6lsisUVJ1QgnSoD84CpI/RHp8ciJcZibRaEB32mGxAuAhyJLodYEB1REQn/P7Md/H4koybuUKhH/0VFfNDgH4eIo8BmCki95EcgQ/2/xWovYyEW/4GZLabxXl/hx0UvHnmXHfjvU6eWEx8OtuyUYhtABZ6n9NNBl5gJNx8tbCyukkwrHe6QLXFsqoaC0WHw+1riNxOADOGlX14Qb0OI256FJuhT00esqxFTxQGonk/gdVDT+op4ta4AEHiWsKqnlpo6ZFwcw+AgmOeSh00mOMFBHXCWlTg0gZEIy22SPE7wMiCYoDoP/YNI24jYRhhGHG3xhhGGEYYRhQ8d83WMFvDbA2zNQa7lBuNMBphNMJohNEIF39dGLE0YmnE0oilEUsjli4QMGJpxNKIpRFLF1JhbpZGLI1YGrE0YmnE0gUC+WI55j1UIEuuUaTHaSY7BeBh9+h5f7MEgWhmJNKyGyIx7+W5zzAYEJFws9OtOxKNpO4XBCQZibRththOO9+YPSXHCGIrY+va5tsB+zCAOWOFRCkBIYIOZfMphkJ/Tawoz34G4kUARTvaRwKsUgHCcRoQ2JHT+vXbNoX69lVa5XaNFStKBQgAl0GELav6UB8QfQ3g5XNfA+XjkfjixXKUChCK8l7X5Y5tBw48mbtLnaPh5u0CbAEwsVgxXsZL4NS4CeJzy6p+pb+Ou4CIxQ5PyuUq3yL4BiCj1hQ+zoz4F4IPc1pvTyYXO+3Ofc+A89oBQzIzH9VKPgBk1Wic6eMEhGOqOQLiHZ9v0i/x+Lwb+ay+58XF8U3YduuzFHlVgKUQTAc5yY1Xqti2GQsg7pwI10H2CORPQH9y9mzNvnSaBR2Krm5wkcipBSKBOooESdQKuAKQ8uGyZRSBcL56twC/UyRFqKOiJGVZ1e1FP06xF/LHa2tTgTlzJlQEAhNna40QgSggdQACQ8kDoNdqrC5gQwSGaVPIkvhVNCz6yr6/caP3fGfnzUtD8ae6YsRgRcZirVW2Lc9BY5NAHLvkNBKDue4cw+QPVlP1mkJ5I+HT3wBcOzjbJCPCq1ToANhIqp2JxMJWLx5Uz0D0F+O4b2eUn1liq1wQIkEI60A8MsAdRLQqW1766uuanwoBEY22BSF6l4hU5Y87ZjkQfxBMQUuKwqNqwq2Tbs1yxRg7YkDkT+ScPJnMzMoyxQU29DpA6gHMFeCYz+d7v6vr7EHnElN4caLC4ZbVhLwL0HH1ngO4F0BSa7ZrPfnSnj2zrxcrbKjj/wFPducAYoibwgAAAABJRU5ErkJggg==",
          title:"特色课"
        },
        {
          image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA8CAYAAADRy2JxAAAEDElEQVRoQ+2aTWhUVxTH/+fNRyYmE78WirTQFgwiXSjFjWDRlR+k0CIOlJiaVk1VNGrGmBZaOy24EXSmlBqk2inUyaRZKM3MFFxoNt1VQXEhiogSSKwL48ckMTNz7yk3VQntTN7Me2HezJv3tveee+7vnnP+9773LgFAaGjIPZ4eeVsCX4KwCZKXgEhTbRX3EP4mxiXp1b46tfHjYTPzIwX+/PloO4i/AfCGmcHKZcsAa6ALYnKiIxzY9dioX+pOxJZL4Eq1gM8AfeRyy/dPbG67bRg+mIxFwWg3OoBldkTMLFaf+qDthtE5UDDRNwrwUqMDWGnHkKvMwQ/GBAiVKW46K2sePhFjK6NnxrcDb67mncibyT7LbJ20d9LeWPJR0KZq352KLmX2vguX5n+9NDmAmB7kXqTvh7ftHLMlfFeqv5lYXARjZZ6cEAD+AmG/LeGDidhBAJFCxaBejEAYtCV8VzL2NTG+m1UJCE9rFx6AA29so7DeqtAhp6i0dyJvw33eibye2jtp76S99cptZAaO2ud5pXUEzxG82YvJOd4aEZtKsHEEr0YFb0oKXhP+cPvN/2ZhLaj9XUHYGGlpvVcz8OoTFAETID7pn/AeDwUCmfLAT/8Wxp9EuE7M2XKLHhMxMacl+NaLSW/qdCCQzjeHuU97IgbzOZGRx0T92OOp4TpZbvhlzc0cWr9B/VWe9efqnMIzIEAUnwR39ra0jpUbulR/cwf/b8TPC4/siWxqGy11Ilb0nxt4VWPA2Vx26mjko0+fWAFixKdpeJXqBPSJXKazmsCnr9WNj/wiGa16C5f/bK+T6ocuRhdoLs8KaFSv56Cc7STIzRqvJaJOMC/S8/1/eAUO/klkMz35In7093N+ofl6AV4PaC49B2VtZ3U9D00gqgOritV7q0vGnoAxX3UrJtW/+CO+OivkNfX9T2/wSm+nI6l4J0vZw0ATgfpFRhyLbC2s6l2D51uIKFHpYMXMj7YNDHjfdE++xW6PJ+eWwz9s2f5sNkNbwRezQjP7dCV/20Ccu2yLtC8V/lAy9o6LoWp+Qam2lda/ZNHqSJyZ59caf4ZEoNqjXzK8it7h5K/rNNbOMrCcqlj1DcGrPfTwYP97mov3QvJmAEuq8f6uMfiXxbtv4MdGX8PiZaRhviayPstqmqlegrYQcIBR/CVqU/CWwRZwfCQR382QYQDzitEjW8F3XD3jaRpp3AtCiIGFesGxFbyCDQ1FfemJuh2QfFqvBGwH/yrawVTfLkiEAW4oVAK2hVcl4H/o30PM3xYqAdvCqwxoH4r6Fo97PyFGb74SsDX8qxLoTsY/E1J+D0LDjEOZrAn46V1gtPFzxvSV1Je7AN2pCfjXJZCu3wqSx8H8yEXo+Qf3I4hni2PDwwAAAABJRU5ErkJggg==",
          title:"一对一辅导"
        },
        {
          image:"data:image/png;base64,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",
          title:"学习日历"
        }
      ],
      teacherList:[],
      goodList:[],
      recommendList:[],
      superList:[],
      selectIndex:0,
    
    }
  },
  // 局部过滤器
  filters:{
    // 过滤器判断 如果价格val为0就返回免费 如果大于0 就保留两位小数点
      IndexHomePrice(val){
          // console.log(val)
          if(val==0){
            return "免费"
          }else{
            // 保留后面两位小数
            return `$:${(val/100).toFixed(2)}`;
          }
          return val;
      }
  },
    methods: {
    // 点击访问到课程部分
    onClcikTo(index){
      this.selectIndex = index
      if(index == 0){
        this.$router.push("/home/kecheng")
      }
    },
    // 点击名师阵容进入不同的讲师详情页面
    getTeacher(id){
        // alert(id)
        this.$router.push({path:"/teacher",query:{id:id}})
    },
 

  },
  // 局部自定义指令
  directives:{
      // "move":{
      //     bind(el){
      //         // console.log(el)
      //         el.onmousedown=function(e){
      //           // 当前参数e表述鼠标的xy坐标
      //           // console.log(e)
      //           // 首先获取当前div的xy坐标
      //           var x=e.clientX;
      //           var y=e.clientY;
      //           // 获取当前div距离上左边界的距离
      //           var divL=el.offsetLeft;
      //           var divT=el.offsetTop;
      //           // console.log(divL,divT,x,y)
      //           // 2.请求之后进行一个dom移动
      //           document.touchmove=function(e){
      //             // console.log(el.style.left)
      //             // alert(1)
      //              var x1=e.clientX-x+divL;
      //              var y1=e.clientY-y+divT;
      //              console.log(x1,y1)

      //               el.style.left=x1+"px";
      //               el.style.top=y1+'px';
      //           }
      //         }
      //     }
      // }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 轮播接口数据渲染
    this.http.get('https://www.365msmk.com//api/app/banner').then((msg)=>{
      // console.log(msg)
      // window.console.log(msg)
      this.swiperList=msg.data.data;
    })
    // 首页列表
    this.http.get('https://www.365msmk.com/api/app/recommend/appIndex').then((msg)=>{

          // console.log(msg)
          msg.data.data.forEach((item,index)=>{
           // 名师阵容
             if(item.channel_info.type==3){
                  this.teacherList=item.list;
                  // console.log(item.list)
           // 精品课程
             }else if(item.channel_info.name=="精品课程"){
                this.goodList=item.list;
                // console.log(this.goodList)
            //  推荐课程
             }else if(item.channel_info.name=="推荐课程"){
                this.recommendList=item.list;
                // console.log(item.list)
             }
            // 明星讲师
            else if(item.channel_info.name=="明星讲师"){
                this.superList=item.list;
                // console.log(item.list)
            }
          })
          // console.log(msg.data.data[1].list)
    })

  }
}

</script>

<style lang='scss'>
  /* @import url(); 引入css类 */




#Index{
    font-size: 0.14rem;
    width: 100%;
    height: 6.67rem;
    background:rgb(240,242,245);
    overflow: scroll;
}



.pan-empty
{
  width: 100%;
  height: 0.5rem;
}
/* 轮播图 */
.my-swipe .van-swipe-item 
{
  width: 100%;
  height: 1.8rem;
  background-color: red;
}
.my-swipe .van-swipe-item img
{
  width: 100%;
  height: 1.8rem;
}
/* 类型 */
.pan-kinds
{
  position:relative;
  margin-top:-0.2rem;
  margin-bottom:0.2rem;
  width: 100%;
}
.pan-kinds ul
{
  display:flex;
  justify-content: space-around;
}
.pan-kinds>ul>li
{
  width: 28%;
  height: 1rem;
  background-color: #fff;
  border-radius: 0.1rem;
  display:flex;
  justify-content: center;
  /* 横排 */
  flex-direction: column;
  text-align: center;
}
.pan-kinds>ul>li>span
{
  margin:0.07rem 0;
  color:#A1A1A1;
  font-size:0.12rem;
}
.pan-kinds>ul>li>span>img
{
  width: 0.23rem;
}
/* 名师阵容、明星讲师*/
.pan-teacher
{
  width: 100%;
  padding:0 3%;
  box-sizing: border-box;
  margin-bottom:0.2rem;
}
.pan-title
{
  border-left:3px solid red;
  padding-left:2%;
  font-size:0.16rem;
}
.pan-teacher-content
{
  width: 100%;
  height: 1rem;
  background-color: #fff;
  margin-top:0.1rem;
  border-radius: 0.1rem;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.pan-teacher-text{
  width: 80%;
 
}
.pan-teacher-text>div:nth-of-type(1){
  height: 0.3rem;
  line-height: 0.3rem;
  padding-left: 0.1rem;
  box-sizing: border-box;
  margin-top: 0.05rem;
}

.pan-teacher-content>div:nth-child(1)
{
  width: 20%;
  display:flex;
  justify-content: center;
  align-items: center;
}
.pan-teacher-content>div:nth-child(1)>img
{
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
}
.content-name
{
  font-size:0.155rem;
}
.content-name>span
{
  padding-left:0.02rem;
  color:orange;
  font-size:0.12rem;
}
.content-intro
{
  width: 100%;
  font-size: 0.115rem;
  color:#ccc;
  height: 0.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 精品课程 、推荐课程*/
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

</style>