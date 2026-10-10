// Search.jsx
const Search = ({ search, onSearchChange, onSearchClick }) => {
  return (
    <div>
      <input type="text" value={search} onChange={onSearchChange} />
      <button onClick={onSearchClick}>검색</button>
    </div>
  );
};

export default Search;
