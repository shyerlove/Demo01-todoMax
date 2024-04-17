<template>
    <div class="card">
        <strong style="font-size: 24px;">{{ h1 }}</strong>
        <span style="color:#a4a6a8">
            {{ title }}
        </span>
    </div>
</template>

<script setup lang="ts">
let props = defineProps(['h1', 'title'])
</script>

<style scoped>
.card {
    width: 90%;
    height: 70px;
    margin: 20px auto;
    background-color: #202224;
    padding: 10px 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px #20222470;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.2s;
}

.card:hover {
    cursor: pointer;
    height: 80px;
}

.card span {
    display: block;
    width: 20%;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    overflow: hidden;
}
</style>