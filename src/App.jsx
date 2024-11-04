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
    <div>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
      <ul>
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
  );
}

export default App;
