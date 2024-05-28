// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskForm = $('#task-form');
const addTask = $('#save-task');
const taskTitle = $("#task-title");
const taskDate = $("#date-picker");
const taskDescription = $('#task-description');

// const taskTitle = document.getElementById('task-title');
// const taskDate = document.getElementById('date-picker');
// const taskDescription = document.getElementById('task-description');



// Todo: create a function to generate a unique task id
function generateTaskId() {
    //randomize y cuantos caracteres
}

// Todo: create a function to create a task card
function createTaskCard(task) {


    const todoEl = $("#to-do");
    const taskCard = $("<div>");
    const cardBody = $("<div>")
    const taskTitleEl = $("<h2>");
    const taskDateEL = $("<p>");
    const taskDescEL = $("<p>");

    let i = taskList.length - 1;
    taskTitleEl.text(taskList[i].taskName);
    taskDateEL.text(taskList[i].taskDate);
    taskDescEL.text(taskList[i].taskDescription);

    todoEl.append(taskCard);
    // taskCard.append(cardBody);
    taskCard.append(taskTitleEl);
    taskCard.append(taskDateEL);
    taskCard.append(taskDescEL);

    taskCard.addClass('card');
    // cardBody.addClass('card-body');
    taskTitleEl.addClass('card-title');
    taskDateEL.addClass('card-subtitle');
    taskDescEL.addClass('card-text');


}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    let taskList = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < taskList.length; i++) {

        const todoEl = $("#to-do");
        const taskCard = $("<div>");
        const cardBody = $("<div>")
        const taskTitleEl = $("<h2>");
        const taskDateEL = $("<p>");
        const taskDescEL = $("<p>");
        const inprogressEl = $("#in-progress");

        taskTitleEl.text(taskList[i].taskName);
        taskDateEL.text(taskList[i].taskDate);
        taskDescEL.text(taskList[i].taskDescription);

        todoEl.append(taskCard);
        taskCard.append(cardBody);
        taskCard.append(taskTitleEl);
        taskCard.append(taskDateEL);
        taskCard.append(taskDescEL);

        // inprogressEl.addClass('droppable');
        taskCard.addClass('card task-card draggable');
        cardBody.addClass('card-body');
        taskTitleEl.addClass('card-title');
        taskDateEL.addClass('card-subtitle');
        taskDescEL.addClass('card-text');
    //   let taskStatus = taskList[i].taskStatus;
        if (taskList[i].taskStatus === "overdue") {
            taskCard.addClass('overdue');
        }

        else if (taskList[i].taskStatus === "deadline") {
            taskCard.addClass('deadline');
        }

        else {
            taskCard.addClass('onTime');
        }



        $(function () {
            $('.draggable').draggable();

            $('.droppable').droppable({
                drop: function (event, ui) {
                    $(this)
                        .addClass("task-card")
                        .find("div")
                        .html("Dropped!");
                }
            });
        });


    }



}

// Todo: create a function to handle adding a new task

function handleAddTask(event) {
    const today = dayjs();
    // Give credit to Xpert learning for dayJS object diff 
    const newDate = dayjs(taskDate.val());
    const dueDate = newDate.diff(today, 'day');
    console.log(newDate.format('MM/DD/YYYY'));
    console.log(dueDate);
    // console.log(dueDate);
    let taskStatus = "";
    if (dueDate <= 0) {
        taskStatus = "overdue";

    }
    else if (dueDate < 3) {
        taskStatus = "deadline";
    } else {
        taskStatus = "onTime";
    }

    // event.preventDefault();
    const task = {
        taskName: taskTitle.val(),
        taskDate: taskDate.val(),
        taskDescription: taskDescription.val(),
        taskStatus: taskStatus,
    };

    // taskList =  JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.push(task);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    console.log(taskList);

    createTaskCard();
}

// today = dayjs(); taskDate    today -task date  <=3 deadline

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

    //grab id from delete button
    //compare id to all id values from array
    //delete from array when id matches

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // change status of cards
    //save

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    // DatePicker
    $(function () {
        $("#date-picker").datepicker();
    });



    $("#save-task").click(function () {
        handleAddTask();

    });


    // addTask.on('click', (handleAddTask));

    // addTask.addEventListener('click', handleAddTask);






});
