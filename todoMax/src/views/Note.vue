<template>
    <div class="note">
        <Add @click="addNote"></Add>
        <Sort></Sort>
        <Title :tit="tit" :tit2="tit2"></Title>
        <Search :updata="updata"></Search>
        <div class="hidden">
            <div class="list">
                <Card v-for="(item) in obj.noteArr" :key="item.id" :h1="item.h1" :title="item.title" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import Search from '@/components/Search.vue'
import Title from '@/components/Title.vue'
import Card from '@/components/Card.vue'
import Add from '@/components/AddButton.vue'
import Sort from '@/components/Sort.vue'
import { ref, reactive } from 'vue'
import { useNoteStore } from '@/stores/notesStore'
import type Note from '@/type/note'

const notesStore = useNoteStore();

let obj = reactive({
    noteArr: notesStore.notes
}); //临时存储所有笔记
let len = obj.noteArr.length;
let tit = '全部笔记'
let tit2 = `${len}条笔记 | 我的笔记`
/* 新增一条note */
function addNote() {
    notesStore.addNote({
        id: notesStore.notes.length + 1,
        h1: `第${notesStore.notes.length + 1}条笔记`,
        title: '今天天气不错'
    })
}


function updata(arr: any) {
    // console.log(arr);
    obj.noteArr = arr;
    len = obj.noteArr.length
    tit2 = `${len}条笔记 | 我的笔记`
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
</style>