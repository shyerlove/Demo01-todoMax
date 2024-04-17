<template>
    <div class="app" @click="offwin">
        <!-- 头部 -->
        <header>
            <Top></Top>
            <More></More>
        </header>
        <!-- 展示 -->
        <section>
            <router-view></router-view>
        </section>
        <!-- 底部导航 -->
        <footer>
            <Nav></Nav>
        </footer>
    </div>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
import Top from '@/components/Top.vue'
import More from '@/components/More.vue'
import { ref, provide } from 'vue';
import { useWinStore } from '@/stores/windowState'

/* 获取pinia实例 */
const windowState = useWinStore();
/* 接收 三角形 的实例 */
let list = ref();
const getList = (ele: any) => {
    list.value = ele;
}
provide('sendList', getList);

/* 接收 更多 实例 */
let more = ref();
const getMore = (ele: any) => {
    more.value = ele;
}
provide('sendMore', getMore);

/* 点击其他对方收起下拉菜单 */
const offwin = (event: Event) => {
    if (event.target !== list.value.value) {
        windowState.sort_isopen = false;
    }
    if (event.target !== more.value.value) {
        windowState.more_isopen = false;
    }
}

</script>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
    position: relative;
}

footer {
    width: 100%;
    position: absolute;
    bottom: 0;
}
</style>
