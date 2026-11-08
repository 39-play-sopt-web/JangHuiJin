import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";
import RouterGuard from "./components/RouterGuard.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import TitlePage from "./pages/TitlePage.tsx";
import WritePage from "./pages/WritePage.tsx";

function BoardLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route element={<BoardLayout />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route element={<RouterGuard />}>
            <Route path="/write" element={<WritePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
