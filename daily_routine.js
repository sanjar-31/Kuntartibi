"use strict";

let todo_title = document.querySelector("#form_title");
let todo_start_time = document.querySelector("#start");
let todo_end_time = document.querySelector("#end");
let todo_body = document.querySelector("#form_body");
let todo_btn = document.querySelector("#todo_btn");
let todo_cards = document.querySelector("#todo_cards");
let id = 0;
let todos = [];

//Created new todo
function created_new_todo() {
  todo_btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      !todo_title.value ||
      !todo_start_time.value ||
      !todo_end_time.value ||
      !todo_body.value
    ) {
      alert(
        "Iltimos barcha 4-ta maydonlarni toldiring to'liq malumot chap tarafingizda",
      );
      return;
    }

    if (todo_title.value.trim() === "" || todo_body.value.trim() === "") {
      alert("Iltimos maydonlarni probel(bosh joy bilan to'ldirmang) !");
      return;
    }

    if (todo_title.value.length > 50) {
      alert("Topshiriq nomi 50-ta harf yoki belgidan oshmasligi shart !");
      return;
    }

    if (todo_body.value.length > 150) {
      alert("Topshiriq malumoti 150-ta harf yoki belgidan oshmasligi shart !");
      return;
    }

    let todo = {
      id,
      title: todo_title.value,
      start_time: todo_start_time.value,
      end_time: todo_end_time.value,
      body: todo_body.value,
    };
    todos.push(todo);
    id++;
    todo_title.value = "";
    todo_start_time.value = "";
    todo_end_time.value = "";
    todo_body.value = "";
    all_todos();
  });
}
created_new_todo();

//Get all todos
function all_todos() {
  todo_cards.replaceChildren();
  todos.forEach((todo) => {
    let todo_card = document.createElement("div");

    todo_card.classList.add("todo_card");

    todo_card = `
        <h3>${todo.title}</h3>
        <p>${todo.body}</p>
        <div class="todo_time">
           <div class="start">
             <p>Boshlash vaqti</p>
             <h4 class="start_time">${todo.start_time}</h4>
           </div>
           <div class="end">
             <p>Tugatish vaqti</p>
             <h4 class="end_time">${todo.end_time}</h4>
           </div>
        </div>
        <div class="todo_btns">
           <button class="upd_btn">Topshiriqni ozgartirish</button>
           <button class="delete_btn">Topshiriqni o'chirish</button>
        </div>    
    `;
    todo_cards.append(todo_card);
  });
}
all_todos();