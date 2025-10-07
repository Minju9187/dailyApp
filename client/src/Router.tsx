import { Routes, Route } from "react-router";
import Home from "./pages/a/Home";
import Layout from "./Layout";
import Weather from "./pages/a/Weather";
import Calendar from "./pages/a/Calendar";
import GitHubCallback from "./pages/a/GithubCallback";

export default function Router() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/auth/callback" element={<GitHubCallback />} />
        </Routes>
      </Layout>
    </>
  );
}
