<template>
    <div class="search_container">
        <div class="search_top">
            <div v-on:click="onClick">〈</div>
            <div class="search">
                <form action="/">
                <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
                />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
        value: '',
        };
    },
    methods: {
        onSearch(val) {
        Toast(val);
        },
        onCancel() {
        Toast('取消');
        },
        onClick(){
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
.search_container
{
    width: 100%;
}

.search_top
{
    width: 100%;
    height: 50px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.search
{
    width: 90%;
}
</style>