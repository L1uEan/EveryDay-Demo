<template>
  <div class="concern_container">
    <div class="concern_header">
      <div>我的关注</div>
      <div class="position" @click="goBack"><van-icon name="arrow-left" /></div>
    </div>
    <div class="empty-container">
        <van-empty
          class="empty"
          image="https://wap.365msmk.com/img/empty.0d284c2e.png"
          description="暂无关注"
        />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      goBack(){
        this.$router.push("home/person")
      }
    },
  }
</script>

<style lang="scss" scoped>
.concern_container
{
  width: 100%;
  height: 6.67rem;
  background-color: #F0F2F5;
}
.concern_header
{
  width: 100%;
  height: 0.44rem;
  background-color: #fff;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:0.16rem;
  position:relative;
}
.position
{
  position: absolute;
  left:0.1rem;
  top:0.15rem;
} 
</style>