/**
 * Created by Luofan on 2015/8/14.
 */
function formaction(){
    var title = document.getElementById("title");
    if(title.value == null){
        alert("Please Add a ToDo Event");
    }else{
        var data = loadData();
        var todo = {"title":title.value,"done":false}
        data.push(todo);
        saveData(data);
        var form = document.getElementById("form");
        form.reset();
        load();
    }
}

function loadData(){
    var collection = localStorage.getItem("todo");
    if(collection != null){
        return (JSON.parse(collection));
    }else{
        return ([]);
    }
}

function saveData(data){
    localStorage.setItem("todo",JSON.stringify(data));
}

function remove(i){
    var data = loadData();
    data.splice(i,1);
    saveData(data);
    load();
}

function update(i,field,value){
    var data = loadData();
    var todo = data.splice(i,1)[0];
    todo[field] = value;
    data.splice(i,0,todo);
    saveData(data);
    load();
}

function edit(i){
    load();
    var p = document.getElementById("p-"+i);
    var title = p.innerHTML;
    p.innerHTML = "<input id='input-"+i+"' value='"+title+"' />";
    var input = document.getElementById("input-"+i);
    input.setSelectionRange(0,input.value.length);
    input.focus();
    input.onblur = function(){
        if(input.value.length == 0){
            p.innerHTML = title;
            alert("evert can't be null");
        }
        else{
            update(i,"title",input.value);
        }
    };
}

function markall(){
    var checkbox = document.getElementsByName("mycheckbox");
    for(var i = 0; i < checkbox.length; i++){
        checkbox[i].defaultChecked = true;
    }
}

function alltodo(){
    var checkbox = document.getElementsByName("mycheckbox");
    var flag = 0;
    for(var i = 0; i < checkbox.length; i++){
        if(checkbox[i].defaultChecked == false){
            flag++;
        }
    }
    if(flag != 0){
        alert("Please mark all events!");
    }else {
        var data = loadData();
        for (var i = 0; i < data.length; i++) {
            data[i].done = false;
        }
        saveData(data);
        load();
    }
}

function alldone(){
    var checkbox = document.getElementsByName("mycheckbox");
    var flag = 0;
    for(var i = 0; i < checkbox.length; i++){
        if(checkbox[i].defaultChecked == false){
            flag++;
        }
    }
    if(flag != 0){
        alert("Please mark all events!");
    }else{
        var data = loadData();
        for(var i = 0; i < data.length; i++){
            data[i].done = true;
        }
        saveData(data);
        load();
    }
}

function clear(){
    var checkbox = document.getElementsByName("mycheckbox");
    var flag = 0;
    for(var i = 0; i < checkbox.length; i++){
        if(checkbox[i].defaultChecked == false){
            flag++;
        }
    }
    if(flag != 0){
        alert("Please mark all events!");
    }else{
        localStorage.clear();
        load();
    }
}

function load(){
    var todolist = document.getElementById("todolist");
    var donelist = document.getElementById("donelist");
    var todocount = document.getElementById("todocount");
    var donecount = document.getElementById("donecount");
    var collection = localStorage.getItem("todo");
    if(collection != null){
        var data = JSON.parse(collection);
        var countTodo = 0;
        var countDone = 0;
        var todoString = "";
        var doneString = "";
        for(var i = data.length - 1; i >= 0; i--){
            if(data[i].done){
                doneString += "<li><input type='checkbox' name='mycheckbox' onchange='update("+i+",\"done\",false)' />" +
                    "<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>" +
                    "<a href='javascript:remove("+i+")'></a></li>";
                countDone++;
            }else{
                todoString += "<li><input type='checkbox' name='mycheckbox' onchange='update("+i+",\"done\",true)' />" +
                    "<p id='p-"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>" +
                    "<a href='javascript:remove("+i+")'></a></li>";
                countTodo++;
            }
        }
        todocount.innerHTML = countTodo;
        todolist.innerHTML = todoString;
        donecount.innerHTML = countDone;
        donelist.innerHTML = doneString;
    }else{
        todocount.innerHTML = 0;
        todolist.innerHTML = "";
        donecount.innerHTML = 0;
        donelist.innerHTML = "";
    }
}
window.onload = load();