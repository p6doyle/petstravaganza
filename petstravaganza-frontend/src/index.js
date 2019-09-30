//Variables
const SESSION_ANIMALS = 'http://localhost:3000/sessions'
const SESSION_TASKS = 'http://localhost:3000/sessions/update'
let task_queue = []

document.addEventListener('DOMContentLoaded', function(e) {
  // console.log('Up and running!')
  // fetch('http://localhost:3000/sessions')
  // .then(resp => resp.json())
  // .then(data => console.log(data))
  fetchAnimals()
});

let fetchAnimals = function() {
  fetch(SESSION_ANIMALS)
  .then(resp => resp.json())
  .then(data => {
    localStorage.setItem("sessionAnimals", JSON.stringify(data))
    renderAnimalGrid(data)
    pullTasks()
  })
}

//Render Items
let renderAnimalGrid = function(dataObj){
  i = 1
  dataObj.forEach(animal => {
    let animalImage = document.createElement("img")
    let animalName = document.createElement("h4")
    let buttonrow = document.createElement('span');
    let foodBtn = document.createElement('img');
    let waterBtn = document.createElement('img');
    let tinkleBtn = document.createElement('img');
    let exerciseBtn = document.createElement('img');
    animalImage.src = animal.image
    animalImage.className = "animal-image"
    animalName.innerText = animal.name
    buttonrow.className = "button-row"
    foodBtn.src = 'assets/food.png'
    foodBtn.className = 'taskBtn food'
    waterBtn.src = 'assets/water.png'
    waterBtn.className = 'taskBtn water'
    tinkleBtn.src = 'assets/tinkle.png'
    tinkleBtn.className = 'taskBtn tinkle'
    exerciseBtn.src = 'assets/exercise.png'
    exerciseBtn.className = 'taskBtn exercise'
    buttonrow.appendChild(foodBtn);
    buttonrow.appendChild(waterBtn);
    buttonrow.appendChild(tinkleBtn);
    buttonrow.appendChild(exerciseBtn);
    let box = document.getElementById(`${i}`)
    box.appendChild(animalImage)
    box.appendChild(animalName)
    box.appendChild(buttonrow)
    i++
  })
}


let pullTasks = function() {
  // set current animals in play as body object
  let currentAnimals = localStorage['sessionAnimals'] //JSON.parse()
  console.log(currentAnimals)
  // set up config
  let configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({currentAnimals: currentAnimals})
  }
  // receive tasks as JSON obj
  fetch(SESSION_TASKS, configObj)
  .then(rsp => rsp.json())
  .then(tasks => {
    console.log(tasks)
    tasks.forEach(task => task_queue.push(task))
  })
  populateTasks()
}

function populateTasks() {
  const taskList = document.getElementById('task-list')
  // every 5 seconds
  // check if there are tasks available in the queue
  if (task_queue.length > 0) {
    // if so, check if there are already 10 tasks in the sidebar
    if (taskList.childElementCount < 10) {
      let task = document.createElement('div');
      task.className = 'task'
      task.innerText = task_queue.shift()
      taskList.appendChild(task)
    }
  }
  setTimeout(populateTasks, 3000)
  // if not, pull the first item from the queue and add it to the sidebar
}