<template>
  <div id="course_container">
      <div class="course_top">
        <div class="course_title">特色课 <p class="course_search"><van-icon name="search" v-on:click="onClick" /></p></div>
      <div class="course_down">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
      </div>
      </div>
      <div style="width:100%;height:100px"></div>
      <div class="course_list_container">
        <div class="list_wrapper">
          <div class="list_item_container" v-for="(item,index) in lists" :key="index" v-on:click="toDetails(item)">
              <div class="list_item">
                <div class="item">
                    <div class="item_title">
                    {{item.intro}}
                  </div>
                  <div style="font-size:13px;color:gray;padding:10px 0px">
                    {{item.time}} | {{item.total}}
                  </div>
                  <div class="item_img">
                      <img :src="item.img" alt="">
                      <div>{{item.name}}</div>
                  </div>
                  <div class="item_bottom">
                    <div>{{item.apply}}</div>
                    <p>{{item.offer}}</p>
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
name:"KeCheng",
data() {
    return {
      value1: 0,
      value2: 'a',
      value3: 'a',
      option1: [
        { text: '分类', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      option3: [
        { text: '商品', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],

      lists:[]
    };
  },
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
  this.http.get("http://localhost:8080/data.json").then((response)=>{
    console.log(response.data)
    this.lists = response.data.teacher.third
  })
},
methods:{
  onClick(event){
    // console.log(event)
    this.$router.push({
      name:"Search",
      params:{
        item:event
      }
    })
  },

  toDetails(value){
    console.log(value)
    this.$router.push({
      name:"Details"
    })
  }
}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.course_container
{
  width: 100%;
}

.course_top
{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.course_title
{
  width:100%;
      height: 46px;
      background:white;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid gainsboro;
      position: relative;
}

.course_search
{
  width:100px;
  height: 50%;
  position: absolute;
  right: 0px;
  top: 5px;
}

.course_down
{
  width: 100%;
  height: 45px;
}

.course_list_container
{
  width: 100%;
  height: 800px;
  background-color: rgb(240,242,245);
  overflow: scroll;
  margin-bottom: 50px;
}

.list_wrapper
{
  width: 100%;
  /* height: ; */
}

.list_item_container
{
  width: 100%;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.list_item
{
  width: 90%;
  height: 90%;
  padding: 5px;
  background-color: #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.item
{
  width: 90%;
  height: 90%;

}

.item_img
{
  width: 100%;
  height: 60px;
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid gainsboro;
  font-size: 14px;
  color: rgb(156, 156, 156);
  
}

.item_img img
{
  width: 30px;
  border-radius: 30px;
  margin-right: 10px;

}

.item_bottom
{
  width: 100%;
  height: 50px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.item_bottom div
{
  font-size: 14px;
  color: gray;
}

.item_bottom p
{
  font-size: 14px;
  color: rgb(11, 129, 11);
}
</style>