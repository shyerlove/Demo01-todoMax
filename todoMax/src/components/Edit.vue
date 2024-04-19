<template>
    <div class="win">
        <div class="note-win">
            <input type="text" class="h1" placeholder="请输入标题..." ref="h1Ref" />
            <hr>
            <textarea class="title" placeholder="请输入内容..." ref="titleRef"></textarea>
            <div class="btns">
                <button class="note-del-btn" style="background-color: red;color: whitesmoke;" @click="del">删除</button>
                <button class="note-save-btn" style="background-color: #4f91ff;color: whitesmoke;"
                    @click="save">保存</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNoteStore } from '@/stores/notesStore'
import type Note from '@/type/note';

/* 声明noteStore实例 */
const notesStore = useNoteStore();
/* 接收父组件传递的 id：点击的卡片id */
const props = defineProps(['id', 'offEditWin']);
/* 获取h1实例 */
const h1Ref = ref();
/* 获取title实例 */
const titleRef = ref();

/* 声明一个卡片对象 */
let noteObj: Note;
/* 初始化对应的内容 */
onMounted(() => {
    noteObj = notesStore.getNote([props.id])[0] as Note;
    h1Ref.value.value = noteObj.h1;
    titleRef.value.value = noteObj.title;
})

/* 删除笔记内容 */
const del = () => {
    notesStore.delNote([props.id]);
    alert('删除成功！');
    props.offEditWin();// 关闭编辑框
}

/* 更改笔记内容 */
const save = () => {
    notesStore.changeNote({
        id: props.id,
        h1: h1Ref.value.value,
        title: titleRef.value.value
    })
    alert('修改成功！');
    props.offEditWin();// 关闭编辑框
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

@media(width<=500px) {
    .note-win {
        position: absolute;
        display: block;
        width: 80%;
        height: 30%;
        left: 10vw;
        top: 30vh;
        background-color: #202224;
        border-radius: 10px;
        box-shadow: 3px 3px 3px 3px #20222470;
        padding: 10px 10px;
    }
}

@media(width>500px) {
    .note-win {
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
}

.note-win .h1 {
    width: 100%;
    height: 10%;
    font-size: 30px;
    background-color: transparent;
    color: whitesmoke;
    border: none;
    margin-bottom: 20px;
}

.note-win .title {
    display: block;
    width: 100%;
    height: 60%;
    resize: none;
    font-size: 20px;
    background-color: transparent;
    color: whitesmoke;
    border: none;
    padding: 1em;
}

.note-win .btns {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: end;
}

.note-win .btns button {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    border: none;
    transition: all 0.2s;
    margin-right: 10px;
}

.note-win .btns button:hover {
    cursor: pointer;
    font-size: 18px;
}

.note-win .btns button:active {
    font-size: 16px;
}
</style>