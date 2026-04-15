"use strict";

let todo_title = document.querySelector("#form_title");
let todo_start_time = document.querySelector("#start");
let todo_end_time = document.querySelector("#end");
let todo_body = document.querySelector("#form_body");
let todo_btn = document.querySelector("#todo_btn");
let upd_todo_title = document.querySelector("#upd_form_title");
let upd_todo_start_time = document.querySelector("#upd_start");
let upd_todo_end_time = document.querySelector("#upd_end");
let upd_todo_body = document.querySelector("#upd_form_body");
let upd_todo_btn = document.querySelector("#upd_todo_btn");
let todo_cards = document.querySelector("#todo_cards");
let box_upd_form = document.querySelector(".box_upd_form");
const darkBtn = document.querySelector(".nav__btn");
let id = localStorage.length;
let upd_key = null;

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
    localStorage.setItem(`${id}`, JSON.stringify(todo));
    all_todos();
    todo_title.value = "";
    todo_start_time.value = "";
    todo_end_time.value = "";
    todo_body.value = "";
    id++;
  });
}
created_new_todo();

//Get all todos
function all_todos() {
  todo_cards.replaceChildren();

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const rawValue = localStorage.getItem(key);

    try {
      const parsed = JSON.parse(rawValue);
      let todo = document.createElement("div");
      todo.classList.add("todo_card");
      todo.innerHTML = `
             <h3>${parsed.title}</h3>
             <p>${parsed.body}</p>
             <div class="todo_time">
                <div class="start">
                  <p>Boshlash vaqti</p>
                  <h4 class="start_time">${parsed.start_time}</h4>
                </div>
                <div class="end">
                  <p>Tugatish vaqti</p>
                  <h4 class="end_time">${parsed.end_time}</h4>
                </div>
             </div>
             <div class="todo_btns">
                <button data-id="${parsed.id}" class="upd_btn">Topshiriqni ozgartirish</button>
                <button data-id="${parsed.id}" class="delete_btn">Topshiriqni o'chirish</button>
             </div>
         `;
      todo_cards.append(todo);
    } catch (e) {
      console.log("Catch ishga tushdi all_todos");
    }
  }
}

//Delete todo
function delete_todo() {
  todo_cards.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete_btn")) {
      const delete_id = e.target.dataset.id;
      localStorage.removeItem(delete_id);
      all_todos();
    } else if (e.target.classList.contains("upd_btn")) {
      upd_key = e.target.dataset.id;
      box_upd_form.style.display = "block";
    }
  });
}
delete_todo();

upd_todo_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !upd_todo_title.value ||
    !upd_todo_body.value ||
    !upd_todo_start_time.value ||
    !upd_todo_end_time.value
  ) {
    alert("Iltimos barja maydonlarni to'ldiring");
    return;
  }

  if (upd_todo_title.value.trim() === "" || upd_todo_body.value.trim() === "") {
    alert("Iltimos maydonlarni probel(bosh joy bilan to'ldirmang) !");
    return;
  }

  if (upd_todo_title.value.length > 60) {
    alert("Topshiriq nomi 60-ta harf yoki belgidan oshmasligi shart !");
    return;
  }

  if (upd_todo_body.value.length > 200) {
    alert("Topshiriq malumoti 200-ta harf yoki belgidan oshmasligi shart !");
    return;
  }

  const upd_data = {
    id: upd_key,
    title: upd_todo_title.value,
    start_time: upd_todo_start_time.value,
    end_time: upd_todo_end_time.value,
    body: upd_todo_body.value,
  };

  localStorage.setItem(upd_key, JSON.stringify(upd_data));

  upd_todo_title.value = ""
  upd_todo_body.value  = ""
  upd_todo_start_time.value = ""
  upd_todo_end_time.value = ""

  box_upd_form.style.display = "none";
  all_todos();
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkBtn.textContent = "Yorug' rejim";
}

darkBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  darkBtn.textContent = isDark ? "Yorug' rejim" : "Qorong'u rejim";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
all_todos();
