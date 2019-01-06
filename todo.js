const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

//localStorage key
const TODOS_LS = 'toDos';

//localStorage value
let toDos = [];

//deleteToDo
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//localStorage save func
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//toDoList rendering
function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;

  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

//submit handling
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //localStorage는 data를 string으로만 저장한다.
    //그렇기 때문에 저장은 JOSN.stringify()사용하고 load시 JSON.parse()를 사용해야한다.
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
