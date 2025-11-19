import React, { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  likes: number;
  liked: boolean;
}

interface CommentSectionProps {
  onToast: (message: string) => void;
}

const STORAGE_KEY = "wedding_comments_v1";

const CommentSection: React.FC<CommentSectionProps> = ({ onToast }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Comment[];
        setComments(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveComments = (next: Comment[]) => {
    setComments(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    if (!trimmedName || !trimmedContent) {
      onToast("이름과 내용을 입력해 주세요.");
      return;
    }

    const newComment: Comment = {
      id: `${Date.now()}_${Math.random()}`,
      name: trimmedName.slice(0, 20),
      content: trimmedContent.slice(0, 200),
      createdAt: Date.now(),
      likes: 0,
      liked: false,
    };

    const next = [newComment, ...comments];
    saveComments(next);
    setName("");
    setContent("");
    onToast("댓글이 등록되었습니다.");
  };

  const toggleLike = (id: string) => {
    const next = comments.map((c) => {
      if (c.id !== id) return c;
      const liked = !c.liked;
      return {
        ...c,
        liked,
        likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
      };
    });
    saveComments(next);
  };

  const sortedComments = useMemo(
    () =>
      [...comments].sort((a, b) => {
        if (b.likes !== a.likes) return b.likes - a.likes;
        return b.createdAt - a.createdAt;
      }),
    [comments]
  );

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${y}.${m}.${day}`;
  };

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-[#5a4a42]">댓글</h2>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 rounded-xl bg-[#f5f0eb] p-4 animate-fadeIn"
      >
        <div className="mb-3">
          <label className="mb-1 block text-xs text-[#6d5a44]">
            이름 (최대 20자)
          </label>
          <input
            type="text"
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-[#e8ddd3] bg-white px-3 py-2 text-sm outline-none focus:border-[#c9a97a]"
          />
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs text-[#6d5a44]">
            내용 (최대 200자)
          </label>
          <textarea
            maxLength={200}
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md border border-[#e8ddd3] bg-white px-3 py-2 text-sm outline-none focus:border-[#c9a97a]"
          />
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-[#8b7355] py-2 text-sm text-white active:scale-[0.98]"
        >
          작성하기
        </button>
      </form>

      {/* 댓글 리스트 */}
      <div className="space-y-3">
        {sortedComments.length === 0 && (
          <p className="text-center text-xs text-[#888]">
            아직 댓글이 없습니다. 축하의 메시지를 남겨 주세요.
          </p>
        )}

        {sortedComments.map((c) => (
          <div
            key={c.id}
            className="rounded-xl bg-white p-3 shadow-sm animate-fadeIn"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5a4a42]">
                {c.name}
              </span>
              <span className="text-[10px] text-[#888]">
                {formatDate(c.createdAt)}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-[13px] leading-[1.7] text-[#5a4a42]">
              {c.content}
            </p>

            <button
              type="button"
              onClick={() => toggleLike(c.id)}
              className="mt-2 flex items-center justify-end gap-1 text-[11px] text-[#8b7355]"
            >
              <span>{c.likes}</span>
              <Heart
                size={14}
                className={
                  c.liked
                    ? "fill-red-500 text-red-500"
                    : "text-[#8b7355] hover:scale-110 transition-transform"
                }
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
