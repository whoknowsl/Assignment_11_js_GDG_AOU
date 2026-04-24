const signInForm = document.getElementById("sign-In-form");
const nameInput = document.getElementById("input-name");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const rege = document.querySelector(".rege");
const userData = [];
function users(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
}

function creatuser(name, email, password) {
  const user = new users(name, email, password);
  userData.push(user);
}
function displaycard(userData) {
  userData.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<span class="card-image">HR</span>
    <h3 class="user-name">${user.name}</h3>
    <p class="user-email">${user.email}</p>
    <p>عرض مبسّط للمستخدم — الاسم والبريد الإلكتروني فقط</p>`;
    rege.appendChild(card);
    return card;
  });
}
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  creatuser(nameInput.value, emailInput.value, passwordInput.value);
  displaycard(userData);
  signInForm.reset();
});
creatuser("youssef", "youssefodada11@gmail.com", "youssefodadad123");
console.log(userData);
