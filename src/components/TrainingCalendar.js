import React from "react";
import { API_URL_TRAININGS_GET } from "../constants";
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

    export default function TrainerCalendar(){
    const [trainings, setTrainings] = useState([]);
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        getTrainings()
    }, [])

    const getTrainings = () => {
        fetch(API_URL_TRAININGS_GET)
            .then(response => response.json())
            .then(data => {setTrainings(data);
        })
            .catch(err => console.log(err));
    }

    const calendarEvents = trainings.map((training) => {
        return {
            id: training.id,
            title: training.activity + ' — ' + training.customer.firstname + ' ' + training.customer.lastname,
            start: new Date(training.date),
            end: new Date(new Date(training.date).setMinutes(new Date(training.date).getMinutes() + training.duration)),
            allDay: false
          }
        })

        return (
            <Calendar 
            localizer={localizer}
            events={calendarEvents}
            defaultDate={new Date()}
            defaultView="month"
            startAccessor='start'
            min={new Date()}
            max={new Date()}
            endAccessor='end'
            style={{height: 550}}
            />)
    }
