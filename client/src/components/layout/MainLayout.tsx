// src/components/layout/MainLayout.tsx
import React, { useEffect } from "react";
import {
  MdWbSunny, // 밝은 모드 (태양)
  MdHighlight, // 어두운 모드 (밤하늘/달)
  MdMenu, // 메뉴 아이콘
  MdClose, // 닫기 아이콘
  MdAddCircleOutline, // 추가 아이콘
  MdRemoveCircleOutline, // 제거 아이콘
} from "react-icons/md";
import { useAppStore } from "../../store/useAppStore"; // Zustand 스토어 임포트
import { WidgetConfig } from "../../types"; // WidgetConfig 타입은 여전히 필요합니다.
import HomePage from "@/pages/HomePage";

// 사이드바 UI에 사용될, 사용 가능한 위젯 목록 (데이터는 스토어와 동일하지만 UI를 위한 별도 정의)
// 실제 앱에서는 이 목록도 스토어에서 관리하거나, 백엔드에서 받아오는 형태로 구성할 수 있습니다.
const ALL_AVAILABLE_WIDGETS_FOR_UI: WidgetConfig[] = [
  {
    id: "weather-1",
    name: "날씨 위젯",
    component: "WeatherWidget",
    description: "현재 위치의 날씨 정보를 보여줍니다.",
    defaultActive: true,
    order: 1,
  },
  {
    id: "news-1",
    name: "뉴스 위젯",
    component: "NewsWidget",
    description: "주요 뉴스를 제공합니다.",
    defaultActive: true,
    order: 2,
  },
  {
    id: "cafe-1",
    name: "스타벅스 주문",
    component: "CafeOrderWidget",
    description: "스타벅스 주문을 빠르게 할 수 있습니다.",
    defaultActive: false,
    order: 3,
  },
  {
    id: "memo-1",
    name: "메모 위젯",
    component: "MemoWidget",
    description: "간단한 메모를 작성합니다.",
    defaultActive: false,
    order: 4,
  },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const activeWidgets = useAppStore((state) => state.activeWidgets);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const addWidget = useAppStore((state) => state.addWidget);
  const removeWidget = useAppStore((state) => state.removeWidget);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false); // 사이드바 열림/닫힘 상태는 MainLayout 내부에서 UI 상태로 관리

  // 다크 모드 변경 시 HTML 클래스 및 로컬 스토리지 업데이트
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeWidgets", JSON.stringify(activeWidgets));
    }
  }, [activeWidgets]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 현재 활성화된 위젯의 ID 목록 (성능 최적화를 위해 Set 사용)
  const activeWidgetIds = React.useMemo(
    () => new Set(activeWidgets.map((w) => w.id)),
    [activeWidgets],
  );

  return (
    <div className="flex min-h-screen">
      {/* 메인 콘텐츠 영역 */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:mr-80" : ""
        } `}
      >
        {/* 헤더 또는 상단바 */}
        <header className="bg-card border-border flex items-center justify-between border-b p-4 shadow-sm">
          <h1 className="text-card-foreground text-xl font-bold">
            나만의 대시보드
          </h1>
          <div className="flex items-center space-x-4">
            {/* 다크 모드 토글 버튼 */}
            <button
              onClick={toggleDarkMode} // Zustand 액션 호출
              className="hover:bg-muted focus:ring-ring rounded-full p-2 focus:ring-2 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <MdWbSunny className="text-foreground h-6 w-6" />
              ) : (
                <MdHighlight className="text-foreground h-6 w-6" />
              )}
            </button>

            {/* 사이드바 토글 버튼 */}
            <button
              onClick={toggleSidebar}
              className="hover:bg-muted focus:ring-ring rounded-full p-2 focus:ring-2 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <MdClose className="text-foreground h-6 w-6" />
              ) : (
                <MdMenu className="text-foreground h-6 w-6" />
              )}
            </button>
          </div>
        </header>

        {/* 페이지별 실제 콘텐츠 - HomePage를 렌더링 */}
        <HomePage activeWidgets={activeWidgets} />
      </main>

      {/* 사이드바 오버레이 (사이드바 열렸을 때 배경 어둡게) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* 슬라이드 사이드바 */}
      <aside
        className={`bg-sidebar text-sidebar-foreground fixed inset-y-0 right-0 z-50 w-80 transform shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:border-sidebar-border md:static md:translate-x-0 md:border-l md:shadow-none`}
      >
        <div className="border-sidebar-border flex items-center justify-between border-b p-4">
          <h2 className="text-sidebar-foreground text-xl font-bold">
            위젯 설정
          </h2>
          <button
            onClick={toggleSidebar}
            className="hover:bg-sidebar-accent focus:ring-sidebar-ring rounded-full p-2 focus:ring-2 focus:outline-none md:hidden"
            aria-label="Close sidebar"
          >
            <MdClose className="text-sidebar-foreground h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-6 p-4">
          {/* 내 위젯 목록 */}
          <div>
            <h3 className="text-sidebar-foreground mb-3 text-lg font-semibold">
              내 위젯
            </h3>
            {activeWidgets.length === 0 ? (
              <p className="text-sidebar-muted-foreground text-sm">
                추가된 위젯이 없습니다.
              </p>
            ) : (
              <ul className="space-y-2">
                {activeWidgets
                  .sort((a, b) => a.order - b.order)
                  .map((widget) => (
                    <li
                      key={widget.id}
                      className="bg-sidebar-card border-sidebar-border flex items-center justify-between rounded-md border p-2"
                    >
                      <span className="text-sidebar-foreground text-sm">
                        {widget.name}
                      </span>
                      <button
                        onClick={() => removeWidget(widget.id)} // Zustand 액션 호출
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 rounded-full p-1"
                        aria-label={`Remove ${widget.name}`}
                      >
                        <MdRemoveCircleOutline className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* 사용 가능한 위젯 목록 */}
          <div>
            <h3 className="text-sidebar-foreground mb-3 text-lg font-semibold">
              위젯 추가
            </h3>
            <ul className="space-y-2">
              {ALL_AVAILABLE_WIDGETS_FOR_UI.map(
                (
                  widget, // UI 전용 목록 사용
                ) => (
                  <li
                    key={widget.id}
                    className="bg-sidebar-card border-sidebar-border flex items-center justify-between rounded-md border p-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-sidebar-foreground text-sm font-medium">
                        {widget.name}
                      </span>
                      <span className="text-sidebar-muted-foreground text-xs">
                        {widget.description}
                      </span>
                    </div>
                    <button
                      onClick={() => addWidget(widget)} // Zustand 액션 호출
                      disabled={activeWidgetIds.has(widget.id)} // 이미 추가된 위젯은 비활성화
                      className="text-primary hover:text-primary-foreground hover:bg-primary/10 disabled:text-muted rounded-full p-1 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Add ${widget.name}`}
                    >
                      <MdAddCircleOutline className="h-5 w-5" />
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MainLayout;
