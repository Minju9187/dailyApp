// src/pages/HomePage.tsx
import React from "react";
import { ActiveWidget } from "../types"; // `src/types/index.ts`에서 정의한 ActiveWidget 타입을 사용합니다.
import WeatherWidget from "../features/weather/components/WeatherWidget";
import NewsWidget from "../features/news/components/NewsWidget";

// 나중에 모든 위젯 컴포넌트를 쉽게 매핑하기 위한 객체
// `component` 속성(문자열)과 실제 React 컴포넌트(JSX 요소)를 연결합니다.
const widgetComponents: { [key: string]: React.FC } = {
  WeatherWidget: WeatherWidget,
  NewsWidget: NewsWidget,
  // 여기에 다른 위젯 컴포넌트를 추가합니다.
  // 예: CafeOrderWidget: CafeOrderWidget,
  // 예: MemoWidget: MemoWidget,
  // (실제 컴포넌트 파일 생성 후 추가)
};

interface HomePageProps {
  activeWidgets: ActiveWidget[];
}

const HomePage: React.FC<HomePageProps> = ({ activeWidgets }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {/* 이 헤더는 MainLayout의 헤더와 구분됩니다. 페이지별 제목으로 사용됩니다. */}
      <h2 className="col-span-full mb-4 text-3xl font-bold">내 대시보드</h2>
      {activeWidgets.length === 0 ? (
        <p className="text-muted-foreground col-span-full text-center">
          아직 추가된 위젯이 없습니다. 오른쪽 위젯 설정에서 위젯을 추가해보세요!
        </p>
      ) : (
        activeWidgets
          .sort((a, b) => a.order - b.order) // `order` 속성을 기준으로 정렬
          .map((widget) => {
            const WidgetComponent = widgetComponents[widget.component]; // 문자열 이름으로 컴포넌트 찾기
            return WidgetComponent ? (
              // 각 위젯을 고유한 key와 함께 렌더링
              <div key={widget.id}>
                <WidgetComponent />
              </div>
            ) : (
              // 컴포넌트를 찾을 수 없을 때 오류 메시지 표시
              <div
                key={widget.id}
                className="bg-destructive text-destructive-foreground rounded-lg p-4"
              >
                <p>오류: {widget.name} 위젯 컴포넌트를 찾을 수 없습니다.</p>
                <p className="text-sm">
                  (`widgetComponents` 객체에 해당 위젯이 추가되었는지
                  확인하세요.)
                </p>
              </div>
            );
          })
      )}
    </div>
  );
};

export default HomePage;
