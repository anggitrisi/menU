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

const elDaftarArtikel = document.querySelector("#article-list");

const createPostElement = (post) => {
  const elCol = document.createElement("div");
  const elCard = document.createElement("div");
  const elCardImg = document.createElement("img");
  const elCardDateDesc = document.createElement("div");
  const elIconCal = document.createElement("i");
  const elCardDate = document.createElement("h6");
  const elCardBody = document.createElement("div");
  const elCardFooter = document.createElement("div");

  const elCardTitle = document.createElement("h5");
  const elCardCaption = document.createElement("p");
  const elCardBtn = document.createElement("a");

  elCol.classList.add("col-12", "col-lg-4");
  elCard.classList.add("card", "h-100");
  // elCard.classList.add("card", "w-100", "my-3");
  elCardDateDesc.classList.add("col-12", "d-flex", "justify-content-start", "m-2");
  elIconCal.classList.add("fas", "fa-calendar-alt", "pe-2");
  elCardBody.classList.add("card-body");
  elCardFooter.classList.add("d-flex", "flex-row", "justify-content-end", "mt-auto");
  // elCol.classList.add();

  elCardTitle.classList.add("px-2");
  elCardCaption.classList.add("px-2");
  elCardBtn.classList.add("btn", "btn-outline-primary", "w-100", "stretched-link", "align-self-end", "m-2");

  ("");
  elCardImg.setAttribute("width", "100%");
  elCardImg.setAttribute("width", "100%");
  elCardBtn.innerHTML = "Read More";

  elCardBody.appendChild(elCardImg);
  elCardDateDesc.appendChild(elIconCal);
  elCardDateDesc.appendChild(elCardDate);
  elCardBody.appendChild(elCardDateDesc);
  elCardBody.appendChild(elCardTitle);
  elCardBody.appendChild(elCardCaption);
  elCardFooter.appendChild(elCardBtn);

  elCard.appendChild(elCardBody);
  elCard.appendChild(elCardFooter);

  elCol.appendChild(elCard);

  // EDIT HERE
  elCol.querySelector("img").setAttribute("src", post.image.small);
  elCol.querySelector("h5").innerHTML = post.title;
  const date = new Date(post.isoDate);
  elCol.querySelector("h6").innerHTML = date.toISOString().slice(0, 10);
  elCol.querySelector("p").innerHTML = post.contentSnippet;
  elCol.querySelector("a.btn").setAttribute("href", post.link);
  elCol.querySelector("a.btn").setAttribute("target", "blank");

  return elCol;
};

const renderPosts = async () => {
  let posts = await getPosts();
  posts.map(async (post) => {
    // console.log(post)
    const elCol = createPostElement(post);
    elDaftarArtikel.appendChild(elCol);
  });
};

const getPosts = async () => {
  let response = await fetch("https://berita-indo-api.vercel.app/v1/suara/health");
  response = await response.json();
  let articles = response?.data || [];
  articles = articles.slice(0, 15);
  return articles;
};

renderPosts();
