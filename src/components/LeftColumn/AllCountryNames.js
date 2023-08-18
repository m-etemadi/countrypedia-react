import { useEffect, useState } from 'react';
import { getJSON } from '../../helper';
import { ALL_COUNTRIES_URL } from '../../config';
import CountryName from './CountryName';
import SortOptions from './SortOptions';

function AllCountryNames({ selectedCountry, fetchCountry }) {
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
  });

  return (
    <>
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
            <CountryName
              country={country}
              key={country}
              selectedCountry={selectedCountry}
              fetchCountry={fetchCountry}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default AllCountryNames;
