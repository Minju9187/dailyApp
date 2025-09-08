// import Router from "./Router";

// function App() {
//   return (
//     <>
//       <Router />
//     </>
//   );
// }

// export default App;

// src/App.jsx
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    // min-h-screen과 bg-background, text-foreground는 body에 적용되므로 여기서는 필요 없을 수 있습니다.
    // 하지만 전체 컨테이너를 명시적으로 설정하는 것은 나쁘지 않습니다.
    <div className="bg-background text-foreground min-h-screen font-sans">
      <MainLayout>
        {/* MainLayout의 children으로 들어갈 콘텐츠 (예: HomePage 등) */}
        <div className="flex-grow p-4 md:p-8">
          <h2 className="text-3xl font-bold">환영합니다!</h2>
          <p className="text-muted-foreground mt-2">
            여기는 앱의 메인 콘텐츠 영역입니다.
          </p>
          <p className="mt-4">
            오른쪽 상단의 아이콘을 클릭하여 사이드바를 열어보세요!
          </p>
        </div>
      </MainLayout>
    </div>
  );
}

export default App;
