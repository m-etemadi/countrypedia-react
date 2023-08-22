import { useEffect, useState } from 'react';
import { getJSON } from '../../helper';
import { ALL_COUNTRIES_URL, REMOVED_COUNTRIES } from '../../config';
import CountryName from './CountryName';
import SortOptions from './SortOptions';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

function AllCountryNames({ selectedCountry, fetchCountry }) {
  const [allNames, setAllNames] = useState([]);
  const [sortedBy, setSortedBy] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sortedCountries = allNames.filter(country =>
    country.startsWith(sortedBy)
  );

  useEffect(() => {
    async function fetchAllNames() {
      try {
        setIsLoading(true);
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
      } catch {
        setError('Failed to fetch data!');
      } finally {
        setIsLoading(false);
      }
    }

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
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
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
        )}
      </div>
    </>
  );
}

export default AllCountryNames;
