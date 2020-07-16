<template>
  <div id="course_container">
    <div class="course_top">
      <van-nav-bar title="特色课" @click-right="Search" id="Kecheng-nav">
        <template #right>
          <van-icon name="search" size="22" color="red" />
        </template>
      </van-nav-bar>

      <!-- vant下拉菜单部分 -->
      <div class="course_down">
        <van-dropdown-menu>
          <!-- 分类 -->
          <van-dropdown-item title="分类" ref="flToogle" >
              <div class="kecheng-fl">
                <!-- 年级 -->
                 <div class="kecheng-fl-nianji">
                   <p>{{Nianji.name}}</p>
                   <div>
                      <span v-for="(v,i) in Nianji.child" :key="i" :class="Flid1==v.id?'flactive':' '" @click="KechengFl1(v.id,i)">{{v.name}}</span>
                   </div> 
                 </div>
                 <!-- 学科 -->
                 <div class="kecheng-fl-nianji">
                   <p>{{Xueke.name}}</p>
                   <div>
                      <span v-for="(v,i) in Xueke.child" :key="i" :class="Flid2==v.id?'flactive':' '" @click="KechengFl2(v.id,i)">{{v.name}}</span>
                   </div> 
                 </div>
                 
                 <!-- 重置确定 -->
                 <div class="kecheng-fl-btn">
                    <button>重置</button>
                    <button @click="send">确定</button>
                 </div>
              </div>
          </van-dropdown-item>
          <!-- 排序 -->
          <van-dropdown-item title="排序" ref="pxToogle">
            <div class="kecheng-px">
                 <ul>
                    <li v-for="(item,index) in pxlist" :key="index" @click="KechengPx(index)" :class="pxIndex==index?'pxactive':' '">{{item}}</li>
                 </ul>
              </div>
          </van-dropdown-item>
          <!-- 筛选 -->
          <van-dropdown-item title="筛选" ref="sxToogle">
            <div class="kecheng-sx">
              <div>
                <span v-for="(item,index) in third" :key="index" @click="KechengSx(index)"  v-show="!item==''"  :class="sxIndex==index?'sxactive':''">
                   {{item}}
                 </span>
                 <span @click="KechengHy" :class="hyIndex==0?'hyactive':''">会员课</span>
              </div>
                 
              </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <div style="width:100%;height:100px"></div>


    
        <!-- 内容部分 -->
          <div class="course_list_container" 
             v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10"
          >
            <div class="list_wrapper">
              <div
                class="list_item_container"
                v-for="(item,index) in lists"
                :key="index"
                v-on:click="toDetails(item)"
              >
                <div class="list_item">
                  <div class="item">
                    <div class="item_title">{{item.title}}</div>
                    <div
                      style="font-size:13px;color:gray;padding:10px 0px"
                    >{{item.start_play_date | time}}~{{item.start_play_date | time }}</div>
                    <div class="item_img" v-for="(v,i) in item.teachers_list" :key="i">
                      <img :src="v.teacher_avatar" alt />
                      <div>{{v.teacher_name}}</div>
                    </div>
                    <div class="item_bottom">
                      <div>{{item.sales_num}}人已报名</div>
                      <p>{{item.price|price}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

  </div>
</template>

<script>
export default {
  name: "KeCheng",
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "a",
      show: true,
      lists: [],
      loading:false,
      // loadMore:false,
      sort:[],
      // 年级
      Nianji:[],
      // 学科
      Xueke:[],
      // 样式下标的初始化
      Flid1:'',
      Flid2:'',
      rank:[],
      pxlist:["综合排序","最新","最热","价格从低到高","价格从高到低"],
      third:[ 
         "全部",
        '',
        "大班课",
        "小班课",
        "公开课",
        "点播课",
        '',
        "面授课",
        "音频课",
        "系统课",
        "图文课",],
      pxIndex:-1,
      sxIndex:-1,
       limit:10,
       isVip:1,
       hyIndex:-1
    }
  },

  //局部过滤器
  filters: {
    time(value) {
      // console.log(value)
      var date = new Date(value * 1000);
      // console.log(date)
      // 将管道符前的时间获取到
      //年
      var year = date.getFullYear();
      // 月
      var month = date.getMonth() + 1;
      // 日
      var day = date.getDate();
      // 小时
      var hours = date.getHours();
      // 分
      var min = date.getMinutes();
      //秒  padStart()方法用于时间补零：参数1为增加后的字符串长度，参数2为填充的字符串
      var hm = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      // console.log(year,month,day,hours,min)
      return month + "月-" + day + "日" + " " + hours + ":" + min;
    },
    price(val) {
      if (val <= 0) {
        return "免费";
      } else {
        return val;
      }
      return val;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
      this.KechengMsg()
  },

  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 请求分类筛选
    this.axios.get('https://www.365msmk.com/api/app/courseClassify?').then((msg)=>{
      console.log(msg)
      this.Nianji=msg.data.data.attrclassify[0]
      this.Xueke=msg.data.data.attrclassify[1];
      console.log(msg.data.data.attrclassify[0])
    })
    
    console.log(this.limit)
  },
  methods: {
    // 点击搜索进行页面跳转
    Search() {
      // alert(1)
      this.$router.push("/search");
    },
    // 点击课程进入详情
    toDetails(value) {
      // console.log(value);
      this.$router.push({
        name: "Details"
      });
    },
    // 无限滚动
      loadMore(){
          // this.loading=true; 
           setTimeout(() => {
                //请求内容数据
                this.limit=this.limit+10;
                this.KechengMsg()
                this.$toast.success('正在加载');
          }, 3000); 
      },
      // 请求数据
      KechengMsg(){
          this.axios.get(`https://www.365msmk.com/api/app/courseBasis?page=1&limit=${this.limit}`)
                .then(msg => {
                      this.loading = false;
                      console.log(msg.data.data.list);
                      this.lists = msg.data.data.list;
                         this.$toast.success('加载数据完成')
                 });
          } ,
      //点击课程分类请求不同的接口
      KechengFl1(v,i){
            this.Flid1=v;
      },
      KechengFl2(v,i){
            this.Flid2=v;
      },
      // 点击确定 进行一个发送一个分类的请求接口
      send(){
        var arr=[]
        this.$refs.flToogle.toggle();
        if(this.Flid1!=-1 ){
          arr.push(this.Flid1)
        }
        if(this.Flid2!=-1){
          arr.push(this.Flid2)
        }
        var attr_val_id=arr.join(',');
        console.log(attr_val_id)
        this.axios({
          url:'https://www.365msmk.com/api/app/courseBasis',
          method:'get',
          params:{
            page:1,
            limit:10,
            attr_val_id:attr_val_id,
          }
        }).then((msg)=>{
          console.log(msg)
          this.lists = msg.data.data.list;
        })

      },
      // 点击排序请求不同的接口
      KechengPx(index){
          // alert(index)
           this.pxIndex=index;
           this.$refs.pxToogle.toggle();
           this.axios.get(`https://www.365msmk.com/api/app/courseBasis?page=1&limit=10&order_by=${this.pxIndex}`)
                .then(msg => {
                            console.log(msg.data.data.list);
                            this.lists = msg.data.data.list;
              });
      },
      // 点击筛选请求数据
      KechengSx(index){
          alert(index)
          this.sxIndex=index;
          this.$refs.sxToogle.toggle();
           this.axios.get(`https://www.365msmk.com/api/app/courseBasis?page=1&limit=10&course_type=${this.sxIndex}`)
                .then(msg => {
                            // console.log(msg.data.data.list);
                            this.lists = msg.data.data.list;
              });
      },
      // 单独点击会员时进行数据请求
      KechengHy(){
          this.hyIndex=0;
          this.$refs.sxToogle.toggle();
           this.axios.get(`https://www.365msmk.com/api/app/courseBasis?page=1&limit=10&is_vip=${this.isVip}`)
                .then(msg => {
                            console.log(msg.data.data.list);
                            this.lists = msg.data.data.list;
                 });
      }
  }
};
</script>
<style lang='scss'>
/* @import url(); 引入css类 */



