import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { FullScreenDialog } from '../adderClient/dialog'

export const columns: GridColDef[] = [
  { field: 'number', headerName: '№', width: 110 },
  { field: 'id', headerName: '', width: 110, hide: true },
  {
    field: 'Date',
    headerName: 'Дата',
    width: 150,
  },
  {
    field: 'AutoNumber',
    headerName: 'Номер авто',
    width: 200,
  },
  {
    field: 'Name',
    headerName: 'Ім\'я клієнта',
    width: 200,
  },
  {
    field: 'Auto',
    headerName: 'Назва авто',
    width: 200,
  },
  {
    field: 'Number',
    headerName: 'Номер телефону',
    // type: 'number',
    width: 200,
  },
  {
    field: 'Summ',
    headerName: 'Сума',
    width: 160,
  },
];

const json = localStorage.getItem('clientsSto');
let rows: any = [];

if(json !== null) {
  rows = JSON.parse(json);
}

export const DataTable = () => {
  const [chooseClient, SetChooseClient] = useState<string | number>('');

  const choosenClient = (par: number | string) => {
    SetChooseClient(par);
  }



  return (
    <div style={{ height: '100%', margin: '10px 58px 0 20px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        disableSelectionOnClick
        showCellRightBorder
        onRowClick={(e) => choosenClient(e.id)}
      />

      <FullScreenDialog choosenClient={choosenClient} client={chooseClient}/>
    </div>
  );
};
