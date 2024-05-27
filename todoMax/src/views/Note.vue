<template>
    <div class="note">
        <Add @click="addNote"></Add>
        <Sort :sendTit="getTit"></Sort>
        <Title :tit="tit">
            <template #note v-if="tit === '全部笔记'">
                {{ obj.noteArr.length }}条笔记 | 我的笔记
            </template>
            <template #note v-if="tit === '最近删除'">
                {{ obj.noteArr.length }}条笔记 | 最近删除
            </template>
        </Title>
        <Search :updata="updata"></Search>
        <div class="hidden">
            <div :class="windowState.grid_isopen ? 'list gridList' : 'list'">
                <div class="delsShow" v-if="windowState.Dels_isopen">
                    <input type="checkbox" class="all" @change="all" :checked="isAll">
                    <button class="delsButton" @click="del">删除</button>
                    <button class="unDelButton" @click="unDel">取消</button>
                </div>
                <Card v-if="obj.noteArr" v-for="( item ) in  obj.noteArr " :key="item.id" :h1="item.h1"
                    :title="item.title" :editWin="editWin" :id="item.id" :sendDelsId="getDelsId" :isAll="isAll"
                    :getIsAll="getIsAll" ref="card" />
            </div>
        </div>
        <h1 class="noNotes" v-if="obj.noteArr[0] == null">暂无笔记...</h1>
        <NoteWin v-if="noteWinIsopen" :sendMsg="getMsg" :esc="esc"></NoteWin>
        <Edit v-if="editIsopen" :id="Id" :offEditWin="offEditWin"></Edit>
    </div>
</template>

<script setup lang="ts">

import Search from '@/components/Search.vue'
import Title from '@/components/Title.vue'
import Card from '@/components/Card.vue'
import Add from '@/components/AddButton.vue'
import Sort from '@/components/Sort.vue'
import NoteWin from '@/components/NoteWin.vue'
import Edit from '@/components/Edit.vue'
import { ref, reactive } from 'vue'
import { useNoteStore } from '@/stores/notesStore'
import { useWinStore } from '@/stores/windowState'

/* 声明 新增笔记窗口是否打开 */
let noteWinIsopen = ref(false);
/* 声明 编辑笔记窗口是否打开 */
let editIsopen = ref(false);
/* 声明临时的id 当点击卡片时将id传给编辑库框进行初始化数据操作 */
let Id = ref(0);
/* 创建noteStore实例 */
const notesStore = useNoteStore();
/* 创建windowState实例 */
const windowState = useWinStore();
/* 获取card实例 */
let card = ref();
/* 声明 笔记分类 */
let tit = ref('全部笔记');
//临时存储所有笔记，对列表进行渲染、搜索操作
let obj = reactive({
    noteArr: notesStore.notes
});
/* 声明 临时的存放id的数组，用来选中多个卡片 */
let delsId: number[] = reactive([]);
/* 声明 是否全选 */
let isAll = ref(false);
/* 声明 获取选中的笔记数量 */
let count = ref(0);

/* 方法 获取要删除的/要添加id数组 */
const getDelsId = (id: number, bol: boolean) => {
    bol ? delsId.push(id) : delsId.splice(delsId.findIndex(item => item == id), 1);
}
/* 方法 判断是否全选，user：Card */
const getIsAll = (n: number) => {
    n ? count.value++ : count.value--
    /* 判断是否全选 */
    if (count.value == notesStore.notes.length) {
        isAll.value = true;
    } else {
        isAll.value = false;
    }
}
/* 方法 点击全选复选框，实现子元素全选/全不选 */
const all = (e: Event) => {
    /* 点击全选 */
    isAll.value = (e.target as any).checked;
    /* 实现全选/全不选 */
    card.value.forEach((carddom: any) => {
        carddom.change(isAll.value);
    });

}
/* 方法 取消批量删除操作*/
const unDel = () => {
    windowState.change_Dels_isopen();
}
/* 方法 批量删除 */
const del = () => {
    if (delsId.length >= 1) { //判断是否有卡片被选中，有才进行删除操作
        notesStore.delNote(delsId);
        delsId = [];
        alert('删除成功');
        windowState.change_Dels_isopen();
        isAll.value = false;
    } else { // 没有卡片被选中，提示用户选中卡片
        alert('请选择需要删除的笔记');
    }
}

/* 方法 获取笔记的数量等信息,重新渲染列表 */
const getTit = (title: string) => {
    tit.value = title;
    if (tit.value === '全部笔记') { // 判断当前处于哪个分类
        obj.noteArr = notesStore.notes;
    } else if (tit.value === '最近删除') {
        obj.noteArr = notesStore.unNotes;
    }
}

/* 方法 点击按钮弹出添加笔记窗口 */
const addNote = () => {
    noteWinIsopen.value = true; // 弹出编辑框
}
/* 方法 新增一条笔记 user：Edit */
const getMsg = (h1: string, title: string) => {
    notesStore.addNote({
        id: obj.noteArr.length,
        h1,
        title
    })
    noteWinIsopen.value = false; // 关闭编辑框
}

/* 方法 取消新增，关闭窗口 */
const esc = () => {
    noteWinIsopen.value = false;
}

/* 方法 点击卡片进入编辑画面 / 点击删除卡片进行恢复 */
const editWin = (id: number) => {
    if (tit.value == '全部笔记') {
        Id.value = id;
        editIsopen.value = true;
    } else {
        notesStore.reCover(id);
        alert('恢复成功');
    }
}
/* 方法 关闭编辑框 */
const offEditWin = () => {
    editIsopen.value = false;
}


/* 动态更新数据 实现动态搜索功能 */
function updata(arr: any) {
    obj.noteArr = arr;
}





</script>


<style>
.note {
    position: relative;
}

.hidden {
    position: absolute;
    top: 160px;
    width: calc(100% - 20px);
    height: calc(100vh - 250px);
    overflow: hidden;
}

.hidden .list {
    width: 100vw;
    height: calc(100vh - 225px);
    overflow: scroll;
}

/* 宫格视图 */
.hidden .gridList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0px 2vw;
    gap: 3vw;
}

.delsShow {
    width: 100%;
    height: 30px;
}

.all {
    float: left;
    margin-left: 5vw;
    outline: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid whitesmoke;
}

.all:checked {
    background-color: #4f91ff;
    border-color: #4f91ff;
}

.all::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 4px 4px;
}

.all::after {
    content: '全选';
    display: inline-block;
    width: 40px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    color: whitesmoke;
    position: absolute;
    top: 0;
    left: 88px;
}

.delsButton,
.unDelButton {
    float: right;
    margin-right: 5vw;
    width: 70px;
    height: 100%;
    border-radius: 5px;
    border: none;
    background-color: red;
    color: whitesmoke;
    transition: all 0.2s;
}

.unDelButton {
    background-color: #4f91ff;
    margin-right: 10px;
}

.delsButton:hover,
.unDelButton:hover {
    cursor: pointer;
    font-size: 18px;
}

.noNotes {
    width: 100%;
    height: 50px;
    text-align: center;
    position: absolute;
    top: calc(50vh - 25px);
}
</style>