import { useCountries } from '../../../context/CountriesContext';
import { formatPopulation } from '../../../helpers';

function DataSetThree({ className }) {
  const {
    selectedCountry: { population, startOfWeek, currency, languages, carSide },
  } = useCountries();

  const [currencies] = Object.values(currency);
  const AllLanguages = Object.values(languages);
  const checkSide = carSide;

  return (
    <article className={`data ${className}`} id="data-set-3">
      <div className="data__row">
        <span className="data__row-label">Language:</span>
        {AllLanguages.map(lang => (
          <span key={lang} className="data__row-content">
            {lang}
          </span>
        ))}
      </div>
      <div className="data__row">
        <span className="data__row-label">Currency:</span>
        <span className="data__row-content">
          {currencies.name} ({currencies.symbol ? currencies.symbol : 'N/A'})
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
          <span className={checkSide ? 'correct-choice' : ''}>{carSide}</span>
          &nbsp;&nbsp;&nbsp;
          <span>{carSide === 'left' ? 'right' : 'left'}</span>
        </p>
      </div>
    </article>
  );
}

export default DataSetThree;
