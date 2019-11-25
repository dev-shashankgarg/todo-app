import uuidv4 from 'uuid/v4'

let todos = []

const loadTodos = () => {

    const todoJson = localStorage.getItem('todos')
    if(todoJson){
        try{
            todos = JSON.parse(todoJson)
        }catch(err){
            console.log(`Error could not parse todo json, ${err.message}`)
            todos = []
            saveAllTodos()
        }
    }else{
        todos = []
    }
}

const fetchAllTodos = () => {return todos}

const findTodo = (uuid) => {
    return todos.find(todo => todo.id === uuid)
}

const findTodoIndex = (uuid) => {
    return todos.findIndex(todo => todo.id === uuid)
}

const createTodo = (todoName) => {
        todos.push({
            id : uuidv4(),
            name : todoName,
            status : false
        })
        saveAllTodos()
}

const updateTodo = (uuid , {status}) => {
    const foundTodo = findTodo(uuid)
    if(foundTodo){
        foundTodo.status = status
        saveAllTodos()
        return foundTodo
    }
}

const saveAllTodos = () =>{
    const todoJson = JSON.stringify(todos)
    localStorage.setItem('todos' , todoJson)
}

const removeTodo = (uuid) => {
    const foundTodoIndex = findTodoIndex(uuid)
    if(foundTodoIndex > -1){
        todos.splice(foundTodoIndex , 1 )
        saveAllTodos()
    }
}

const removeAllTodos = () => {
    todos = []
    saveAllTodos()
}

loadTodos()

export {fetchAllTodos , findTodo , createTodo , removeTodo , removeAllTodos , updateTodo }