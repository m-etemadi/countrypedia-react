import { createContext, useContext, useReducer } from 'react';
import { COUNTRY_URL } from '../config';
import { countryObj, scrollToTop, getJSON } from '../helpers';

const CountriesContext = createContext();

const initialState = {
  countryLoading: false,
  countryError: '',
  selectedCountry: null,
};

function reducer(state, action) {
  switch (action.type) {
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
  const [{ countryLoading, countryError, selectedCountry }, dispatch] =
    useReducer(reducer, initialState);

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
        countryLoading,
        countryError,
        selectedCountry,
        fetchCountry,
        onCloseCountry: handleCloseCountry,
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
