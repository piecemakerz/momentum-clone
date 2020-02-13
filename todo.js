let toDoForm = null;
let toDoInput = null;
let toDoText = null;
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function saveToDocs() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDocs();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = toDos.length + 1;

  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newID;
  li.className = "js-toDoListItem";
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newID
  };
  toDos.push(toDoObj);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  saveToDocs();
  toDoInput.value = "";
}

function createToDoForm() {
  toDoForm = document.createElement("form");
  toDoInput = document.createElement("input");
  toDoText = document.createElement("span");
  toDoForm.className = "js-toDoForm form";
  toDoInput.type = "text";
  toDoText.innerText = "What is your main focus for today?";

  toDoForm.appendChild(toDoText);
  toDoForm.appendChild(toDoInput);
  container.insertBefore(toDoForm, container.children[3]);
}

function showToDos() {
  createToDoForm();
  toDoForm.addEventListener("submit", handleToDoSubmit);
  loadToDos();
}
