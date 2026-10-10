// Search.jsx

// 부모로부터 넘겨받은 props 사용(구조 분해 할당)
const Search = ({ search, onSearchChange }) => {
  return <input type="text" value={search} onChange={onSearchChange} />;
};

export default Search;
