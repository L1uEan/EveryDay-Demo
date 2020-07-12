<template>
    <div class="box">
        <header>约课记录</header>
            <van-tabs v-model="active">
            <van-tab title="待上课"></van-tab>
            <van-tab title="已上课"></van-tab>
            <van-tab title="已取消"></van-tab>
            </van-tabs>
        <div class="rp-empty" v-show="!show">
                <img src="https://wap.365msmk.com/img/no-message.8d3ca5af.png" />
                <p>{{emptyTip}}</p>
                <van-button v-show="(active == 0 || active == 1) && login">立即约课</van-button>
                <van-button v-if="!login" >登录/注册</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
             //str:0
             active: 0,
              login: true,
              list: []

        };
    },
    methods: {
        change() {
                if (!this.login) {
                    return;
                }
                this.show = false;
                this.params = {
                    type: this.active + 1
                };
                this.$refs.list.reset();
            },
        //数据更新
        //add(){
             //this.str++
        //},
        //数据销毁
        //de(){
            // this.destroy()
        //}
    },
    computed:{
        show: {
                get() {
                    return this.list.length;
                },
                set() {}
            },
        emptyTip() {
                let ret = "";
                if (this.login) {
                    switch (this.active) {
                    case 0:
                        ret = "还没有待上课记录哦";
                        break;
                    case 1:
                        ret = "还没有上课记录哦";
                        break;
                    case 2:
                        ret = "还没有取消上课记录哦";
                        break;
                    }
                } else {
                    ret = "请登录后查看相关内容";
                }
                return ret;
            }
    }
    //组件创建之前调用
    //beforeCreate() {
        //console.log('vue...............beforeCreate---组件创建之前调用')
    //},
    //组件创建加载完成
    //created() {
        //console.log('vue...............created---组件创建加载完成')
    //},
    //数据挂在之前(渲染)
    //beforeMount() {
        //console.log('vue...............beforeMount---数据挂在之前(渲染)')
    //},
    //数据挂在完成(渲染)
    //mounted() {
        //.log('vue...............mounted---数据挂在完成(渲染)')
    //},
    //数据更新之前
    //beforeUpdate() {
        //console.log('vue...............beforeUpdate---数据更新之前')
    //},
    //数据更新完成
    //updated() {
        //onsole.log('vue...............updated---数据更新完成')
    //},
    //数据销毁之前
    //beforeDestroy() {
        //console.log('vue...............beforeDestroy---数据销毁之前')
    //},
    //数据销毁完成
    //destroyed() {
        //console.log('vue...............destroyed---数据销毁完成')
    //},
    //watch:{
        //route(){
               //console.log('vue...............destroyed---监听属性')
        //}
    //}
};
</script>

<style scoped>
header{
    width: 100%;
    text-align: center;
    padding: .3rem 0;
    font-size: 18px;
    background: white;
    border-bottom: 1px solid #F0F2F5;
}
.box{
    width: 100%;
    height: 667px;
    background: #F0F2F5;
}
.rp-empty{
    width: 100%;
    flex:1;
    
}
.rp-empty img{
    display: block;
    width: 48%;
    margin: 2.5rem auto 20px;
    margin-top:0.5rem;
}
.rp-empty p{
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(183, 183, 183, 1);
    text-align: center;
}
.rp-empty button{
    margin: 0 auto;
    display: block;
    width: 1rem;
    height: 0.5rem;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    background: #EB6100;
    border-radius: 5px;
}
</style>
