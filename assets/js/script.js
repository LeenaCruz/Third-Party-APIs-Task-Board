// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
const taskForm = $('#task-form');
const addTask = $('#save-task');
const taskTitle = $("#task-title");
const taskDate = $("#date-picker");
const taskDescription = $('#task-description');
const taskDisplayEl = $('#task-display');
// Todo: create a function to generate a unique task id
function generateTaskId() {
// Generates a random number between 0 an 1, multiplies it by 100000000 then adds 10000000 to generate a number between 10000000 and 10999999.
    const random = Math.floor(Math.random() * 100000000) + 10000000;
    console.log(random);
    return random;
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $("<div>")
        .addClass('card project-card draggable')
        .attr('data-task-id', task.id);
    const cardBody = $("<div>").addClass('card-body');
    const taskTitleEl = $("<h2>").text(task.taskName);
    const taskDateEL = $("<p>").addClass('card-text').text(task.taskDate);
    const taskDescEL = $("<p>").addClass('card-text').text(task.taskDescription);
    const deleteEl = $("<button>").addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
    if (task.taskUrgency === "overdue") {
        taskCard.addClass('overdue');
    }
    else if (task.taskUrgency === "deadline") {
        taskCard.addClass('deadline');
    }
    else {
        taskCard.addClass('onTime');
    }
    cardBody.append(taskTitleEl);
    cardBody.append(taskDateEL);
    cardBody.append(taskDescEL);
    cardBody.append(deleteEl);
    taskCard.append(cardBody);
    return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = taskList || [];
// Clears progress lanes.
    const todoList = $('#todo-cards');
    todoList.empty();
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    const doneList = $('#done-cards');
    doneList.empty();
// Check status of each task and append it to the correct progress lane.
    for (let task of tasks) {
        if (task.taskStatus === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.taskStatus === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.taskStatus === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
    });
}
// Todo: create a function to handle adding a new task
function handleAddTask() {
//Compares today's date with due date, and assigns an urgency status to taskUrgency variable.
    const today = dayjs();
    const newDate = dayjs(taskDate.val());
    const dueDate = newDate.diff(today, 'day');
    // console.log(newDate.format('MM/DD/YYYY'));
    // console.log(dueDate);
    let taskUrgency = "";
    if (dueDate < 0) {
        taskUrgency = "overdue";
    }
//If task is due in 3 days, assigns deadline status.
    else if (dueDate < 3) {
        taskUrgency = "deadline";
    } else {
        taskUrgency = "onTime";
    }
// Calls for random number function and assign returned value to id variable.
    const id = generateTaskId();
//Checks for empty inputs. 
    if (taskTitle.val() === "" ||
        taskDate.val() === "" ||
        taskDescription.val() === ""
    ) {
        alert("Please fill all the form fields");
    } else {
        const task = {
            taskName: taskTitle.val(),
            taskDate: taskDate.val(),
            taskDescription: taskDescription.val(),
            taskUrgency: taskUrgency,
            taskStatus: 'to-do',
            id: id,
        };
        taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.push(task);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        console.log(taskList);
        renderTaskList();
        taskTitle.val('');
        taskDate.val('');
        taskDescription.val('');
    }
}
// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    const taskId = parseInt($(this).attr('data-task-id'));
    // console.log(typeof taskId + " " + taskId);
    // console.log(taskList);
    taskList.forEach((task) => {
        console.log(taskList.indexOf(task));
        if (task.id === taskId) {
            taskList.splice(taskList.indexOf(task), 1);
            // console.log("I'm working")
        }
    });
    console.log(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
// Takes taskID and make it a number to compare in the if statement below.
    const taskId = parseInt(ui.draggable[0].dataset.taskId);
    // console.log(typeof taskId + " " + taskId); // Checked taskId typeof
    const newStatus = event.target.id;
    // console.log( typeof newStatus + " " + newStatus);  // Check type of newStatus and target event
    // console.log(event.target);
    for (let task of taskList) {
        if (task.id === taskId) {
            task.taskStatus = newStatus;
            console.log("Task Status:" + " " + newStatus);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // DatePicker
    $(function () {
        $("#date-picker").datepicker();
    });
    // Add task button action
    $("#save-task").click(function () {
        handleAddTask();
    });
    renderTaskList();
    $('.droppable').droppable({
        // drop: function (event, ui) {
        //     $(this)
        //         .addClass("task-card")
        //         .find("div")
        //         .html("Dropped!");
        // }
        accept: '.draggable',
        drop: handleDrop,
    });
    taskDisplayEl.on('click', '.delete', handleDeleteTask);
});