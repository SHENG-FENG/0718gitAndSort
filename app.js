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
  trashCan.addEventListener("click", () => {
    //啟動縮小的style，並移除
    todo.addEventListener("animationend", () => {
      todo.remove();
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

  console.log(JSON.parse(localStorage.setItem("list")));

  //跑完整個事件後最後input[type =text]的格子變回空格
  inputText.value = "";
});
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
