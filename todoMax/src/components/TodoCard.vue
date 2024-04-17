<template>
    <div class="todoCard" ref="todocrard">
        <input type="checkbox" name="todoCheckBox" @change="complete(id)">
        <span class="title">{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore();

let props = defineProps(['id', 'title', 'isComplete']);
const todocrard = ref()
/* 点击复选框，表示完成代办，添加删除线样式 */
const complete = (id: number) => {
    const [checkbox, title] = todocrard.value.children;
    checkbox.checked ? title.style.textDecoration = 'line-through' : title.style.textDecoration = 'none';
    todoStore.completeTodo(id, checkbox.checked);
}


</script>

<style scoped>
.todoCard {
    width: 90%;
    height: 50px;
    border-radius: 10px;
    background-color: #202224;
    box-shadow: 3px 3px 3px 3px #20222470;
    margin: 10px auto;
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.todoCard input[type="checkbox"] {
    display: inline-block;
    outline: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid whitesmoke;
    transition: all 0.1s;
}

.todoCard input[type="checkbox"]::after {
    content: '';
    display: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin: 3px 3px;
    background-color: #4f90ff;
}

.todoCard input[type="checkbox"]:checked::after {
    display: block;
}

.todoCard input[type="checkbox"]:checked {
    border-color: #4f90ff;
    background-color: #4f90ff;
}

.todoCard .title {
    display: inline-block;
    width: fit-content;
    height: 20px;
    font-size: 22px;
    margin-left: 10px;
    line-height: 15px;
}
</style>