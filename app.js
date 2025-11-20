/* ===========================
   콜 전화
=========================== */
function callPhone(num) {
    window.location.href = `tel:${num}`;
}

/* ===========================
   계좌 복사
=========================== */
function copyAccount(num) {
    navigator.clipboard.writeText(num);
    showToast("계좌번호가 복사되었습니다");
}

/* ===========================
   공유 기능
=========================== */
function shareInvitation() {
    navigator.clipboard.writeText("https://ksohee.github.io/wedding-1228/");
    showToast("청첩장 주소가 복사되었습니다");
}

/* ===========================
   토스트
=========================== */
function showToast(text) {
    const toast = document.getElementById("toast");
    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* ===========================
   댓글
=========================== */
let comments = [];

function submitComment() {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) {
        showToast("이름과 내용을 입력해주세요");
        return;
    }

    comments.unshift({
        id: Date.now(),
        name,
        text,
        date: new Date().toISOString().split("T")[0]
    });

    renderComments();

    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";

    showToast("메시지가 작성되었습니다");
}

function renderComments() {
    const list = document.getElementById("commentsList");

    list.innerHTML = comments
        .map(
            c => `
        <div class="comment-item">
            <div class="comment-author">${c.name}</div>
            <div class="comment-date">${c.date}</div>
            <div class="comment-text">${c.text}</div>
        </div>
        `
        )
        .join("");
}

window.addEventListener("load", renderComments);
