<template>
    <div class="nav">
        <router-link to="/" exact-active-class="active">
            <div class="nav_left">
                <i class="iconfont icon-bijijilu nav-icon"></i>
                <span>笔记</span>
            </div>
        </router-link>
        <router-link to="/todo" exact-active-class="active">
            <div class="nav_right">
                <i class="iconfont icon-daiban nav-icon"></i>
                <span>代办</span>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.nav {
    width: 100%;
    height: 80px;
    font-size: 20px;
}

.nav .nav_left,
.nav .nav_right {
    width: 50%;
    height: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transition: all 0.1s
}

.nav-icon {
    font-size: 30px;
}

a {
    color: skyblue;
}

.active {
    font-size: 26px;
    color: #4f91ff;
}
</style>