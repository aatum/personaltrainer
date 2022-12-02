import React from 'react';
import {CSVLink} from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';

export default function CSVdownload(props){

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