<template>
  <div id="Teseke">
    <div class="course_top">
      <van-nav-bar title="特色课" @click-right="Search" id="Kecheng-nav">
        <template #right>
          <van-icon name="search" size="22" color="red" />
        </template>
      </van-nav-bar>

      <!-- 下拉菜单部分 -->
      <div class="course_down">
        <van-dropdown-menu>
          <!-- 分类 -->
          <van-dropdown-item title="分类" ref="flToogle">
            <div class="kecheng-fl">
              <!-- 年级 -->
              <div class="kecheng-fl-nianji">
                <p>{{Nianji[0].name}}</p>
                <div>
                    <span v-for="(v,i) in Nianji[0].child" :key="i" :class="Flid1==v.id?'flactive':' '" @click="KechengFl1(v.id)">{{v.name}}</span>
                </div>
              </div>
              <!-- 学科 -->
              <div class="kecheng-fl-nianji">
                <p>{{Xueke[0].name}}</p>
                <div>
                     <span v-for="(v,i) in Xueke[0].child" :key="i" :class="Flid2==v.id?'flactive':' '" @click="KechengFl2(v.id)">{{v.name}}</span>
                </div>
              </div>

              <!-- 重置确定 -->
              <div class="kecheng-fl-btn">
                <button @click="reset">重置</button>
                <button @click="send">确定</button>
              </div>
            </div>
          </van-dropdown-item>
          <!-- 排序 -->
          <van-dropdown-item title="排序" ref="pxToogle">
            <div class="kecheng-px">
              <ul>
                <li
                  v-for="(item,index) in pxlist"
                  :key="index"
                  @click="KechengPx(index)"
                  :class="pxIndex==index?'pxactive':' '"
                >{{item}}</li>
              </ul>
            </div>
          </van-dropdown-item>
          <!-- 筛选 -->
          <van-dropdown-item title="筛选" ref="sxToogle">
            <div class="kecheng-sx">
              <div>
                <span
                  v-for="(item,index) in sxlist"
                  :key="index"
                  @click="KechengSx(index)"
                  :class="sxIndex==index?'sxactive':''"
                >{{item.name}}</span>
                <!-- <span @click="KechengHy" :class="hyIndex==0?'hyactive':''">会员课</span> -->
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>


    <!-- 课程具体内容部分 -->
    
    
          <div class="course_list_container" 
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
  name: "TeseKe",
  data() {
    return {
      // 筛选数据的渲染
      sxlist: [],
      // 筛选下标
      sxIndex: -1,
      // 排序数组
      pxlist: ["综合排序", "最新", "最热", "价格从低到高", "价格从高到低"],
      pxIndex: -1,
      // 分类样式状态
      Flid1:'',
      Flid2:'',
      // 分类数组
      Nianji: [
        {
          id: 1,
          name: "年级",
          parent_id: 0,
          child: [
            {
              id: 1,
              name: "初一"
            },
            {
              id: 2,
              name: "初二"
            },
            {
              id: 3,
              name: "初三"
            },
            {
              id: 4,
              name: "高一"
            },
            {
              id: 5,
              name: "高二"
            }
          ]
        }],
        Xueke:[
        {
          id: 2,
          name: "学科",
          parent_id: 0,
          child: [
            {
              id: 7,
              name: "语文"
            },
            {
              id: 8,
              name: "数学"
            },
            {
              id: 9,
              name: "英语"
            },
            {
              id: 12,
              name: "物理"
            },
            {
              id: 13,
              name: "化学"
            }
          ]
        }
      ],
      // 课程内容列表数据
      lists:[],
      // 分类 删选 会员课的参数
     courseInfo: {
        page: 1, //页数
        limit: 10, //数量
        course_type: 0,//筛选类型
        classify_id: "",
        order_by: "",//排序方式0综合排序，1最新，2最热，3价格由低到高
        attr_val_id: 0,//分类id
        is_vip: 0
      }
    };
  },

  methods: {
    //点击搜索进入路由跳转
    Search() {
      this.$router.push("/search");
    },
    // 点击确认 进行数据的分类渲染
    send(i) {
      // 创建一个数组
        var arr=[];
        // 如果当前分类年级的下标被点击 就push到arr数组
        if(this.Flid1!=-1){
          arr.push(this.Flid1)
        }
        // 如果当前分类学科的下标被点击 就PUSH到arr数组
        if(this.Flid2!=-1){
          arr.push(this.Flid2)
        }
        var attr_val_id=arr.join(',')
        this.courseInfo.attr_val_id=i;
        this.KechengMsg()
        // 点击确定后 将下拉菜单关闭
        this.$refs.flToogle.toggle();
    },
    //点击重置 分类的数据进行初始化
    reset(){
        // 因为设置了一个flid的值 所以将他设为-1 并重新请求接口数据就实现了重置
        this.Flid1=-1;
        this.Flid2=-1;
        this.$refs.flToogle.toggle();
    },
    // 
    // 点击排序请求不同的接口  
    KechengPx(i) {
      // 课程排序某一个进行样式切换
      this.pxIndex = i;
      this.courseInfo.order_by=i;
      this.KechengMsg()
      this.$refs.pxToogle.toggle();
    },
    // 点击筛选请求不同的接口
    KechengSx(i) {
      //点击课程筛某一个进行样式切换
      this.sxIndex = i;
      this.courseInfo.course_type=i;
      this.KechengMsg()
    },
    // 点击课程分类进行样式的切换\
    KechengFl1(id){
      console.log(id)
      this.Flid1=id;
    },
    KechengFl2(id){
      console.log(id)
      this.Flid2=id;
    },
    // 数据进行同步传参
    KechengMsg(){
         this.http({
           url:'/api/app/courseBasis',
           method:'get',
           params:this.courseInfo
         }).then((msg)=>{
           console.log(msg)
             this.lists = msg.data.data.list;
         })
        
         
    }
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
  //生命周期 - 创建完成（访问当前this实例）
  created() {
      // 数据初始化
      this.KechengMsg()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    
    // 请求分类 筛选 排序的数据列表
    this.http.get("/api/app/courseClassify").then(msg => {
      console.log(msg);
      //筛选 大班课等等的数据
      this.sxlist = msg.data.data.appCourseType;
    });
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
  margin-top: 1rem;
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
.kecheng-fl {
  padding-left: 0.4rem;
  padding-left: 4vw;
  padding-bottom: 0.26667rem;
  padding-bottom: 2.66667vw;
  > .kecheng-fl-nianji {
    padding-bottom: 0.26667rem;
    padding-bottom: 2.66667vw;
    border-bottom: 1px solid #f1f1f1;
    > p:nth-of-type(1) {
      padding: 0.42667rem 0 0.26667rem;
      padding: 4.26667vw 0 2.66667vw;
      font-size: 0.32rem;
      font-size: 3.2vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #595959;
    }
    > div {
      span {
        margin: 0 0.61333rem 0.18667rem 0;
        margin: 0 6.13333vw 1.86667vw 0;
        display: inline-block;
        width: 1.84rem;
        width: 18.4vw;
        height: 0.88rem;
        height: 8.8vw;
        background: #f5f5f5;
        border-radius: 0.08rem;
        border-radius: 0.8vw;
        font-size: 0.34667rem;
        font-size: 3.46667vw;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #646464;
        text-align: center;
        line-height: 0.88rem;
        line-height: 8.8vw;
        overflow: hidden;
      }
    }
  }

  // 分类样式
  .flactive {
    color: orange !important;
    border: #eb6100 !important;
  }

  .kecheng-fl-btn {
    padding: 0.4rem 0;
    padding: 4vw 0;
    display: flex;
    justify-content: space-between;
    > button {
      width: 4.53333rem;
      width: 45.33333vw;
      height: 0.88rem;
      height: 8.8vw;
      background: #fff;
      border-radius: 0.10667rem;
      border-radius: 1.06667vw;
      border: 0.02667rem solid #d9d9d9;
      border: 0.26667vw solid #d9d9d9;
      font-size: 0.34667rem;
      font-size: 3.46667vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #595959;
      margin-right: 0.26667rem;
      margin-right: 2.66667vw;
    }
    > button:nth-of-type(2) {
      color: #fff;
      background: #eb6100;
      border: 0;
    }
  }
}
.pxactive {
  color: orange !important;
}

// 课程排序
.kecheng-px {
  ul {
    li {
      height: 1.36rem;
      height: 13.6vw;
      text-align: center;
      line-height: 1.36rem;
      line-height: 13.6vw;
      font-size: 0.37333rem;
      font-size: 3.73333vw;
      font-family: PingFangSC-Regular;
      /* font-weight: 400; */
      color: #595959;
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
// 课程筛选部分
.kecheng-sx {
  padding-top: 0.53333rem;
  padding-top: 5.33333vw;
  padding-left: 0.4rem;
  padding-left: 4vw;
  div {
    padding-bottom: 0.26667rem;
    padding-bottom: 2.66667vw;
    border-bottom: 1px solid #f1f1f1;
    span {
      margin-left: 0.15rem;
      margin-top: 0.1rem;
      display: inline-block;
      width: 1.84rem;
      width: 18.4vw;
      height: 0.88rem;
      height: 8.8vw;
      background: #f5f5f5;
      border-radius: 0.08rem;
      border-radius: 0.8vw;
      font-size: 0.34667rem;
      font-size: 3.46667vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #646464;
      text-align: center;
      line-height: 0.88rem;
      line-height: 8.8vw;
      overflow: hidden;
    }
  }
}
.sxactive {
  color: #eb6100 !important;
}
.hyactive {
  color: #eb6100 !important;
}
</style>