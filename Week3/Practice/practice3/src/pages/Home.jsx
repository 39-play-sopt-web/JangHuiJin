// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { getPosts } from "../apis/post";
import PostCard from "../components/PostCard";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  const fetchPosts = async (searchKeyword = "") => {
    const currentRequest = ++requestId.current;
    try {
      const data = await getPosts({
        keyword: searchKeyword.trim() || undefined,
        size: 30,
      });
      if (currentRequest === requestId.current) setPostList(data.posts);
    } catch (error) {
      if (currentRequest === requestId.current) {
        setError("게시글을 불러오지 못했습니다. 다시 시도해 주세요.");
      }
      console.error("게시글 목록 조회 실패", error);
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    return () => { requestId.current += 1; };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>게시판</h1>
      <p>
        <Link to="/member-code">회원 코드 발급 페이지로 이동</Link>
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          setError("");
          fetchPosts(keyword);
        }}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <input
          type="search"
          aria-label="게시글 검색어"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button type="submit" disabled={loading}>검색</button>
        <button type="button" disabled={loading} onClick={() => {
          setKeyword("");
          setLoading(true);
          setError("");
          fetchPosts();
        }}>전체 보기</button>
      </form>
      {loading && <p role="status">불러오는 중...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && postList.length === 0 && <p>검색 결과가 없습니다.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {!loading && !error && postList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
