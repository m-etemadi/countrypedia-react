import { createContext, useContext, useEffect, useReducer } from 'react';
import { ALL_COUNTRIES_URL, REMOVED_COUNTRIES } from '../config';
import { getJSON } from '../helpers';

const CountriesListContext = createContext();

const initialState = {
  countriesListLoading: false,
  countriesListError: '',
  countriesList: [],
  sortedBy: 'A',
};

function reducer(state, action) {
  switch (action.type) {
    case 'allCountries/loading':
      return { ...state, countriesListLoading: true, countriesListError: '' };

    case 'allCountries/loaded':
      return {
        ...state,
        countriesListLoading: false,
        countriesList: action.payload,
      };

    case 'allCountries/sorted':
      return { ...state, sortedBy: action.payload };

    case 'allCountries/rejected':
      return {
        ...state,
        countriesListLoading: false,
        countriesListError: action.payload,
      };

    default:
      throw new Error('Unknown action type');
  }
}

function CountriesListProvider({ children }) {
  const [
    { countriesListLoading, countriesListError, countriesList, sortedBy },
    dispatch,
  ] = useReducer(reducer, initialState);

  const sortedCountries = countriesList.filter(country =>
    country.startsWith(sortedBy)
  );

  useEffect(() => {
    async function fetchAllNames() {
      dispatch({ type: 'allCountries/loading' });

      try {
        const data = await getJSON(`${ALL_COUNTRIES_URL}`);
        const countryNames = data
          .map(country => country.name.common)
          .filter(
            function (e) {
              return this.indexOf(e) < 0;
            },
            [...REMOVED_COUNTRIES]
          )
          .sort();
        dispatch({ type: 'allCountries/loaded', payload: countryNames });
      } catch {
        dispatch({
          type: 'allCountries/rejected',
          payload: 'Failed to fetch data!',
        });
      }
    }

    fetchAllNames();
  }, []);

  return (
    <CountriesListContext.Provider
      value={{
        countriesListLoading,
        countriesListError,
        sortedBy,
        sortedCountries,

        dispatch,
      }}
    >
      {children}
    </CountriesListContext.Provider>
  );
}

function useCountriesList() {
  const context = useContext(CountriesListContext);
  if (context === undefined)
    throw new Error(
      'CountriesListContext was used outside the CountriesListProvider'
    );
  return context;
}

export { CountriesListProvider, useCountriesList };
