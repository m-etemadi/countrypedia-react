import { useState } from 'react';
import icons from '../../img/icons.svg';

function Search({ fetchCountry }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!query || query.length < 3 || query.length > 30) return;
    fetchCountry(query);
    setQuery('');
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__field"
        placeholder="Search over 200 countries..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

export default Search;
