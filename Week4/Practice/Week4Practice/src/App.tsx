// 4. 버튼을 클릭하면 조회가 되게 해보자!
// 입력한 ID로 조건부 fetch 하기

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const getPostDetail = async (postId: number) => {
  // 게시글 상세 조회 요청
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${postId}`,
  );
  return response.data.data; // 실제 게시글 정보는 data.data에 담겨 있음
};

function App() {
  // 입력 필드 값(빈 문자열 허용)
  const [inputValue, setInputValue] = useState("1");
  // 실제로 조회할 ID
  const [postId, setPostId] = useState(1);
  // 버튼을 눌러야 실행되도록 제어
  const [shouldFetch, setShouldFetch] = useState(false);

  // 버튼 눌러야 실행되도록 enabled 사용
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostDetail(postId),
    enabled: shouldFetch, // shouldFetch가 true일 때만 쿼리 실행
  });

  const handleFetch = () => {
    if (!inputValue.trim()) return;
    const parsed = Number(inputValue);
    if (Number.isNaN(parsed)) return;
    setPostId(parsed);
    setShouldFetch(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <h1>게시글 상세</h1>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShouldFetch(false); // 타이핑 중에는 요청 안 나가도록
        }}
        placeholder="게시글 ID"
      />
      <button onClick={handleFetch}>데이터 가져오기</button>
      {(isPending || isFetching) && shouldFetch && <div>로딩 중...</div>}
      {isError && <div>에러: {error.message}</div>}
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>id: {data.id}</p>
          <p>content: {data.content}</p>
          <p>author: {data.author}</p>
          <p>createdAt: {data.createdAt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
