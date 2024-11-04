export const getPublicHolidays = async ({ countryIsoCode }) => {
  const params = new URLSearchParams({
    countryIsoCode,
    languageIsoCode: "EN",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
  });
  const response = await fetch(
    `https://openholidaysapi.org/PublicHolidays?${params}`
  );
  const data = await response.json();
  return data.map((holiday) => ({
    id: holiday.id,
    name: holiday.name?.[0].text,
    startDate: holiday.startDate,
    endDate: holiday.endDate,
  }));
};

export const getSupportedCountries = async () => {
  const params = new URLSearchParams({
    languageIsoCode: "EN",
  });
  const response = await fetch(
    `https://openholidaysapi.org/Countries?${params}`
  );
  const data = await response.json();
  return data.map((country) => ({
    isoCode: country.isoCode,
    name: country.name?.[0].text,
  }));
};
