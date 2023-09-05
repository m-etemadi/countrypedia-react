import { createContext, useContext, useEffect, useReducer } from 'react';
import { ALL_COUNTRIES_URL, COUNTRY_URL, REMOVED_COUNTRIES } from '../config';
import { countryObj, scrollToTop, getJSON } from '../helpers';

const CountriesContext = createContext();

const initialState = {
  countriesListLoading: false,
  countriesListError: '',
  countriesList: [],
  sortedBy: 'A',
  countryLoading: false,
  countryError: '',
  selectedCountry: null,
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

    case 'country/loading':
      return { ...state, countryLoading: true, countryError: '' };

    case 'country/loaded':
      return {
        ...state,
        countryLoading: false,
        selectedCountry: action.payload,
      };

    case 'country/rejected':
      return {
        ...state,
        countryLoading: false,
        countryError: action.payload,
        selectedCountry: null,
      };

    case 'country/closed':
      return { ...state, selectedCountry: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function CountriesProvider({ children }) {
  const [
    {
      countriesListLoading,
      countriesListError,
      countriesList,
      sortedBy,
      countryLoading,
      countryError,
      selectedCountry,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const sortedCountries = countriesList.filter(country =>
    country.startsWith(sortedBy)
  );

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

  useEffect(() => {
    fetchAllNames();
  }, []);

  async function fetchCountry(value) {
    dispatch({ type: 'country/loading' });

    try {
      const data = await getJSON(`${COUNTRY_URL}${value}?fullText=true`);
      dispatch({ type: 'country/loaded', payload: countryObj(data.at(0)) });
      scrollToTop();
    } catch {
      dispatch({ type: 'country/rejected', payload: 'Failed to fetch data!' });
    }
  }

  function handleCloseCountry() {
    dispatch({ type: 'country/closed', payload: null });
  }

  return (
    <CountriesContext.Provider
      value={{
        countriesListLoading,
        countriesListError,
        sortedBy,
        countryLoading,
        countryError,
        sortedCountries,
        selectedCountry,
        fetchCountry,
        onCloseCountry: handleCloseCountry,

        dispatch,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined)
    throw new Error('CountriesContext was used outside the CountriesProvider');
  return context;
}

export { CountriesProvider, useCountries };
