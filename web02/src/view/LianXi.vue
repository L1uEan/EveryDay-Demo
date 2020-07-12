
<template>
  <div id="LianXi">
    <p>练习</p>
    <div class="practice-content">
      <div class="question-classify">
        <div
          v-for="(item, index) in classify"
          :key="index"
        >
          <img :src="item.img" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <!-- 近期模考 -->
      <div class="mold-test">
        <h1>近期模考</h1>
        <div class="sort">
          <span>默认排序</span>
          <span>时间</span>
        </div>
        <div class="empty-container">
          <van-empty
            class="empty"
            description="暂无模考安排，敬请期待"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:"LianXi",
data() {
  return {
    classify: [
        {
          img: require("@/assets/images/exam-point.png"),
          title: "考点专练",
        },
        {
          img: require("@/assets/images/paper-package.png"),
          title: "套卷练习",
        },
        {
          img: require("@/assets/images/exam.png"),
          title: "仿真模考",
        },
        {
          img: require("@/assets/images/wrong-test.png"),
          title: "错题练习",
        },
        {
          img: require("@/assets/images/assess.png"),
          title: "测评记录",
        },
        {
          img: require("@/assets/images/question-collocet.png"),
          title: "习题收藏",
        }
      ]
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
<style lang="scss">
/* @import url(); 引入css类 */
p{
  text-align: center;
  font-size: 0.2rem;
  line-height: 0.5rem;
}
.nav{
  width: 100%;
  height: 2rem;
  background: #eee;
}
footer{
  // border: 1px solid #000;
  span{
    font-size: 0.16rem;
    color: rgb(133, 133, 133);
  }
  div{
    padding: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 0.14rem;
    }
  }
  img{
    width: 100%;
  }
}
.practice-content {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(240, 242, 245);
}
.question-classify {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 1vw;
  margin: 3vw;
  padding-left: 2vw;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2vw;
    padding: 2vw 0;
    width: 20%;
    img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
    }
    span {
      margin: 3vw 0 0;
      font-size: 3vw;
    }
  }
}
.mold-test {
  padding: 4vw 5vw;
  background: #fff;
  color: #8c8c8c;
  h1 {
    font-size: 4vw;
    margin-bottom: 3.8vw;
  }
  .sort {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10vw;
    font-size: 3.6vw;
  }
  .empty-container {
    .empty {
      height: 20vh;
      .van-empty__image {
        width: 30vw;
        height: 30vw;
      }
    }
  }
}
</style>