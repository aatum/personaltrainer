import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: null,
        duration: '',
        activity: '',
        customer: props.link
    })

    const handleClickOpen = () => {
    setOpen(true);
}

    const handleClose = () => {
    setOpen(false);
}

    const handleSave = () => {
    training.date = new Date(training.date).toISOString();
    props.addTraining(training);
    setOpen(false);
}

    const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
}


return ( 
    <div>
        <Button variant='outlined' onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
           <TextField
            margin='dense'
            label='Date'
            value={training.date}
            onChange={inputChanged}
            fullWidth
            variant='standard'
            />
            <TextField
            margin='dense'
            label='Duration'
            value={training.duration}
            onChange={inputChanged}
            fullWidth
            variant='standard'
            />   <TextField
            margin='dense'
            label='Activity'
            value={training.activity}
            onChange={inputChanged}
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
);
}







