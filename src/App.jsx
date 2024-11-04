import { useEffect, useState } from "react";
import { getPublicHolidays, getSupportedCountries } from "./api";
import "./App.css";

const formatHolidayDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
};

const formatHolidayInterval = (holiday) => {
  return `${formatHolidayDate(holiday.startDate)}${
    holiday.endDate !== holiday.startDate
      ? " - " + formatHolidayDate(holiday.endDate)
      : ""
  }`;
};

function App() {
  const [holidays, setHolidays] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("NL");

  useEffect(() => {
    // Initial request to fetch the public holidays for the Netherlands
    getPublicHolidays({ countryIsoCode: selectedCountry }).then((data) =>
      setHolidays(data)
    );
  }, [selectedCountry]);

  useEffect(() => {
    // Initial request to fetch the supported countries
    getSupportedCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mt-4 mb-6">
        Public Holidays
      </h1>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
      <div className="mt-6">
        <ul className="mx-auto w-fit">
          {holidays.map((holiday) => (
            <li key={holiday.id}>
              {formatHolidayInterval(holiday)}
              {" - "}
              <em style={{ fontSize: "18px", fontWeight: "bold" }}>
                {holiday.name}
              </em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
