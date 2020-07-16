<template>
  <div class="concern_container">
    <!-- 头部 -->
    <div class="concern_header">
      <div>我的关注</div>
      <div class="position" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
    </div>
    <!-- 内容 -->
    <div class="concern-box">
        <!-- 关注老师的列表 -->
        <div class="empty-container" v-if="TeacherList.length<=0">
          <van-empty
            class="empty"
            image="https://wap.365msmk.com/img/empty.0d284c2e.png"
            description="暂无关注"
          />
        </div>
      
        <div v-else class="concern-list" v-for="(item,index) in TeacherList" :key="index"> 
          <img :src="item.avatar" alt="">
                <div>
                  <p>
                    <span>{{item.teacher_name}}</span>
                    <span>{{item.level_name}}</span>              
                  </p>
                  <p>{{item.introduction}}</p>
                </div>
                <p @click="guanzhuClick(index)">已关注</p>
        </div>

        <div class="concern-footer" v-if="TeacherList.length>0">
           没有更多了
        </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      TeacherList:[],
      flag:'',
      collect_id:0
    };
  },
  mounted() {
    console.log(1);
    this.http.get('/api/app/collect?page=1&limit=10&type=2&').then((msg)=>{
      // console.log(msg.data)
      this.TeacherList=msg.data.data.list;
    })
  },
  methods: {
    goBack() {
      this.$router.push("home/person");
    },
    // 点击取消关注小时
   guanzhuClick(i) {
     if(this.TeacherList.length>0){
      // 获取要删除的collect_id值
                this.TeacherList.forEach((item,index)=>{
                        if(index==i){
                          this.collect_id=item.collect_id;
                          // console.log(item.collect_id)
                        }
                    })
          // 请求删除的id的直接 并将id传入
              this.http.put(`/api/app/collect/cancel/${this.collect_id}/2`).then((msg)=>{
                console.log(msg)
                    this.TeacherList.splice(i,1)
                    this.$toast.success('已取消关注');
              })
     }
    },
  }
};
</script>

<style lang="scss" scoped>
.concern_container {
  width: 100%;
  height: 6.67rem;
  background-color: #f0f2f5;
}
.concern_header {
  width: 100%;
  height: 0.44rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.16rem;
  position: relative;
}
.position {
  position: absolute;
  left: 0.1rem;
  top: 0.15rem;
}

// 老师列表
.concern-box{
  padding: .4rem .26667rem;
    padding: 4vw 2.66667vw;
}
.concern-list{
     background-color: #fff;
    padding: .26667rem;
    padding: 2.66667vw;
    margin-bottom: .26667rem;
    margin-bottom: 2.66667vw;
    border-radius: .13333rem;
    border-radius: 1.33333vw;
    position: relative;
    display: flex;
    align-items: center;
  >img{
        width: 1.06667rem;
      width: 10.66667vw;
      height: 1.06667rem;
      height: 10.66667vw;
  }
  >div{
    margin-left: .26667rem;
    margin-left: 2.66667vw;
    line-height: .66667rem;
    line-height: 6.66667vw;
    >p:nth-of-type(1){
      >span:nth-of-type(1){
        font-size: .4rem;
        font-size: 4vw;
        color: #595959;
      }
       >span:nth-of-type(2){
        margin-left: .16rem;
        margin-left: 1.6vw;
        font-size: .29333rem;
        font-size: 2.93333vw;
        color: #ea7a2f;
      }
    }
    >p:nth-of-type(2){
        font-size: .32rem;
        font-size: 3.2vw;
        color: #b7b7b7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 5.33333rem;
        width: 53.33333vw
    }
  }
  >p:nth-of-type(1){
      position: absolute;
      top: 50%;
      right: .4rem;
      right: 4vw;
      transform: translateY(-50%);
      font-size: .34667rem;
      font-size: 3.46667vw;
      color: #eb6100;
      text-align: center;
      width: 2.02667rem;
      width: 20.26667vw;
      height: .74667rem;
      height: 7.46667vw;
      line-height: .74667rem;
      line-height: 7.46667vw;
      background: rgba(235,97,0,.1);
      border-radius: .41333rem;
      border-radius: 4.13333vw;
  }
}
// 尾部更多了
.concern-footer{
  width: 100%;
  height: 0.3rem;
  font-size: 0.13rem;
  color: #969799;
  text-align: center;
  line-height: 0.3rem;
}
</style>