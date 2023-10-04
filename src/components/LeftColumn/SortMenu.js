import { useCountriesList } from '../../context/CountriesListContext';
import SortOptions from './SortOptions';

function SortMenu() {
  const { sortedBy, dispatch } = useCountriesList();

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
