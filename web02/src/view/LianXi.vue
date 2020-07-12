
<template>
  <div id="LianXi">
    <p>练习</p>
    <div class="nav">
      <ul>
        <li></li>
      </ul>
    </div>
    <footer>
      <span>近期模考</span>
      <div>
        <span style="color:#eb6100">默认排序</span>
        <span>时间</span>
      </div>
        <img src="../assets/xr.png" alt />
    </footer>
  </div>
</template>

<script>
export default {
name:"LianXi",
data() {
return {
  list: []
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
</style>