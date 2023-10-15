import { createContext, useCallback, useContext, useReducer } from 'react';
import { getJSON, neighboursObj } from '../helpers';
import { NEIGHBOUR_URL } from '../config';

const neighboursContext = createContext();

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

function NeighboursProvider({ children }) {
  const [{ neighbours, neighboursLoading, neighboursError }, dispatch] =
    useReducer(reducer, initialState);

  const fetchNeighbours = useCallback(async function fetchNeighbours(borders) {
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
  }, []);

  return (
    <neighboursContext.Provider
      value={{
        neighbours,
        neighboursLoading,
        neighboursError,
        fetchNeighbours,

        dispatch,
      }}
    >
      {children}
    </neighboursContext.Provider>
  );
}

function useNeighbours() {
  const context = useContext(neighboursContext);
  if (context === undefined)
    throw new Error(
      'NeighboursContext was used outside the NeighboursProvider'
    );
  return context;
}

export { NeighboursProvider, useNeighbours };
