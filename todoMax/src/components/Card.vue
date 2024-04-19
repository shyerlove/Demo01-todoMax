<template>
    <div class="ccc">
        <div :class="windowState.grid_isopen ? 'card-grid' : 'card'" @click="props.editWin(props.id)">
            <strong :class="windowState.grid_isopen ? 'h1-grid' : 'h1'">{{ h1 }}</strong>
            <span style="color:#a4a6a8" :class="windowState.grid_isopen ? 'title-grid' : 'title'">
                {{ title }}
            </span>
        </div>
        <div class="dels" @click="del" v-show="windowState.Dels_isopen">
            <input type="checkbox" class="delCheck" :checked="isCheck">
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWinStore } from '@/stores/windowState'
import { ref } from 'vue'

const windowState = useWinStore();
let props = defineProps(['h1', 'title', 'id', 'editWin', 'sendDelsId', 'isAll', 'getIsAll'])
let isCheck = ref(false);

const del = () => {
    isCheck.value = !isCheck.value;
    props.sendDelsId(props.id, isCheck.value);
    if (isCheck.value) {
        props.getIsAll(1);
    } else {
        props.getIsAll(0);
    }
}

const change = (boo: boolean) => {
    isCheck.value = boo;
    props.sendDelsId(props.id, isCheck.value);
}
defineExpose({ change })

</script>

<style scoped>
.ccc {
    position: relative;
}

.card,
.card-grid {
    width: 90%;
    height: 70px;
    margin: 20px calc(5vw + 10px);
    background-color: #202224;
    padding: 10px 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px #20222470;
    display: inline-block;
    transition: all 0.2s;
}

.card-grid {
    margin: 20px calc(2vw + 10px);
}


.card:hover {
    cursor: pointer;
    height: 80px;
}

/* 宫格视图 */
.card-grid {
    height: 120px;
    padding: 20px 20px;
}

.card-grid:hover {
    cursor: pointer;
    height: 130px;
}

.h1 {
    font-size: 24px;
}

.h1-grid {
    font-size: 30px;
}

.title,
.title-grid {
    display: block;
    width: 20%;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    overflow: hidden;
    margin-top: 5px;
}

.title-grid {
    font-size: 20px;
    margin-top: 10px;
}

.dels {
    position: absolute;
    top: 20px;
    left: 5vw;
    width: 90%;
    height: 70px;
    padding: 10px 10px;
    border-radius: 10px;
    transition: all 0.8s;
}

.dels:hover {
    cursor: pointer;
}


.delCheck {
    float: right;
    outline: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid whitesmoke;
    margin: 12px 20px;
}

.delCheck:checked {
    background-color: #4f91ff;
    border-color: #4f91ff;
}

.delCheck::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 4px 4px;
}
</style>