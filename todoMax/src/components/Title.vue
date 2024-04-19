<template>
    <div class="title">
        <div class="top">
            <h1>{{ tit }}</h1>
            <i :class= "windowState.sort_isopen? 'iconfont icon-sanjiaoxing unlist':'iconfont icon-sanjiaoxing showlist'" @click="windowState.change_Sort_isopen" ref="list"></i>
        </div>
        <span class="bottom">
            <slot name="todo"></slot>
            <slot name="note"></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import type { VueElement } from 'vue';
import { ref, inject ,watch} from 'vue'
import { useWinStore } from '@/stores/windowState'

const list = ref();
let sendList: any = inject('sendList');
sendList(list);
const props = defineProps(['tit']);
const windowState = useWinStore()
</script>

<style scoped>
.title {
    width: 90%;
    height: 100px;
    margin-left: 10px;
}

.title .top {
    width: 100%;
    height: 60%;
}

.title .top h1 {
    display: inline-block;
    justify-self: center;
    line-height: 50px;
}

.title .top i {
    display: inline-block;
    margin-left: 10px;
    line-height: 50px;
    transition: all 0.2s;
}


.title .top i:hover {
    cursor: pointer;
}

.title .bottom {
    display: block;
    width: 100%;
    height: 40%;
}
.unlist{
    transform:rotate(180deg);
}
.showlist{
    transform:rotate(0deg);
}
</style>