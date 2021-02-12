document.addEventListener('DOMContentLoaded', async function(event) {

  // Telling our application how to talk to the database

  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app

  let form = document.querySelector('form')
  form.addEventListener('submit', async function(event) {
    event.preventDefault()

    //console.log('todo submitted')

    let todoText = document.querySelector('#todo').value
    console.log(todoText)

    if (todoText.length > 0) {    // this if loop would prevent adding stuff when you hit add to the empty box
      let todoList = document.querySelector('.todos')
    todoList.insertAdjacentHTML('beforeend', `
    <div class="py-4 text-xl border-b-2 border-purple-500 w-full">
      ${todoText}
    <div>
    `)

    let docRef = await db.collection('todos').add({
      text: todoText  //add a record to the database
    })

    let todoId = docRef.id
    console.log(`new todo created: ${todoId}`)  //shows unique ID of the added ToDo task

    }
    
    document.querySelector('#todo').value = '' //erases previous entered stuff in the box where we enter stuff
  })

  // Step 2: Read existing to-dos from Firestore

  let querySnapshot = await db.collection('todos').get() //our collection/table is called todos
  console.log(querySnapshot.size)

  let todos = querySnapshot.docs //documents out of this collection
  console.log(todos)

  for(let i = 0; i < todos.length; i++) {
    let todo = todos[i]
    console.log(todo)
    let todoId = todo.id
    console.log(todoId)
    let todoData = todo.data()
    console.log(todoData)
    let todoText = todoData.text
 
    let todoList = document.querySelector('.todos')
    todoList.insertAdjacentHTML('beforeend', `
      <div class="todo-${todoId} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a class="done p-2 text-sm bg-green-500 text-white">✔</a>
           ${todoText}
       <div>
    `)

    // Step 4: Add code to allow completing todos
    // see above  <a class="p-2 text-sm bg-green-500 text-white"></a>
    // added "todo-${todoId}" to <div class="todo-${todoId} py-4 text-xl border-b-2 border-purple-500 w-full">
    // added "done" to <a class="done p-2 text-sm bg-green-500 text-white">✔</a>

   let todoLink = document.querySelector(`.todo-${todoId} .done`)
   //console.log(todoLink)
    todoLink.addEventListener('click', async function(event) {
      event.preventDefault()
      console.log(`${todoId} was clicked`)    // shows what todo item was clicked by displaying ID in the console

      document.querySelector(`.todo-${todoId}`).classList.add('opacity-20') //making the thing opaque to show its done

      await db.collection('todos').doc(todoId).delete() //Talk to database and delete the ones that were clicked as complete by using function delete()
    })

  }

 // Step 3: Add code to Step 1 to add todo to Firestore

  // see up above
  //  let docRef = await db.collection('todos').add({
  //   text: todoText  //add a record to the database
  // })

  // let todoId = docRef.id
  // console.log(`new todo created: ${todoId}`)  //shows unique ID of the added ToDo task

  // }

 


})