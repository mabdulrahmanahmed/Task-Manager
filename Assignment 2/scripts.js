function showForm()
{
    var form = document.getElementById("task-form-container");
    form.style.display = "block";
}


function hideForm(){
    event.preventDefault();     // the button 'Back refresh hence dynamic list/ data lost
    var form = document.getElementById("task-form-container");
    form.style.display = "none";
}


function addTask()  //since all if conditions for input boxes are in addTask function which only triggers when the button is pressed so for example if I leave certain categories they will turn red. now technically speaking they should turn black once input is recognises but that only happens when the button is pressed hence it will remain red until the button is pressed regardless of whether it has input or not. the solution to this is to make a variable which becomes true the first time the button is pressed after wihch the if conditions should constantly run so that all updates are being done live and once a category is filled the border color will change back to normal even before pressing the button.
{
    event.preventDefault(); // the button 'Add Task' causes refresh hence dynamic list/ data lost ... this function prevents reloading hence data is preserved (unless page is refreshed)
    var form = document.getElementById("task-form-container");      
    var tname = document.getElementById("tname");
    var tdes = document.getElementById("tdes"); 
    var sdate = document.getElementById("sdate");
    var ddate = document.getElementById("ddate");
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

    var taskContent = document.createElement("span");
    taskContent.textContent = `${tname.value} - ${ddate.value}` ;

    // var taskActions = document.createElement("div");     another method ... this method allowed for buttons 'delete' and 'edit' to be on a different line as a <div> class was being created which autmocatically creates a new line
    // taskActions.className = "task-actions";

    var editButton = document.createElement("button");
    editButton.id = "edit";
    editButton.textContent = "Edit";
    editButton.onclick = function() {
        editTask(li, taskContent);                  //editTask ko define karna hai abhi
    };

    var deleteButton = document.createElement("button");
    deleteButton.id = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        li.remove();
    };

    // taskActions.appendChild(editButton);
    // taskActions.appendChild(deleteButton);
    li.appendChild(taskContent);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    // li.appendChild(taskActions);
    ul.appendChild(li);

    tname.value = "";
    tdes.value = "";
    sdate.value = "";
    ddate.value = "";
    form.style.display = "none";
    
}