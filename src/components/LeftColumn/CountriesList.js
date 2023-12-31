import { useCountriesList } from '../../context/CountriesListContext';
import Spinner from '../Spinner';
import Message from '../Message';
import ListItem from './ListItem';

function CountriesList() {
  const { sortedCountries, countriesListLoading, countriesListError } =
    useCountriesList();

  if (countriesListLoading) return <Spinner />;
  if (countriesListError) return <Message message={countriesListError} />;

  return (
    <div className="list">
      <ul>
        {sortedCountries.map(country => (
          <ListItem country={country} key={country} />
        ))}
      </ul>
    </div>
  );
}

export default CountriesList;
