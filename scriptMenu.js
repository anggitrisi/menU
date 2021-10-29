import listMenu from "./list-menu.js";

const elLogIn = document.querySelector("#login");
const elSignUp = document.querySelector("#signup");

const elInputUsername = document.querySelector(".user");
const elInputEmail = document.querySelectorAll(".email");
const elInputPassword_SU = document.querySelector("#exampleFormControlInput3");
const elInputPassword_LI = document.querySelector("#exampleFormControlInput1");

const elSubmitSignUp = document.querySelector("#submitSignUp");
const elSubmitLogIn = document.querySelector("#submitLogIn");
const elProfile = document.querySelector(".profile");
const elCloseBtn = document.querySelectorAll(".btn-close");
const elKelBtn = document.querySelector("#btn-keluar");

// Users Data
let users = [];

class user {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.foods = {};
  }
  getUsername() {
    return this.username;
  }
}

// Web Storage for all users data account
const Profil = JSON.parse(localStorage.getItem("userProfile"));
if (!Profil) {
  localStorage.setItem("userProfile", "[]");
}
// Web Storage user in sessio
const username = sessionStorage.getItem("username");

const isLogin = (username) => {
  if (username) {
    elProfile.classList.remove("d-none");
    elProfile.firstElementChild.childNodes[2].data = " " + username;
    elSignUp.classList.add("d-none");
    elLogIn.classList.add("d-none");
  }
};

window.onload = isLogin(username);

//  When user clicked SignUp button
elSubmitSignUp.addEventListener("click", function () {
  const email = elInputEmail[1].value;
  const password = elInputPassword_SU.value;
  const emailValidator = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const passwordValidator = new RegExp(/[a-zA-Z0-9!@#$%^&*]{8,}/);
  if (emailValidator.test(email) && passwordValidator.test(password)) {
    // WebStorage -> Local Storage
    const anyUser = Profil.find((e) => e.username === elInputUsername.value);
    const anyEmail = Profil.find((e) => e.email === email);
    if (anyUser && anyEmail) {
      alert("Username dan email telah digunakan");
    } else if (anyUser && !anyEmail) {
      alert("Username telah digunakan");
    } else if (!anyUser && anyEmail) {
      alert("Email telah digunakan");
    } else {
      alert("Selamat Datang");
      elProfile.classList.remove("d-none");
      elProfile.firstElementChild.childNodes[1].data = elInputUsername.value;
      elSignUp.classList.add("d-none");
      elLogIn.classList.add("d-none");
      elCloseBtn[1].click();
      const newUser = new user(elInputUsername.value, email, password);
      console.log(newUser);
      const addProfile = Profil.concat(newUser);
      const newData = localStorage.setItem("userProfile", JSON.stringify(addProfile));
      console.log(newData);
      sessionStorage.setItem("username", elInputUsername.value);
      location.reload();
    }
  } else {
    if (emailValidator.test(email)) {
      alert("tolong masukan password sesuai ketentuan");
    } else if (passwordValidator.test(password)) {
      alert("tolong masukan email yang valid");
    } else {
      alert("tolong masukan email dan password yang valid");
    }
  }
});

// when user clicked LogIn Button
elSubmitLogIn.addEventListener("click", function () {
  const username = document.querySelector(".username").value;
  const password = elInputPassword_LI.value;
  const anyUser = Profil.find((e) => e.username === username);
  if (anyUser) {
    const indexUser = Profil.findIndex((e) => e.username === username);
    if (Profil[indexUser].password === password) {
      alert("Yeay benar");
      elProfile.classList.remove("d-none");
      elProfile.firstElementChild.childNodes[1].data = username;
      elSignUp.classList.add("d-none");
      elLogIn.classList.add("d-none");
      elCloseBtn[1].click();
      sessionStorage.setItem("username", username);
      elCloseBtn[0].click();
      location.reload();
    } else {
      alert("Password salah");
    }
  } else {
    alert("Anda belum mendaftar");
  }
});

// when user clicked "keluar" button
elKelBtn.addEventListener("click", function () {
  sessionStorage.removeItem("username");
  location.reload();
});

function drawMenuCard() {
  listMenu.forEach((menu) => {
    let html = "";
    Array.from(listMenu).forEach((menu) => {
      let htmlRender = `<div class="card col-6 h-100 p-1">
              <div class ="row g-0 p-1">
                <div class="col-lg-4">
                  <img src="${menu.image_url}" class="img-fluid h-100 img-fit" alt="" />
                </div>
                <div class="col-lg-4 align-self-center d-none d-lg-block d-xl-blockk">
                  <div class="row m-0 g-1">
                    <div class="col-lg-6 px-2">
                      <div class="card" style="width: 5rem; height: 5rem">
                        <div class="card-body pt-3 p-0 fs-6">
                          <h6 class="card-text text-center">${menu.macronutrients.carbs}g</h6>
                          <p class="card-text text-center align-text-bottom fs-6"><small>Karbohidrat</small></p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 px-3">
                      <div class="card" style="width: 5rem; height: 5rem">
                        <div class="card-body pt-3 p-0 fs-6">
                          <h6 class="card-text text-center">${menu.macronutrients.fat}g</h6>
                          <p class="card-text text-center align-text-bottom fs-6"><small>Lemak</small></p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 px-2">
                      <div class="card" style="width: 5rem; height: 5rem">
                        <div class="card-body pt-3 p-0 fs-6">
                          <h6 class="card-text text-center">${menu.macronutrients.protein}g</h6>
                          <p class="card-text text-center align-text-bottom fs-6"><small>Protein</small></p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 px-3">
                      <div class="card" style="width: 5rem; height: 5rem">
                        <div class="card-body pt-3 p-0 fs-6">
                          <h6 class="card-text text-center">${menu.macronutrients.carbs}kkal</h6>
                          <p class="card-text text-center align-text-bottom fs-6"><small>Kalori</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 d-flex flex-column ">
                  <div class="card-body d-flex justify-content-center">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="card-title">${menu.name}</h6>
                      <p class="card-text d-block d-lg-none d-xxl-">
                        <small class="text-muted p-0e"><i class="fas fa-fire"></i> ${menu.calories}</small>
                      </p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end m-3">
                    <button type="button" class="btn btn-outline-primary p-0 m-1" data-bs-toggle="modal" data-bs-target="#addModal" data-bs-id="${menu.id}"><i class="bi bi-plus-lg mx-3"></i></button>
                  </div>
                </div>
              </div>
            </div>`;
      html += htmlRender;
    });

    let elListMenu = document.querySelector("#list-menu");
    elListMenu.innerHTML = html;
  });
}
// End drawMenuCard

// get modal elements
const addModal = document.getElementById("addModal");
const modalTitle = addModal.querySelector("#modal-title");
const modalPortion = addModal.querySelector("#modal-portion");
const modalCarbs = addModal.querySelector("#modal-carbs");
const modalProtein = addModal.querySelector("#modal-protein");
const modalFat = addModal.querySelector("#modal-fat");
const modalCalories = addModal.querySelector("#modal-calories");
const modalImage = addModal.querySelector("#modal-picture");
const modalAddMenuToListButton = addModal.querySelector("#add-menu-to-list");
const servingAmount = addModal.querySelector("#servingAmount");
const elBtnClose = addModal.querySelector(".btn-close");
// const servingOption = addModal.querySelector("#servingOption");

// get modal content
addModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget;

  // Extract info from data-bs-* attributes
  let id = Number(button.getAttribute("data-bs-id"));

  // get menu by id from listMenu
  const menuById = getMenuById(id);

  // console.log(menuById);
  modalTitle.innerHTML = menuById.name;
  modalCarbs.innerHTML = menuById.macronutrients.carbs;
  modalProtein.innerHTML = menuById.macronutrients.protein;
  modalFat.innerHTML = menuById.macronutrients.fat;
  modalCalories.innerHTML = menuById.calories;
  modalImage.setAttribute("src", menuById.image_url);
  // set id to 'tambahkan' button
  modalAddMenuToListButton.setAttribute("data-id", menuById.id);
  modalPortion.innerHTML = "Kandungan gizi per " + menuById.serving_gram + "g";
});

