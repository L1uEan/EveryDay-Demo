<template>
    <div >
        <div class="Details_top">
            <div v-on:click="onClick">〈</div>
            <div class="Details_title">
                课程详情
            </div>
            <div>
                <van-icon name="share" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        onClick(){
            this.$router.go(-1)
        }
    },
    mmunted(){

    }
}
</script>

<style scoped>
.Details_top
{
    width: 100%;
    height: 50px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid gainsboro;
}
</style>