/* ======================
   TOAST
====================== */
function showToast(msg) {
    const t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2000);
}

/* ======================
   PHONE CALL
====================== */
function callPhone(num) {
    location.href = `tel:${num}`;
}

/* ======================
   ACCOUNT COPY
====================== */
function copyAccount(num) {
    navigator.clipboard.writeText(num);
    showToast("계좌번호가 복사되었습니다");
}

/* ======================
   SHARE LINK
====================== */
function shareInvitation() {
    navigator.clipboard.writeText("https://ksohee.github.io/wedding-1228/");
    showToast("청첩장 주소가 복사되었습니다");
}

/* ======================
   COMMENTS (story.html)
====================== */

let comments = JSON.parse(localStorage.getItem("wedding_comments") || "[]");
let liked = new Set(JSON.parse(localStorage.getItem("wedding_likes") || "[]"));

function submitComment() {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) {
        showToast("이름과 내용을 입력해주세요");
        return;
    }

    const c = {
        id: Date.now(),
        name,
        text,
        date: new Date().toISOString().slice(0, 10),
        likes: 0
    };

    comments.unshift(c);
    localStorage.setItem("wedding_comments", JSON.stringify(comments));

    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";

    renderComments();
    showToast("메시지가 작성되었습니다");
}

function toggleLike(id) {
    const c = comments.find(x => x.id === id);
    if (!c) return;

    if (liked.has(id)) {
        liked.delete(id);
        c.likes--;
    } else {
        liked.add(id);
        c.likes++;
    }

    localStorage.setItem("wedding_likes", JSON.stringify([...liked]));
    localStorage.setItem("wedding_comments", JSON.stringify(comments));

    renderComments();
}

function renderComments() {
    if (!document.getElementById("commentsList")) return;

    const sorted = [...comments].sort((a, b) => b.likes - a.likes);
    const list = document.getElementById("commentsList");

    list.innerHTML = sorted
        .map(
            (c) => `
        <div class="comment-item fade">
            <div class="comment-header">
                <div class="comment-author">${c.name}</div>
                <div class="comment-date">${c.date}</div>
            </div>
            <div class="comment-text">${c.text}</div>
            <div class="comment-footer">
                <span class="like-count">${c.likes}</span>
                <button class="like-btn ${liked.has(c.id) ? "liked" : ""}" onclick="toggleLike(${c.id})">
                    ${liked.has(c.id) ? "❤️" : "🤍"}
                </button>
            </div>
        </div>`
        )
        .join("");
}

document.addEventListener("DOMContentLoaded", renderComments);