/* nav */
#Kecheng-nav {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  box-sizing: border-box;
}

.course_container {
  width: 100%;
}

.course_top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.course_title {
  width: 100%;
  height: 46px;
  background: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gainsboro;
  position: relative;
}

.course_search {
  width: 100px;
  height: 50%;
  position: absolute;
  right: 0px;
  top: 5px;
}

.course_down {
  width: 100%;
  height: 45px;
}

.course_list_container {
  width: 100%;
  height: 800px;
  background-color: rgb(240, 242, 245);
  overflow: scroll;
  margin-bottom: 50px;
}

.list_wrapper {
  width: 100%;
  /* height: ; */
}

.list_item_container {
  width: 100%;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.list_item {
  width: 90%;
  height: 90%;
  padding: 5px;
  background-color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.item {
  width: 90%;
  height: 90%;
}

.item_img {
  width: 100%;
  height: 60px;
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid gainsboro;
  font-size: 14px;
  color: rgb(156, 156, 156);
}

.item_img img {
  width: 30px;
  border-radius: 30px;
  margin-right: 10px;
}

.item_bottom {
  width: 100%;
  height: 50px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.item_bottom div {
  font-size: 14px;
  color: gray;
}

.item_bottom p {
  font-size: 14px;
  color: rgb(11, 129, 11);
}


/* nav-bar */
.kecheng-fl{
  padding-left: .4rem;
    padding-left: 4vw;
    padding-bottom: .26667rem;
    padding-bottom: 2.66667vw;
    >.kecheng-fl-nianji{
          padding-bottom: .26667rem;
          padding-bottom: 2.66667vw;
          border-bottom: 1px solid #f1f1f1;
          >p:nth-of-type(1){
              padding: .42667rem 0 .26667rem;
              padding: 4.26667vw 0 2.66667vw;
              font-size: .32rem;
              font-size: 3.2vw;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #595959;
          }
          >div{
              span{
                    margin: 0 .61333rem .18667rem 0;
                      margin: 0 6.13333vw 1.86667vw 0;
                      display: inline-block;
                      width: 1.84rem;
                      width: 18.4vw;
                      height: .88rem;
                      height: 8.8vw;
                      background: #f5f5f5;
                      border-radius: .08rem;
                      border-radius: .8vw;
                      font-size: .34667rem;
                      font-size: 3.46667vw;
                      font-family: PingFangSC-Regular;
                      font-weight: 400;
                      color: #646464;
                      text-align: center;
                      line-height: .88rem;
                      line-height: 8.8vw;
                      overflow: hidden;
              }
          }
    }

  // 分类样式
  .flactive{
    color: orange !important;
    border: #eb6100 !important;
  }

    .kecheng-fl-btn{
      padding: .4rem 0;
      padding: 4vw 0;
      display: flex;
      justify-content: space-between;
      >button{
            width: 4.53333rem;
            width: 45.33333vw;
            height: .88rem;
            height: 8.8vw;
            background: #fff;
            border-radius: .10667rem;
            border-radius: 1.06667vw;
            border: .02667rem solid #d9d9d9;
            border: .26667vw solid #d9d9d9;
            font-size: .34667rem;
            font-size: 3.46667vw;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #595959;
            margin-right: .26667rem;
            margin-right: 2.66667vw;
      }
      >button:nth-of-type(2){
            color: #fff;
            background: #eb6100;
            border: 0;
      }
    }
}
.pxactive{
  color: orange !important;
}

// 课程排序
.kecheng-px{
  ul{
    li{
          height: 1.36rem;
          height: 13.6vw;
          text-align: center;
          line-height: 1.36rem;
          line-height: 13.6vw;
          font-size: .37333rem;
          font-size: 3.73333vw;
          font-family: PingFangSC-Regular;
          /* font-weight: 400; */
          color: #595959;
          border-bottom: 1px solid #f5f5f5;
    }
  }
}
// 课程筛选部分
.kecheng-sx{
    padding-top: .53333rem;
    padding-top: 5.33333vw;
    padding-left: .4rem;
    padding-left: 4vw;
    div{
      padding-bottom: .26667rem;
      padding-bottom: 2.66667vw;
      border-bottom: 1px solid #f1f1f1;
        span{
          margin-left: 0.15rem;
          margin-top: 0.1rem;
          display: inline-block;
          width: 1.84rem;
          width: 18.4vw;
          height: .88rem;
          height: 8.8vw;
          background: #f5f5f5;
          border-radius: .08rem;
          border-radius: .8vw;
          font-size: .34667rem;
          font-size: 3.46667vw;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #646464;
          text-align: center;
          line-height: .88rem;
          line-height: 8.8vw;
          overflow: hidden;
        }
    }

}
.sxactive{
  color: #eb6100 !important;
}
.hyactive{
  color: #eb6100 !important;
}
</style>