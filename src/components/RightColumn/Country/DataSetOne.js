import { useCountries } from '../../../context/CountriesContext';

function DataSetOne({ className }) {
  const {
    selectedCountry: { flag, commonName, continent, area, coords },
  } = useCountries();

  return (
    <article className={`data ${className}`} id="data-set-1">
      <div className="data__row">
        <img className="data__row-flag" src={flag} alt={commonName} />
      </div>
      <div className="data__row">
        <span className="data__row-label">Continent:</span>
        <span className="data__row-content">{continent}</span>
      </div>
      <div className="data__row">
        <span className="data__row-label">Area:</span>
        <span className="data__row-content">{area}</span>
      </div>
      <div className="data__row">
        <span className="data__row-label">Coordination:</span>
        <span className="data__row-content">Latitude: {coords.lat}</span>
        <span className="data__row-content">Longitude: {coords.lng}</span>
      </div>
    </article>
  );
}

export default DataSetOne;
