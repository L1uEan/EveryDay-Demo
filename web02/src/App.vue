<template>
  <div id="app">
      <router-view/>
        <!-- email邮箱拖拽部分 -->
    <div class="email" id='emailBox' @touchstart="down()" @touchmove="move()" @touchend="end()">
        <img src="./assets/img/email.png" alt="">
    </div>

  </div>
</template>

<script>
export default {
name:"",
data() {
return {
       position:{x:0,y:0},
      divL:0,
      divT:0,
      dragBool:false
}
},
methods:{
     // 邮件图片进行拖拽
    down(e){
      this.dragBool=true;
      // alert(1)
      if(this.dragBool){
         //获取当前鼠标的坐标 通过event.touches对象内获取clienX
          var x=event.touches[0].clientX;
          var y=event.touches[0].clientY;
          var divL=emailBox.offsetLeft;
          var divT=emailBox.offsetTop;
          this.position.x=x;
          this.position.y=y;
          this.divL=divL;
          this.divT=divT;
          console.log(divL,divT)
          // console.log(x,y)
      }
     
    },
    move(){
       let touch;
       if(this.dragBool){
          touch=event.touches[0]
       }else{
         touch=event
       }
        var x=touch.clientX-this.position.x+this.divL;
        var y=touch.clientY-this.position.y+this.divT;
     
        // 最大宽度的判定 获取当前body的可视宽度
        var MaxWidth=document.documentElement.clientWidth-emailBox.clientWidth;
        var MaxHeight=document.documentElement.clientHeight-emailBox.clientHeight;
        if(x<0){
            x=0
        }else if(x>MaxWidth){
          x=MaxWidth;
        }
        if(y<0){
          y=0;
        }else if(y>MaxHeight){
          y=MaxHeight;
        }

        emailBox.style.left=x+"px";
        emailBox.style.top=y+'px';
    },
    end(){
        this.dragBool=false;
        
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
/* email */
.email{
  width: 0.6rem;
  height: 0.6rem;
  background-color: rgb(0, 122, 255);
  display: flex;
  align-items: center;
  border-radius: 50%;
  position: fixed;
  right: 0.15rem;
  bottom: 0.6rem;
  z-index: 10;
  >img{
    display: block;
    margin: 0 auto;
    width: 0.3rem;
  }
}
*{
  margin: 0;
  padding: 0;
}
body,html{
  font-size: 0.14rem;
}
</style>