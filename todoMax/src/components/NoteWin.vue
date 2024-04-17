<template>
    <div class="win">
        <div class="note-win">
            <input type="text" class="h1" placeholder="请输入标题..." ref="h1Ref" />
            <hr>
            <textarea class="title" placeholder="请输入内容..." ref="titleRef"></textarea>
            <div class="btns">
                <button class="note-del-btn" style="background-color: red;color: whitesmoke;" @click="esc">取消</button>
                <button class="note-save-btn" style="background-color: #4f91ff;color: whitesmoke;"
                    @click="save">保存</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
let props = defineProps(['h1', 'title', 'sendMsg', 'esc'])

const h1Ref = ref();
const titleRef = ref();



const save = () => {
    if (h1Ref.value.value !== '' && titleRef.value.value !== '') {
        props.sendMsg(h1Ref.value.value, titleRef.value.value)
        h1Ref.value.value = titleRef.value.value = '';
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
    background-color: #202224b5;
    filter: blur(100px);
}

.win .note-win {
    position: absolute;
    display: block;
    width: 80%;
    height: 80%;
    left: 10vw;
    top: 10vh;
    background-color: #202224;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px #20222470;
    padding: 10px 10px;
}

.note-win .h1 {
    width: 100%;
    height: 10%;
    font-size: 30px;
    background-color: transparent;
    color: whitesmoke;
    border: none;
}

.note-win .title {
    display: block;
    width: 100%;
    height: 80%;
    resize: none;
    font-size: 20px;
    background-color: transparent;
    color: whitesmoke;
    border: none;
    padding: 1em;
}

.note-win .btns {
    width: 100%;
    height: 10%;
}

.note-win .btns button {
    float: right;
    width: 70px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    transition: all 0.2s;
}

.note-win .btns button:hover {
    cursor: pointer;
    font-size: 18px;
}

.note-win .btns button:active {
    font-size: 16px;
}
</style>