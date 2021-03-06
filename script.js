// Element Modal

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
console.log("username", username);

// check login session
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

// Keluar
elKelBtn.addEventListener("click", function () {
  sessionStorage.removeItem("username");
  location.reload();
});