function getMenuById(id) {
  const menu = listMenu.filter((x) => x.id === id);
  return menu[0];
}

// "tambahkan" button
const addMenuToList = addModal.querySelector("#add-menu-to-list");
addMenuToList.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(username);
  if (!username) {
    alert("Anda harus login terlebih dahulu");
    elBtnClose.click();
    elLogIn.click();
    return;
  }

  // extract user data
  const servingAmountInput = servingAmount.value;
  // cek value
  if (!servingAmountInput || Number(servingAmountInput) <= 0) {
    alert("Masukan jumlah dengan benar");
    return;
  }
  // get tanggal hari ini
  const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
  // ambil active username
  const activeUsername = sessionStorage.getItem("username");
  // get current all list menu, include the user active menus
  const currentAllList = JSON.parse(localStorage.getItem("userProfile")) || []; // [username: "anggi3si@gmail.com", email: "anggi3si@gmail.com", password: "anggi3si@gmail.com", food: {}]
  // get ONLY data of user active menus
  const currentActiveUserData = currentAllList.find((userProfile) => userProfile.username === activeUsername);
  const indexUserActive = currentAllList.findIndex((userProfile) => userProfile.username === activeUsername);
  const currentActiveFoods = currentActiveUserData.foods;
  // const currentActiveFoodByDate = currentActiveFoods[currentDate];
  // check if date key already exist
  if (!currentActiveFoods[currentDate]) {
    // if doesnt exist create array
    currentActiveFoods[currentDate] = [];
    // get updated data
    // currentActiveFoodByDate = currentActiveFoods[currentDate];
  }
  // get ONLY data of user active menu in specifc date
  // let currentActiveFoodByDate = currentActiveFoods[currentDate];

  // const servingOptionInput = (servingOption.value==="true");
  const menuId = modalAddMenuToListButton.getAttribute("data-id");
  // reset value
  servingAmount.value = "";

  const newDataFood = {
    id: Number(menuId),
    servings: Number(servingAmountInput),
  };

  let isAlreadyExist = currentActiveFoods[currentDate].findIndex((food) => food.id === newDataFood.id);

  if (isAlreadyExist >= 0) {
    currentActiveFoods[currentDate][isAlreadyExist].servings = currentActiveFoods[currentDate][isAlreadyExist].servings + newDataFood.servings;
  } else {
    currentActiveFoods[currentDate].push(newDataFood);
  }

  currentAllList[indexUserActive] = currentActiveUserData;

  const updateLocalData = JSON.stringify(currentAllList);
  localStorage.setItem("userProfile", updateLocalData);
  alert("data berhasil ditambahkan");
  location.reload();
  // const myModal = new bootstrap.Modal(document.getElementById("addModal"), {
  //   keyboard: false,
  // });
  // console.log(myModal);
  // myModal.hide();
});

drawMenuCard();
