// variables
const newTaskButton = document.querySelector(".to-do__button>button");
const tasksWindow = document.querySelector(".to-do");
const addTaskWindow = document.querySelector(".new-task");
const cancelButton = document.querySelector(".new-task__cancel");
const addTaskButton = document.querySelector(".new-task__addition");
const textArea = document.querySelector("#tasksname");
const list = document.querySelector(".tasks__list>ul");
const amount = document.querySelector(".tasks__counter>span");
const year = document.querySelector(".to-do__year");
const day = document.querySelector(".to-do__day");
const fullDate = document.querySelector(".to-do__full-date");
let tasks = [];
let listOfCompletedTasks = [];



function showDate() {
    const currentDate = new Date();
    const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };
    day.innerHTML = days[currentDate.getDay()];
    fullDate.innerHTML = currentDate.toLocaleDateString()
}

showDate();

// functions
function openAddTaskWindow() {
    tasksWindow.style.display = "none";
    addTaskWindow.style.display = "block";
}
function cancelAddTaskWindow() {
    addTaskWindow.style.display = "none";
    tasksWindow.style.display = "block";
}
function addToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("amount", amount.textContent);
}

function addTask(nameOfTheNewTask) {
    let task = {
        id: Date.now(),
        name: nameOfTheNewTask,
        completed: false
    };
    
    tasks.push(task);
    textArea.value = "";
    addTaskWindow.style.display = "none";
    tasksWindow.style.display = "block";
    if (tasks.length == 1) {
        amount.textContent = tasks.length + " " + "Task";
    } else {
        amount.textContent = tasks.length + " " + "Tasks";
    }
    renderTask(tasks);
    addToStorage(tasks);
    
} 
function renderTask(tasks) {
    list.innerHTML = "";
    tasks.forEach((item) => {
        const newTask = document.createElement("li");
        newTask.setAttribute("data-key", item.id);
        newTask.innerHTML = `
        <label class = "tasks__item">
            <input type = "checkbox" class = "checkbox" name = "task">
            <span>${item.name}</span>
        </label>
        <img class="delete" src="img/icons/delete.svg" alt="del" width="18px" height="20px">`;
        list.append(newTask);

    });
}


function removeTask(id) {
    tasks = tasks.filter((item) => {
        return item.id != id;
    });
    if (tasks.length == 1) {
        amount.textContent = tasks.length + " " + "Task";
    } else {
        amount.textContent = tasks.length + " " + "Tasks";
    }
    addToStorage(tasks);
}



// event listeners
newTaskButton.addEventListener("click", openAddTaskWindow);
cancelButton.addEventListener("click", cancelAddTaskWindow);
addTaskButton.addEventListener("click", () => {
    const nameOfTheNewTask = textArea.value;
    if(nameOfTheNewTask !== ""){
        addTask(nameOfTheNewTask);
    }else{
        alert("You must write something!");
    }
});
list.addEventListener("click", ((event) => {
    if (event.target.className === "delete") {
        const clickedDeleteButton = event.target;
        const selectedTask = clickedDeleteButton.parentNode;
        selectedTask.parentNode.removeChild(selectedTask);
        removeTask(selectedTask.getAttribute("data-key"));
    }
}));

list.addEventListener("click",((event) => {
    if(event.target.className === "checkbox"){
        console.log(event.target.checked)
    }
}));

// function completeTask(completedTask) {                                       
//     if (completedTask.checked == true) {
//         listOfCompletedTasks.push(completedTask)
//     }else if(completedTask.checked == false) {
//         const findElement = (element) => element == completedTask;
//         const id = listOfCompletedTasks.findIndex(findElement);
//         listOfCompletedTasks.splice(id, 1)
//     }
//     load(listOfCompletedTasks)
// }





// local storage
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTask(tasks);
}
if(localStorage.getItem("amount")){
    if (tasks.length == 1){
        amount.textContent = tasks.length + " " + "Task";
    }else{
        amount.textContent = tasks.length + " " + "Tasks";
    }
}

// if (localStorage.getItem("checkboxesStatus")) {
//     listOfCompletedTasks = JSON.parse(localStorage.getItem("checkboxesStatus"));
//     // listOfCompletedTasks.forEach(task => {
//     //     task.checked = true
//     // })
// }


function checkboxStatus() {
    const checkboxes = document.querySelectorAll('.checkbox')
    
}
checkboxStatus()