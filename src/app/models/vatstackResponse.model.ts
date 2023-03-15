export type VatstackResponse = {
  has_more: boolean;
  rates_count: number;
  rates: CountryRate[];
};

export type CountryRate = {
  abbreviation: string;
  categories: {
    audiobook?: number;
    broadcasting?: number;
    ebook?: number;
    eperiodical?: number;
    eservice?: number;
    telecommunication?: number;
  };
  country_code: string;
  country_name: string;
  currency: string;
  local_name: string;
  member_state: boolean;
  reduced_rates: number[];
  standard_rate: number;
  vat_abbreviation: string;
  vat_local_name: string;
};

export type CountryRateDTO = {
  code: string;
  name: string;
  isEUMember: boolean;
  rate: number;
};
