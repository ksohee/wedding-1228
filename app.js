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
   GitHub Issues 기반 댓글 시스템
=========================== */

const GITHUB_TOKEN = "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";
const REPO_OWNER = "ksohee";
const REPO_NAME = "wedding-1228";

/* --- 댓글 작성 --- */

async function submitComment() {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) {
        showToast("이름과 내용을 입력해주세요");
        return;
    }

    /* Google Form 제출 URL */
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfhTSJI843vwhL2vZXLhhrW-D8WKcdXEiudq2AXKQAxOGQkFg/formResponse";

    /* entry ID/
    const formData = new FormData();
    formData.append("entry.1759162116", name);   // 이름 entry
    formData.append("entry.2089542975", text);   // 메시지 entry

    await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    });

    showToast("축하해주셔서 감사합니다!");

    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";

    loadComments();
}

/* ===========================
   댓글 – Google Sheet 불러오기
=========================== */

async function loadComments() {
    const list = document.getElementById("commentsList");
    list.innerHTML = "<div>불러오는 중...</div>";

    /* CSV URL (시트 → 웹에 게시) */
    const csvURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_0KRu1hLH9BpnUhv45PxDhqdvkmM0O9umqUNwuiK_gsLJvPXiGvpJ1iBLhRZgKi2_WSsMdy35caKf/pub?output=csv";

    try {
        const res = await fetch(csvURL);
        const text = await res.text();

        const rows = text.split("\n").slice(1); // 첫 줄은 헤더라 제거
        list.innerHTML = "";

        // 최신 메시지가 위로 오도록 reverse()
        rows.reverse().forEach(row => {
            const cols = row.split(",");

            const name = cols[0]?.replace(/"/g, "").trim();
            const message = cols[1]?.replace(/"/g, "").trim();
            const date = cols[2]?.replace(/"/g, "").trim();

            if (!name || !message) return;

            const item = document.createElement("div");
            item.className = "comment-item";
            item.innerHTML = `
                <div class="comment-author">${name}</div>
                <div class="comment-date">${date}</div>
                <div class="comment-text">${message}</div>
            `;

            list.appendChild(item);
        });

    } catch (err) {
        list.innerHTML = "<div>댓글을 불러오지 못했습니다.</div>";
    }
}

document.addEventListener("DOMContentLoaded", loadComments);
