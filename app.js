let inputText = document.querySelector(".inputText");
let inputMonth = document.querySelector(".inputMonth");
let inputDay = document.querySelector(".inputDay");
let button = document.querySelector("button");
let section = document.querySelector("section");
button.addEventListener("click", (e) => {
  if (inputText.value === "") {
    alert("need input");
    return;
  }
  e.preventDefault();

  //find value
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDay = form.children[2].value;
  console.log(todoText, todoMonth, todoDay);

  //create Tag
  let todo = document.createElement("div");
  let text = document.createElement("p");
  let time = document.createElement("p");

  //create class
  todo.classList.add("todo");
  text.classList.add("todo-text");
  time.classList.add("todo-time");

  //put value into the tag
  text.innerHTML = todoText;
  time.innerHTML = todoMonth + "/" + todoDay;

  //post tag to the response
  todo.appendChild(text);
  todo.appendChild(time);
  section.appendChild(todo);

  //create trashcan and delete
  let completeButton = document.createElement("button");
  completeButton.innerHTML = "<i class='bx bx-check'></i>";
  completeButton.classList.add("complete");

  let trashCan = document.createElement("button");
  trashCan.innerHTML = "<i class='bx bx-trash'></i>";
  trashCan.classList.add("trashCan");
  //display check and delete
  todo.appendChild(completeButton);
  todo.appendChild(trashCan);
  //add todo animation
  todo.style.animation = "scaleUp 1s forward";
  //add complete style
  completeButton.addEventListener("click", () => {
    todo.classList.toggle("desh");
  });
  //add remove to delete
  trashCan.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    //啟動縮小的style，並移除
    todo.addEventListener("animationend", () => {
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      todoItem.remove();
    });
    //增加縮小的style
    todo.style.animation = "scaleDown 0.3s forwards";
  });
  //create an pbject

  let Mytodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDay: todoDay,
  };

  //stor data into  an array of pbject
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([Mytodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(Mytodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  console.log(JSON.parse(localStorage.getItem("list")));

  //跑完整個事件後最後input[type =text]的格子變回空格
  inputText.value = "";
});
//delete localstroage and lord data
let myList = localStorage.getItem("list");
if (myList !== null) {
  let myListArray = JSON.parse(myList);
  myListArray.forEach((item) => {
    //create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerHTML = item.todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoMonth + "/" + item.todoDay;
    todo.appendChild(text);
    todo.appendChild(time);

    //create trashcan and delete
    let completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='bx bx-check'></i>";
    completeButton.classList.add("complete");

    //add complete style
    completeButton.addEventListener("click", () => {
      todo.classList.toggle("desh");
    });
    let trashCan = document.createElement("button");
    trashCan.innerHTML = "<i class='bx bx-trash'></i>";
    trashCan.classList.add("trashCan");

    //add remove to delete
    trashCan.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      //啟動縮小的style，並移除
      todo.addEventListener("animationend", () => {
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
        todoItem.remove();
      });
      //增加縮小的style
      todo.style.animation = "scaleDown 0.3s forwards";
    });
    todo.appendChild(completeButton);
    todo.appendChild(trashCan);

    section.appendChild(todo);
  });
}
//按下enter即可送出
// let text = document.querySelector("#text");
// let submit = document.querySelector("#submit");

// document.getElementById("text").addEventListener("keyup", function (e) {
//   if (e.code === "Enter") {
//     submit.click();
//   }
// });
// 0;
// submit.addEventListener("click", () => {
//   alert(text.value);
// });
