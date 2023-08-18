import { formatCountryName } from '../../helper';

function CountryName({ country, selectedCountry, fetchCountry }) {
  return (
    <li
      className={country === selectedCountry?.commonName ? 'active' : ''}
      title={country}
      onClick={() => fetchCountry(country)}
    >
      {country.length > 20 ? formatCountryName(country) : country}
    </li>
  );
}

export default CountryName;
