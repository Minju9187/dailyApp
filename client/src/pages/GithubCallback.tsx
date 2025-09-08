import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function GitHubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    navigate("/");
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
