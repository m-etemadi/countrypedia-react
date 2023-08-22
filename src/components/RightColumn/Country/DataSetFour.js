function DataSetFour({ selectedCountry, className }) {
  const { timeZones, topLevelDomain, independent, unMember } = selectedCountry;

  return (
    <article className={`data ${className}`} id="data-set-4">
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
  );
}

export default DataSetFour;
