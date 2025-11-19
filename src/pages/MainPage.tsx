import React from "react";
import { MapPin, Phone, Copy, Share2, ExternalLink } from "lucide-react";

interface MainPageProps {
  onGoStory: () => void;
  onToast: (message: string) => void;
}

const MAIN_IMAGE =
  "https://ksohee.github.io/wedding-1228/images/chack.png";
const OUR_STORY_IMAGE =
  "https://ksohee.github.io/wedding-1228/images/our_story.png";

const copyToClipboard = async (text: string, onToast: (msg: string) => void) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    onToast("계좌번호가 복사되었습니다");
  } catch {
    onToast("복사 중 오류가 발생했습니다");
  }
};

const copyUrl = async (url: string, onToast: (msg: string) => void) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    onToast("청첩장 주소가 복사되었습니다");
  } catch {
    onToast("복사 중 오류가 발생했습니다");
  }
};

const MainPage: React.FC<MainPageProps> = ({ onGoStory, onToast }) => {
  return (
    <div className="min-h-screen bg-[#faf9f8]">
      <div className="mx-auto max-w-[480px] md:max-w-[600px] pb-10 animate-fadeIn">
        {/* 메인 이미지 섹션 */}
        <section className="relative h-[360px] w-full overflow-hidden">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${MAIN_IMAGE})` }}
          />
          {/* 날짜 오버레이 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="pointer-events-auto rounded-full bg-white/80 px-4 py-2 text-sm text-[#5a4a42] shadow-sm whitespace-nowrap">
              2025. 12. 28. 12PM
            </div>
          </div>
        </section>

        <div className="px-5 pt-8">
          {/* 타이틀 섹션 */}
          <section className="mb-8 text-center">
            <p className="mb-2 font-script text-[42px] font-light text-[#c9a97a]">
              We&apos;re getting married
            </p>
            <p className="mb-2 text-[28px] font-normal text-[#5a4a42]">
              이영웅 x 김소희
            </p>
            <p className="text-[13px] leading-relaxed text-[#6d5a44]">
              소중한 발걸음으로 축복해주신다면
              <br />
              더없는 기쁨이 될 것입니다.
            </p>
          </section>

          {/* 오시는 길 */}
          <section className="mb-8 rounded-2xl bg-[#f5f0eb] p-4">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-[#c9a97a]" />
              <h2 className="text-sm font-semibold text-[#5a4a42]">
                오시는 길
              </h2>
            </div>
            <div className="space-y-2 text-[13px] leading-relaxed text-[#5a4a42]">
              <p className="font-semibold">판교 NC소프트 컨벤션홀</p>
              <p>
                경기 성남시 분당구 삼평동 668{" "}
                <span className="text-xs"> (🅿️ 주차 가능)</span>
              </p>
              <div className="mt-2 space-y-1">
                <p className="font-semibold text-[13px]">대중교통</p>
                <p>신분당선 판교역 4번출구, 판교역서편 정류장</p>
                <p>
                  버스:{" "}
                  <span className="font-semibold text-[13px] text-[rgb(60,195,68)]">
                    66, 73, 602-2B, 602-1A
                  </span>
                </p>
              </div>
            </div>

            {/* 지도 앱 버튼 */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
              <a
                href="https://map.kakao.com/link/to/엔씨소프트,37.4020513,127.1087073"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl bg-white p-2 shadow-sm"
              >
                <img
                  src="https://developers.kakao.com/tool/resource/static/img/logo/map/kakaomap_basic.png"
                  alt="카카오맵"
                  className="h-7 w-7 rounded"
                  loading="lazy"
                />
                <span>카카오맵</span>
              </a>

              <a
                href="https://map.naver.com/p/search/%EC%97%94%EC%94%A8%EC%86%8C%ED%94%84%ED%8A%B8/place/11607422"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl bg-white p-2 shadow-sm"
              >
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5f/38/89/5f3889df-abbc-08e2-6c0c-90336eef377c/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/400x400ia-75.webp"
                  alt="네이버맵"
                  className="h-7 w-7 rounded"
                  loading="lazy"
                />
                <span>네이버맵</span>
              </a>

              <a
                href="https://www.tmap.co.kr/tmap2/mobile/route.jsp?name=%EC%97%94%EC%94%A8%EC%86%8C%ED%94%84%ED%8A%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl bg-white p-2 shadow-sm"
              >
                <img
                  src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/13/1e/03/131e0306-95c5-8372-e5e7-49b3d02f69fe/AppIcon-0-1x_U007emarketing-0-8-0-sRGB-85-220-0.png/400x400ia-75.webp"
                  alt="티맵"
                  className="h-7 w-7 rounded"
                  loading="lazy"
                />
                <span>티맵</span>
              </a>
            </div>
          </section>

          {/* 혼주에게 연락하기 */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-[#5a4a42]">
              혼주에게 연락하기
            </h2>

            <div className="space-y-3 text-[13px] text-[#5a4a42]">
              <div className="rounded-2xl bg-[#f5f0eb] p-3">
                <p className="mb-1 text-xs font-semibold text-[#6d5a44]">
                  신랑측
                </p>
                <p className="mb-2">
                  이개선(☎{" "}
                  <a href="tel:010-5367-6103" className="underline">
                    010-5367-6103
                  </a>
                  ) · 최순예(☎{" "}
                  <a href="tel:010-9482-0862" className="underline">
                    010-9482-0862
                  </a>
                  )의 차남 이영웅(☎{" "}
                  <a href="tel:010-3850-5525" className="underline">
                    010-3850-5525
                  </a>
                  )
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:010-5367-6103"
                    className="flex items-center gap-1 rounded-full bg-[#faf9f8] px-3 py-1 text-xs"
                  >
                    <Phone size={14} />
                    <span>아버지께 전화</span>
                  </a>
                  <a
                    href="tel:010-9482-0862"
                    className="flex items-center gap-1 rounded-full bg-[#faf9f8] px-3 py-1 text-xs"
                  >
                    <Phone size={14} />
                    <span>어머니께 전화</span>
                  </a>
                  <a
                    href="tel:010-3850-5525"
                    className="flex items-center gap-1 rounded-full bg-[#faf9f8] px-3 py-1 text-xs"
                  >
                    <Phone size={14} />
                    <span>신랑에게 전화</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f5f0eb] p-3">
                <p className="mb-1 text-xs font-semibold text-[#6d5a44]">
                  신부측
                </p>
                <p className="mb-2">
                  김홍식(☎{" "}
                  <a href="tel:010-2617-1938" className="underline">
                    010-2617-1938
                  </a>
                  ) · 이은애(☎{" "}
                  <a href="tel:010-3701-1935" className="underline">
                    010-3701-1935
                  </a>
                  )의 장녀 김소희(☎{" "}
                  <a href="tel:010-9938-1938" className="underline">
                    010-9938-1938
                  </a>
                  )
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:010-2617-1938"
                    className="flex items-center gap-1 rounded-full bg-[#faf9f8] px-3 py-1 text-xs"
                  >
                    <Phone size={14} />
                    <span>아버지께 전화</span>
                  </a>
                  <a
                    href="tel:010-3701-1935"
                    className="flex items-center gap-1 rounded-full bg-[#faf9f8] px-3 py-1 text-xs"
                  >
                    <Phone size={14} />
                    <span>어머니께 전화</span>
                  </a>
                  <a
                    href="tel:010-9938-1938"
                    className="flex items-center gap-1 rounded-full bg-[#faf9f8] px-3 py-1 text-xs"
                  >
                    <Phone size={14} />
                    <span>신부에게 전화</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 마음 전하실 곳 */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-[#5a4a42]">
              마음 전하실 곳
            </h2>
            <div className="space-y-2 text-[13px] text-[#5a4a42]">
              <div className="flex items-center justify-between rounded-2xl bg-[#f5f0eb] px-3 py-2">
                <div>
                  <p className="text-xs font-semibold text-[#6d5a44]">
                    신부 김소희
                  </p>
                  <p className="text-[13px]">
                    국민 649702-01-315566
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("64970201315566", onToast)
                  }
                  className="ml-2 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-[#5a4a42] shadow-sm"
                >
                  <Copy size={14} />
                  <span>복사</span>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#f5f0eb] px-3 py-2">
                <div>
                  <p className="text-xs font-semibold text-[#6d5a44]">
                    신랑 이영웅
                  </p>
                  <p className="text-[13px]">
                    카카오뱅크 3333-03-5775278
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("3333035775278", onToast)
                  }
                  className="ml-2 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs text-[#5a4a42] shadow-sm"
                >
                  <Copy size={14} />
                  <span>복사</span>
                </button>
              </div>
            </div>
          </section>

          {/* Our Story 배너 */}
          <section className="mb-6">
            <button
              type="button"
              onClick={onGoStory}
              className="group block w-full overflow-hidden rounded-2xl bg-[#e8ddd3] shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="relative h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${OUR_STORY_IMAGE})` }}
              >
                <div className="absolute inset-0 bg-white/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <p className="mb-1 font-script text-[36px] text-[#c9a97a]">
                    Our Story
                  </p>
                  <p className="text-[13px] text-[#5a4a42]">
                    우리가 걸어온 동네, 그리고 우리만의 순간
                  </p>
                </div>
              </div>
            </button>
          </section>

          {/* 공유하기 버튼 */}
          <section className="mb-4">
            <button
              type="button"
              onClick={() =>
                copyUrl("https://ksohee.github.io/wedding-1228/", onToast)
              }
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#8b7355] py-2.5 text-sm text-white shadow-sm active:scale-[0.98]"
            >
              <Share2 size={16} />
              <span>💌 청첩장 공유하기</span>
            </button>
            <p className="mt-2 text-center text-[10px] text-[#888]">
              링크가 클립보드에 복사됩니다.
            </p>
          </section>

          {/* 작은 출처 */}
          <section className="mt-6 text-center text-[10px] text-[#c9a97a]">
            <div className="inline-flex items-center gap-1">
              <ExternalLink size={12} />
              <span>모바일 청첩장 - 이영웅 x 김소희</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
