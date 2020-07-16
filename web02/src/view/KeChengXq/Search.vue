<template>
  <div class="search_container">
      <!-- 头部搜索部分 -->
    <header  class="search-header">
        <van-icon  @click="goBack" name="arrow-left" />
        <input type="text" v-model="value" placeholder="请输入内容" @click="showToogle" >
        <span @click="getSearch">搜索</span>
    </header>

    <!-- 历史记录搜索部分 -->
    <div class="search-content" v-show='show'>
        <!-- 历史记录标题 -->
        <div class="search-title">
            <p>
                <span>历史记录</span>
                <span>
                    <img @click="del" src="../../assets/delett.png" alt="">
                </span>
            </p>
        </div>
        <!-- 历史记录显示 -->
         <div class="search-history" >
              <span v-for="(item,index) in SearchLocal" :key="index" @click="goDetails(item.name)">{{item.name}}</span>
         </div>
    </div>

    <!-- 历史记录详情页面 -->
        <div class="course_list_container"
          v-show='!show'
          id="history-search"
          >
            <div class="list_wrapper">
              <div
                class="list_item_container"
                v-for="(item,index) in lists"
                :key="index"
                v-on:click="toDetails(item.id)"
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
import { Toast } from "vant";
export default {
  data() {
    return {
      value: "",
      show:true,
      lists:[],
      // 点击历史记录的框 进行页面跳转并传参 拿到id值储存用
      id:'',
      SearchLocal:JSON.parse(localStorage.getItem('SearchLocal'))||[]
    };
  },
  filters:{
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
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("确定");
    },
    onClick() {
      this.$router.go(-1);
    },
    // 点击返回
    goBack(){
       window.history.go(-1)
    },
    // 历史记录清空
    del(){
        alert(1)
    },
    //点击搜索进行搜索数据的请求 并且显示我们搜索详情部分
    getSearch() {
        console.log(this.value)
      if (this.value) {
        this.axios
          .get(
            `https://www.365msmk.com/api/app/courseBasis?limit=10&page=1&course_type=0&keywords=${this.value}`
          )
          .then(msg => {
            console.log(msg.data.data.list);
            this.lists=msg.data.data.list;
            // 当数据成功接收值后就让它显示
            this.show=true;
          });

          //如果input框内的值存在 就将它存储在local中 
          var LocalArr=this.SearchLocal;
          var data={
             name:this.value,
          }
          LocalArr.push(data);
          localStorage.setItem('SearchLocal',JSON.stringify(LocalArr))
      }
    },
    //点击页面进入我们的搜索详情
    toDetails(id){
      //  console.log(id)
          this.id=id;
          this.$router.push({path:'/details',query:{id:100}})
        // console.log(item)
    },
    // goDetails 点击历史记录将值传入input框内中
    goDetails(item){
         this.value=item;
    },
    // 获取焦点时 如果input框内有值的话历史记录就搜索
    showToogle(){
      console.log(this.value)
       if(this.value){
          this.show=false;
       }
    }
  },
  computed:{

  },
    mounted(){
      console.log(this.SearchLocal)
    }
};
</script>
<style lang='scss'>
#history-search{
  margin-top: 0 !important;
}
.search_container{
    padding-bottom: 1.06667rem;
    padding-bottom: 10.66667vw;
}
.search-header{
     height: 1.25333rem;
    height: 12.53333vw;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    i{
        font-size: 0.23rem;
        font-weight: 600;
        margin-left: 0.1rem;
    }
    input{
            height: .8rem;
            height: 8vw;
            padding-left: .74667rem;
            padding-left: 7.46667vw;
            border: none;
            background: #e4e7ed;
            border-radius: .4rem;
            border-radius: 4vw;
            font-size: .4rem;
            font-size: 4vw;
            width: 70%;
            box-sizing: border-box;
    }
    >span{
        font-size: .37333rem;
        font-size: 3.73333vw;
        color: #d2d2d1;
    }
}
// 历史记录搜索部分
.search-content{
    margin: .4rem .45333rem;
    margin: 4vw 4.53333vw;

}

.search-history{
     display: flex;
    flex-wrap: wrap;
    justify-content: left;
    span{
        margin: .26667rem .18667rem 0 .18667rem;
        margin: 2.66667vw 1.86667vw 0 1.86667vw;
        padding: .16rem .26667rem;
        padding: 1.6vw 2.66667vw;
        border-radius: .26667rem;
        border-radius: 2.66667vw;
        background: #f7f7f7;
        font-size: .32rem;
        font-size: 3.2vw;
        color: #333;
    }
}

.search-title{
    height: 1.06667rem;
    height: 10.66667vw;
    >p{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            >span:nth-of-type(1){
                font-size: .4rem;
                font-size: 4vw;
                color: #333;
                font-weight: 700
            }
            >span:nth-of-type(2){
                >img{
                          display: inline-block;
                        width: .37333rem;
                        width: 3.73333vw;
                        height: .37333rem;
                        height: 3.73333vw;
                }
            }
    }
}
</style>