import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { api } from 'api'

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

const Search = ({label, field, url, onChange}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(100); 
      const response = await  api(url)
      const persons = await response.data.data
      if (active)  setOptions(persons)
    })();

    return () => {
      active = false;
    };
  }, [loading, url]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const toggleOpen = () => setOpen(!open)

  return (
    <Autocomplete
      id="search"
      open={open}
      loading={loading}
      options={options}
      onOpen={toggleOpen}
      onClose={toggleOpen}
      style={{ width: '100%' }}
      getOptionLabel={(option) => option.firstname}
      onChange={(event, newValue) => onChange(newValue) }
      getOptionSelected={(option, value) => option[field] === value[field]}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          onChange={onChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} /> }
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default Search