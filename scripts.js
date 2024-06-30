document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

function showForm()
{
    var form = document.getElementById("task-form-container");
    form.style.display = "block";
}

function hideForm(){
    event.preventDefault();
    var form = document.getElementById("task-form-container");
    form.style.display = "none";
}

function showFilter(){
    var form = document.getElementById("filter-container");
    form.style.display = "block";
}

function hideFilter(){
    event.preventDefault();
    var form = document.getElementById("filter-container");
    form.style.display = "none";
}

function showConfirmDelete(){
    var confirmDelete = document.getElementById("confirm-delete-container");
    confirmDelete.style.display = "block";
}

function hideConfirmDelete(){
    event.preventDefault();
    var confirmDelete = document.getElementById("confirm-delete-container");
    confirmDelete.style.display = "none";
}

function addTask()
{
    event.preventDefault();
    var form = document.getElementById("task-form-container");      
    var tname = document.getElementById("tname");
    var tdes = document.getElementById("tdes"); 
    var sdate = document.getElementById("sdate");
    var ddate = document.getElementById("ddate");
    var priority = document.getElementById("priority");
    var category = document.getElementById("category");

    var ul = document.querySelector("#ul");
    var li = document.createElement("li");
    var condition1 = true, condition2 = true;

    if (tname.value === ""){
        tname.style.borderBlockColor = "red";
        condition1 = false;
    }
    else {
        tname.style.borderBlockColor = "black";
    }
    if (tdes.value === ""){
        tdes.style.borderBlockColor = "red";
        condition1 = false;
    }
    else {
        tdes.style.borderBlockColor = "black";
    }
    if (sdate.value === ""){
        sdate.style.borderBlockColor = "red";
        condition1 = false;
    }
    else {
        sdate.style.borderBlockColor = "black";
    }
    if (ddate.value === ""){
        ddate.style.borderBlockColor = "red";
        condition1 = false;
    }
    else{
        ddate.style.borderBlockColor = "black";
    }

    if (priority.value === ""){
        priority.style.borderBlockColor = "red";
        condition1 = false;
    }
    else{
        priority.style.borderBlockColor = "black";
    }
    if (category.value === ""){
        category.style.borderBlockColor = "red";
        condition1 = false;
    }
    else{
        category.style.borderBlockColor = "black";
    }

    if (ddate.value <= sdate.value){
        ddate.style.borderBlockColor = "red";
        condition2 = false;
    }
    else {
        ddate.style.borderBlockColor = "black";
    }

    if (condition1 === false){
        alert("Please fill all the categories.");
        return;
    }
    else if (condition2 === false){
        alert("Due Date must be after Start Date.");
        return;
    }

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    
    var taskContent = document.createElement("span");
    taskContent.textContent=`${tname.value} - ${tdes.value} - ${sdate.value} - ${ddate.value} - ${priority.value} - ${category.value}`;

    var taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    var deleteButton = document.createElement("button");
    var confirmDelete = document.getElementById("confirm-delete-yes")
    deleteButton.id = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        showConfirmDelete();
        confirmDelete.onclick = function() {
            deleteTask(li);
        }
    };
    // delete task was initially outside the deleteButton event listner (onclick) fucntion however this was causing an issue of reference. confirmDelete.onclick and deleteButton.onclick store references to the newest added task however when delete button is clicked deleteButton.onclick reference changes to the <li> delet button that was clicked hence targeting the specific task that is meant to be deleted however confirmDelete.onclick still references the last task added hence pressing the delete button would always delete the last task added (meaning only 1 task would always be deleted). However by adding it to the the deleteButton.onclick now both deleteButton.onclick and confirmDelete.onclick reference the same <li> (the correct <li> not the most recently added one) hence the correct task is deleted 

    var editButton = document.createElement("button");
    editButton.id = "edit";
    editButton.textContent = "Edit";
    editButton.onclick = function() {
        editTask(li, taskContent);
    };

    li.setAttribute('data-category', category.value);
    li.setAttribute('data-status', "Pending");

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);
    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(taskActions);
    ul.appendChild(li);

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskContent.style.textDecoration = "line-through";
          li.setAttribute('data-status', "Completed");
        } 
        else {
          taskContent.style.textDecoration = "none";
          li.setAttribute('data-status', "Pending");
        }
    });

    resetForm();
    hideForm();
    saveTasksToStorage();
}

