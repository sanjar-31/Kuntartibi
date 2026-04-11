"use strict";

let todo_title = document.querySelector("#form_title");
let todo_start_time = document.querySelector("#start");
let todo_end_time = document.querySelector("#end");
let todo_body = document.querySelector("#form_body");
let todo_btn = document.querySelector("#todo_btn");
let upd_todo_title = document.querySelector("#upd_form_title");
let upd_todo_start_time = document.querySelector("#upd_start");
let upd_todo_end_time = document.querySelector("#eupd_end");
let upd_todo_body = document.querySelector("#upd_form_body");
let upd_todo_btn = document.querySelector("#upd_todo_btn");
let todo_cards = document.querySelector("#todo_cards");
let box_upd_form = document.querySelector(".box_upd_form");
let dark_mode = document.querySelector(".nav__btn");
const darkBtn = document.querySelector('.nav__btn');
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

    if (todo_title.value.length > 60) {
      alert("Topshiriq nomi 60-ta harf yoki belgidan oshmasligi shart !");
      return;
    }

    if (todo_body.value.length > 200) {
      alert("Topshiriq malumoti 200-ta harf yoki belgidan oshmasligi shart !");
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
    todo_title.value = "";
    todo_start_time.value = "";
    todo_end_time.value = "";
    todo_body.value = "";
    all_todos();
    localStorage.setItem(`${id}`,JSON.stringify(todo));
    id++
  });
}
created_new_todo();

//Get all todos
function all_todos() {
  todo_cards.replaceChildren();
  todos.forEach((todo) => {
    let todo_card = document.createElement("div");

    todo_card.classList.add("todo_card");

    todo_card.innerHTML = `
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
           <button id="${todo.id}" class="delete_btn">Topshiriqni o'chirish</button>
        </div>    
    `;
    todo_cards.append(todo_card);
    console.log(todos);
  });
}
all_todos();

//Delete todo 
function delete_todo(){
  todo_cards.addEventListener("click", e => {
    if(e.target.classList.contains("delete_btn")){
       const delete_id = Number(e.target.id);
       todos = todos.filter(todo => todo.id !== delete_id);
       all_todos();
       localStorage.removeItem(`${delete_id}`)

    } else if(e.target.classList.contains("upd_btn")){
      box_upd_form.style.display = "block";
      if(!upd_todo_title.value || !upd_todo_body.value || !upd_todo_start_time.value || upd_todo_end_time.value){
        alert("Iltimos barja maydonlarni to'ldiring");
        return;
      }

      if(upd_todo_title.value.trim() === "" || upd_todo_body.value.trim() === ""){
        alert("Iltimos maydonlarni probel(bosh joy bilan to'ldirmang) !");
        return;
      }

      if(upd_todo_title.value.length > 60){
         alert("Topshiriq nomi 60-ta harf yoki belgidan oshmasligi shart !");
         return;
      }

      if(upd_todo_body.value.length > 200){
        alert("Topshiriq malumoti 200-ta harf yoki belgidan oshmasligi shart !");
        return;
      }


    }
  })
}
delete_todo();

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkBtn.textContent = "Yorug' rejim";
}

darkBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    darkBtn.textContent = isDark ? "Yorug' rejim" : "Fon rangini o'zgartirish";
});