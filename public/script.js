const todosContainer = document.querySelector('#todosContainer')


function getAllTodos() {
  // get data from API
  axios.get('/api/todos')
    .then(response => {
      console.log(response.data);
      // use data to render todos on page
      const todosHtml = response.data.map(todo => {
        return `<li class="${todo.completed ? 'complete' : 'incomplete'}">
        ${todo.description} 
        <button>✅</button>
        <button onclick="editTodo('${todo.id}', '${todo.description}')">⭕️</button> 
        <button onclick="deleteTodo(${todo.id})">❌</button></li>`
      }).join('')
      todosContainer.innerHTML = todosHtml
    })
}

function addNewTodo(description) {
  return axios.post('/api/todos', {
    description: description
  })
}

function editTodo(id, oldDescription) {
  const description = prompt("Change todo? ", `${oldDescription}`)
  console.log(description);
  return axios.patch(`/api/todos/${id}`, {
    description: description
  })
    .then(() => {
      getAllTodos()
    })
}

function deleteTodo(id) {
  axios.delete(`/api/todos/${id}`)
    .then(() => {
      getAllTodos();
    })
}

getAllTodos();

const todosForm = document.querySelector('#todosForm')
todosForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = todosForm.elements.description.value
  addNewTodo(description)
    .then(() => {
      getAllTodos()
    })
})