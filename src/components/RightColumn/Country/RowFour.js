import { useCountries } from '../../../context/CountriesContext';

function RowFour() {
  const {
    selectedCountry: {
      commonName,
      timeZones,
      topLevelDomain,
      independent,
      unMember,
    },
  } = useCountries();

  return (
    <article className={`data yellow`} id="data-set-4">
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
        <span className="data__row-content lower-case">{topLevelDomain}</span>
      </div>
      <div className="data__row">
        <span className="data__row-label">Independant:</span>
        <p className="data__row-multiple">
          <span className={independent ? 'correct-choice' : ''}>Yes</span>
          &nbsp;&nbsp;&nbsp;
          <span className={!independent ? 'correct-choice' : ''}>No</span>
        </p>
      </div>
      <div className="data__row">
        <span className="data__row-label">UN Member:</span>
        <p className="data__row-multiple">
          <span className={unMember ? 'correct-choice' : ''}>Yes</span>
          &nbsp;&nbsp;&nbsp;
          <span className={!unMember ? 'correct-choice' : ''}>No</span>
        </p>
      </div>
      <div className="data__row">
        <span className="data__row-label">Learn More:</span>
        <span className="data__row-content">
          <a
            href={`https://en.wikipedia.org/wiki/${commonName}`}
            target="_blank"
            rel="noreferrer"
            title={commonName}
          >
            Check out {commonName} on Wikipedia →
          </a>
        </span>
      </div>
    </article>
  );
}

export default RowFour;
