import React, { useState } from "react";
import { Temp, TempObj } from "./tempInterface";
import "./WeatherCard.css";
import { DayOfTheWeek, MonthOfYear } from "./dateEnums";
import { ChangeEvent } from "react";

interface WeatherCardProps {
  searchedCity: string;
  localObservationDateTime: string;
  weatherText: string;
  weatherIcon: number;
  temperature: Temp;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  searchedCity,
  localObservationDateTime,
  weatherText,
  weatherIcon,
  temperature,
}) => {
  const [tempUnit, setTempUnit] = useState<TempObj>("Metric");

  const handleTempUnitToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTempUnit("Imperial");
    } else {
      setTempUnit("Metric");
    }
  };

  const tempObject = temperature[tempUnit];

  const twoDigitIconNum: string = weatherIcon.toString().padStart(2, "0");

  const hours = localObservationDateTime.slice(
    localObservationDateTime.length - 6,
    localObservationDateTime.length - 3
  );

  const dateFromData = new Date(localObservationDateTime);

  let date: Date;
  if (hours.charAt(0) === "+") {
    date = new Date(
      dateFromData.getTime() + parseInt(hours.slice(1)) * 60 * 60 * 1000
    );
  } else {
    date = new Date(
      dateFromData.getTime() - parseInt(hours.slice(1)) * 60 * 60 * 1000
    );
  }

  const dayOfTheWeek = DayOfTheWeek[date.getUTCDay()];
  const month = MonthOfYear[date.getUTCMonth()];
  const dayNumber = date.getUTCDate().toString();
  const dateString = `${dayOfTheWeek} ${dayNumber} ${month}`;
  const timeString =
    date.getUTCHours().toString().padStart(2, "0") +
    ":" +
    date.getUTCMinutes().toString().padStart(2, "0");

  return (
    <div className="weatherCard">
      <h2 className="cityTitle">{searchedCity}</h2>
      <span className="dateTime">{`${dateString}, ${timeString}`}</span>
      <div className="tempIcon">
        <div>
          <h1>
            {tempObject.Value} &deg;{tempObject.Unit}
          </h1>
          <div className="tempSwitch">
            <input
              type="checkbox"
              id="fahrenheit"
              name="fahrenheit"
              onChange={handleTempUnitToggle}
            />
            <label htmlFor="fahrenheit">Fahrenheit</label>
          </div>
        </div>
        <div className="iconWrapper">
          <img src={`/icons/${twoDigitIconNum}.png`} alt="Weather icon" />
          <span>{weatherText}</span>
        </div>
      </div>
    </div>
  );
};
