import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL_CUSTOMERS } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Customer(){
const [customers, setCustomers] = useState([]);

const [columnDefs] = useState([
    //{field: 'id', sortable: true, filter: true},
    {field: 'firstname', sortable: true, filter: true},
    {field: 'lastname', sortable: true, filter: true},
    {field: 'streetaddress', sortable: true, filter: true},
    {field: 'postcode', sortable: true, filter: true},
    {field: 'city', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true},
    {
        width: 120,
        cellRenderer: params => <EditCustomer data={params.data} editCar={updateCustomer}/>
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
            alert('Something went wrong in the addition!')
    })
    .catch(err => console.error(err))
}

return(
    <>
    <AddCustomer addCustomer={addCustomer}/>
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
