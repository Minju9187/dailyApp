import { MdAddCircleOutline } from "react-icons/md";

export default function AvailableWidgetsList({
  availableWidgets,
  addWidget,
  activeWidgetIds,
}) {
  return (
    <div>
      <h3 className="text-sidebar-foreground mb-3 text-lg font-semibold">
        위젯 추가
      </h3>
      <ul className="space-y-2">
        {availableWidgets.map((widget) => (
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
              onClick={() => addWidget(widget)}
              disabled={activeWidgetIds.has(widget.id)}
              className="text-primary hover:text-primary-foreground hover:bg-primary/10 disabled:text-muted rounded-full p-1 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Add ${widget.name}`}
            >
              <MdAddCircleOutline className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
