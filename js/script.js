document.addEventListener("DOMContentLoaded", function () {
  const likeBtn = document.querySelector(".like-btn");
  const dislikeBtn = document.querySelector(".dislike-btn");
  const commentBtn = document.querySelector(".comment-btn");
  const commentBoxWrapper = document.querySelector(".comment-box-wrapper");
  const submitCommentBtn = document.querySelector(".submit-comment");
  const commentTextarea = document.querySelector(".comment-box textarea");
  const commentsList = document.querySelector(".comments-list");
  

  likeBtn?.addEventListener("click", () => {
    likeBtn.classList.toggle("active");
    dislikeBtn.classList.remove("active");
  });

  dislikeBtn?.addEventListener("click", () => {
    dislikeBtn.classList.toggle("active");
    likeBtn.classList.remove("active");
  });

  commentBtn?.addEventListener("click", () => {
    commentBoxWrapper.classList.toggle("visible");
  });

  let comments = [];

  submitCommentBtn?.addEventListener("click", () => {
    const commentText = commentTextarea.value.trim();
    if (commentText === "") {
      alert("Please write a comment before posting.");
      return;
    }

    comments.push(commentText);

    if (comments.length > 10) {
      comments.shift();
    }

    commentTextarea.value = "";

    renderComments();
  });

  function renderComments() {
    commentsList.innerHTML = "";

    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-item");
      commentDiv.textContent = comment;
      commentsList.appendChild(commentDiv);
    });
  }
});

function updateNavbarAfterLogin() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) return;

  const authLinks = document.querySelectorAll(".auth-links");
  const noAuthLinks = document.querySelector(".no-auth-links");
  const authUsername = document.querySelector(".auth-username");
  const usernameDisplay = document.getElementById("username-display");

  authLinks.forEach((link) => link.classList.remove("hidden"));

  if (noAuthLinks) noAuthLinks.style.display = "none";

  if (authUsername && usernameDisplay) {
    usernameDisplay.textContent = loggedInUser.username;
    authUsername.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavbarAfterLogin();
});


document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout(); 
    });
  }
});

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "auth.html";
  updateNavbarAfterLogin(); 
}