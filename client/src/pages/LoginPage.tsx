const LoginPage: React.FC = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-primary mb-6 text-4xl font-bold">로그인</h1>
      <div className="bg-card w-full max-w-md rounded-lg p-8 shadow-lg">
        <p className="text-muted-foreground mb-4">
          여기는 로그인 페이지입니다.
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-card-foreground block text-sm font-medium"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="border-border bg-input text-foreground focus:border-primary focus:ring-primary mt-1 block w-full rounded-md px-3 py-2 shadow-sm sm:text-sm"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-card-foreground block text-sm font-medium"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="border-border bg-input text-foreground focus:border-primary focus:ring-primary mt-1 block w-full rounded-md px-3 py-2 shadow-sm sm:text-sm"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="text-primary-foreground bg-primary hover:bg-primary/90 focus:ring-primary flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
