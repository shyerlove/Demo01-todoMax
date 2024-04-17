import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type Note from '@/type/note'

export const useNoteStore = defineStore('notesStore', () => {
    /* 存储笔记的变量 */
    const notes: Note[] | [] = localStorage.getItem('NOTES') ? reactive(JSON.parse(localStorage.getItem('NOTES') as string)) : reactive([]);
    /* 新增一条笔记 */
    function addNote(noteObj: Note) {
        console.log(notes);
        (notes as Note[]).push(noteObj)
        localStorage.setItem('NOTES', JSON.stringify(notes))
    }
    /* 删除一条笔记 */
    function delNote(id: number) {
        let index = notes.findIndex(item => item.id === id);
        notes.splice(index, 1);
        updataNote();
    }
    /* 修改笔记 */
    function changeNote(noteObj: Note) {
        notes.forEach(item => {
            if (item.id === noteObj.id) {
                item.h1 = noteObj.h1;
                item.title = noteObj.title;
            }
        })
        localStorage.setItem('NOTES', JSON.stringify(notes))
    }

    /* 根据id获取对应的数据 */
    function getNote(id: number) {
        return notes.find(item => item.id === id)
    }

    /* id始终与索引保持一致 */
    function updataNote() {
        notes.forEach((item, index) => {
            item.id = index;
        })
        localStorage.setItem('NOTES', JSON.stringify(notes))
    }

    return { notes, addNote, delNote, changeNote, getNote };
})