import { formatPopulation } from '../../helper';

function Country({ selectedCountry }) {
  const [currency] = Object.values(selectedCountry.currency);
  const languages = Object.values(selectedCountry.languages);
  const checkSide = selectedCountry.carSide;

  return (
    <div className="country">
      <header className="country__header">
        <img src={selectedCountry.flag} alt={selectedCountry.commonName} />
        <div className="country__header-text">
          <h1>{selectedCountry.commonName}</h1>
          <div className="short-info">
            <p>Population: {formatPopulation(selectedCountry.population)}</p>
            <p>Capital: {selectedCountry.capitalCity}</p>
          </div>
        </div>
      </header>

      <div className="country__data">
        <article className="data purple-light">
          <div>
            <img
              className="small-flag"
              src={selectedCountry.flag}
              alt={selectedCountry.commonName}
            />
          </div>
          <div>
            <span className="data__label">Continent:</span>
            <span className="data__content">{selectedCountry.continent}</span>
          </div>
          <div>
            <span className="data__label">Area:</span>
            <span className="data__content">{selectedCountry.area}</span>
          </div>
          <div>
            <span className="data__label">Coordination:</span>
            <span className="data__content">
              Latitude: {selectedCountry.coords.lat}
            </span>
            <span className="data__content">
              Longitude: {selectedCountry.coords.lng}
            </span>
          </div>
        </article>
        <article className="data purple">
          <div>
            <span className="data__label">Official Name:</span>
            <span className="data__content">
              {selectedCountry.officialName}
            </span>
          </div>
          <div>
            <span className="data__label">Common Name:</span>
            <span className="data__content">{selectedCountry.commonName}</span>
          </div>
          <div>
            <span className="data__label">Capital City:</span>
            <span className="data__content">{selectedCountry.capitalCity}</span>
          </div>
          <div>
            <span className="data__label">Capital Coordination:</span>
            <span className="data__content">
              Latitude: {selectedCountry.capitalCoords.lat}
            </span>
            <span className="data__content">
              Longitude: {selectedCountry.capitalCoords.lng}
            </span>
          </div>
        </article>
        <article className="data purple-dark">
          <div>
            <span className="data__label">Language:</span>
            <span className="data__content">
              {languages.map(lang => (
                <span key={lang} className="data__content">
                  {lang}
                </span>
              ))}
            </span>
          </div>
          <div>
            <span className="data__label">Currency:</span>
            <span className="data__content">
              {currency.name} ({currency.symbol})
            </span>
          </div>
          <div>
            <span className="data__label">Population:</span>
            <span className="data__content">
              {formatPopulation(selectedCountry.population)}
            </span>
          </div>
          <div>
            <span className="data__label">Start of the Week:</span>
            <span className="data__content">{selectedCountry.startOfWeek}</span>
          </div>
          <div>
            <span className="data__label">Car Side:</span>
            <p className="data__multiple">
              <span className={checkSide ? 'correct-choice' : ''}>
                {selectedCountry.carSide}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>
                {selectedCountry.carSide === 'left' ? 'right' : 'left'}
              </span>
            </p>
          </div>
        </article>
        <article className="data yellow">
          <div>
            <span className="data__label">Time Zones:</span>
            {selectedCountry.timeZones.map(times => (
              <span key={times} className="data__content">
                {times}
              </span>
            ))}
          </div>
          <div>
            <span className="data__label">Top Level Domain:</span>
            <span className="data__content lower-case">
              {selectedCountry.topLevelDomain}
            </span>
          </div>
          <div>
            <span className="data__label">Independant</span>
            <p className="data__multiple">
              <span
                className={selectedCountry.independent ? 'correct-choice' : ''}
              >
                Yes
              </span>
              &nbsp;&nbsp;&nbsp;
              <span
                className={!selectedCountry.independent ? 'correct-choice' : ''}
              >
                No
              </span>
            </p>
          </div>
          <div>
            <span className="data__label">UN Member</span>
            <p className="data__multiple">
              <span
                className={selectedCountry.unMember ? 'correct-choice' : ''}
              >
                Yes
              </span>
              &nbsp;&nbsp;&nbsp;
              <span
                className={!selectedCountry.unMember ? 'correct-choice' : ''}
              >
                No
              </span>
            </p>
          </div>
        </article>
        {/* <article className="data orange">Google Map</article> */}
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