function resetForm() {
    document.getElementById("tname").value = "";
    document.getElementById("tdes").value = "";
    document.getElementById("sdate").value = "";
    document.getElementById("ddate").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("category").value = "";

    document.getElementById("tname").style.borderBlockColor = "black";
    document.getElementById("tdes").style.borderBlockColor = "black";
    document.getElementById("sdate").style.borderBlockColor = "black";
    document.getElementById("ddate").style.borderBlockColor = "black";
    document.getElementById("priority").style.borderBlockColor = "black";
    document.getElementById("category").style.borderBlockColor = "black";

    document.getElementById("add-task-button").style.display = "inline";
    document.getElementById("save-changes-button").style.display = "none";
}

function deleteTask(li){
    li.remove();
    hideConfirmDelete();
    saveTasksToStorage();
}

function editTask(li, taskContent) {
    var form = document.getElementById("task-form-container");
    form.style.display = "block";

    var tname = document.getElementById("tname");
    var tdes = document.getElementById("tdes");
    var sdate = document.getElementById("sdate");
    var ddate = document.getElementById("ddate");
    var priority = document.getElementById("priority");
    var category = document.getElementById("category");

    var taskDetails = taskContent.textContent.split(" - ");
    tname.value = taskDetails[0];
    tdes.value = taskDetails[1];
    sdate.value = taskDetails[2];
    ddate.value = taskDetails[3];
    priority.value = taskDetails[4];
    category.value = taskDetails[5];

    document.getElementById("add-task-button").style.display = "none";
    document.getElementById("save-changes-button").style.display = "inline";

    document.getElementById("save-changes-button").onclick = function() {
        saveChanges(li, taskContent);
    };
}

function saveChanges(li, taskContent) {
    var tname = document.getElementById("tname");
    var tdes = document.getElementById("tdes");
    var sdate = document.getElementById("sdate");
    var ddate = document.getElementById("ddate");
    var priority = document.getElementById("priority");
    var category = document.getElementById("category");

    var condition1 = true, condition2 = true;

    if (tname.value === "") {
        tname.style.borderBlockColor = "red";
        condition1 = false;
    } 
    else {
        tname.style.borderBlockColor = "black";
    }
    if (tdes.value === "") {
        tdes.style.borderBlockColor = "red";
        condition1 = false;
    } 
    else {
        tdes.style.borderBlockColor = "black";
    }
    if (sdate.value === "") {
        sdate.style.borderBlockColor = "red";
        condition1 = false;
    } 
    else {
        sdate.style.borderBlockColor = "black";
    }
    if (ddate.value === "") {
        ddate.style.borderBlockColor = "red";
        condition1 = false;
    } 
    else {
        ddate.style.borderBlockColor = "black";
    }
    if (priority.value === ""){
        priority.style.borderBlockColor = "red";
        condition1 = false;
    }
    else{
        priority.style.borderBlockColor = "black";
    }
    if (category.value === ""){
        category.style.borderBlockColor = "red";
        condition1 = false;
    }
    else{
        category.style.borderBlockColor = "black";
    }
    if (ddate.value <= sdate.value) {
        ddate.style.borderBlockColor = "red";
        condition2 = false;
    } 
    else {
        ddate.style.borderBlockColor = "black";
    }

    if (condition1 === false) {
        alert("Please fill all the categories.");
        return;
    } 
    else if (condition2 === false) {
        alert("Due Date must be after Start Date.");
        return;
    }

    li.setAttribute('data-category', category.value);
    taskContent.textContent = `${tname.value} - ${tdes.value} - ${sdate.value} - ${ddate.value} - ${priority.value} - ${category.value}`;
    resetForm();
    hideForm();
    saveTasksToStorage();
}

