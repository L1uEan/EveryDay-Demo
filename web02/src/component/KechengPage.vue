<template>
  <div id="KechengPage">
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
props:[

],
name:"KechengPage",
data() {
return {

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

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang='scss'>
/* @import url(); 引入css类 */
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

</style>