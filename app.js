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

//開網站時會顯示存在localstorage裡的資料
lordData();
//lord data and delete localstroage
function lordData() {
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
}

//Merge sort
function mergeTime(arr1, arr2) {
  //宣告result把分解開的值push進去
  let result = [];
  //宣告arr1 and arr2的第幾個
  let i = 0;
  let j = 0;
  //&&是而且的意思，假如i小於arr1的長度，j小於arr2的長度
  while (i < arr1.length && j < arr2.length) {
    //假如
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (arr1[i].todoDay > arr2[j].todoDay) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

function mergeSort(arr) {
  //假如arr裡的長度等於1
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = Math.slice(0, middle);
    let left = Math.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}
//打印出排列函數中存在localStorage裡的數值
console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));

let sortButon = document.querySelector(".sort button");

sortButon.addEventListener("click", () => {
  //sort data排列資料
  let sortArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortArray));

  //移出資料 remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  //lord data
  lordData();
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
