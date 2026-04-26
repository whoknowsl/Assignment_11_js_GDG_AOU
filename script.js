const signInForm = document.getElementById("sign-In-form");
const nameInput = document.getElementById("input-name");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const card = document.getElementById("card");
const logInForm = document.querySelector(".regestirForm");
const logInEmail = document.getElementById("login-email-Input");
const logInPassword = document.getElementById("login-password-Input");

const userData = JSON.parse(sessionStorage.getItem("userData")) || [];

function users(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
}

function createUser(name, email, password) {
  const user = new users(name, email, password);
  if (userData.some((user) => user.email === emailInput.value))
    return alert("this email alerady taken");
  userData.push(user);
  sessionStorage.setItem("userData", JSON.stringify(userData));
  signInForm.reset();
  window.location.href = "dashboard.html";
}

// Sign-in page
if (signInForm) {
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createUser(
      nameInput.value,
      emailInput.value,
      passwordInput.value,
      signInForm,
    );
  });
}

// Dashboard page
if (card) {
  userData.forEach((user) => {
    card.innerHTML = `
        <span class="card-image">HR</span>
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">${user.email}</p>
        <p>عرض مبسّط للمستخدم — الاسم والبريد الإلكتروني فقط</p>`;
  });
}

//Log in page
function enterUser(email, password) {
  const savedUsers = JSON.parse(sessionStorage.getItem("userData")) || [];
  const loginuser = savedUsers.find(
    (user) => user.email === email && user.password === password,
  );
  if (loginuser) {
    sessionStorage.setItem("currentUser", JSON.stringify(loginuser));
    window.location.href = "dashboard.html";
  } else {
    alert("this user not found you need to creat new accounr");
  }

  logInForm.reset();

  if (card) {
    if (savedUsers) {
      card.innerHTML = `
      <span class="card-image">HR</span>
      <h3 class="user-name">${loginuser.name}</h3>
      <p class="user-email">${loginuser.email}</p>
      <p>عرض مبسّط للمستخدم — الاسم والبريد الإلكتروني فقط</p>`;
    }
  }
}

if (logInForm) {
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    enterUser(logInEmail.value, logInPassword.value);
  });
}
console.log(userData);
