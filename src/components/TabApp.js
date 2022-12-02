import React, { useState } from 'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Customer from './Customerlist';
import Training from './Traininglist';
import TrainerCalendar from './TrainingCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';

function TabApp(){
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    };
    return(
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab icon={<PeopleIcon />} value='one' label='Customers'/>
            <Tab icon={<FitnessCenterIcon />} value='two' label='Trainings'/>
            <Tab icon={<CalendarMonthIcon />} value='three' label='Calendar'/>

        </Tabs>
        {value === 'one' && <Customer/>}
        {value === 'two' && <Training/>}
        {value === 'three' && <TrainerCalendar/>}


    </div>
);
}

export default TabApp;