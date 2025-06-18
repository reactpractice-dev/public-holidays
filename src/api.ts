type CountriesResponsse = [
  {
    isoCode: string;
    name: [
      {
        language: string;
        text: string;
      }
    ];
    officialLanguages: string[];
  }
];

export const getCountries = async (): Promise<CountriesResponsse> => {
  const response = await fetch(
    "https://openholidaysapi.org/Countries?languageIsoCode=EN"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
};
