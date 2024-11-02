import { useEffect, useState } from "react";
import "./App.css";

const getPublicHolidays = async () => {
  const params = new URLSearchParams({
    countryIsoCode: "NL",
    languageIsoCode: "EN",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
  });
  const response = await fetch(
    `https://openholidaysapi.org/PublicHolidays?${params}`
  );
  return response.json();
};

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

  useEffect(() => {
    getPublicHolidays().then((data) => {
      setHolidays(
        data.map((holiday) => ({
          id: holiday.id,
          name: holiday.name?.[0].text,
          startDate: holiday.startDate,
          endDate: holiday.endDate,
        }))
      );
    });
  }, []);

  return (
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
  );
}

export default App;
