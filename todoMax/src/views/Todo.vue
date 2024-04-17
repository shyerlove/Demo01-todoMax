<template>
    <Title :tit="tit" :tit2="tit2"></Title>
    <div class="hidden">
        <div class="list">
            <TodoCard v-for="item in todoStore.todos" :key="item.id" :id="item.id" :title="item.title"
                :isComplete="item.isComplete">
            </TodoCard>
        </div>
    </div>

    <Add @click="addTodo"></Add>
</template>

<script setup lang="ts">

import Title from '@/components/Title.vue'
import TodoCard from '@/components/TodoCard.vue'
import Add from '@/components/AddButton.vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore();
let len = todoStore.todos.length;
let tit = '全部代办';
let tit2 = `${len}条代办`;

/* 新增一条todo */

function addTodo() {
    todoStore.addTodo({
        id: todoStore.todos.length + 1,
        title: '学习',
        isComplete: false
    })
}


</script>

<style scoped>
.hidden {
    position: absolute;
    top: 160px;
    width: calc(100% - 20px);
    height: 330px;
    overflow: hidden;
}

.hidden .list {
    width: 100vw;
    height: 350px;
    overflow: scroll;
}
</style>