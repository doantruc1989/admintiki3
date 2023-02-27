import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calenda() {
    const [value, onChange] = useState(new Date());
  
    return (

            <Calendar
            className='w-full mx-auto'
                onChange={onChange}
                value={value}
            />
    )
}

export default Calenda