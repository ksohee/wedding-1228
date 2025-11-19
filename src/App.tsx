import React, { useCallback, useState } from "react";
import MainPage from "./pages/MainPage";
import StoryPage from "./pages/StoryPage";
import Toast from "./components/Toast";

type Page = "main" | "story";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("main");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f8] text-[#5a4a42] font-serif">
      {page === "main" ? (
        <MainPage onGoStory={() => setPage("story")} onToast={showToast} />
      ) : (
        <StoryPage onBack={() => setPage("main")} onToast={showToast} />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
};

export default App;
