import React, { useState } from 'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Customer from './Customerlist';
import Training from './Traininglist';

function TabApp(){
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    };
    return(
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value='one' label='Customers'/>
            <Tab value='two' label='Trainings'/>

        </Tabs>
        {value === 'one' && <Customer/>}
        {value === 'two' && <Training/>}
    </div>
);
}

export default TabApp;