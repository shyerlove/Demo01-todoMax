<template>
    <div class="win">
        <div class="todo-win">
            <input type="text" class="todoTitle" placeholder="请输入代办事项..." ref="title" />
            <div class="btns">
                <button class="todo-save-btn" style="background-color: #4f91ff;color: whitesmoke;"
                    @click="save">保存</button>
                <button class="todo-del-btn" style="background-color: red;color: whitesmoke;" @click="esc">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
let props = defineProps(['sendMsg', 'esc'])

const title = ref();


const save = () => {
    if (title.value.value !== '') {
        props.sendMsg(title.value.value);
        title.value.value = '';
    } else {
        alert('内容不能为空！！！')
    }
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

.win .todo-win {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 30%;
    left: 30vw;
    top: 30vh;
    background-color: #202224;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 3px #2c2f3170;
    padding: 10px 10px;
    align-items: center;
    justify-content: space-around;
}

.todo-win .todoTitle {
    width: 90%;
    height: 20%;
    font-size: 20px;
    background-color: transparent;
    color: whitesmoke;
    border-radius: 10px;
    border: 1px solid #3c3f42b0;
    text-indent: 10px;
}


.todo-win .btns {
    width: 100%;
    height: 10%;
    display: flex;

}

.todo-win .btns::before {
    content: '';
    width: 60%;
    height: 100%;
}

.todo-win .btns button {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    transition: all 0.2s;
}

.todo-win .btns button:hover {
    cursor: pointer;
    font-size: 18px;
}

.todo-win .btns button:active {
    font-size: 16px;
}
</style>