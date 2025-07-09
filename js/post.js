

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  const postForm = document.getElementById("post-form");

  let posts = JSON.parse(localStorage.getItem("posts") || "[]");

  function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  function renderPosts() {
    if (!blogContainer) return;

    blogContainer.innerHTML = "";

    if (posts.length === 0) {
      blogContainer.innerHTML = "<p style='text-align:center; color:#007bff; font-weight:bold;'>No posts yet. Create one!</p>";
      return;
    }

    posts.forEach((post, index) => {
      const postElem = createPostElement(post, index);
      blogContainer.appendChild(postElem);
    });
  }

  function createPostElement(post, index) {
    const container = document.createElement("div");
    container.classList.add("blog-content");
    container.style.marginBottom = "40px";
    container.style.maxWidth = "900px";
    container.style.margin = "0 auto 60px";

    const blogTitle = document.createElement("div");
    blogTitle.classList.add("blog-title");

    const blogAuthor = document.createElement("div");
    blogAuthor.classList.add("blog-auther");
    blogAuthor.innerHTML = `
      <div class="auther-info">
        <img src="auther.jpg" alt="Author Image" />
        <h3>${post.author || "Anonymous"}</h3>
      </div>
      <p>date <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time></p>
    `;

    const titleHeading = document.createElement("h1");
    titleHeading.textContent = post.title;

    blogTitle.appendChild(blogAuthor);
    blogTitle.appendChild(titleHeading);

    const blogText = document.createElement("div");
    blogText.classList.add("blog-text");

    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;
    img.style.display = "block";
    img.style.margin = "20px auto";
    img.style.maxWidth = "100%";
    img.style.borderRadius = "8px";

    const article = document.createElement("div");
    article.classList.add("blog-article");
    article.innerHTML = post.content
      .split("\n")
      .map((p) => `<p>${p}</p>`)
      .join("");

    blogText.appendChild(img);
    blogText.appendChild(article);

    const reviewSection = document.createElement("div");
    reviewSection.classList.add("review-section");

    reviewSection.innerHTML = `
      <div class="review-buttons">
        <button class="like-btn" type="button" aria-label="Like">
          <svg width="20" height="20" fill="currentColor"><use href="#icon-like" /></svg>
          Like
        </button>
        <button class="dislike-btn" type="button" aria-label="Dislike">
          <svg width="20" height="20" fill="currentColor"><use href="#icon-dislike" /></svg>
          Dislike
        </button>
        <button class="comment-btn" type="button" aria-label="Comment">
          <svg width="20" height="20" fill="currentColor"><use href="#icon-comment" /></svg>
          Comment
        </button>
      </div>
      <div class="comment-box-wrapper">
        <div class="comment-box">
          <textarea placeholder="Write your comment..." rows="3"></textarea>
          <button type="button" class="submit-comment">Post</button>
        </div>
      </div>
      <div class="comments-list"></div>
    `;

    container.appendChild(blogTitle);
    container.appendChild(blogText);
    container.appendChild(reviewSection);

   
    const likeBtn = container.querySelector(".like-btn");
    const dislikeBtn = container.querySelector(".dislike-btn");
    const commentBtn = container.querySelector(".comment-btn");
    const commentBoxWrapper = container.querySelector(".comment-box-wrapper");
    const submitCommentBtn = container.querySelector(".submit-comment");
    const commentTextarea = container.querySelector("textarea");
    const commentsList = container.querySelector(".comments-list");

    likeBtn?.addEventListener("click", () => {
      posts[index].liked = !posts[index].liked;
      posts[index].disliked = false;
      savePosts();
      updateLikeDislikeState();
      console.log("Liked:", posts[index].liked);
    });

    dislikeBtn?.addEventListener("click", () => {
      posts[index].disliked = !posts[index].disliked;
      posts[index].liked = false;
      savePosts();
      updateLikeDislikeState();
    });

    commentBtn?.addEventListener("click", () => {
      commentBoxWrapper.classList.toggle("visible");
    });

    submitCommentBtn?.addEventListener("click", () => {
      const commentText = commentTextarea.value.trim();
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const commentAuthor = loggedInUser?.username || "Guest";

      if (commentText === "") {
        alert("Please write a comment before posting.");
        return;
      }

      const newComment = {
        author: commentAuthor,
        text: commentText
      };

      posts[index].comments = posts[index].comments || [];
      posts[index].comments.push(newComment);
      savePosts();
      commentTextarea.value = "";
      renderComments();
    });

    function renderComments() {
      commentsList.innerHTML = "";
      const comments = posts[index].comments || [];
      comments.forEach((c) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-item");
        commentDiv.textContent = `${c.author}: ${c.text}`;
        commentsList.appendChild(commentDiv);
      });
    }

    function updateLikeDislikeState() {
      if (posts[index].liked) {
        likeBtn.classList.add("active");
        dislikeBtn.classList.remove("active");
      } else if (posts[index].disliked) {
        dislikeBtn.classList.add("active");
        likeBtn.classList.remove("active");
      } else {
        likeBtn.classList.remove("active");
        dislikeBtn.classList.remove("active");
      }
    }

    updateLikeDislikeState();
    renderComments();

    return container;
  }

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();
      const imageInput = document.getElementById("image");

      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const username = loggedInUser?.username || "Guest";

      const newPost = {
        title,
        content,
        image: "",
        date: new Date().toISOString(),
        author: username,
        comments: [],
        liked: false,
        disliked: false
      };

      if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
          newPost.image = reader.result;
          posts.unshift(newPost);
          savePosts();
          alert("Post submitted successfully!");
          window.location.href = "index.html";
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        posts.unshift(newPost);
        savePosts();
        alert("Post submitted successfully!");
        window.location.href = "index.html";
      }
    });
  }

  renderPosts();
});
