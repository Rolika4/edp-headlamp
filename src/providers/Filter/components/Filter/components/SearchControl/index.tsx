import { TextField } from '@mui/material';
import React from 'react';
import { useFilterContext } from '../../../../hooks';

export const SearchControl = () => {
  const { filter, setFilterItem } = useFilterContext<unknown, 'search'>();

  return (
    <TextField
      fullWidth
      id="standard-search"
      label={'Search'}
      type="search"
      value={filter.values.search}
      InputLabelProps={{ shrink: true }}
      InputProps={{ role: 'search' }}
      placeholder={'Type to search'}
      onChange={(event) => {
        setFilterItem('search', event.target.value);
      }}
    />
  );
};
