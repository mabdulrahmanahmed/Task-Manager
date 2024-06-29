// var button = document.getElementById("but");

// button.addEventListener("click", function addTask() {
//     var input = document.getElementById("input");
//     var task = input.value;
//     var list = document.getElementById("list");

//     var li = document.createElement("li");
    
//     // li.textContent = task;
//     li.innerHTML=`${task}<br>`;
//     list.appendChild(li);
//     input.value = "";
// });

function addTask() {
    var input = document.getElementById("input");
    // var task = input.value;
    var list = document.getElementById("list");

    if (task === ""){
        alert("Please enter a task.");
        return;
    }

    var li = document.createElement("li");
    
    li.textContent = input.value;
    // li.innerHTML=`${task}<br>`;
    list.appendChild(li);
    input.value = "";
}