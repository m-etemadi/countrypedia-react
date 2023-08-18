import { useEffect, useState } from 'react';
import { COUNTRY_URL } from '../config';
import { countryObj, getJSON } from '../helper';

export function useCountry() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCountry, setActiveCountry] = useState(null);

  async function fetchCountry(value) {
    try {
      setIsLoading(true);
      setError('');

      const data = await getJSON(`${COUNTRY_URL}${value}`);
      setActiveCountry(countryObj(data.at(0)));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      if (!activeCountry) return;
      document.title = `CountryPedia | ${activeCountry.commonName}`;

      return function () {
        document.title = 'MoviePedia';
      };
    },
    [activeCountry]
  );

  return {
    isLoading,
    error,
    activeCountry,
    fetchCountry,
  };
}
