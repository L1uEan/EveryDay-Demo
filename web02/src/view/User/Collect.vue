<template>
  <div class="concern_container">
    <div class="concern_header">
      <div>我的收藏</div>
      <div class="position" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
    </div>

    <!-- 关注老师的列表 -->
    <div class="empty-container" v-if="TeacherList.length<=0">
      <van-empty
        class="empty"
        image="https://wap.365msmk.com/img/empty.0d284c2e.png"
        description="暂无关注"
      />
    </div>
    <!-- 课程内容部分 -->
    <div v-else class="concern-content">
      <div v-for="(item,index) in TeacherList" :key="index">
        <van-icon name="star-o" class="start" color="red" @click="Conqx(index)" />
        <div class="concern-top">
          <p>{{item.title}}</p>
          <p>共{{item.section_num}}课时</p>
          <ul>
            <li>
              <img :src="item.teachersAvatar" alt />
              <span>{{item.teachers}}</span>
            </li>
          </ul>
        </div>
        <div class="concern-botom">
          <div>
            <p>16人已报名</p>
            <div>
              <p>
                <img
                  src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                  alt
                />
                {{item.price}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="concern-footer" v-if="TeacherList.length>0">没有更多了</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TeacherList: [],
      sc:0,
      collect_id:0
    };
  },
  methods: {
    goBack() {
      this.$router.push("home/person");
    },
     Conqx(i){
       if(this.TeacherList.length>0){
          this.TeacherList.forEach((item,index)=>{
                    if(index==i){
                      this.collect_id=item.collect_id;
                    }
                })
            this.http.put(`/api/app/collect/cancel/${this.collect_id}/1`).then((msg)=>{
              console.log(msg)
               this.TeacherList.splice(i,1)
               this.$toast.success('已取消关注');
            })
       }
    
    }
  },
  created() {},
  mounted() {
    this.http.get("/api/app/collect?page=1&limit=10&type=1&").then(msg => {
      this.TeacherList = msg.data.data.list;
    });
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

// 课程内容
.concern-content {
  padding: 0.4rem 0.26667rem;
  padding: 4vw 2.66667vw;
  > div {
    background-color: #fff;
    padding: 0.26667rem;
    padding: 2.66667vw;
    margin-bottom: 0.26667rem;
    margin-bottom: 2.66667vw;
    border-radius: 0.13333rem;
    border-radius: 1.33333vw;
    position: relative;
  }
}
.concern-top {
  > p:nth-of-type(1) {
    font-size: 0.42667rem;
    font-size: 4.26667vw;
    font-weight: 500;
    color: #000;
  }
  > p:nth-of-type(2) {
    margin-bottom: 0.8rem;
    margin-bottom: 8vw;
    font-size: 0.32rem;
    font-size: 3.2vw;
    font-weight: 400;
    color: #666;
    margin-top: 0.26667rem;
    margin-top: 2.66667vw;
  }
  > ul {
    display: flex;
    justify-content: flex-start;
    margin-top: 0.66667rem;
    margin-top: 6.66667vw;
    > li {
      > img {
        width: 0.74667rem;
        width: 7.46667vw;
        height: 0.74667rem;
        height: 7.46667vw;
        border-radius: 50%;
        vertical-align: middle;
      }
      > span {
        font-size: 0.29333rem;
        font-size: 2.93333vw;
        color: rgba(0, 0, 0, 0.45);
        vertical-align: middle;
        margin-left: 0.2rem;
        margin-left: 2vw;
        display: inline-block;
        width: 1.6rem;
        width: 16vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.concern-botom {
  border-top: 1px solid #f5f5f5;
  margin-top: 0.4rem;
  margin-top: 4vw;
  padding-top: 0.13333rem;
  padding-top: 1.33333vw;
  > div {
    display: flex;
    justify-content: space-between;
    > p {
      font-size: 0.32rem;
      font-size: 3.2vw;
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      text-align: left;
    }
    > div {
      > p {
        font-size: 0.46667rem;
        font-size: 4.66667vw;
        color: #ee1f1f;
        display: inline-block;
        > img {
          width: 0.21333rem;
          width: 2.13333vw;
        }
      }
    }
  }
}
.start{
      width: .8rem;
    width: 8vw;
    height: .8rem;
    height: 8vw;
    float: right;
    text-align: center;
}
</style>