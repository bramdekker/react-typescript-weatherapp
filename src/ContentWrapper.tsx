import React, { useState, useEffect } from "react";
import "./ContentWrapper.css";
import { SearchBox } from "./SearchBox";
import axios from "axios";
import APIKEY from "./APIKEY";
import { WeatherCard } from "./WeatherCard";
import { Temp } from "./tempInterface";

const apiKey = APIKEY.key;
const cityKey = "localstorageCityKeyReactWeatherAPI";

const locUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
const currentUrl = (locKey: string) =>
  `http://dataservice.accuweather.com/currentconditions/v1/${locKey}`;

interface ContentWrapperProps {
  setParentState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CurrentWeather {
  IsDayTime: boolean;
  LocalObservationDateTime: string;
  WeatherIcon: number;
  WeatherText: string;
  Temperature: Temp;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  setParentState,
}) => {
  const [curInfo, setCurInfo] = useState<CurrentWeather>({
    IsDayTime: true,
    LocalObservationDateTime: "",
    WeatherIcon: 0,
    WeatherText: "",
    Temperature: {
      Metric: {
        Value: 0,
        Unit: "",
        UnitType: 0,
      },
      Imperial: {
        Value: 0,
        Unit: "",
        UnitType: 0,
      },
    },
  });

  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem(cityKey);
    if (savedCity) {
      return savedCity;
    }

    return "";
  });

  useEffect(() => {
    setParentState(curInfo.IsDayTime);
  }, [curInfo, setParentState]);

  const formatCityString = (input: string) => {
    let output = "";
    input.split(" ").forEach((word) => {
      output += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });

    return output;
  };

  useEffect(() => {
    if (city) {
      getCurrentWeather(city);
    }
  }, []);

  const wrapperClasses =
    "content-wrapper " + (curInfo.IsDayTime ? "day" : "night");

  const getCurrentWeather = (text: string): void => {
    setCity(formatCityString(text));
    localStorage.setItem(cityKey, formatCityString(text));

    let locactionKey: string;
    let dataObject: CurrentWeather;

    axios
      .get(locUrl, {
        params: {
          apikey: apiKey,
          q: text,
        },
      })
      .then((response) => {
        if (response.data) {
          locactionKey = response.data[0].Key;

          return axios.get(currentUrl(locactionKey), {
            params: {
              apikey: apiKey,
            },
          });
        }
      })
      .then((response) => {
        if (response && response.data) {
          dataObject = (({
            IsDayTime,
            LocalObservationDateTime,
            WeatherIcon,
            WeatherText,
            Temperature,
          }) => ({
            IsDayTime,
            LocalObservationDateTime,
            WeatherIcon,
            WeatherText,
            Temperature,
          }))(response.data[0]);

          setCurInfo(dataObject);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={wrapperClasses}>
      <h1>React Weather App</h1>
      <h3>
        Powered by{" "}
        <a
          href="https://developer.accuweather.com/"
          title="Go to AccuWeather API"
        >
          AccuWeather
        </a>
      </h3>
      <SearchBox onClick={getCurrentWeather} initialInput={city} />
      {curInfo.WeatherText ? (
        <WeatherCard
          searchedCity={city}
          localObservationDateTime={curInfo.LocalObservationDateTime}
          weatherIcon={curInfo.WeatherIcon}
          weatherText={curInfo.WeatherText}
          temperature={curInfo.Temperature}
        />
      ) : (
        <div className="noCard">
          Enter a city to see the current weather there.
        </div>
      )}
    </div>
  );
};
