import { useCountries } from '../../../context/CountriesContext';
import Spinner from '../../Spinner';
import Message from '../../Message';
import Header from './Header';
import DataSetOne from './DataSetOne';
import DataSetTwo from './DataSetTwo';
import DataSetThree from './DataSetThree';
import DataSetFour from './DataSetFour';
import Map from './Map';
import Neighbours from '../Neighbours/Neighbours';

function Country() {
  const { countryLoading, countryError, selectedCountry } = useCountries();

  if (countryLoading) return <Spinner />;
  if (countryError) return <Message message={countryError} />;
  if (!selectedCountry)
    return <Message message="Start by searching for a country." />;

  return (
    <div className="country">
      <Header />

      <div className="country__data">
        <DataSetOne className="purple-light" />
        <DataSetTwo className="purple" />
        <DataSetThree className="purple-dark" />
        <DataSetFour className="yellow" />
        <Map />
        <Neighbours />
      </div>
    </div>
  );
}

export default Country;
