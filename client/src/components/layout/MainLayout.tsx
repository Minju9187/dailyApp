import React, { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom"; // Outlet 임포트
import { useAppStore } from "../../store/useAppStore";
import { WidgetConfig } from "../../types";
import Header from "./Header";
import Sidebar from "./Sidebar";

// ALL_AVAILABLE_WIDGETS_FOR_UI는 MainLayout.tsx에서만 사용될 더미 데이터입니다.
// 실제 앱에서는 스토어에서 가져오거나, 백엔드에서 받아와야 합니다.
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

const MainLayout = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const activeWidgets = useAppStore((state) => state.activeWidgets);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const addWidget = useAppStore((state) => state.addWidget);
  const removeWidget = useAppStore((state) => state.removeWidget);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 768;

      if (isLargeScreen && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

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
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Outlet />
      </main>

      {/* 사이드바 오버레이 (사이드바 열렸을 때 배경 어둡게) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* 슬라이드 사이드바 */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeWidgets={activeWidgets}
        removeWidget={removeWidget}
        availableWidgets={ALL_AVAILABLE_WIDGETS_FOR_UI}
        addWidget={addWidget}
        activeWidgetIds={activeWidgetIds}
      />
    </div>
  );
};

export default MainLayout;
