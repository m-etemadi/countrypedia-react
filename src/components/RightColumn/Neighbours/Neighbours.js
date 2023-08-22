import { useEffect, useState } from 'react';
import { getJSON, neighboursObj } from '../../../helper';
import { NEIGHBOUR_URL } from '../../../config';
import Slider from './Slider';
import Loader from '../../Loader';
import ErrorMessage from '../../ErrorMessage';

function Neighbours({ selectedCountry, fetchCountry }) {
  const [neighbours, setNeighbours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { borders, commonName } = selectedCountry;

  useEffect(() => {
    if (!borders) return;

    async function fetchNeighbours() {
      try {
        setIsLoading(true);
        const neighboursArr = [];

        for (const n of borders) {
          let data = await getJSON(`${NEIGHBOUR_URL}${n}`);
          neighboursArr.push(neighboursObj(data.at(0)));
        }
        setNeighbours(neighboursArr);
      } catch {
        setError('Failed to fetch data!');
      } finally {
        setIsLoading(false);
      }
    }

    fetchNeighbours();
  }, [borders]);

  return (
    <article className="data-neighbours">
      <h3 className="heading__primary">Neighbours</h3>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          {borders ? (
            <Slider neighbours={neighbours} fetchCountry={fetchCountry} />
          ) : (
            <ErrorMessage
              message={`${commonName} does NOT have any land border!`}
            />
          )}
        </>
      )}
    </article>
  );
}

export default Neighbours;
