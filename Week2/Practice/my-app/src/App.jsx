// App.jsx

import Card from "./components/Card";
import Header from "./components/Header";
import Search from "./components/Search";

import { members } from "./member";
import { useSearch } from "./hooks/useSearch";

function App() {
  // 커스텀 훅 사용
  const { search, filteredData, handleSearchChange, handleSearchClick } =
    useSearch(members);

  return (
    <>
      <Header />
      <Search
        search={search}
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
      />
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredData.map((member) => (
          <Card key={member.id} {...member} />
        ))}
      </section>
    </>
  );
}

export default App;
