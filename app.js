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

    const issueTitle = `💌 ${name}님의 축하 메시지`;
    const issueBody = `${text}\n\n작성자: ${name}`;

    try {
        const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${GITHUB_TOKEN}`
            },
            body: JSON.stringify({
                title: issueTitle,
                body: issueBody,
                labels: ["comment"]
            })
        });

        if (res.ok) {
            showToast("축하 메시지가 등록되었습니다!");

            document.getElementById("commentName").value = "";
            document.getElementById("commentText").value = "";

            loadComments(); // 즉시 목록 갱신
        } else {
            showToast("등록 실패 (API 제한 또는 권한 문제)");
        }

    } catch (e) {
        showToast("오류가 발생했습니다");
    }
}

/* --- 댓글 불러오기 --- */
async function loadComments() {
    const list = document.getElementById("commentsList");
    list.innerHTML = "<div>불러오는 중...</div>";

    try {
        const res = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?labels=comment`
        );
        const issues = await res.json();

        list.innerHTML = "";

        issues.forEach(issue => {
            const created = new Date(issue.created_at).toLocaleDateString("ko-KR");

            const item = document.createElement("div");
            item.className = "comment-item";
            item.innerHTML = `
                <div class="comment-author">${issue.title.replace("💌 ", "")}</div>
                <div class="comment-date">${created}</div>
                <div class="comment-text">${issue.body}</div>
            `;

            list.appendChild(item);
        });

    } catch (e) {
        list.innerHTML = "<div>댓글을 불러오지 못했습니다</div>";
    }
}

/* --- 페이지 로딩 시 댓글 목록 불러오기 --- */
document.addEventListener("DOMContentLoaded", loadComments);
