import { useEffect } from 'react';
import Header from './Header';
import LeafletMap from './LeafletMap';
import Neighbours from '../Neighbours/Neighbours';
import ErrorMessage from '../../ErrorMessage';
import DataSetOne from './DataSetOne';
import DataSetTwo from './DataSetTwo';
import DataSetThree from './DataSetThree';
import DataSetFour from './DataSetFour';

function Country({ selectedCountry, fetchCountry, onCloseCountry }) {
  const { borders } = selectedCountry;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="country">
      <Header
        selectedCountry={selectedCountry}
        onCloseCountry={onCloseCountry}
      />

      <div className="country__data">
        <DataSetOne
          selectedCountry={selectedCountry}
          className="purple-light"
        />
        <DataSetTwo selectedCountry={selectedCountry} className="purple" />
        <DataSetThree
          selectedCountry={selectedCountry}
          className="purple-dark"
        />
        <DataSetFour selectedCountry={selectedCountry} className="yellow" />
        <LeafletMap selectedCountry={selectedCountry} />
        {borders ? (
          <Neighbours borders={borders} fetchCountry={fetchCountry} />
        ) : (
          <ErrorMessage
            message={`${selectedCountry.commonName} does NOT have any land border!`}
          />
        )}
      </div>
    </div>
  );
}

export default Country;
