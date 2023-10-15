import { useCountries } from '../../../context/CountriesContext';

function RowTwo() {
  const {
    selectedCountry: { officialName, commonName, capitalCity, capitalCoords },
  } = useCountries();

  return (
    <article className={`data purple`} id="data-set-2">
      <div className="data__row">
        <span className="data__row-label">Official Name:</span>
        <span className="data__row-content">{officialName}</span>
      </div>
      <div className="data__row">
        <span className="data__row-label">Common Name:</span>
        <span className="data__row-content">{commonName}</span>
      </div>
      <div className="data__row">
        <span className="data__row-label">Capital City:</span>
        <span className="data__row-content">{capitalCity}</span>
      </div>
      <div className="data__row">
        <span className="data__row-label">Capital Coordination:</span>
        <span className="data__row-content">
          Latitude: {capitalCoords?.lat}
        </span>
        <span className="data__row-content">
          Longitude: {capitalCoords?.lng}
        </span>
      </div>
    </article>
  );
}

export default RowTwo;
