import  {fetchAllTodos , removeTodo  , updateTodo } from './todo-manager'

const createTableHeader = (tableId) =>{

    const tHeadElem = document.createElement('thead')
    tHeadElem.className = `${tableId}Class`
    
    const h1 = document.createElement('th')
    h1.textContent = "Index"
    tHeadElem.appendChild(h1)
    const h2 = document.createElement('th')
    h2.textContent = "Name"
    tHeadElem.appendChild(h2)

    const h0 = document.createElement('th')
    h0.textContent = "Completed"
    tHeadElem.appendChild(h0)

    const h4 = document.createElement('th')
    h4.textContent = "Remove"
    tHeadElem.appendChild(h4)
    
    return tHeadElem
}
    
    const createTableRow = (tableId ,index, todo) => {
        const tRow = document.createElement('tr')
        tRow.className = `${tableId}Class`

        const col1 = document.createElement('td')
        col1.textContent = index
        tRow.appendChild(col1)
        const col2 = document.createElement('td')
        col2.textContent = todo.name
        tRow.appendChild(col2)

        const col0 = document.createElement('td')
        const checkBox = document.createElement('input')
        checkBox.setAttribute('type' , 'checkbox')


        checkBox.addEventListener('change' , (event) => {

            const todoUnderChange = updateTodo(todo.id , {status : event.target.checked})
            todoUnderChange.completed = event.target.checked

            renderTodosWithHidden(tableId,fetchAllTodos(),document.querySelector('#hideCompletedCheckbox').checked)
        })

        col0.appendChild(checkBox)
        tRow.appendChild(col0)
     
        if(todo.completed){
            checkBox.checked = true
        }else{
            checkBox.checked = false
        }


        const col4 = document.createElement('td')
        const button = document.createElement('button')
        button.textContent = 'remove'
        button.className='button button--secondary'

        button.addEventListener('click' , (event) => {
            removeTodo(todo.id)
            renderTodos(tableId , fetchAllTodos())
        })

        col4.appendChild(button)
        tRow.appendChild(col4)

        return tRow
    }


const renderTodos = (tableId , todos) => {

    document.querySelectorAll(`.${tableId}Class`).forEach(elem => elem.remove())
    if(todos !==null && todos.length >0){
        document.querySelector(`#${tableId}`).appendChild(createTableHeader(tableId))
        todos.forEach((todo,index) => {
            document.querySelector(`#${tableId}`).appendChild(createTableRow(tableId,index+1,todo))
        })
    }   
}

const renderTodosWithHidden = (tableId , todos , hideCompleted) => {
    if(hideCompleted){
    renderTodos(tableId , todos.filter(todo => !todo.completed))
    }else{
    renderTodos(tableId , todos)
    }   

}

export {renderTodos , renderTodosWithHidden}