import { useState } from 'react';
import { countryObj, getJSON } from '../../helper';
import { COUNTRY_URL } from '../../config';
import icons from '../../img/icons.svg';

function Search({ onSelectCountry, onSetLoading, onSetError }) {
  const [query, setQuery] = useState('');

  async function fetchCountry() {
    try {
      onSetLoading(true);
      onSetError('');

      const data = await getJSON(`${COUNTRY_URL}${query}`);
      onSelectCountry(countryObj(data.at(0)));
    } catch (err) {
      onSetError(err.message);
    } finally {
      onSetLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query || query.length < 3 || query.length > 30) return;
    fetchCountry();
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
