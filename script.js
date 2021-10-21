// const togglerEl = document.querySelector(".navbar-toggler")
// const closeBtnEl = document.querySelector("#closed")
// const navCollapse = document.querySelector(".navbar-collapse")

// togglerEl.addEventListener("click", function(){
//     closeBtnEl.classList.remove("d-none")
//     togglerEl.classList.add("d-none")
// })
// closeBtnEl.addEventListener("click", function(){
//     togglerEl.classList.remove("d-none")
//     closeBtnEl.classList.add("d-none")
// })

// Element Modal
const elLogIn = document.querySelector("#login")
const elSignUp = document.querySelector("#signup")


const elInputUsername = document.querySelector(".user")
const elInputEmail = document.querySelectorAll(".email")
const elInputPassword_SU = document.querySelector("#exampleFormControlInput3")
const elInputPassword_LI = document.querySelector("#exampleFormControlInput1")

const elSubmitSignUp = document.querySelector("#submitSignUp")
const elSubmitLogIn = document.querySelector("#submitLogIn")
const elProfile = document.querySelector(".profile")
const elCloseBtn = document.querySelectorAll(".btn-close")
const elKelBtn = document.querySelector("#btn-keluar")

// Users Data
let users = []

class user{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getUsername(){
        return this.username
    }
}

// Web Storage

const Profil = JSON.parse(localStorage.getItem("userProfile"))
if(!Profil){
    localStorage.setItem("userProfile", "[]")
}

//  When user clicked SignUp button
elSubmitSignUp.addEventListener("click", function(){

    const email = elInputEmail[1].value;
    const password = elInputPassword_SU.value;
    const emailValidator = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const passwordValidator = new RegExp(/[a-zA-Z0-9!@#$%^&*]{8,}/)
    if(emailValidator.test(email) && passwordValidator.test(password)){
            // WebStorage -> Local Storage
            const anyUser = Profil.find(e=> e.username===elInputUsername.value)
            const anyEmail = Profil.find(e=> e.email===email)
            if(anyUser && anyEmail){
                alert("Username dan telah digunakan")
            }else if(anyUser && !anyEmail){
                alert("Username telah digunakan")
            }else if(!anyUser&&anyEmail){
                alert("Email telah digunakan")
            }else{
                alert("Selamat Datang")
                elProfile.classList.remove("d-none")
                elProfile.firstElementChild.childNodes[1].data = elInputUsername.value
                elSignUp.classList.add("d-none")
                elLogIn.classList.add("d-none")
                elCloseBtn[1].click()
                const newUser = new user(elInputUsername.value, email, password)
                console.log(newUser)
                const addProfile = Profil.concat(newUser)
                const newData = localStorage.setItem("userProfile", JSON.stringify(addProfile))
                console.log(newData)
                sessionStorage.setItem("username", elInputUsername.value)
                sessionStorage.setItem("password", password)
            }
        }else{
            if((emailValidator.test(email))){
                alert("tolong masukan password sesuai ketentuan")
            }else if(passwordValidator.test(password)) {
                alert("tolong masukan email yang valid")
            } else{
                alert("tolong masukan email dan password yang valid")
            }
    }
    })

// when user clicked LogIn Button
elSubmitLogIn.addEventListener("click", function(){
    const username = document.querySelector(".username").value
    const password = elInputPassword_LI.value;
    const anyUser = Profil.find(e=> e.username===username)
    if(anyUser){
        const indexUser = Profil.findIndex(e=> e.username===username)
        if(Profil[indexUser].password===password){
            alert("Yeay benar")
            elProfile.classList.remove("d-none")
            elProfile.firstElementChild.childNodes[1].data = username
            elSignUp.classList.add("d-none")
            elLogIn.classList.add("d-none")
            elCloseBtn[1].click()
            sessionStorage.setItem("username", username)
            sessionStorage.setItem("password", password)
            elCloseBtn[0].click()
        }else{
            alert("Password salah")
        }
    }else{
        alert("Anda belum mendaftar")
    }
})

// when user clicked "keluar" button
elKelBtn.addEventListener("click", function(){
    window.location.reload()
})