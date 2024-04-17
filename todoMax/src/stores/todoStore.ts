import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type Todo from '@/type/todo'


export const useTodoStore = defineStore('todoStore', () => {
    const todos: Todo[] | [] = localStorage.getItem('TODOS') ? reactive(JSON.parse(localStorage.getItem('TODOS') as string)) : reactive([]);

    /* 新增一条todo */
    function addTodo(todoObj: Todo) {
        (todos as Todo[]).push(todoObj);
        localStorage.setItem('TODOS', JSON.stringify(todos))
    }

    /* 删除一条todo */
    function delTodo(id: number) {
        let index = todos.findIndex(item => item.id === id);
        todos.splice(index, 1);
        updataTodo();
    }
    /* 修改todo */
    function changeTodo(todoObj: Todo) {
        todos.forEach(item => {
            if (item.id === todoObj.id) {
                item.title = todoObj.title;
            }
        })
        localStorage.setItem('TODOS', JSON.stringify(todos))
    }

    /* 完成/未完成 代办 */
    function completeTodo(id: number, isComplete: boolean) {
        todos[id].isComplete = isComplete;
        localStorage.setItem('TODOS', JSON.stringify(todos))
    }

    /* 根据id获取对应的数据 */
    function getTodo(id: number) {
        return todos.find(item => item.id === id);
    }

    /* id 始终与索引保持一致 */
    function updataTodo() {
        todos.forEach((item, index) => {
            item.id = index;
        })
        localStorage.setItem('TODOS', JSON.stringify(todos));
    }

    return { todos, addTodo, delTodo, changeTodo, completeTodo, getTodo };
})