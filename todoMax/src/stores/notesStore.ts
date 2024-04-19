import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type Note from '@/type/note'

export const useNoteStore = defineStore('notesStore', () => {
    /* 存储笔记的变量 */
    const notes: Note[] | [] = localStorage.getItem('NOTES') ? reactive(JSON.parse(localStorage.getItem('NOTES') as string)) : reactive([]);
    /* 存储最近删除的笔记 */
    const unNotes: Note[] | [] = localStorage.getItem('UN_NOTES') ? reactive(JSON.parse(localStorage.getItem('UN_NOTES') as string)) : reactive([]);

    /* 新增一条笔记 */
    function addNote(noteObj: Note) {
        (notes as Note[]).push(noteObj)
        localStorage.setItem('NOTES', JSON.stringify(notes))
    }
    /* 删除n条笔记,存入最近删除 */
    function delNote(idArr: number[]) {
        getNote(idArr).forEach(note => {
            (unNotes as Note[]).push(note);// 添加至最近删除
            notes.splice(notes.findIndex(n => n.id === note.id), 1);
            updataNote();
            // 从笔记中删除
        });
        updataUnNote(); // 刷新最近删除
    }

    /* 从最近删除恢复到笔记中 */
    function reCover(id: number) {
        let unnoteObj = getUnNote(id); // 获取笔记对象 
        unNotes.splice(id, 1); // 从最近删除中删除
        (notes as Note[]).push(unnoteObj); // 新增至笔记中
        updataUnNote(); // 刷新最近删除
        updataNote(); // 刷新笔记
    }

    /* 修改笔记 */
    function changeNote(noteObj: Note) {
        notes.forEach(item => {
            if (item.id === noteObj.id) {
                item.h1 = noteObj.h1;
                item.title = noteObj.title;
            }
        })
        localStorage.setItem('NOTES', JSON.stringify(notes));
    }

    /* 根据id获取对应的数据 */
    function getNote(idArr: number[]): Note[] {
        let Arr: Note[] = [];
        let x: Note;
        idArr.forEach(id => {
            x = notes.find(item => item.id === id) as Note;
            console.log(x.id);
            Arr.push({
                id: x.id,
                h1: x.h1,
                title: x.title
            })
            console.log(Arr);

        });
        return Arr;
    }
    /* 根据id获取对应的删除数据 */
    function getUnNote(id: number): Note {
        return unNotes.find(item => item.id === id) as Note
    }

    /* id始终与索引保持一致 */
    function updataNote() {
        notes.forEach((item, index) => {
            item.id = index;
        })
        localStorage.setItem('NOTES', JSON.stringify(notes))
    }
    /* id始终与索引保持一致 */
    function updataUnNote() {
        unNotes.forEach((item, index) => {
            item.id = index;
        })
        localStorage.setItem('UN_NOTES', JSON.stringify(unNotes));
    }


    return {
        notes, // 全部笔记
        unNotes, // 最近删除
        addNote, // 新增笔记
        delNote,  // 删除笔记
        changeNote,  // 修改笔记
        getNote, //获取笔记
        reCover // 恢复笔记
    };
})