function getSelectedCategories() {
    var selectedCategories = [];
    var categoryCheckboxes = document.querySelectorAll('#filter-container input[type="checkbox"]');
    categoryCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });
    return selectedCategories;
}

function filterTasks() {
    var selectedCategories = getSelectedCategories();
    var statusFilter = document.getElementById("filter-status").value;
    var tasks = document.querySelectorAll("#ul li");

    tasks.forEach(function(task) {
        var taskCategory = task.getAttribute('data-category');
        var taskStatus = task.getAttribute('data-status');
        
        var categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(taskCategory);
        var statusMatch = statusFilter === "All" || statusFilter === "" || taskStatus === statusFilter;
    
        if (categoryMatch && statusMatch) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
    hideFilter();
}

//.sort sorts in ascending order
// We have to order priority in decending order hence priority 'high' is a lower value (1) than priority 'low' (3) resulting in the array being in ascending order however our configuration results in the array actually being in descending order
// We have to order due date it in ascending order (as due date closest to current date must be on top)
function sortTasks() {
    var sortOption = document.getElementById("sort").value;
    var tasks = document.querySelectorAll("#ul li");
    var tasksArray = Array.from(tasks);

    if (sortOption === "Priority") {
        tasksArray.sort(function(a, b) {
            var priorityA = a.querySelector('span').textContent.split(" - ")[4];
            var priorityB = b.querySelector('span').textContent.split(" - ")[4];
            return getPriorityValue(priorityA) - getPriorityValue(priorityB);
        });
    } else if (sortOption === "Due-Date") {
        tasksArray.sort(function(a, b) {
            var dueDateA = new Date(a.querySelector('span').textContent.split(" - ")[3]);
            var dueDateB = new Date(b.querySelector('span').textContent.split(" - ")[3]);
            return dueDateA - dueDateB;
        });
    }

    var ul = document.getElementById("ul");
    ul.innerHTML = "";
    tasksArray.forEach(function(task) {
        ul.appendChild(task);
    });
}

function getPriorityValue(priority) {
    switch (priority) {
        case "High":
            return 1;
        case "Medium":
            return 2;
        case "Low":
            return 3;
        default:
            return 4;
    }
}

function saveTasksToStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll("#ul li");

    taskItems.forEach(function (taskItem) {
        const checkbox = taskItem.querySelector("input[type='checkbox']");
        const taskContent = taskItem.querySelector("span").textContent;
        const status = checkbox.checked ? "Completed" : "Pending";
        tasks.push({
            content: taskContent,
            status: status,
            category: taskItem.getAttribute('data-category')
        });
    });

    sessionStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
    const ul = document.querySelector("#ul");

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox";
        checkbox.checked = task.status === "Completed";

        const taskContent = document.createElement("span");
        taskContent.textContent = task.content;
        if (task.status === "Completed") {
            taskContent.style.textDecoration = "line-through";
        }

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const deleteButton = document.createElement("button");
        deleteButton.id = "delete";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            showConfirmDelete();
        };

        const confirmDelete = document.getElementById("confirm-delete-yes");
        confirmDelete.onclick = function () {
            deleteTask(li);
        };

        const editButton = document.createElement("button");
        editButton.id = "edit";
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editTask(li, taskContent);
        };

        li.setAttribute('data-category', task.category);
        li.setAttribute('data-status', task.status);

        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);
        li.appendChild(checkbox);
        li.appendChild(taskContent);
        li.appendChild(taskActions);
        ul.appendChild(li);

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskContent.style.textDecoration = "line-through";
                li.setAttribute('data-status', "Completed");
            } else {
                taskContent.style.textDecoration = "none";
                li.setAttribute('data-status', "Pending");
            }
            saveTasksToStorage();
        });
    });
}


