import { MdClose, MdMenu, MdNightlight, MdWbSunny } from "react-icons/md";

export default function Header({
  isDarkMode,
  toggleDarkMode,
  isSidebarOpen,
  toggleSidebar,
}) {
  return (
    <header className="bg-card border-border flex items-center justify-between border-b p-4 shadow-sm">
      <h1 className="text-card-foreground text-xl font-bold">
        나만의 대시보드
      </h1>
      <div className="flex items-center space-x-4">
        {/* 다크 모드 토글 버튼 */}
        <button
          onClick={toggleDarkMode}
          className="hover:bg-muted focus:ring-ring rounded-full p-2 focus:ring-2 focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <MdWbSunny className="text-foreground h-6 w-6" />
          ) : (
            <MdNightlight className="text-foreground h-6 w-6" />
          )}
        </button>

        {/* 사이드바 토글 버튼 */}
        <button
          onClick={toggleSidebar}
          className="hover:bg-muted focus:ring-ring rounded-full p-2 focus:ring-2 focus:outline-none md:hidden"
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
  );
}
