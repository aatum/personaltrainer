import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// creating AddTraining-function using props and the columndefs
export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
       firstname: '',
       lastname: '',
       streetaddress: '',
       postcode: '',
       city: '',
       email: '',
       phone: '' 
    })

// handles the opening of the form
    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.data);
        setCustomer({
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        streetaddress: props.data.streetaddress,
        postcode: props.data.postcode,
        city: props.data.city,
        email: props.data.email,
        phone: props.data.phone,
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    // handles saving of the updated customer
    const handleSave = () => {
        props.updateCustomer(customer, props.data.links[0].href);
        setOpen(false);
    };
    
    // returns the Edit Customer-form
    return (
        <div>
          <Button size="small" onClick={handleClickOpen}>
            Edit 
          </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
                <TextField
                margin='dense'
                label='First name'
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                fullWidth
                variant='standard'
                />
                   <TextField
                margin='dense'
                label='Last name'
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname: e.target.value})}
                fullWidth
                variant='standard'
                />   <TextField
                margin='dense'
                label='Street address'
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                fullWidth
                variant='standard'
                />   <TextField
                margin='dense'
                label='Post code'
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode: e.target.value})}
                fullWidth
                variant='standard'
                />   <TextField
                margin='dense'
                label='City'
                value={customer.city}
                onChange={e => setCustomer({...customer, city: e.target.value})}
                fullWidth
                variant='standard'
                />   <TextField
                margin='dense'
                label='Email'
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
                fullWidth
                variant='standard'
                />   <TextField
                margin='dense'
                label='Phone'
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
                fullWidth
                variant='standard'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </div>
)}
