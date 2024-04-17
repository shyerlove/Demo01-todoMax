import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type Todo from '@/type/todo'

export const useTodoStore = defineStore('todoStore', () => {

    const todos: Todo[] = reactive([
        {
            id: 1,
            title: '看电视',
            isComplete: false
        },
        {
            id: 2,
            title: '玩游戏',
            isComplete: false
        },
        {
            id: 3,
            title: '吃饭',
            isComplete: false
        },
    ])

    /* 新增一条todo */
    function addTodo(todoObj: Todo) {
        todos.push(todoObj);
    }

    /* 删除一条todo */
    function delTodo(id: number) {
        todos.splice(id - 1);
    }
    /* 修改todo */
    function changeTodo(todoObj: Todo) {
        todos.splice(todoObj.id - 1, 1, todoObj)
    }

    /* 完成/未完成 代办 */
    function completeTodo(id: number, isComplete: boolean) {
        todos[id - 1].isComplete = isComplete;
        console.log(todos[id - 1].isComplete);

    }

    return { todos, addTodo, delTodo, changeTodo, completeTodo };
})