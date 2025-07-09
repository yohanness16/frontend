if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}


const signUpInputs = document.querySelectorAll(".sign-up input");

const signUpUsername = signUpInputs[0];
const signUpEmail = signUpInputs[1];
const signUpPassword = signUpInputs[2];
const signUpConfirmPassword = signUpInputs[3];


const signUpButton = document.querySelector(".sign-up .auth-btn");


signUpButton.addEventListener("click", () => {
  console.log("Username:", signUpUsername.value);
  console.log("Email:", signUpEmail.value);
  console.log("Password:", signUpPassword.value);
  console.log("Confirm Password:", signUpConfirmPassword.value);
});


const signInInputs = document.querySelectorAll(".sign-in input");

const signInUsername = signInInputs[0];
const signInPassword = signInInputs[1];


const signInButton = document.querySelector(".sign-in .auth-btn");


signInButton.addEventListener("click", () => {
  console.log("Login Username:", signInUsername.value);
  console.log("Login Password:", signInPassword.value);
});


function handleSignUp() {
  const username = signUpUsername.value.trim();
  const email = signUpEmail.value.trim();
  const password = signUpPassword.value;
  const confirmPassword = signUpConfirmPassword.value;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find(user => user.username === username || user.email === email);
  if (userExists) {
    alert("Username or email already taken.");
    return;
  }

  const newUser = {
    username: username,
    email: email,
    password: password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");

  window.location.href = "index.html";
  signUpUsername.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpConfirmPassword.value = "";

  toggle();
}

signUpButton.addEventListener("click", handleSignUp);


function handleLogin() {
  const username = signInUsername.value.trim();
  const password = signInPassword.value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert(`Welcome back, ${user.username}! You are now logged in.`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    signInUsername.value = "";
    signInPassword.value = "";
  } else {
    alert("Invalid username or password.");
  }
  window.location.href = "index.html";
}

signInButton.addEventListener("click", handleLogin);

