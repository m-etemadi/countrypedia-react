import { useCountries } from '../../context/CountriesContext';
import { reduceNameLength } from '../../helpers';

function ListItem({ country }) {
  const { selectedCountry, fetchCountry } = useCountries();

  return (
    <li
      className={country === selectedCountry?.commonName ? 'active' : ''}
      title={country}
      onClick={() => fetchCountry(country)}
    >
      {reduceNameLength(country)}
    </li>
  );
}

export default ListItem;
