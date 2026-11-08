import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import TitlePage from "./pages/TitlePage.tsx";

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
          <Route path="/write" element={<>WritePage</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
