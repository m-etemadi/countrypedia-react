import { COUNTRY_URL } from '../../config';
import { countryObj, formatCountryName, getJSON } from '../../helper';

function List({
  country,
  selectedCountry,
  onSelectCountry,
  onSetLoading,
  onSetError,
}) {
  async function fetchCountry(country) {
    try {
      onSetLoading(true);
      onSetError('');

      const data = await getJSON(`${COUNTRY_URL}${country}`);
      onSelectCountry(countryObj(data.at(0)));
    } catch (err) {
      onSetError(err.message);
    } finally {
      onSetLoading(false);
    }
  }

  return (
    <li
      className={country === selectedCountry?.commonName ? 'active' : ''}
      title={country}
      onClick={() =>
        fetchCountry(country === 'Antarctica' ? 'Antarctic' : country)
      }
    >
      {country.length > 20 ? formatCountryName(country) : country}
    </li>
  );
}

export default List;
