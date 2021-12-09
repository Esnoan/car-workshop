import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { Divider, Grid } from '@mui/material';

import { SelectInput } from '../Atoms/SelectInput';
import { TextInput } from '../Atoms/TextInput';
import Location from '../Molecules/Location';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const options = [
  {
    label: 'Cédula',
    value: '1',
  },
  {
    label: 'Cédula de extranjería',
    value: '2',
  },
  {
    label: 'Pasaporte',
    value: '3',
  },
  {
    label: 'Tarjeta de identidad',
    value: '4',
  },
];

const carTypes = [
  {
    label: 'Vehiculo',
    value: '1',
  },
  {
    label: 'Motocicleta',
    value: '2',
  },
  {
    label: 'Motocarro',
    value: '3',
  },
  {
    label: 'Automóvil de 3 ruedas',
    value: '4',
  },
  {
    label: 'Quad',
    value: '5',
  },
  {
    label: 'Autobus',
    value: '6',
  },
  {
    label: 'Furgón y furgoneta',
    value: '7',
  },
];

interface IProps {
  id?: string;
}

const baseUrl = '/api/cars';

const CreateCarForm = ({ id }: IProps) => {
  const { handleSubmit, control, setValue, getValues } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      axios
        .get(`${baseUrl}/${id}`)
        .then((res) => {
          setValue('firstName', res.data.data.car.firstName);
          setValue('lastName', res.data.data.car.lastName);
          setValue('carBrand', res.data.data.car.carBrand);
          setValue('carModel', res.data.data.car.carModel);
          setValue('carType', res.data.data.car.carType);
          setValue('city', res.data.data.car.city);
          setValue('country', res.data.data.car.country);
          setValue('state', res.data.data.car.state);
          setValue('documentNumber', res.data.data.car.documentNumber);
          setValue('documentType', res.data.data.car.documentType);
          setValue('plateNumber', res.data.data.car.plateNumber);
          setCountry(res.data.data.car.country);
          setState(res.data.data.car.state);
        })
        .catch((err) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    if (editMode) {
      if (checkInputs()) {
        axios
          .put(`${baseUrl}/${id}`, data)
          .then((res) => {
            enqueueSnackbar('Registro editado correctamente!', {
              variant: 'success',
            });
            navigate('/');
          })
          .catch((err) => {});
      } else {
        enqueueSnackbar('Debes llenar todos los campos!', {
          variant: 'error',
        });
      }
    } else {
      if (checkInputs()) {
        axios
          .post(baseUrl, data)
          .then((res) => {
            enqueueSnackbar('Registro creado correctamente!', {
              variant: 'success',
            });
            navigate('/');
          })
          .catch((err) => {});
      } else {
        enqueueSnackbar('Debes llenar todos los campos!', {
          variant: 'error',
        });
      }
    }
  };

  const checkInputs = () => {
    const firstName = getValues('firstName');
    const lastName = getValues('lastName');
    const documentType = getValues('documentType');
    const documentNumber = getValues('documentNumber');
    const plateNumber = getValues('plateNumber');
    const carType = getValues('carType');
    const carBrand = getValues('carBrand');
    const carModel = getValues('carModel');
    const city = getValues('city');
    const country = getValues('country');
    const state = getValues('state');

    const verify =
      firstName &&
      lastName &&
      documentType &&
      documentNumber &&
      plateNumber &&
      carType &&
      carBrand &&
      carModel &&
      city &&
      country &&
      state;

    if (verify) {
      return true;
    } else {
      return false;
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form className='form'>
      <Divider>Propietario</Divider>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput name={'firstName'} control={control} label={'Nombres'} />
        </Grid>
        <Grid item xs={6}>
          <TextInput name={'lastName'} control={control} label={'Apellidos'} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectInput
            name={'documentType'}
            control={control}
            label={'Tipo de identificación'}
            data={options}
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            name={'documentNumber'}
            control={control}
            label={'Número de identidad'}
          />
        </Grid>
      </Grid>

      <Divider>Datos del vehículo</Divider>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput
            name={'plateNumber'}
            control={control}
            label={'Número de placa'}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectInput
            name={'carType'}
            control={control}
            label={'Tipo de carro'}
            data={carTypes}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput name={'carBrand'} control={control} label={'Marca'} />
        </Grid>
        <Grid item xs={6}>
          <TextInput name={'carModel'} control={control} label={'Modelo'} />
        </Grid>
      </Grid>

      <Divider>Ubicación</Divider>
      <Location
        control={control}
        selectedCountry={country}
        selectedState={state}
      />
      <section className='actions'>
        <Button onClick={() => handleCancel()} variant={'outlined'}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant='contained'>
          Guardar
        </Button>
      </section>
    </form>
  );
};

export default CreateCarForm;
