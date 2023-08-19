import { TIMEOUT_SEC } from './config';

export function countryObj(data) {
  const countryData = {
    flag: data?.flags?.png,
    area: data?.area,
    continent: data?.continents?.[0],
    coords: {
      lat: data?.latlng?.[0],
      lng: data?.latlng?.[1],
    },
    officialName: data?.name.official,
    commonName: data?.name.common,
    capitalCity: data?.capital?.[0],
    capitalCoords: {
      lat: data?.capitalInfo?.latlng?.[0],
      lng: data?.capitalInfo?.latlng?.[1],
    },
    population: data?.population,
    languages: data?.languages,
    currency: data?.currencies,
    carSide: data?.car?.side,
    independent: data?.independent,
    unMember: data?.unMember,
    timeZones: data?.timezones,
    startOfWeek: data?.startOfWeek,
    topLevelDomain: data?.tld?.[0],
  };

  return countryData;
}

export function formatPopulation(population) {
  const maxDigit = { maximumFractionDigits: 0 };
  const formattedPopulation = population.toLocaleString(undefined, maxDigit);
  return formattedPopulation;
}

export function reduceNameLength(country) {
  return country.slice(0, 20) + '...';
}

export function correctName(country) {
  const toLowerName = country.toLowerCase();

  switch (toLowerName) {
    case 'iran':
      return 'Islamic Republic of Iran';

    case 'oman':
      return 'Sultanate of Oman';

    case 'mali':
      return 'Republic of Mali';

    case 'netherlands':
      return 'Kingdom of the Netherlands';

    case 'sudan':
      return 'Republic of the Sudan';

    default:
      return toLowerName;
  }
}

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Loading failed! Please try again`));
    }, s * 1000);
  });
}

export async function getJSON(url, errorMsg = 'Country NOT found!') {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
