const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];
// forEach에서 function을 실행하는것 같이 각각의
//item을 같이 실행이 됨
function filterFn(toDo) {
    return toDo.id === 1;
}
function deleteToDo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

/**
 * 요약
 * - local Storage에는 JS data 저장 불가능 , String만 저장 가능
 * 고로  Object > String 바꿔주려면 JSON.stringfy 사용
 *  + 
 */

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
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

/**
 * JSON (JavaScript Object Notation)
 * 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록
 * Object로 바꿔주는 기능이다.
 * 자바스크립트의 object를 String으로 변환 해 주기도하고
 * String을 Object로 변환 할 수 도 있다.
 */
function laodToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    laodToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();