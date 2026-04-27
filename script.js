//grap the inputs form DOM
const signInForm = document.getElementById("sign-In-form");
const nameInput = document.getElementById("input-name");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const card = document.getElementById("card");
const logInForm = document.getElementById("regestirForm");
const logInEmail = document.getElementById("login-email-Input");
const logInPassword = document.getElementById("login-password-Input");
const errorMessage = document.getElementById("error-messges");

//the array that store users data
const userData = JSON.parse(localStorage.getItem("userData")) || [];

//creating the user function
function users(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
}

//this function response for sign in it valdatie the user before creating account
function createUser(name, email, password) {
  const user = new users(name, email, password);
  if (userData.some((user) => user.email === email)) {
    errorMessage.textContent = "this email is alerady taken";
    return;
  }
  userData.push(user);
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

//this function is responseble for the loging it checkes the user inputs
function enterUser(email, password) {
  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const loginuser = savedUsers.find(
    (user) => user.email === email && user.password === password,
  );

  if (loginuser) {
    localStorage.setItem("currentUser", JSON.stringify(loginuser));
    window.location.href = "dashboard.html";
  } else {
    errorMessage.textContent = "Inavlid email or password";
    errorMessage.classList.add(
      "text-danger bg-danger-subtle p-1 mt-1 fw-bolder",
    );
  }

  logInForm.reset();
}

//this is response for rendering the card
if (card) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    card.innerHTML = `
      <h3 class="user-name text-uppercase fs-1 text-light mb-1">${currentUser.name}</h3>
      <p class="user-email text-light fw-light mt-5">${currentUser.email}</p>
      <p class="text-light fw-light ">عرض مبسّط للمستخدم — الاسم والبريد الإلكتروني فقط</p> 
      <span class="card-image text-light p-3 border border-secondary rounded-circle border border-end-0 border border-start-0 fs-5">1</span>`;
  }
}

//connecting the the logic to the DOM
if (logInForm) {
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    enterUser(logInEmail.value, logInPassword.value);
  });
}

if (signInForm) {
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createUser(nameInput.value, emailInput.value, passwordInput.value);
    signInForm.reset();
  });
}
//login logic
(() => {
  "use strict";
  // Fetch forms and validate on submit
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
