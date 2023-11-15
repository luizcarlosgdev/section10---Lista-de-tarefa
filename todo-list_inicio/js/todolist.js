;(function(){
  const formAdd = document.querySelector("#todo-add")
  const inputText = document.querySelector("#item-input")
  const ul = document.getElementById("todo-list")
  const lis = ul.getElementsByTagName("li")

  let arrNewTask = getSavedTasks()

  function getSavedTasks(){

    let getSavedTasks = localStorage.getItem("tasks")
    getSavedTasks = JSON.parse(getSavedTasks)

    return getSavedTasks && getSavedTasks.length ? getSavedTasks : [
      { 
        name: "Exemplo tarefa",
        date: Date.now(),
        completed: false
      }
    ] 
  }

  function setDataTasks(){
    localStorage.setItem("tasks", JSON.stringify(arrNewTask))
  }

  setDataTasks()

  function addTask(task){
    arrNewTask.push({
      name: task,
      date: Date.now(),
      completed: false
    })
    setDataTasks()
  }

  function createLi(obj){
    const li = document.createElement("li")
    const p = document.createElement("p")
    const buttonCheck = document.createElement("button")
    const displayCheck = document.createElement("i")
    const iedit = document.createElement("i")
    const iexcluir = document.createElement("i")
    
    li.className = "todo-item"
    p.className = "task-name"
    p.innerText = obj.name

    buttonCheck.className = "button-check" 
    buttonCheck.setAttribute("action", "buttonCheck")
    displayCheck.className = "fas fa-check displayNone"
    displayCheck.setAttribute("action", "buttonCheck")

    buttonCheck.appendChild(displayCheck)
    li.appendChild(buttonCheck)

    iedit.className = "fas fa-edit"
    iedit.setAttribute("action","iedit")
    iexcluir.className = "fas fa-trash-alt"
    iexcluir.setAttribute("action", "iexcluir")

    const editContainer = document.createElement("div")
    editContainer.className = "editContainer"
    editContainer.setAttribute("action", "editContainer")


    const inputEdit = document.createElement("input")
    inputEdit.setAttribute("type", "text")
    inputEdit.className = "editInput"
    inputEdit.value = obj.name

    const buttonEdit = document.createElement("button")
    buttonEdit.className = "editButton"
    buttonEdit.textContent = "Edit"
    buttonEdit.setAttribute("action", "buttonEdit")

    const buttonCancel = document.createElement("button")
    buttonCancel.className = "cancelButton"
    buttonCancel.textContent = "Cancel"
    buttonCancel.setAttribute("action", "buttonCancel")

    editContainer.appendChild(inputEdit)
    editContainer.appendChild(buttonEdit)
    editContainer.appendChild(buttonCancel)

    li.appendChild(editContainer)

    li.appendChild(p)
    li.appendChild(iedit)
    li.appendChild(iexcluir)

    return li
  } 

  function renderTask(){
    ul.innerHTML = ""
    arrNewTask.forEach(li => {
      ul.appendChild(createLi(li))
    })
  }

  function capEvent(e){
    const getAction = e.target.getAttribute("action")
    
    if(!getAction) return
    
    let currentLi = e.target
    //while garante que eu sempro vou receber minha li
    while(currentLi.nodeName !== "LI"){
      currentLi = currentLi.parentNode
    }

    const indexLi = [...lis].indexOf(currentLi)
    
    const actions = {
      iexcluir: function(){
        arrNewTask.splice(indexLi, 1)
        renderTask()
        setDataTasks()
      },
      iedit: function(){
        const editContainer = currentLi.getElementsByClassName("editContainer");

        [...ul.querySelectorAll(".editContainer")].forEach(elemento => {
          elemento.style.display = ""
        })

        editContainer[0].style.display = "flex"
      },
      buttonEdit: function(){
        const inputEdit = currentLi.querySelector(".editInput").value
        arrNewTask[indexLi].name = inputEdit
        setDataTasks()
        renderTask()
      },
      buttonCancel: function(){
        currentLi.querySelector(".editContainer").removeAttribute("style")
        currentLi.querySelector(".editInput").value = arrNewTask[indexLi].name
      },
      buttonCheck: function(){
        arrNewTask[indexLi].completed = !arrNewTask[indexLi].completed

        if(arrNewTask[indexLi].completed){
          currentLi.querySelector(".fa-check").classList.remove("displayNone")
        }else{
          currentLi.querySelector(".fa-check").classList.add("displayNone")
        }
        setDataTasks()
      }
    }

    if(actions[getAction]){
      actions[getAction]()
    }
    
  }

  formAdd.addEventListener("submit", function(evt){
    evt.preventDefault()

    if(inputText.value === ""){
      alert("preencha corretamente!")
      return
    }

    addTask(inputText.value)
    renderTask()

    inputText.value = ""
    inputText.focus()
  })

  ul.addEventListener("click", capEvent)

  renderTask()
})()