import { WidgetConfig } from "@/types";
import { MdClose } from "react-icons/md";
import MyWidgetsList from "./MyWidgetsList";
import AvailableWidgetsList from "./AvailableWidgetsList";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeWidgets: WidgetConfig[];
  removeWidget: (id: string) => void;
  availableWidgets: WidgetConfig[];
  addWidget: (widget: WidgetConfig) => void;
  activeWidgetIds: Set<string>;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  activeWidgets,
  removeWidget,
  availableWidgets,
  addWidget,
  activeWidgetIds,
}: SidebarProps) {
  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground fixed inset-y-0 right-0 z-50 w-80 transform shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:border-sidebar-border md:static md:translate-x-0 md:border-l md:shadow-none`}
    >
      <div className="border-sidebar-border flex items-center justify-between border-b p-4">
        <h2 className="text-sidebar-foreground text-xl font-bold">위젯 설정</h2>
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
        <MyWidgetsList
          activeWidgets={activeWidgets}
          removeWidget={removeWidget}
        />

        {/* 사용 가능한 위젯 목록 */}
        <AvailableWidgetsList
          availableWidgets={availableWidgets}
          addWidget={addWidget}
          activeWidgetIds={activeWidgetIds}
        />
      </div>
    </aside>
  );
}
