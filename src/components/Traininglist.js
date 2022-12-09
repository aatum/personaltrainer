import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL_TRAININGS_GET } from '../constants';
import { API_URL_TRAININGS } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Customer from './Customerlist';

// creating Training-function with columns
export default function Training(){
    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true,
        valueFormatter: function (params){
        return moment (params.value).format ('DD-MM-YYYY, HH:MM');
        }},
        {field: 'duration', headerName: 'Duration (min)', sortable: true, filter: true},
        {field: 'activity', headerName: 'Activity', sortable: true, filter: true},
        {field: 'customer.firstname', headerName: 'Customer (first name)', sortable: true, filter: true},
        {field: 'customer.lastname', headerName: 'Customer (last name)', sortable: true, filter: true},
        {
            width: 120,
            cellRenderer: params => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteTraining(params.data.id)}>Delete</Button>
        }   
    ])

// using the useEffect-hook to get the trainings
    useEffect(() => {
        getTrainings()
    }, [])

// getting training data with fetch from the API
    const getTrainings = () => {
        fetch(API_URL_TRAININGS_GET)
            .then(response => response.json())
            .then(data => {setTrainings(data);
            })
            .catch(err => console.log(err));
    }

// deleting training with fetch from the API and id, using DELETE-method
    const deleteTraining = (id) => {
        window.confirm('Are you sure?')
        fetch(API_URL_TRAININGS + id, {method: 'DELETE'})
        .then(response => {
            if (response.ok)
                getTrainings();
            else
                alert('Something went wrong in deletion');
        })
        .catch(err => console.error(err))
    }

// returning trainings as a list
    return(
        <>
        <div className='ag-theme-material' style={{height: 650, width: '90%', margin:'auto'}}>
        <AgGridReact
            rowData={trainings}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
        />
        </div>
        </>
    );
    }
    