# Third-Party-APIs-Task-Board
Challenge 05 of University of Minnesota's Coding Bootcamp.  Task: Create a simple task board application that allows a team to manage project tasks by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Mockup 
![A user adds three tasks to the task board and changes the state of two of them then deletes one](assets/images/Third-Party-APIs-Leena-Cruz.gif)

## Deployed App

[Live URL](https://leenacruz.github.io/Third-Party-APIs-Task-Board/)


## Credits and Thanks

Alexsander and Stephen for helping with JQuery draggable element and Handle Drop. 

Hector - Help with Handle Delete Element and Handle Drop Element function, catching an error in type of variable comparison.  Line 275 and 277, suggested using console log to check and parseInt.         

Xpert Learning Assistant -
Help with a bug using dayJS 
Hep how to use diff (code line 72).