;(function(){
  "use strict"

  //armazenar o DOM em variáveis
  const inputNewItem = document.querySelector("#item-input")
  const submitForm = document.querySelector("#todo-add")
  const ul = document.querySelector("#todo-list")
  //const lis = ul.getElementsByTagName("li")

  let arrTasks = [
    {
      name: "task 12",
      createdAt: Date.now(),
      completed: false
    }
  ]

  function renderTask(){
    ul.innerHTML = ""
    arrTasks.forEach(task => {
      ul.appendChild(generateLi(task))
    })
  }

  function generateLi(obj){
    const p = document.createElement("p")
    p.className = "task-name"
    p.textContent = obj.name
    const li = document.createElement("li")
    li.className = "todo-item"
    li.appendChild(p)
    
    addEventLi(li)

    return li
  }

  function addEventLi(li){
    li.addEventListener("click", function(){
      console.log("addEventLi", this)
    })
  }

  function addTask(task){
    arrTasks.push({
      name: task,
      createdAt: Date.now(),
      completed: false
    })
  }

  submitForm.addEventListener("submit", function(evt){
    evt.preventDefault()

    if(inputNewItem.value === ""){
      alert("preencha corretamente")
      return
    }

    addTask(inputNewItem.value)
    renderTask()

    inputNewItem.value = ""
    inputNewItem.focus()

  });//foi necessario o ponto e virgula, talves ele tivesse reconhecendo como indice...

  renderTask()
  
})()