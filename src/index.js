import 'core-js/stable'
import 'regenerator-runtime/runtime'

import  {fetchAllTodos , createTodo  , removeAllTodos } from './utils/todo-manager'
import  {renderTodosWithHidden , renderTodos } from './utils/todo-dom'

console.log('index.js initialized !!')

const init = () => {
    let todos = fetchAllTodos()
    renderTodosWithHidden('allTodoTable',todos, document.querySelector('#hideCompletedCheckbox').checked)
}

document.querySelector('#createTodoForm').addEventListener('submit' , (event) => {
    event.preventDefault()

    if(event.target.elements.name.value.trim() !== ''){
        createTodo(event.target.elements.name.value)
    }
    event.target.elements.name.value = ''
    init()
})

document.querySelector('#hideCompletedCheckbox').addEventListener('change' , (event) => {

    let todos = fetchAllTodos()
    renderTodosWithHidden('allTodoTable', todos , event.target.checked)
})

document.querySelector('#removeAllTodoForm').addEventListener('submit' , (event) => {
    event.preventDefault()
    removeAllTodos()
    init()
})

document.querySelector('#searchQuery').addEventListener('input' , (event) =>{
    if(event.target.value === ''){
        renderTodos('searchTodoTable',[])
    }else{
        const todoFiltered = fetchAllTodos().filter(todo => todo.name.includes(event.target.value))
        renderTodos('searchTodoTable',todoFiltered)
    }
})

init()


