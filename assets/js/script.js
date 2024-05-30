// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskForm = $('#task-form');
const addTask = $('#save-task');
const taskTitle = $("#task-title");
const taskDate = $("#date-picker");
const taskDescription = $('#task-description');
const taskDisplayEl = $('#task-display');

// const taskTitle = document.getElementById('task-title');
// const taskDate = document.getElementById('date-picker');
// const taskDescription = document.getElementById('task-description');



// Todo: create a function to generate a unique task id
function generateTaskId() {
    //randomize y cuantos caracteres
    const random = Math.floor(Math.random() * 100000000) + 10000000;

    localStorage.setItem('random', JSON.stringify(random));
    // return random;
    console.log(random);
}

// Todo: create a function to create a task card
function createTaskCard(task) {

    const taskCard = $("<div>")
    .addClass('card draggable')
    .attr('data-project-id', task.id);
    const cardBody = $("<div>").addClass('card-body');
    const taskTitleEl = $("<h2>").text(task.taskName);
    const taskDateEL = $("<p>").addClass('card-text').text(task.taskDate);
    const taskDescEL = $("<p>").addClass('card-text').text(task.taskDescription);
    const deleteEl = $("<button>").addClass('btn btn-danger delete').text('Delete').attr('data-project-id', task.id);


    //     taskTitleEl.text(taskList.taskName);
    //     taskDateEL.text(taskList.taskDate);
    //     taskDescEL.text(taskList.taskDescription);
    //     deleteEl.text("Delete");

    //     taskCard.addClass('card');
    //     // cardBody.addClass('card-body');
    //     taskTitleEl.addClass('card-title');
    //     taskDateEL.addClass('card-subtitle');
    //     taskDescEL.addClass('card-text');
    //     deleteEl.addClass('button btn-danger delete')
    //         .attr('data-task-id', taskList.id);

    if (task.taskUrgency === "overdue") {
        taskCard.addClass('overdue');
    }

    else if (task.taskUrgency === "deadline") {
        taskCard.addClass('deadline');
    }

    else {
        taskCard.addClass('onTime');
    }

    //     todoEl.append(taskCard);
    taskCard.append(cardBody);
    taskCard.append(taskTitleEl);
    taskCard.append(taskDateEL);
    taskCard.append(taskDescEL);
    taskCard.append(deleteEl);

    return taskCard;


}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    const tasks = taskList;

    // let taskList = JSON.parse(localStorage.getItem("tasks"));

    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        if (task.taskStatus === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.taskStatus === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.taskStatus === 'done') {
            doneList.append(createTaskCard(task));
        }
    }



    // for (let i = 0; i < taskList.length; i++) {

    //     const todoEl = $("#to-do");
    //     const taskCard = $("<div>");
    //     const cardBody = $("<div>")
    //     const taskTitleEl = $("<h2>");
    //     const taskDateEl = $("<p>");
    //     const taskDescEl = $("<p>");
    //     const deleteEl = $("<button>");

    //     taskTitleEl.text(taskList[i].taskName);
    //     taskDateEl.text(taskList[i].taskDate);
    //     taskDescEl.text(taskList[i].taskDescription);
    //     deleteEl.text("Delete");

    //     todoEl.append(taskCard);
    //     taskCard.append(cardBody);
    //     taskCard.append(taskTitleEl);
    //     taskCard.append(taskDateEl);
    //     taskCard.append(taskDescEl);
    //     taskCard.append(deleteEl);

    //     // inprogressEl.addClass('droppable');
    //     taskCard.addClass('card task-card draggable');
    //     cardBody.addClass('card-body');
    //     taskTitleEl.addClass('card-title');
    //     taskDateEl.addClass('card-subtitle');
    //     taskDescEl.addClass('card-text');
    //     deleteEl.addClass('button btn-danger delete')
    //         .attr('data-task-id', taskList[i].id);

    //         if (taskList[i].taskUrgency === "overdue") {
    //                     taskCard.addClass('overdue');
    //                 }

    //                 else if (taskList[i].taskUrgency === "deadline") {
    //                     taskCard.addClass('deadline');
    //                 }

    //                 else {
    //                     taskCard.addClass('onTime');
    //                 }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}





// Todo: create a function to handle adding a new task

function handleAddTask(event) {
    // event.preventDefault();

    const today = dayjs();
    // Give credit to Xpert learning for dayJS object diff 
    const newDate = dayjs(taskDate.val());
    const dueDate = newDate.diff(today, 'day');
    console.log(newDate.format('MM/DD/YYYY'));
    console.log(dueDate);
    // console.log(dueDate);
    let taskUrgency = "";
    if (dueDate < 0) {
        taskUrgency = "overdue";

    }
    else if (dueDate < 3) {
        taskUrgency = "deadline";
    } else {
        taskUrgency = "onTime";
    }

    // quiero obtener el numero random para asignarlo al objeto task
    generateTaskId();
    const id = JSON.parse(localStorage.getItem('random'));
    //   console.log(id);

    // event.preventDefault();
    const task = {
        taskName: taskTitle.val(),
        taskDate: taskDate.val(),
        taskDescription: taskDescription.val(),
        taskUrgency: taskUrgency,
        taskStatus: 'to-do',
        id: id,
    };

    // taskList =  JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.push(task);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    console.log(taskList);

    // createTaskCard();
    renderTaskList();

    taskTitle.val('');
    taskDate.val('');
    taskDescription.val('');

}

// today = dayjs(); taskDate    today -task date  <=3 deadline

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

    event.preventDefault();
    //grab id from delete button
    //compare id to all id values from array
    //delete from array when id matches
    //     $("#delete").click(function () {
    //         console.log("Funciona");
    //     });
    // }
    // const deleteEl = $(".button");
    // deleteEl.on('click', function () {
    //     const random = Math.floor(Math.random() * 100000000) + 10000000;
    //     console.log(random);
    //     console.log("Funciona")
    // });





    const taskId = $(this).attr('data-project-id');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    // if (!tasks) {
    //     tasks = [];
    // }

    tasks.forEach((task) => {

        if (task.id === taskId) {
            tasks.splice(tasks.indexof(task), 1);
        }
    });

    console.log(tasks);

    localStorage.setItem('tasks', JSON.stringify(taskList));


    renderTaskList();

}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // change status of cards
    //save
    //when task is done se pone class on Time

    // if (!taskList) {
    //     taskList = [];
    // }
    //  return taskList;

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
            task.taskStatus = newStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();


}













// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // DatePicker
    $(function () {
        $("#date-picker").datepicker();
    });



    $("#save-task").click(function () {
        handleAddTask();

    });


    // addTask.on('click', (handleAddTask));

    // addTask.addEventListener('click', handleAddTask);


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

