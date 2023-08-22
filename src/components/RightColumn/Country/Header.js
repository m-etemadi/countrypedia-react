import { formatPopulation } from '../../../helper';

function Header({ selectedCountry, onCloseCountry }) {
  const { flag, commonName, population, capitalCity } = selectedCountry;

  return (
    <header className="country__header">
      <img src={flag} alt={commonName} />

      <div className="country__header-text">
        <h1>{commonName}</h1>
        <div className="short-info">
          <p>Population: {formatPopulation(population)}</p>
          <p>Capital: {capitalCity}</p>
        </div>
      </div>

      <button className="btn-close" onClick={onCloseCountry}>
        &larr;
      </button>
    </header>
  );
}

export default Header;
