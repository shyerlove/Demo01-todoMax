<template>
    <ul class="sort" ref="sort">
        <li @click="showList">全部笔记</li>
        <li >未分类(添加分类)</li>
        <li @click="showList">最近删除</li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWinStore } from '@/stores/windowState'
const sort = ref();
const props = defineProps(['sendTit'])


defineExpose({ sort }) // 将实例交给父组件

const windowState = useWinStore();
windowState.$subscribe((mutate, state) => {
    if (state.sort_isopen) {
        sort.value.style.height = '200px';
        sort.value.style.boxShadow = '3px 3px 10px 3px rgba(0, 0, 0, 0.5)';
    } else {
        sort.value.style.height = '0px';
        sort.value.style.boxShadow = '';
    }
})

/* 显示对应分类 */
const showList = (e:Event) => {
    props.sendTit((e.target as any).innerText); 
}


</script>

<style scoped>
.sort {
    position: fixed;
    left: 100px;
    top: 100px;
    width: 60%;
    height: 0px;
    background-color: #202224;
    border-radius: 10px;
    z-index: 999;
    overflow: hidden;
    transition: all 0.2s;
}

.sort li {
    width: 90%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin: 10px auto;
    border-bottom: 1px solid #acb2ac73;
}

.sort li:hover {
    cursor: pointer;
    border-radius: 10px;
    background-color: #acb2ac73;
}
</style>