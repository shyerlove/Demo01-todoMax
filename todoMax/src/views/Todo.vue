<template>
    <Title :tit="tit">
        <template #todo>
            {{ len }}条代办
        </template>
    </Title>
    <div class="hidden">
        <div :class="windowState.grid_isopen ? 'list gridList' : 'list'">
            <TodoCard v-for="item in todoStore.todos" :key="item.id" :id="item.id" :title="item.title"
                :isComplete="item.isComplete" @click.self="editTodoWin(item.id)">
            </TodoCard>
        </div>
    </div>
    <h1 class="noTodos" v-if="todoStore.todos[0] == null">暂无代办事项...</h1>
    <Add @click="addTodo"></Add>
    <TodoWin :sendMsg="getMsg" :esc="esc" v-if="todoWinIsopen"></TodoWin>
    <EditTodo v-if="editTodoIsopen" :id="Id" :offEditTodoWin="offEditTodoWin"></EditTodo>
</template>

<script setup lang="ts">

import Title from '@/components/Title.vue'
import TodoCard from '@/components/TodoCard.vue'
import Add from '@/components/AddButton.vue'
import TodoWin from '@/components/TodoWin.vue'
import EditTodo from '@/components/EditTodo.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useWinStore } from '@/stores/windowState'
import { ref, computed } from 'vue'

/* 创建 windowState实例 */
const windowState = useWinStore();
/* 声明 卡片编辑窗口是否弹出 */
let editTodoIsopen = ref(false);

/* 声明 id，用来存储点击卡片的id */
let Id = ref(0);

/* 声明 todo新增弹框是否弹出 */
let todoWinIsopen = ref(false);
/* 声明 一个 todoStore实例 */
const todoStore = useTodoStore();
/* 方法 计算未完成的代办 */
let len = computed(() => {
    let count = 0;
    todoStore.todos.forEach(item => {
        item.isComplete ? [] : count++
    })
    return count;
})
/* 声明 当前分类 */
let tit = '全部代办';


/* 新增一条todo */
function addTodo() {
    todoWinIsopen.value = true; // 弹出编辑框
}
const getMsg = (title: string) => {

    todoStore.addTodo({
        id: len.value,
        title,
        isComplete: false
    })
    todoWinIsopen.value = false;
}

/* 取消新增编辑 */
const esc = () => {
    todoWinIsopen.value = false;
}

/* 点击卡片进入编辑画面 */
const editTodoWin = (id: number) => {
    Id.value = id;
    editTodoIsopen.value = true;
}
/* 关闭编辑框 */
const offEditTodoWin = () => {
    editTodoIsopen.value = false;
}



</script>

<style scoped>
.hidden {
    position: absolute;
    top: 160px;
    width: calc(100% - 20px);
    height: calc(100vh - 250px);
    overflow: hidden;
}

.hidden .list {
    width: 100vw;
    height: calc(100vh - 230px);
    overflow: scroll;
}

.noTodos {
    width: 100%;
    height: 50px;
    text-align: center;
    position: absolute;
    top: calc(50vh - 25px);
}

/* 宫格视图 */
.gridList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
</style>