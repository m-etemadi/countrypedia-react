import { useState } from 'react';
import Header from './Header/Header';
import Main from './Main';
import CountryList from './Countrylist/CountryList';
import Loader from './Loader';
import Country from './RightColumn/Country';
import ErrorMessage from './ErrorMessage';
import Logo from './Header/Logo';
import Search from './Header/Search';
import RightColumn from './RightColumn/RightColumn';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div>
      <Header>
        <Logo />
        <Search
          onSelectCountry={setSelectedCountry}
          onSetLoading={setIsLoading}
          onSetError={setError}
        />
      </Header>
      <Main>
        <CountryList
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          onSetLoading={setIsLoading}
          onSetError={setError}
        />
        <RightColumn>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <>
              {selectedCountry ? (
                <Country selectedCountry={selectedCountry} />
              ) : (
                <ErrorMessage message={'Start by searching for a country.'} />
              )}
            </>
          )}
        </RightColumn>
      </Main>
    </div>
  );
}

// const ALL_COUNTRIES_URL = `https://restcountries.com/v3.1/all`;
// const COUNTRY_URL = `https://restcountries.com/v3.1/name/`;
// const NEIGHBOUR_URL = `https://restcountries.com/v3.1/alpha/`;
