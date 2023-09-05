import { useCountries } from '../../../context/CountriesContext';
import { useEffect, useReducer } from 'react';
import { getJSON, neighboursObj } from '../../../helpers';
import { NEIGHBOUR_URL } from '../../../config';
import Slider from './Slider';
import Spinner from '../../Spinner';
import Message from '../../Message';

const initialState = {
  neighbours: [],
  neighboursLoading: false,
  neighboursError: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'neighbours/loading':
      return { ...state, neighboursLoading: true, neighboursError: '' };

    case 'neighbours/loaded':
      return {
        ...state,
        neighboursLoading: false,
        neighbours: action.payload,
      };

    case 'neighbours/rejected':
      return {
        ...state,
        neighboursLoading: false,
        neighboursError: action.payload,
        neighbours: [],
      };

    default:
      throw new Error('Unknown action type');
  }
}

function Neighbours() {
  const {
    selectedCountry: { borders, commonName },
  } = useCountries();

  const [{ neighbours, neighboursLoading, neighboursError }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    if (!borders) return;

    async function fetchNeighbours() {
      dispatch({ type: 'neighbours/loading' });

      try {
        const neighboursArr = [];

        for (const n of borders) {
          let data = await getJSON(`${NEIGHBOUR_URL}${n}`);
          neighboursArr.push(neighboursObj(data.at(0)));

          dispatch({
            type: 'neighbours/loaded',
            payload: neighboursArr,
          });
        }
      } catch {
        dispatch({
          type: 'neighbours/rejected',
          payload: 'Failed to fetch data!',
        });
      }
    }

    fetchNeighbours();
  }, [borders]);

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
