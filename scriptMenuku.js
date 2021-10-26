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

const elSleepyDoc = document.querySelector("#doc-sleep");
const elMenuList = document.querySelector("#menu-list");
const elEmptyMenuList = document.querySelector("#empty-menu-list");

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
let username = sessionStorage.getItem("username");

const isLogin = (username) => {
  if (username) {
    elProfile.classList.remove("d-none");
    elProfile.firstElementChild.childNodes[2].data = " " + username;
    elSignUp.classList.add("d-none");
    elLogIn.classList.add("d-none");
    elSleepyDoc.classList.add("d-none");
    // elMenuList.classList.remove("d-none");
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
      alert("Username dan telah digunakan");
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
      sessionStorage.setItem("password", password);
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
  if (username == "" || password == "") {
    alert("Masukkan username dan password yang sesuai!");
  } else {
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
        sessionStorage.setItem("password", password);
        elCloseBtn[0].click();
      } else {
        alert("Password salah");
      }
    } else {
      alert("Anda belum mendaftar");
    }
  }
});

// when user clicked "keluar" button
elKelBtn.addEventListener("click", function () {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("password");
  location.reload();
});

const elTodayDate = document.querySelector("#today-date");
const elYesterdayDate = document.querySelector("#yesterday-date");
const elBtnKeluar = document.querySelector("#btn-keluar");

// generateAutomaticDate
const nama_bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const nama_hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const hari_ini = nama_hari[new Date().getDay()] + ", " + new Date().getDate() + " " + nama_bulan[new Date().getMonth()] + " " + new Date().getFullYear();
const kemarin = nama_hari[new Date().getDay() - 1] + ", " + (new Date().getDate() - 1) + " " + nama_bulan[new Date().getMonth()] + " " + new Date().getFullYear();

elTodayDate.innerText = hari_ini;
// elYesterdayDate.innerText = kemarin;

// WEB STORAGE
const activeUsername = sessionStorage.getItem("username");
// let user_daftar_menu = localStorage.getItem(username ? username : ""); // "[{id:2,login:'foo'},{id:3,login:'wycats'}]"
const currentAllList = JSON.parse(localStorage.getItem("userProfile")) || []; // [username: "anggi3si@gmail.com", email: "anggi3si@gmail.com", password: "anggi3si@gmail.com", food: {}]
// get ONLY data of user active menus
const currentActiveUserData = currentAllList.find((userProfile) => userProfile.username === activeUsername);
const indexUserActive = currentAllList.findIndex((userProfile) => userProfile.username === activeUsername);
const currentActiveFoods = currentActiveUserData.foods;

