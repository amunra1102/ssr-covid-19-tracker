import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const CovidContext = React.createContext();

const url = process.env.SERVER_API_PATH;

const fetchData = async country => {
  const changeableUrl = country ? `${url}/countries/${country}` : url;

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
    return error;
  }
};

export const CovidProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState('');
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    fetchCountries().then(res => setCountries(res)).catch(() => setCountries([]));
    fetchData().then(res => setData(res)).catch(() => setData({}));
  }, []);

  useEffect(() => {
    if (!countrySelected) {
      fetchDailyData().then(res => setDailyData(res)).catch(() => setDailyData({}));
    }
   }, [countrySelected])

  const handleCountryChange = country => {
    setCountrySelected(country);
    fetchData(country).then(res => setData(res)).catch(() => setData({}));
  }

  return (
    <CovidContext.Provider
      value={{
        data,
        dailyData,
        countries,
        countrySelected,
        handleCountryChange
      }}
    >
      {children}
    </CovidContext.Provider>
  );
};

export const useCovidContext = () => React.useContext(CovidContext);
