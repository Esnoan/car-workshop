import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SelectInput } from '../Atoms/SelectInput';

const Location = ({
  control,
  selectedCountry,
  selectedState,
  selectedCity,
}: any) => {
  const baseURL = 'https://api.countrystatecity.in/v1/countries';

  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (selectedCountry !== '') {
      setCountry(selectedCountry);
      getStates(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState !== '') {
      getCities(selectedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          'X-CSCAPI-KEY': process.env.REACT_APP_LOCATION_TOKEN ?? '',
        },
      })
      .then((response) => {
        setCountries(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStates = (country: string) => {
    setCountry(country);
    axios
      .get(`${baseURL}/${country}/states`, {
        headers: {
          'X-CSCAPI-KEY': process.env.REACT_APP_LOCATION_TOKEN ?? '',
        },
      })
      .then((response) => {
        setStates(response.data);
      });
  };

  const getCities = (state: string) => {
    axios
      .get(`${baseURL}/${country}/states/${state}/cities`, {
        headers: {
          'X-CSCAPI-KEY': process.env.REACT_APP_LOCATION_TOKEN ?? '',
        },
      })
      .then((response) => {
        setCities(response.data);
      });
  };

  const countryChangeHandler = (e: any) => {
    getStates(e.target.value);
  };

  const stateChangeHandler = (e: any) => {
    getCities(e.target.value);
  };

  const countriesToOptions = () => {
    const options = countries?.map((country: any) => ({
      label: country.name,
      value: country.iso2,
    }));
    return options;
  };

  const statesToOption = () => {
    const options = states?.map((country: any) => ({
      label: country.name,
      value: country.iso2,
    }));
    return options;
  };

  const citiesToOption = () => {
    const options = cities?.map((country: any) => ({
      label: country.name,
      value: country.id,
    }));
    return options;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectInput
          name={'country'}
          control={control}
          label={'País'}
          data={countriesToOptions()}
          changeHandler={countryChangeHandler}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          name={'state'}
          control={control}
          label={'Departamento'}
          data={statesToOption()}
          changeHandler={stateChangeHandler}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          name={'city'}
          control={control}
          label={'Ciudad'}
          data={citiesToOption()}
        />
      </Grid>
    </Grid>
  );
};

export default Location;
