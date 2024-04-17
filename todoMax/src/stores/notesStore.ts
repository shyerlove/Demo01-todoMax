import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type Note from '@/type/note'

export const useNoteStore = defineStore('notesStore', () => {
    /* 存储笔记的变量 */
    const notes: Note[] = reactive([
        {
            id: 1,
            h1: '第一条笔记',
            title: '今天星期天...'
        },
        {
            id: 2,
            h1: '第二条笔记',
            title: '今天星期天...'
        },
        {
            id: 3,
            h1: '第三条笔记',
            title: '今天星期天...'
        },
    ])
    /* 新增一条笔记 */
    function addNote(noteObj: Note) {
        notes.push(noteObj)
    }
    /* 删除一条笔记 */
    function delNote(id: number) {
        notes.splice(id - 1);
    }
    /* 修改笔记 */
    function changeNote(noteObj: Note) {
        notes.splice(noteObj.id - 1, 1, noteObj)
    }

    return { notes, addNote, delNote, changeNote };
})