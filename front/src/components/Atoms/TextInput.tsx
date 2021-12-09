import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const TextInput = ({ name, control, label }: any) => {
  return (
    <section className='input'>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value || ''}
            label={label}
            required={true}
          />
        )}
      />
    </section>
  );
};
