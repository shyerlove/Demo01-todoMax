<template>
    <div class="note">
        <Add @click="addNote"></Add>
        <Sort></Sort>
        <Title :tit="tit">
            <template #note>
                {{ obj.noteArr.length }}条笔记 | 我的笔记
            </template>
        </Title>
        <Search :updata="updata"></Search>
        <div class="hidden">
            <div class="list">
                <Card v-if="obj.noteArr" v-for="(item) in obj.noteArr" :key="item.id" :h1="item.h1" :title="item.title"
                    @click="editWin(item.id)" />
            </div>
        </div>
        <h1 class="noNotes" v-if="obj.noteArr[0] == null">暂无笔记...</h1>
        <NoteWin v-show="noteWinIsopen" :sendMsg="getMsg" :esc="esc"></NoteWin>
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



let noteWinIsopen = ref(false);
let editIsopen = ref(false);
let Id = ref(0);
const notesStore = useNoteStore();


//临时存储所有笔记
let obj = reactive({
    noteArr: notesStore.notes
});
/* 定义笔记的数量及其他信息 */
let tit = '全部笔记'

/* 新增一条note */
function addNote() {
    noteWinIsopen.value = true; // 弹出编辑框
}
const getMsg = (h1: string, title: string) => {

    notesStore.addNote({
        id: obj.noteArr.length,
        h1,
        title
    })
    noteWinIsopen.value = false; // 关闭编辑框
}

/* 取消编辑 */
const esc = () => {
    noteWinIsopen.value = false;
}

/* 点击卡片进入编辑画面 */
const editWin = (id: number) => {
    Id.value = id;
    editIsopen.value = true;
}
/* 关闭编辑框 */
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
    height: 280px;
    overflow: hidden;
}

.hidden .list {
    width: 100vw;
    height: 300px;
    overflow: scroll;
}

.noNotes {
    width: 100%;
    height: 50px;
    text-align: center;
    position: absolute;
    top: calc(50vh - 25px);
}
</style>