// App.jsx

import { useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Search from "./components/Search";

import { members } from "./member";

function App() {
  //1. useState 훅을 사용하여 search 생성
  const [search, setSearch] = useState("");

  //2. Search 컴포넌트에 props로 넘길 handleSearch 함수 생성
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // filter 메소드 사용해서 필터링
  const filteredMembers = members.filter((member) =>
    member.name.includes(search),
  );

  return (
    <>
      <Header />
      {/*3. Search 컴포넌트에 search와 handleSearch를 props로 전달*/}
      <Search search={search} onSearchChange={handleSearch} />
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            name={member.name}
            englishName={member.englishName}
            github={member.github}
          />
        ))}
      </section>
    </>
  );
}

export default App;
