import { DataGrid, GridApi, GridCellValue, GridColDef } from '@mui/x-data-grid';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

const DataTable = ({ items, handleRemove, handleEdit }: any) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 130, hide: true },
    { field: 'firstName', headerName: 'Nombres', width: 130 },
    { field: 'lastName', headerName: 'Apellidos', width: 130 },
    { field: 'plateNumber', headerName: 'Número de placa', width: 170 },
    { field: 'carBrand', headerName: 'Marca', width: 130 },
    { field: 'carModel', headerName: 'Modelo', width: 130 },
    { field: 'carType', headerName: 'Tipo', width: 130 },
    { field: 'country', headerName: 'País', width: 130 },
    { field: 'state', headerName: 'Estado', width: 130 },
    { field: 'city', headerName: 'Ciudad', width: 130 },
    {
      field: 'Opciones',
      headerName: 'Ciudad',
      width: 130,
      sortable: false,

      renderCell: (params) => {
        const onClick = (e: any, edit: boolean) => {
          e.stopPropagation();

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          if (!edit) handleRemove(String(thisRow.id));
          if (edit) handleEdit(String(thisRow.id));
        };

        return (
          <Grid>
            <IconButton
              aria-label='delete'
              onClick={(e) => {
                onClick(e, false);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label='edit'
              onClick={(e) => {
                onClick(e, true);
              }}
            >
              <ModeIcon />
            </IconButton>
          </Grid>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={items}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  );
};

export default DataTable;
