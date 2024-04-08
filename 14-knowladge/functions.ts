import { FunctionsType } from 'api/openai';

interface NBPCurrencyResponse {
  table: 'A';
  currency: string;
  code: string;
  rates: [{ no: string; effectiveDate: string; mid: number }];
}
const getCurrency = async function (currency: string) {
  const api = await fetch(
    `http://api.nbp.pl/api/exchangerates/rates/a/${currency}?format=json`
  ).then<NBPCurrencyResponse>((r) => r.json());

  if (api.rates.length) {
    console.log('[getCurrency] response', api.rates[0].mid);
    return api.rates[0].mid;
  }

  return 0;
};

interface RestCountriesResponse {
  population: number;
}
const getCountryPopulation = async function (country: string) {
  const api = await fetch(
    `https://restcountries.com/v3.1/alpha/${country}`
  ).then<RestCountriesResponse[]>((r) => r.json());

  if (api.length) {
    console.log('[getCountryPopulation] response', api[0].population);
    return api[0].population;
  }

  return 0;
};

export const functions: FunctionsType = [
  {
    type: 'function',
    function: {
      name: 'getCountryPopulation',
      description: 'Pobiera informację o ilości mieszkańców danego kraju',
      parameters: {
        type: 'object',
        properties: {
          arg: {
            type: 'string',
            description: 'Kod kraju np. de, pl, us',
          },
        },
        required: ['arg'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getCurrency',
      description: 'Pobiera aktualny kurs danej waluty',
      parameters: {
        type: 'object',
        properties: {
          arg: {
            type: 'string',
            description:
              'trzyznakowy kod waluty w standardzie ISO 4217 np. eur, pln, nok, usd',
          },
        },
        required: ['arg'],
      },
    },
  },
];

export const fn = {
  getCurrency,
  getCountryPopulation,
};
