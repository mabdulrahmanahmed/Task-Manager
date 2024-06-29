function showForm()
{
    var form = document.getElementById("task-form-container");
    form.style.display = "block";
}

function hideForm(){
    event.preventDefault();     // the button 'Back' refreshes the page hence list/data lost
    var form = document.getElementById("task-form-container");
    form.style.display = "none";
}

function showFilter(){
    var form = document.getElementById("filter-container");
    form.style.display = "block";
}

function hideFilter(){
    event.preventDefault();     // the button 'Back' refreshes the page hence list/ data lost
    var form = document.getElementById("filter-container");
    form.style.display = "none";
}

function showConfirmDelete(){
    var confirmDelete = document.getElementById("confirm-delete-container");
    confirmDelete.style.display = "block";
}

function hideConfirmDelete(){
    event.preventDefault();     // the button 'Back' refreshes the page hence list/ data lost
    var confirmDelete = document.getElementById("confirm-delete-container");
    confirmDelete.style.display = "none";
}

function addTask() //since all if conditions for input boxes are in addTask function which only triggers when the button is pressed so for example if I leave certain categories they will turn red. now technically speaking they should turn black once input is recognises but that only happens when the button is pressed hence it will remain red until the button is pressed regardless of whether it has input or not. the solution to this is to make a variable which becomes true the first time the button is pressed after wihch the if conditions should constantly run so that all updates are being done live and once a category is filled the border color will change back to normal even before pressing the button.
{
    event.preventDefault(); // the button 'Add Task' causes refresh hence dynamic list/ data lost ... this function prevents reloading hence data is preserved (unless page is refreshed)
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

    var taskActions = document.createElement("div");     // another method ... this method allowed for buttons 'delete' and 'edit' to be on a different line as a <div> class was being created which autmocatically creates a new line
    taskActions.className = "task-actions";

    var deleteButton = document.createElement("button");
    var confirmDelete = document.getElementById("confirm-delete-yes")
    deleteButton.id = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        showConfirmDelete();
    };
    confirmDelete.onclick = function() {
        deleteTask(li);
        // li.remove();
    }

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
    // li.appendChild(editButton);
    // li.appendChild(deleteButton);
    li.appendChild(taskActions);
    ul.appendChild(li);

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskContent.style.textDecoration = "line-through";
          li.dataset.status = "Completed";
        } 
        else {
          taskContent.style.textDecoration = "none";
        }
    });

    resetForm();
    form.style.display = "none";
    
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
    hideConfirmDelete(); // ye kyun karna parra hai abhi tak to nahi karna parra tha 
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

    taskContent.textContent = `${tname.value} - ${tdes.value} - ${sdate.value} - ${ddate.value} - ${priority.value} - ${category.value}`;
    resetForm();
    document.getElementById("task-form-container").style.display = "none";
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

