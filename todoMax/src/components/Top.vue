<template>
    <div class="top">
        <i class="iconfont icon-gengduo" @click="changeMore" ref="more"></i>
    </div>
</template>

<script setup lang="ts">

import { useWinStore } from '@/stores/windowState'
import { ref, inject } from 'vue'

let more = ref();
const sendMore: any = inject('sendMore');
sendMore(more);

function changeMore() {
    let windowState = useWinStore();
    windowState.change_More_isopen();
    console.log(windowState.more_isopen);

}
</script>


<style scoped>
.top {
    width: 100%;
    height: 50px;
    padding: 10px 10px;
}

.top i {
    float: right;
    font-size: 30px;
}

.top i:hover {
    cursor: pointer;
}
</style>