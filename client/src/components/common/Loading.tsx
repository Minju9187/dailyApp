const Loading = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="border-primary mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <p className="text-muted-foreground text-lg">앱을 로딩 중입니다...</p>
      </div>
    </div>
  );
};

export default Loading;
