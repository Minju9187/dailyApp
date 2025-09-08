export interface WidgetConfig {
  id: string;
  name: string;
  component: string; // 위젯 컴포넌트의 문자열 이름 (렌더링 시 매핑)
  description: string;
  defaultActive: boolean;
  order: number; // 위젯의 순서 (드래그앤드롭 고려)
}

// 활성화된 위젯 (사용자가 대시보드에 추가한 위젯)
export interface ActiveWidget extends WidgetConfig {
  // 나중에 위젯별 설정이 필요하면 여기에 추가
  // 예: weatherLocation: string;
}
