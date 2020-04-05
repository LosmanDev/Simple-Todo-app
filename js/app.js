//Gets a hold of input and ul
const form = document.querySelector("#form");
const input = document.querySelector("#textInput");
const parentOl = document.querySelector("ul");
const remove_button = document.querySelector("#button");

//Get Tasks on page load from local Storage
(function () {
  get_task();
})();

//Add eventlisteners to them
form.addEventListener("submit", add_list);
parentOl.addEventListener("click", remove_list);
remove_button.addEventListener("click", delete_all);

function add_list(e) {
  //  Checks to see if there is a value or not
  if (!input.value) return;
  //Create and style elements
  const li = document.createElement("li");
  const a = document.createElement("a");
  li.innerText = input.value;
  li.classList.add("mt-2");
  a.classList.add("delete-item", "ml-2");
  a.innerHTML = '<i class="fas fa-minus"></i>';
  li.append(a);
  parentOl.append(li);

  e.preventDefault();

  // Save to local Storage
  save_local(input.value);

  //Empties the input field after enter
  input.value = "";
}

//Save task in local storage
function save_local(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Get tasks on page load
function get_task() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.innerText = task;
    li.classList.add("mt-2");
    a.classList.add("delete-item", "ml-2");
    a.innerHTML = '<i class="fas fa-minus"></i>';
    li.append(a);
    parentOl.append(li);
  });
}

//Remove individual tasks
function remove_list(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }

  //Remove from local storage
  remove_item_storage(e.target.parentElement.parentElement);
  console.log(e.target.parentElement.parentElement);
}

//Remove item from storage
function remove_item_storage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear the whole list
function delete_all() {
  while (parentOl.firstChild) {
    parentOl.removeChild(parentOl.firstChild);
  }
  clear_storage();
}

//Clear local Storage
function clear_storage() {
  localStorage.clear();
}
