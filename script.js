const signInForm = document.getElementById("sign-In-form");
const nameInput = document.getElementById("input-name");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const card = document.getElementById("card");
const logInForm = document.querySelector(".regestirForm");
const logInEmail = document.getElementById("login-email-Input");
const logInPassword = document.getElementById("login-password-Input");

const userData = JSON.parse(localStorage.getItem("userData")) || [];

function users(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
}

function createUser(name, email, password) {
  const user = new users(name, email, password);
  if (userData.some((user) => user.email === email))
    return alert("this email alerady taken");
  userData.push(user);
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("currentUser", JSON.stringify(user));
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
    signInForm.reset();
  });
}

// Dashboard page
if (card) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    card.innerHTML = `
      <span class="card-image">HR</span>
      <h3 class="user-name">${currentUser.name}</h3>
      <p class="user-email">${currentUser.email}</p>
      <p>عرض مبسّط للمستخدم — الاسم والبريد الإلكتروني فقط</p>`;
  }
}

//Log in page
function enterUser(email, password) {
  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const loginuser = savedUsers.find(
    (user) => user.email === email && user.password === password,
  );

  if (loginuser) {
    localStorage.setItem("currentUser", JSON.stringify(loginuser));
    window.location.href = "dashboard.html";
  } else {
    alert("Invlid email or password");
  }

  logInForm.reset();
}

//logindashboard

if (logInForm) {
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    enterUser(logInEmail.value, logInPassword.value);
  });
}
