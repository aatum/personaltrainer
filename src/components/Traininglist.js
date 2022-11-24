import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL_TRAININGS } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import Customer from './Customerlist';

export default function Training(){
    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true,
        valueFormatter: function (params){
        return moment (params.value).format ('DD-MM-YYYY, HH:MM');
        }},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'customer.firstname', sortable: true, filter: true},
        {field: 'customer.lastname', sortable: true, filter: true},
    ])

    useEffect(() => {
        getTrainings()
    }, [])
 
    const getTrainings = () => {
        fetch(API_URL_TRAININGS)
        .then(response => response.json())
        .then(data => setTrainings(data.content));
    };

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
    