import React from "react";
import WeatherWidget from "../features/weather/components/WeatherWidget";
import NewsWidget from "../features/news/components/NewsWidget";
import { useAppStore } from "../store/useAppStore"; // Zustand 스토어 임포트

// 나중에 모든 위젯 컴포넌트를 쉽게 매핑하기 위한 객체
const widgetComponents: { [key: string]: React.FC } = {
  WeatherWidget: WeatherWidget,
  NewsWidget: NewsWidget,
  // 여기에 다른 위젯 컴포넌트를 추가합니다.
};

// React.FC<HomePageProps> 타입도 필요 없게 됩니다.
const HomePage: React.FC = () => {
  const activeWidgets = useAppStore((state) => state.activeWidgets);

  return (
    <div className="flex flex-col gap-3 p-6">
      <h2 className="col-span-full mb-4 text-3xl font-bold">내 대시보드</h2>
      {activeWidgets.length === 0 ? (
        <p className="text-muted-foreground col-span-full text-center">
          아직 추가된 위젯이 없습니다. 오른쪽 위젯 설정에서 위젯을 추가해보세요!
        </p>
      ) : (
        activeWidgets
          .sort((a, b) => a.order - b.order)
          .map((widget) => {
            const WidgetComponent = widgetComponents[widget.component];
            return WidgetComponent ? (
              <div
                key={widget.id}
                className="bg-card border-border rounded-lg border p-4 shadow-md"
              >
                <WidgetComponent />
              </div>
            ) : (
              <div
                key={widget.id}
                className="bg-card border-border rounded-lg border p-4 shadow-md"
              >
                <p>{widget.name} 서비스는 아직 개발중입니다.</p>
              </div>
            );
          })
      )}
    </div>
  );
};

export default HomePage;
