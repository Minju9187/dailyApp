import { MdRemoveCircleOutline } from "react-icons/md";

export default function MyWidgetsList({ activeWidgets, removeWidget }) {
  return (
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
                  onClick={() => removeWidget(widget.id)}
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
  );
}
