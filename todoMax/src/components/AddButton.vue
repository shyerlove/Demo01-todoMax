<template>
    <div class="add-button">
        <i class="iconfont icon-tianjia"></i>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.add-button {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #4f91ff;
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 100px;
    z-index: 999;
    box-shadow: 0 0 2px 2px #3c63a7;
}

.add-button:hover {
    cursor: pointer;
}

.add-button i {
    font-size: 30px;
}

.add-button:active i {
    font-size: 25px;
}
</style>