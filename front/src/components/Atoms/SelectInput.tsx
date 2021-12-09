import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const SelectInput = ({
  name,
  control,
  label,
  data,
  changeHandler,
}: any) => {
  const generateSelectOptions = () => {
    return data?.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <section className='input'>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              onChange={(e) => {
                onChange(e);
                if (changeHandler) changeHandler(e);
              }}
              value={value || ''}
              label={label}
              required={true}
            >
              {generateSelectOptions()}
            </Select>
          </FormControl>
        )}
      />
    </section>
  );
};
