import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL_CUSTOMERS, API_URL_TRAININGS, API_URL_TRAININGS_GET } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import CSVdownload from './CSV';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Customer(){
const [customers, setCustomers] = useState([]);
const [columnDefs] = useState([
    //{field: 'id', sortable: true, filter: true},
    {field: 'firstname', headerName: 'First name', sortable: true, filter: true},
    {field: 'lastname', headerName: 'Last name', sortable: true, filter: true},
    {field: 'streetaddress', headerName: 'Street address', sortable: true, filter: true},
    {field: 'postcode', headerName: 'Post code', sortable: true, filter: true},
    {field: 'city', headerName: 'City', sortable: true, filter: true},
    {field: 'email', headerName: 'Email', sortable: true, filter: true},
    {field: 'phone', headerName: 'Phone', sortable: true, filter: true},
    {
        width: 170,
        cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining}/>
    },
    {
            width: 120,
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer}/>
    },
    {
            width: 120,
            cellRenderer: params => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteCustomer(params.data)}>Delete</Button>
    }
])


useEffect(() => {
    getCustomers();
}, []);

const getCustomers = () => {
    fetch(API_URL_CUSTOMERS)
    .then(response => response.json())
    .then(data => setCustomers(data.content))
}

const deleteCustomer = (data) => {
    window.confirm('Are you sure?')
    fetch(data.links[1].href, {method: 'DELETE'})
    .then(response => {
        if (response.ok)
            getCustomers();
        else
            alert('Something went wrong in deletion');
    })
    .catch(err => console.error(err))
}

const addCustomer = (customer) => {
    fetch(API_URL_CUSTOMERS, {
        method: 'POST', 
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (response.ok)
            getCustomers();
        else
            alert('Something went wrong in the addition!')
    })
    .catch(err => console.error(err))
}

const updateCustomer = (customer, url) => {
    fetch(url, {
        method: 'PUT',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (response.ok)
            getCustomers();
        else
            alert('Something went wrong in editing!')
    })
    .catch(err => console.error(err))
}

const addTraining = (selectedCustomer) => {
    fetch(API_URL_TRAININGS, {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(selectedCustomer)
    })
    .then(response => {
        if (response.ok)
            getCustomers();
        else
            alert('Something went wrong in editing!')
    })
    .catch(err => console.error(err))
}

return(
    <>
    <AddCustomer addCustomer={addCustomer}/>
    <CSVdownload customers={customers}/>
    <div className='ag-theme-material' style={{height: 650, width: '100%', margin:'auto'}}>
    <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
    />
    </div>
    </>
);
}