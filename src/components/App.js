import { useCountry } from '../hooks/useCountry';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import Header from './Header/Header';
import Logo from './Header/Logo';
import Search from './Header/Search';
import Main from './Main';
import LeftColumn from './LeftColumn/LeftColumn';
import AllCountryNames from './LeftColumn/AllCountryNames';
import RightColumn from './RightColumn/RightColumn';
import Country from './RightColumn/Country';

export default function App() {
  const { isLoading, error, activeCountry, setActiveCountry, fetchCountry } =
    useCountry();
  let selectedCountry = activeCountry;

  function handleCloseCountry() {
    setActiveCountry(null);
  }

  return (
    <div>
      <Header>
        <Logo />
        <Search fetchCountry={fetchCountry}></Search>
      </Header>
      <Main>
        <LeftColumn>
          <AllCountryNames
            selectedCountry={selectedCountry}
            fetchCountry={fetchCountry}
          />
        </LeftColumn>
        <RightColumn>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <>
              {selectedCountry ? (
                <Country
                  selectedCountry={selectedCountry}
                  onCloseCountry={handleCloseCountry}
                />
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
