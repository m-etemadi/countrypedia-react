import { useCountries } from '../../context/CountriesContext';
import SortOptions from './SortOptions';

function SortMenu() {
  const { sortedBy, dispatch } = useCountries();

  return (
    <div className="sort">
      <p>Sort Alphabetically</p>

      <select
        value={sortedBy}
        onChange={e =>
          dispatch({ type: 'allCountries/sorted', payload: e.target.value })
        }
      >
        <SortOptions />
      </select>
      <span className="sort__label">{sortedBy}</span>
    </div>
  );
}

export default SortMenu;
