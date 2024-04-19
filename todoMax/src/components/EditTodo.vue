<template>
    <div class="win">
        <div class="todo-win-min todo-win-max">
            <input type="text" class="todoTitle" placeholder="请输入代办事项..." ref="title" />
            <div class="btns">
                <button class="todo-save-btn" style="background-color: #4f91ff;color: whitesmoke;"
                    @click="save">保存</button>
                <button class="todo-del-btn" style="background-color: red;color: whitesmoke;" @click="del">删除</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import type Todo from '../type/todo';

/* 声明todoStore实例 */
const todoStore = useTodoStore();
/* 接收父组件传递的 id：点击的卡片id */
const props = defineProps(['id', 'offEditTodoWin']);
/* 获取title实例 */
const title = ref();

/* 声明一个卡片对象 */
let todoObj: Todo;

/* 初始化对应的内容 */
onMounted(() => {
    todoObj = todoStore.getTodo(props.id) as Todo;
    console.log('@', todoObj);
    title.value.value = todoObj.title;
})
onBeforeUnmount(() => {
    title.value.value = ''; // 清空
})

/* 删除笔记内容 */
const del = () => {
    todoStore.delTodo(props.id);
    alert('删除成功！');
    props.offEditTodoWin();// 关闭编辑框
}

/* 更改笔记内容 */
const save = () => {
    todoStore.changeTodo({
        id: props.id,
        title: title.value.value,
        isComplete: false
    })
    alert('修改成功！');
    props.offEditTodoWin();// 关闭编辑框
}



</script>

<style scoped>
.win {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    z-index: 999;
}

.win::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #202224;
    filter: blur(20px);
    opacity: 0.5;
}

@media(width<=500px) {
    .todo-win-min {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 80vw;
        height: 30vh;
        left: 10vw;
        top: 30vh;
        background-color: #202224;
        border-radius: 10px;
        box-shadow: 0px 0px 5px 3px #2c2f3170;
        padding: 10px 10px;
        align-items: center;
        justify-content: space-around;
    }
}

@media(width>500px) {
    .todo-win-max {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 40vw;
        height: 30vh;
        left: 30vw;
        top: 30vh;
        background-color: #202224;
        border-radius: 10px;
        box-shadow: 0px 0px 5px 3px #2c2f3170;
        padding: 10px 10px;
        align-items: center;
        justify-content: space-around;
    }
}

.todoTitle {
    width: 90%;
    height: 20%;
    font-size: 20px;
    background-color: transparent;
    color: whitesmoke;
    border-radius: 10px;
    border: 1px solid #3c3f42b0;
    text-indent: 10px;
}


.btns {
    width: 100%;
    height: 10%;
    display: flex;

}

.btns::before {
    content: '';
    width: 60%;
    height: 100%;
}

.btns button {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    transition: all 0.2s;
}

.btns button:hover {
    cursor: pointer;
    font-size: 18px;
}

.btns button:active {
    font-size: 16px;
}
</style>