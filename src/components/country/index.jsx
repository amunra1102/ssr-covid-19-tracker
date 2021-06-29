import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { useCovidContext } from 'context';

import styles from './country.module.css';

const Country = () => {
  const { countries, handleCountryChange } = useCovidContext();

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value=""></option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Country;
