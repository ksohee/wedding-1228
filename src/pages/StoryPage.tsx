import React from "react";
import { ArrowLeft } from "lucide-react";
import CommentSection from "../components/CommentSection";

interface StoryPageProps {
  onBack: () => void;
  onToast: (message: string) => void;
}

type Section = {
  title: string;
  description: string;
  images: string[];
};

const sections: Section[] = [
  {
    title: "우리집",
    description: "여기에 내용을 입력해 주세요.",
    images: Array.from({ length: 10 }, (_, i) => {
      const idx = (i + 1).toString().padStart(2, "0");
      return `https://ksohee.github.io/wedding-1228/images/home_${idx}.jpg`;
    }),
  },
  {
    title: "온전한 휴식",
    description: "여기에 내용을 입력해 주세요.",
    images: ["01", "02", "03", "04", "05", "06", "07"].map(
      (n) =>
        `https://ksohee.github.io/wedding-1228/images/bed_${n}.jpg`
    ),
  },
  {
    title: "우리 차",
    description: "여기에 내용을 입력해 주세요.",
    images: ["01", "02", "03", "04"].map(
      (n) =>
        `https://ksohee.github.io/wedding-1228/images/car_${n}.jpg`
    ),
  },
  {
    title: "고인돌 공원",
    description: "여기에 내용을 입력해 주세요.",
    images: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].map(
      (n) =>
        `https://ksohee.github.io/wedding-1228/images/dolmen_${n}.jpg`
    ),
  },
  {
    title: "골든 빌라",
    description: "여기에 내용을 입력해 주세요.",
    images: [
      "https://ksohee.github.io/wedding-1228/images/golden.jpg",
      "https://ksohee.github.io/wedding-1228/images/prope_01.jpg",
      "https://ksohee.github.io/wedding-1228/images/prope_02.jpg",
    ],
  },
  {
    title: "양재 시민의 숲역 2번 출구",
    description: "여기에 내용을 입력해 주세요.",
    images: ["01", "02"].map(
      (n) =>
        `https://ksohee.github.io/wedding-1228/images/subway_${n}.jpg`
    ),
  },
  {
    title: "추억의 장소",
    description: "여기에 내용을 입력해 주세요.",
    images: [
      "bugger_01.jpg",
      "bugger_02.jpg",
      "bugger_03.jpg",
      "bugger_04.jpg",
      "quisson_01.jpg",
      "quisson_02.jpg",
      "quisson_03.jpg",
      "quisson_04.jpg",
      "quisson_05.jpg",
    ].map((name) => `https://ksohee.github.io/wedding-1228/images/${name}`),
  },
  {
    title: "양재천",
    description: "여기에 내용을 입력해 주세요.",
    images: [
      "streem_01.jpg",
      "streem_02.jpg",
      "streem_03.jpg",
      "streem_04.jpg",
      "streem_05.jpg",
      "streem_06.jpg",
      "streem_07.jpg",
      "streem_08.jpg",
      "streem_09.jpg",
      "streem_10.jpg",
      "streem_11.jpg",
    ].map((name) => `https://ksohee.github.io/wedding-1228/images/${name}`),
  },
  {
    title: "양재 근린공원",
    description: "여기에 내용을 입력해 주세요.",
    images: [
      "park_01.jpg",
      "park_02.jpg",
      "park_03.jpg",
      "park_04.jpg",
      "park_05.jpg",
    ].map((name) => `https://ksohee.github.io/wedding-1228/images/${name}`),
  },
  {
    title: "축구",
    description: "여기에 내용을 입력해 주세요.",
    images: [
      "ground_01.jpg",
      "ground_02.jpg",
      "ground_03.jpg",
      "grouud_04.jpg",
      "grpund_05.jpg",
    ].map((name) => `https://ksohee.github.io/wedding-1228/images/${name}`),
  },
];

const StoryPage: React.FC<StoryPageProps> = ({ onBack, onToast }) => {
  return (
    <div className="min-h-screen bg-[#faf9f8]">
      {/* sticky 헤더 */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-[#faf9f8]/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-[#6d5a44]"
        >
          <ArrowLeft size={18} />
          <span>뒤로</span>
        </button>
        <h1 className="flex-1 text-center font-script text-3xl text-[#c9a97a]">
          Our Story
        </h1>
        <div className="w-[40px]" />
      </header>

      <main className="mx-auto max-w-[480px] md:max-w-[600px] px-4 pb-10 pt-4 animate-fadeIn">
        {sections.map((section, idx) => (
          <section key={idx} className="mb-8">
            <h2 className="mb-1 text-lg font-semibold text-[#5a4a42]">
              {section.title}
            </h2>
            <p className="mb-3 text-[15px] leading-[2] text-[#6d5a44]">
              {section.description}
            </p>
            <div className="space-y-3">
              {section.images.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`${section.title} ${i + 1}`}
                  loading="lazy"
                  className="block w-full rounded-none border border-[#e8ddd3] bg-[#f5f0eb] object-cover"
                />
              ))}
            </div>
          </section>
        ))}

        {/* 사진/글 크레딧 */}
        <div className="mb-6 mt-2">
          <p className="text-[12px] text-[#888]">사진: Tora Park</p>
          <p className="mt-1 text-[12px] text-[#888]">글: 이영웅</p>
        </div>

        {/* 댓글 섹션 */}
        <CommentSection onToast={onToast} />
      </main>
    </div>
  );
};

export default StoryPage;
