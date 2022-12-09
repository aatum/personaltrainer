import React from 'react';
import { Button } from '@mui/material';
import {CSVLink} from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';

export default function CSVdownload(props){

// data that comes to the CSV-file
const csvData = [
    {
        headerName: 'First name',
        accessor: 'firstname'
    },
    {
        headerName: 'Last name',
        accessor: 'lastname'
    },
    {
        headerName: 'Street address',
        accessor: 'streetaddress'
    },
    {
        headerName: 'Post code',
        accessor: 'postcode'
    },
    {
        headerName: 'City',
        accessor: 'city'
    },
    {
        headerName: 'Email',
        accessor: 'email'
    },
    {
        headerName: 'Phone',
        accessor: 'phone'
    }
]

// returns the customer data as a CSV-file
return(
    <CSVLink
        data={props.customers}
        csvData={csvData}
        filename={'customerdata.csv'}
    ><Button
    startIcon={<DownloadIcon/>}
    >Download as CSV file
    </Button>
    </CSVLink>
)
}