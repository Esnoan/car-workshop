import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router';
import PageTemplate from '../Templates/Page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import exportFromJSON from 'export-from-json';
import DataTable from '../Organism/DataTable';
import { useSnackbar } from 'notistack';

const baseUrl = '/api/cars';

const MainPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [searchParam] = useState([
    'firstName',
    'lastName',
    'plateNumber',
    'carBrand',
    'carModel',
    'carType',
    'country',
    'state',
    'city',
  ]);

  useEffect(() => {
    getCars();
  }, []);

  const handleXLSExport = () => {
    const data: any = [];
    cars.forEach((car: any) => {
      const { id, _id, __v, ...rest } = car;
      data.push(rest);
    });
    const fileName = 'datos';
    const exportType = exportFromJSON.types.xls;
    /*const fields = [
      'Nombres',
      'Apellidos',
      'Tipo de documento',
      'Número de documento',
      'Número de placa',
      'Tipo de Carro',
      'Marca del auto',
      'Modelo del auto',
      'País',
      'Estado',
      'Ciudad',
      'Fecha creación',
    ];*/
    exportFromJSON({
      data: data,
      fileName: fileName,
      // fields: fields,
      exportType: exportType,
    });
  };

  const getCars = () => {
    axios
      .get(baseUrl)
      .then((res) => {
        let cars: any = [];
        res.data.data.cars.forEach((element: any) => {
          element.id = element._id;
          cars.push(element);
        });
        setCars(cars);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err.message);
      });
  };

  const handleCreateCar = () => {
    navigate('/new');
  };

  const handleRemoveCar = (carId: string) => {
    axios
      .delete(`${baseUrl}/${carId}`)
      .then((res) => {
        getCars();
        enqueueSnackbar('Registro eliminado correctamente!', {
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Ocurrio un error ${err.message}`, {
          variant: 'error',
        });
      });
  };

  const handleEditCar = (carId: string) => {
    navigate(`/edit/${carId}`);
  };

  const filterCars = () => {
    return cars
      .filter((car: any) => {
        return searchParam.some((newItem: any) => {
          return (
            car[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      })
      .reverse();
  };

  const ShowData = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <DataTable
          items={filterCars()}
          handleRemove={handleRemoveCar}
          handleEdit={handleEditCar}
        />
      );
    }
  };

  return (
    <PageTemplate>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={2}
        sx={{ my: 2 }}
      >
        <FormControl sx={{ width: '40rem' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>Buscar</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type='text'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' edge='end'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        <Button variant='contained' onClick={handleXLSExport} color='success'>
          Descargar
        </Button>
        <Button variant='contained' onClick={handleCreateCar}>
          Agregar nuevo
        </Button>
      </Stack>
      <div style={{ height: 650, width: '100%' }}>
        <ShowData />
      </div>
    </PageTemplate>
  );
};

export default MainPage;
