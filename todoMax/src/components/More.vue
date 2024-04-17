<template>
    <ul class="more" ref="more">
        <li>宫格视图</li>
        <li>批量删除</li>
        <li>设置</li>
    </ul>
</template>

<script setup lang="ts">
import { useWinStore } from '@/stores/windowState'
import { ref } from 'vue'

let windowState = useWinStore();
const more = ref();

windowState.$subscribe((mutate, state) => {
    if (state.more_isopen) {
        more.value.style.height = '200px';
        more.value.style.boxShadow = '3px 3px 10px 3px rgba(0, 0, 0, 0.5)';
    } else {
        more.value.style.height = '0px';
        more.value.style.boxShadow = '';
    }

})


</script>

<style scoped>
.more {
    position: fixed;
    right: 30px;
    top: 40px;
    width: 40vw;
    height: 0px;
    background-color: #202224;
    /* box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.5); */
    border-radius: 10px;
    z-index: 999;
    transition: all 0.2s;
    overflow: hidden;
}

.more li {
    width: 90%;
    height: 50px;
    margin: 10px auto;
    text-align: center;
    line-height: 50px;

    border-bottom: 1px solid #acb2ac73;
}

.more li:hover {
    cursor: pointer;
    border-radius: 10px;
    background-color: #acb2ac73;
}
</style>