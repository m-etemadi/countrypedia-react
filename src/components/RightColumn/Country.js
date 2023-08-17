import { formatPopulation } from '../../helper';
import LeafletMap from './LeafletMap';

function Country({ selectedCountry }) {
  const {
    flag,
    area,
    continent,
    coords,
    officialName,
    commonName,
    capitalCity,
    capitalCoords,
    population,
    carSide,
    independent,
    unMember,
    timeZones,
    startOfWeek,
    topLevelDomain,
    // neighbours,
  } = selectedCountry;

  const [currency] = Object.values(selectedCountry.currency);
  const languages = Object.values(selectedCountry.languages);
  const checkSide = carSide;

  return (
    <div className="country">
      <header className="country__header">
        <img src={flag} alt={commonName} />
        <div className="country__header-text">
          <h1>{commonName}</h1>
          <div className="short-info">
            <p>Population: {formatPopulation(population)}</p>
            <p>Capital: {capitalCity}</p>
          </div>
        </div>
      </header>

      <div className="country__data">
        <article className="data purple-light">
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
        <article className="data purple">
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
              Latitude: {capitalCoords.lat}
            </span>
            <span className="data__row-content">
              Longitude: {capitalCoords.lng}
            </span>
          </div>
        </article>
        <article className="data purple-dark">
          <div className="data__row">
            <span className="data__row-label">Language:</span>
            {languages.map(lang => (
              <span key={lang} className="data__row-content">
                {lang}
              </span>
            ))}
          </div>
          <div className="data__row">
            <span className="data__row-label">Currency:</span>
            <span className="data__row-content">
              {currency.name} ({currency.symbol})
            </span>
          </div>
          <div className="data__row">
            <span className="data__row-label">Population:</span>
            <span className="data__row-content">
              {formatPopulation(population)}
            </span>
          </div>
          <div className="data__row">
            <span className="data__row-label">Start of the Week:</span>
            <span className="data__row-content">{startOfWeek}</span>
          </div>
          <div className="data__row">
            <span className="data__row-label">Car Side:</span>
            <p className="data__row-multiple">
              <span className={checkSide ? 'correct-choice' : ''}>
                {carSide}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>{carSide === 'left' ? 'right' : 'left'}</span>
            </p>
          </div>
        </article>
        <article className="data yellow">
          <div className="data__row">
            <span className="data__row-label">Time Zones:</span>
            {timeZones.map(times => (
              <span key={times} className="data__row-content">
                {times}
              </span>
            ))}
          </div>
          <div className="data__row">
            <span className="data__row-label">Top Level Domain:</span>
            <span className="data__row-content lower-case">
              {topLevelDomain}
            </span>
          </div>
          <div className="data__row">
            <span className="data__row-label">Independant</span>
            <p className="data__row-multiple">
              <span className={independent ? 'correct-choice' : ''}>Yes</span>
              &nbsp;&nbsp;&nbsp;
              <span className={!independent ? 'correct-choice' : ''}>No</span>
            </p>
          </div>
          <div className="data__row">
            <span className="data__row-label">UN Member</span>
            <p className="data__row-multiple">
              <span className={unMember ? 'correct-choice' : ''}>Yes</span>
              &nbsp;&nbsp;&nbsp;
              <span className={!unMember ? 'correct-choice' : ''}>No</span>
            </p>
          </div>
        </article>
        <article className="data orange no-padding">
          <LeafletMap coords={coords} name={commonName} />
        </article>
        {/* <article className="data red">
          <h3>Neighbours</h3>
          <div className=" neighbours">
            <div className="neighbour">
              <p>Canada</p>
              <p>Language: English</p>
              <p>Population: 37 million</p>
            </div>
            <div className="neighbour">
              <p>Panama</p>
              <p>Language: English</p>
              <p>Population: 37 million</p>
            </div>
            <div className="neighbour">
              <p>Mexico</p>
              <p>Language: English</p>
              <p>Population: 37 million</p>
            </div>
          </div>
        </article> */}
      </div>
    </div>
  );
}

export default Country;
