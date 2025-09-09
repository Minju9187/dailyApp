// src/components/shared/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // 사용자 정의 폴백 UI를 받을 수 있도록
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  // 컴포넌트의 자식 트리에서 에러가 발생했을 때 호출됩니다.
  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // 다음 렌더링에서 폴백 UI를 보여주도록 상태를 업데이트합니다.
    return { hasError: true, error: _, errorInfo: null }; // errorInfo는 componentDidCatch에서 설정
  }

  // 에러와 에러 정보를 로깅하는 데 사용됩니다.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    // 상태에 에러 정보를 저장하여 필요시 디버깅에 활용
    this.setState({ errorInfo });

    // 실제 프로덕션 환경에서는 Sentry, Crashlytics 등 에러 로깅 서비스로 보낼 수 있습니다.
    // logErrorToMyService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // 사용자 정의 폴백 UI가 있다면 그것을 렌더링
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // 기본 폴백 UI
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="mb-4 text-3xl font-bold">앗! 문제가 발생했습니다.</h1>
          <p className="mb-4 text-lg">
            불편을 드려 죄송합니다. 잠시 후 다시 시도해 주세요.
          </p>
          {this.state.error && (
            <details className="bg-destructive/10 mt-4 max-w-lg overflow-auto rounded-md p-4 text-sm whitespace-pre-wrap">
              <summary className="text-destructive cursor-pointer">
                자세한 오류 정보 보기
              </summary>
              <p className="text-destructive mt-2 font-mono">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <p className="text-destructive mt-2 font-mono">
                  {this.state.errorInfo.componentStack}
                </p>
              )}
            </details>
          )}
          <button
            onClick={() => window.location.reload()} // 페이지 새로고침 버튼
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 rounded-lg px-6 py-3 shadow-md transition-colors"
          >
            앱 새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
