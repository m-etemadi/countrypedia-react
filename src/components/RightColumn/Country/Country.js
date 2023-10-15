import { useCountries } from '../../../context/CountriesContext';
import Spinner from '../../Spinner';
import Message from '../../Message';
import Header from './Header';

function Country({ children }) {
  const { countryLoading, countryError, selectedCountry } = useCountries();

  if (countryLoading) return <Spinner />;
  if (countryError) return <Message message={countryError} />;
  if (!selectedCountry)
    return <Message message="Start by searching for a country." />;

  return (
    <>
      <Header />
      <div className="country__data">{children}</div>
    </>
  );
}

export default Country;
