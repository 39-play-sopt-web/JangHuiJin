import TitlePage from "./pages/TitlePage.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
