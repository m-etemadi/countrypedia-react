import { useEffect, useState } from 'react';
import { getJSON } from '../../helper';
import { ALL_COUNTRIES_URL } from '../../config';
import List from './List';
import SortOptions from './SortOptions';

function CountryList({
  selectedCountry,
  onSelectCountry,
  onSetLoading,
  onSetError,
}) {
  const [allNames, setAllNames] = useState([]);
  const [sortedBy, setSortedBy] = useState('A');

  const sortedCountries = allNames.filter(country =>
    country.startsWith(sortedBy)
  );

  async function fetchAllNames() {
    try {
      const data = await getJSON(`${ALL_COUNTRIES_URL}`);

      const allNames = data
        .filter(country => country.population > 0)
        .map(country => country.name.common)
        .sort();
      setAllNames(allNames);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchAllNames();
  }, []);

  return (
    <aside className="country-list">
      <div className="sort">
        <p>Sort Alphabetically</p>
        <select value={sortedBy} onChange={e => setSortedBy(e.target.value)}>
          <SortOptions />
        </select>
        <span className="sort__label">{sortedBy}</span>
      </div>

      <div className="list">
        <ul>
          {sortedCountries.map(country => (
            <List
              country={country}
              key={country}
              selectedCountry={selectedCountry}
              onSelectCountry={onSelectCountry}
              onSetLoading={onSetLoading}
              onSetError={onSetError}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default CountryList;
