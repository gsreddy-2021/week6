document.addEventListener('DOMContentLoaded', async function(event) {

  // Telling our application how to talk to the database

  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app

  let form = document.querySelector('form')
  form.addEventListener('submit', function(event) {
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
    }
    

    document.querySelector('#todo').value = '' //erases previous entered stuff in the box where we enter stuff


  })


  // Step 2: Read existing to-dos from Firestore
  // Step 3: Add code to Step 1 to add todo to Firestore
  // Step 4: Add code to allow completing todos
})