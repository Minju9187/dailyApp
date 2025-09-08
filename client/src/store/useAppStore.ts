import { create } from "zustand";
import { ActiveWidget, WidgetConfig } from "../types";

interface AppState {
  isDarkMode: boolean;
  activeWidgets: ActiveWidget[];
  toggleDarkMode: () => void;
  addWidget: (widgetConfig: WidgetConfig) => void;
  removeWidget: (widgetId: string) => void;
  // 나중에 위젯 순서 변경 등을 위한 함수도 추가될 수 있습니다.
  // moveWidget: (fromIndex: number, toIndex: number) => void;
}

// 초기 상태를 로컬 스토리지에서 불러오는 함수
const getInitialState = () => {
  let initialDarkMode = false;
  if (typeof window !== "undefined" && localStorage.getItem("theme")) {
    initialDarkMode = localStorage.getItem("theme") === "dark";
  } else if (typeof window !== "undefined") {
    initialDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  let initialActiveWidgets: ActiveWidget[] = [];
  if (typeof window !== "undefined" && localStorage.getItem("activeWidgets")) {
    try {
      initialActiveWidgets = JSON.parse(
        localStorage.getItem("activeWidgets") || "[]",
      ) as ActiveWidget[];
    } catch (e) {
      console.error("Failed to parse active widgets from localStorage", e);
      // 파싱 실패 시 기본값으로 폴백
      initialActiveWidgets = ALL_AVAILABLE_WIDGETS.filter(
        (w) => w.defaultActive,
      ) as ActiveWidget[];
    }
  } else {
    // 로컬 스토리지에 없으면 기본 활성 위젯 설정
    initialActiveWidgets = ALL_AVAILABLE_WIDGETS.filter(
      (w) => w.defaultActive,
    ) as ActiveWidget[];
  }

  return {
    isDarkMode: initialDarkMode,
    activeWidgets: initialActiveWidgets,
  };
};

// 모든 사용 가능한 위젯 목록 (타입 정의는 types/index.ts에 있으므로 여기서는 실제 데이터만)
const ALL_AVAILABLE_WIDGETS: WidgetConfig[] = [
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

export const useAppStore = create<AppState>((set, get) => ({
  ...getInitialState(), // 초기 상태 적용

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      // HTML 클래스 업데이트는 useEffect에서 담당하도록 변경 (컴포넌트에서)
      // 로컬 스토리지 업데이트는 useEffect에서 담당하도록 변경 (컴포넌트에서)
      return { isDarkMode: newDarkMode };
    });
  },

  addWidget: (widgetConfig: WidgetConfig) => {
    set((state) => {
      if (!state.activeWidgets.some((w) => w.id === widgetConfig.id)) {
        const newOrder =
          state.activeWidgets.length > 0
            ? Math.max(...state.activeWidgets.map((w) => w.order)) + 1
            : 1;
        return {
          activeWidgets: [
            ...state.activeWidgets,
            { ...widgetConfig, order: newOrder },
          ],
        };
      }
      return state; // 이미 존재하는 위젯은 추가하지 않음
    });
  },

  removeWidget: (widgetId: string) => {
    set((state) => ({
      activeWidgets: state.activeWidgets.filter((w) => w.id !== widgetId),
    }));
  },
}));
