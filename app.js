/* Toast */
function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 2000);
}

/* 복사하기 */
function copyText(text) {
  navigator.clipboard.writeText(text);
  showToast("복사되었습니다");
}

/* 댓글 기능 (story.html 전용) */
if (location.pathname.includes("story")) {
  const list = document.getElementById("comment-list");
  let comments = JSON.parse(localStorage.getItem("wedding_comments") || "[]");

  function renderComments() {
    list.innerHTML = "";
    comments
      .sort((a, b) => b.likes - a.likes)
      .forEach((c, idx) => {
        const div = document.createElement("div");
        div.className = "comment fade";
        div.innerHTML = `
          <div class="comment-header">
            <span>${c.name}</span>
            <span>${c.date}</span>
          </div>
          <div>${c.text}</div>
          <div class="like ${c.liked ? "red" : ""}" onclick="toggleLike(${idx})">
            ❤️ ${c.likes}
          </div>
        `;
        list.appendChild(div);
      });
  }

  renderComments();

  window.addComment = () => {
    const name = document.getElementById("c-name").value.trim();
    const text = document.getElementById("c-text").value.trim();
    if (!name || !text) return showToast("이름과 내용을 입력해주세요");

    comments.unshift({
      name,
      text,
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
      liked: false,
    });

    localStorage.setItem("wedding_comments", JSON.stringify(comments));
    renderComments();
    document.getElementById("c-name").value = "";
    document.getElementById("c-text").value = "";
    showToast("댓글이 등록되었습니다");
  };

  window.toggleLike = (index) => {
    comments[index].liked = !comments[index].liked;
    comments[index].likes += comments[index].liked ? 1 : -1;
    localStorage.setItem("wedding_comments", JSON.stringify(comments));
    renderComments();
  };
}
