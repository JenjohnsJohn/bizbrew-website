export interface GermanCity {
  name: string;
  slug: string;
  state: string;
  population: number;
  region: string;
  keyIndustries: string[];
  techScene: string;
  notableCompanies: string[];
  universities: string[];
  nearbyAreas: string[];
  economicFocus: string;
  digitalChallenges: string[];
}

export interface EUCountry {
  name: string;
  slug: string;
  capital: string;
  population: number;
  techHubs: string[];
  notableCompanies: string[];
  digitalEconomy: string;
  euDigitalRegulations: string;
  nearbyMarkets: string[];
}

export type Location = GermanCity | EUCountry;

export function isGermanCity(loc: Location): loc is GermanCity {
  return 'state' in loc;
}

export function isEUCountry(loc: Location): loc is EUCountry {
  return 'capital' in loc;
}