const user_daftar_menu = currentActiveUserData.foods;
const currentDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
const previousDate = `${new Date().getDate() - 1}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
const user_daftar_menu_hari_ini = user_daftar_menu[currentDate] || null;
const user_daftar_menu_kemarin = user_daftar_menu[previousDate] || null;

function drawMenuCardDaftarMenuHariIni() {
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCalories = 0;

  let html = "";

  if (user_daftar_menu_hari_ini === null) {
    elEmptyMenuList.classList.remove("d-none");
  } else {
    elMenuList.classList.remove("d-none");
    user_daftar_menu_hari_ini.forEach((menu) => {
      // Array.from(user_daftar_menu_hari_ini).forEach((menu) => {
      const dataMenu = listMenu.find((listMenu) => listMenu.id === menu.id);
      const servingPortion = menu.servings / dataMenu.serving_gram;
      const servingPortionRounded = servingPortion.toFixed(2);

      const detailMenu = {
        id: menu.id,
        name: dataMenu.name,
        image_url: dataMenu.image_url,
        serving_gram: dataMenu.serving_gram,
        servings: menu.servings,
        calories: Math.round(dataMenu.calories * servingPortion * 100) / 100,
        macronutrients: {
          carbs: Math.round(dataMenu.macronutrients.carbs * servingPortion * 100) / 100,
          protein: Math.round(dataMenu.macronutrients.protein * servingPortion * 100) / 100,
          fat: Math.round(dataMenu.macronutrients.fat * servingPortion * 100) / 100,
        },
      };
      console.log(detailMenu);

      totalCarbs += Number(detailMenu.macronutrients.carbs);
      totalProtein += Number(detailMenu.macronutrients.protein);
      totalFat += Number(detailMenu.macronutrients.fat);
      totalCalories += Number(detailMenu.calories);

      let htmlRender = `
              <div class="card my-3 p-0 col-lg-12 col-6">
                <div class="row g-0">
                  <div class="col-lg-4">
                    <img src="${detailMenu.image_url}" class="img-fluid h-100 img-fit" alt="..." />
                  </div>
                  <div class="col-lg-4 align-self-center d-none d-lg-block d-xl-block">
                    <div class="row m-0">
                      <div class="col-lg-6 my-1">
                        <div class="card" style="width: 5.5rem; height: 5.5rem">
                          <div class="card-body pt-3 p-0 fs-6">
                            <p class="card-text text-center">${detailMenu.macronutrients.carbs}g</p>
                            <p class="card-text text-center align-text-bottom fs-6"><small>Karbohidrat</small></p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 my-1">
                        <div class="card" style="width: 5.5rem; height: 5.5rem">
                          <div class="card-body pt-3 p-0 fs-6">
                            <p class="card-text text-center">${detailMenu.macronutrients.fat}g</p>
                            <p class="card-text text-center align-text-bottom fs-6"><small>Lemak</small></p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 my-1">
                        <div class="card" style="width: 5.5rem; height: 5.5rem">
                          <div class="card-body pt-3 p-0 fs-6">
                            <p class="card-text text-center">${detailMenu.macronutrients.protein}g</p>
                            <p class="card-text text-center align-text-bottom fs-6"><small>Protein</small></p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 my-1">
                        <div class="card" style="width: 5.5rem; height: 5.5rem">
                          <div class="card-body pt-3 p-0 fs-6">
                            <p class="card-text text-center">${detailMenu.calories}kkal</p>
                            <p class="card-text text-center align-text-bottom fs-6"><small>Kalori</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 d-flex flex-column">
                    <div class="card-body d-flex justify-content-center">
                      <div class="d-flex flex-column justify-content-center">
                        <h5 class="card-title m-0">${detailMenu.name}</h5>
                        <p class="card-text m-0">${detailMenu.servings}g</p>
                        <p class="card-text d-block d-lg-none d-xxl-">
                          <small class="text-muted p-0e"><i class="fas fa-fire"></i> ${detailMenu.calories}kkal</small>
                        </p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end m-3">
                      <button type="button" class="btn btn-outline-danger p-0 m-1" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-id-delete="${detailMenu.id}"><i class="bi bi-trash-fill mx-3"></i></button>
                      <button type="button" class="btn btn-outline-success p-0 m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-id="${detailMenu.id}"><i class="bi bi-pencil-fill mx-3"></i></button>
                    </div>
                  </div>
                </div>
              </div>`;
      html += htmlRender;
      // });

      let elDaftarMenu = document.querySelector("#daftar-menu");
      elDaftarMenu.innerHTML = html;

      // update nutritions total-card
      const elNutritionsTotalCard = document.querySelector("#nutritions-total");
      elNutritionsTotalCard.classList.remove("d-none");

      const liTotalCarbs = document.querySelector("#carbs-total");
      const liTotalProtein = document.querySelector("#protein-total");
      const liTotalFat = document.querySelector("#fat-total");
      const liTotalCalories = document.querySelector("#calories-total");

      liTotalCarbs.innerText = totalCarbs + "g";
      liTotalProtein.innerText = totalProtein + "g";
      liTotalFat.innerText = totalFat + "g";
      liTotalCalories.innerText = totalCalories + "kkal";

      // console.log(totalCarbs)
    });
  }
}
// End drawMenuCardDaftarMenuHariIni
drawMenuCardDaftarMenuHariIni();

// get modal elements
const editModal = document.getElementById("editModal");
const modalTitle = editModal.querySelector("#modal-title");
const modalPortion = editModal.querySelector("#modal-portion");
const modalCarbs = editModal.querySelector("#modal-carbs");
const modalProtein = editModal.querySelector("#modal-protein");
const modalFat = editModal.querySelector("#modal-fat");
const modalCalories = editModal.querySelector("#modal-calories");
const modalImage = editModal.querySelector("#modal-picture");
const modalEditButton = editModal.querySelector("#save-edit-btn ");
const servingAmount = editModal.querySelector("#servingAmount");
const servingOption = editModal.querySelector("#servingOption");
// edit Modal
editModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  let id = Number(button.getAttribute("data-bs-id"));
  // Get "hapus" confirm button
  const hapusButton = deleteModal.querySelector("#delete-confirm-hapus");
  console.log(id);

  // get menu by id from listMenu
  const detailMenuById = getDetailMenuUserById(id);
  const detailMenuUserById = getDetailMenuUserById(id);

  console.log(detailMenuById);
  console.log(detailMenuUserById);

  modalTitle.innerHTML = detailMenuById.name;
  modalCarbs.innerHTML = detailMenuById.macronutrients.carbs;
  modalProtein.innerHTML = detailMenuById.macronutrients.protein;
  modalFat.innerHTML = detailMenuById.macronutrients.fat;
  modalCalories.innerHTML = detailMenuById.calories;
  modalImage.setAttribute("src", detailMenuById.image_url);
  modalPortion.innerHTML = "Kandungan gizi per " + detailMenuById.serving_gram + "g";
  servingAmount.value = Number(detailMenuUserById.servings);

  // const servingAmountUpdated = editModal.querySelector("#servingAmount")
  console.log(detailMenuUserById);

  // Get "save" update confirm button
  const saveButton = editModal.querySelector("#edit-confirm-simpan");

  // add even listener on click "hapus" button
  saveButton.addEventListener("click", function (event) {
    // get user input
    const inputServings = editModal.querySelector("#servingAmount").value;

    const indexOfData = user_daftar_menu_hari_ini.findIndex((e) => e.id === id);

    console.log(inputServings);
    currentActiveFoods[currentDate][indexOfData].servings = inputServings;

    // then update from web storage
    currentAllList[indexUserActive] = currentActiveUserData;
    const updateLocalData = JSON.stringify(currentAllList);
    localStorage.setItem("userProfile", updateLocalData);
    console.log(currentAllList);
    alert("data berhasil diubah");
    window.location.reload();
  });
});

function getDetailMenuUserById(id) {
  const menu = user_daftar_menu_hari_ini.find((user_daftar_menu_hari_ini) => user_daftar_menu_hari_ini.id === id);
  const dataMenu = listMenu.find((listMenu) => listMenu.id === menu.id);
  const servingPortionRounded = (menu.servings / dataMenu.serving_gram).toFixed(2);
  const detailMenu = {
    id: menu.id,
    name: dataMenu.name,
    image_url: dataMenu.image_url,
    serving_gram: dataMenu.serving_gram,
    servings: menu.servings,
    calories: (dataMenu.calories * servingPortionRounded).toFixed(1),
    macronutrients: {
      carbs: (dataMenu.macronutrients.carbs * servingPortionRounded).toFixed(1),
      protein: (dataMenu.macronutrients.protein * servingPortionRounded).toFixed(1),
      fat: (dataMenu.macronutrients.fat * servingPortionRounded).toFixed(1),
    },
  };

  return detailMenu;
}

function getDetailMenuById(id) {
  const menu = listMenu.find((listMenu) => listMenu.id === id);
  return menu;
}

// delete Modal
deleteModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  let id = Number(button.getAttribute("data-bs-id-delete"));
  // Get "hapus" confirm button
  const hapusButton = deleteModal.querySelector("#delete-confirm-hapus");

  // add even listener on click "hapus" button
  hapusButton.addEventListener("click", function (event) {
    const user_daftar_menu_hari_ini = user_daftar_menu[currentDate];
    const indexOfData = user_daftar_menu_hari_ini.findIndex((e) => e.id === id);
    console.log(indexOfData);

    // then delete from web storage
    currentActiveFoods[currentDate].splice(indexOfData, 1);
    // cek if there is no data in currentActiveFoods[currentDate] then delete the key
    if (currentActiveFoods[currentDate].length == 0) {
      delete currentActiveFoods[currentDate];
    }
    currentAllList[indexUserActive] = currentActiveUserData;
    const updateLocalData = JSON.stringify(currentAllList);
    localStorage.setItem("userProfile", updateLocalData);
    console.log(currentAllList);
    alert("data berhasil dihapus");
    window.location.reload();
  });
});
