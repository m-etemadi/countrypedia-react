import { useEffect, useState } from 'react';
import { getJSON } from '../../helper';
import { ALL_COUNTRIES_URL, REMOVED_COUNTRIES } from '../../config';
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

      const countryNames = data
        .map(country => country.name.common)
        .filter(
          function (e) {
            return this.indexOf(e) < 0;
          },
          [...REMOVED_COUNTRIES]
        )
        .sort();
      setAllNames(countryNames);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchAllNames();
  }, []);

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
