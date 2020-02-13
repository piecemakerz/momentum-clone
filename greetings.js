const container = document.querySelector(".contents-container");
const greeting = container.querySelector(".greetings");
const USER_LS = "currentUser";
let nameForm = null;
let nameInput = null;

function greetingStr() {
  const date = new Date();
  const hours = date.hours;
  if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

function saveName(name) {
  localStorage.setItem(USER_LS, name);
  removeElement(nameForm);
}

function paintGreeting(name) {
  const currentDay = greetingStr();
  greeting.innerText = `Good ${currentDay}, ${name}.`;
}

function handleNameSubmit(event) {
  event.preventDefault();
  const currentValue = nameInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
  showToDos();
}

function createNameForm() {
  nameForm = document.createElement("form");
  nameInput = document.createElement("input");
  nameForm.className = "js-form form";
  nameInput.type = "text";
  nameForm.appendChild(nameInput);
  container.insertBefore(nameForm, container.children[3]);
}

function askForName() {
  greeting.innerText = "Hello, what's your name?";
  createNameForm();
  nameForm.addEventListener("submit", handleNameSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
    showToDos();
  }
}

function init() {
  loadName();
}

init();
