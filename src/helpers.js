import { TIMEOUT_SEC } from './config';

function countryObj(data) {
  const countryData = {
    flag: data?.flags?.png,
    area: data?.area,
    continent: data?.continents?.at(0),
    coords: {
      lat: data?.latlng?.at(0),
      lng: data?.latlng?.at(1),
    },
    officialName: data?.name.official,
    commonName: data?.name.common,
    capitalCity: data?.capital?.at(0),
    capitalCoords: {
      lat: data?.capitalInfo?.latlng?.at(0),
      lng: data?.capitalInfo?.latlng?.at(1),
    },
    population: data?.population,
    languages: data?.languages,
    currency: data?.currencies,
    carSide: data?.car?.side,
    independent: data?.independent,
    unMember: data?.unMember,
    timeZones: data?.timezones,
    startOfWeek: data?.startOfWeek,
    topLevelDomain: data?.tld?.at(0),
    borders: data?.borders,
  };

  return countryData;
}

function neighboursObj(data) {
  const neighboursData = {
    flag: data?.flags?.png,
    commonName: data?.name?.common,
    continent: data?.continents?.at(0),
    capitalCity: data?.capital?.at(0),
    population: data?.population,
    language: data?.languages,
  };

  return neighboursData;
}

function scrollToTop() {
  return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

function formatPopulation(population) {
  const maxDigit = { maximumFractionDigits: 0 };
  const formattedPopulation = population.toLocaleString(undefined, maxDigit);
  return formattedPopulation;
}

function reduceNameLength(country) {
  const max = 20;
  return country.length > max ? `${country.slice(0, max)} ...` : country;
}

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Loading failed! Please try again`));
    }, s * 1000);
  });
}

async function getJSON(url, errorMsg = 'Data NOT found!') {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

export {
  countryObj,
  neighboursObj,
  scrollToTop,
  formatPopulation,
  reduceNameLength,
  getJSON,
};
