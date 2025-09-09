import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
      <p className="text-muted-foreground mb-8 text-xl">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 shadow-md transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
