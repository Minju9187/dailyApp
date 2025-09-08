import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./Layout";
import Weather from "./pages/Weather";
import Calendar from "./pages/Calendar";
import GitHubCallback from "./pages/GithubCallback";

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
