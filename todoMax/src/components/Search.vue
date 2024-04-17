<template>
    <div class="search">
        <img src="../assets/search.png">
        <input type="text" name="inp" id="inp" placeholder="搜索笔记" @keyup="search">
    </div>
</template>

<script setup lang="ts">
import { useNoteStore } from '@/stores/notesStore'

let props = defineProps(['updata']);
let updata = props.updata;
const notesStore = useNoteStore();

const search = (e: Event) => {

    // console.log((<any>e.currentTarget).value);
    let msg = (<any>e.currentTarget).value;
    let noteArr = notesStore.notes; // 定义暂存区
    noteArr = noteArr.filter(item => {
        let len = msg.length;
        let str = item.h1.slice(0, len);
        if (str == msg && msg != '') {

            // console.log(item.h1);
            return item;
        }
    })
    if (msg == '') { noteArr = notesStore.notes; }
    updata(noteArr)
}
</script>

<style scoped>
.search {
    position: absolute;
    top: 100px;
    left: 5vw;
    width: 90%;
    height: 40px;
    background-color: #3f4a41;
    border-radius: 20px;
}

.search img {
    width: 20px;
    height: 20px;
    float: left;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    margin: 10px 10px;
}

.search input[type="text"] {
    border: none;
    outline: none;
    text-indent: 5px;
    width: calc(100% - 40px);
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: transparent;
    color: #acb2ac;
}
</style>