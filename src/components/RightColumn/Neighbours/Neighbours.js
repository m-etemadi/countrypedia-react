import { useCountries } from '../../../context/CountriesContext';
import { useNeighbours } from '../../../context/NeighboursContext';
import { useEffect } from 'react';
import Slider from './Slider';
import Spinner from '../../Spinner';
import Message from '../../Message';

function Neighbours() {
  const {
    selectedCountry: { borders, commonName },
  } = useCountries();

  const { neighbours, neighboursLoading, neighboursError, fetchNeighbours } =
    useNeighbours();

  useEffect(() => {
    if (!borders) return;

    fetchNeighbours(borders);
  }, [borders, fetchNeighbours]);

  return (
    <article className="data-neighbours">
      <h3 className="heading__primary">Neighbours</h3>

      {neighboursLoading && <Spinner />}
      {neighboursError && <Message message={neighboursError} />}

      {borders ? (
        <Slider neighbours={neighbours} />
      ) : (
        <Message message={`${commonName} does NOT have any land border!`} />
      )}
    </article>
  );
}

export default Neighbours;
