import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Delete from "../../delete.svg"




export default function DataTable({filteredData,setView,setItem,doDelete}) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'email', headerName: 'Email', width: 170 },
        { field: 'name', headerName: 'Name', width: 130 },
        {
          field: 'phone',
          headerName: 'Contact Number',
          type: 'number',
          width: 140,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 130,
          renderCell: (params) => (
            <div style={{display:"flex",flexDirection:"row",gap:2}}>
              <button onClick={() => handleEdit(params.row)}>view</button>
              <img  src={Delete} onClick={() => handleDelete(params.row)}/>
            </div>
          ),
        },
        
      ];
    const handleEdit = (row) => {
        // Handle edit logic here
        setItem(row)
        setView(true)
        console.log(`Edit row with id ${row}`,row);
      };
      
      const handleDelete = (row) => {
        // Handle delete logic here
        doDelete(row)
        console.log(`Delete row with id ${row}`);
      };
    console.log("filteredData",filteredData);
  return (
    <div style={{ height: 400, width: '100%',marginTop:4 }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}