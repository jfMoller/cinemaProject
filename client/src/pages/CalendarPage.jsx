import "../styles/tickets.css"
import "../styles/movies.css"
import "../styles/home.css"

import {useEffect, useRef, useState} from "react";
import {movieArray} from "../components/movie-data.js";
import MovieList from "../components/MovieList.jsx";
import {CalenderBox} from "../components/CalenderBox.jsx";
import {DisplaySelectedDate} from "../components/DisplaySelectedDate.jsx";
import {daysForwardInCalender} from "../components/Constants.js";

let dateString = null;
let dateInNumbers = [{date: null, month: null, weekDay: null}];

export default function () {
    const [open, setOpen] = useState(false);
    let calenderRef = useRef();
    //this part will handle clicking outside the dropdown menu, so it closes
    useEffect(() => {
        let onClickOutside = (e) => {
            if (!calenderRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        }
    });

    return <section className="calender" >
        <div className="wrap">
            <h2>Buy Tickets</h2>
            <hr/>
            <CalenderBox calRef={calenderRef} open={open} openDatePicker={openDatePicker}
                         calculateCurrentDate={calculateCurrentDate}/>
            <hr/>
            <DisplaySelectedDate dateString={dateString}/>
        </div>
        <div className="movieTickets">
            <MovieList movies={moviesOnDate()}/>
        </div>
    </section>

    function openDatePicker() {
        setOpen(!open);
    }

//compare the selected date and matches with the "database"(movieData)" and returns the one who are matched
    function moviesOnDate() {
        let tmpArray = [];
        for (let i = 0; i < movieArray.length; i++) {
            for (let j = 0; j < movieArray[i].date.length; j++) {
                if (movieArray[i].date[j] === dateInNumbers.date) {
                    tmpArray.push(movieArray[i]);
                }
            }
        }
        return tmpArray;
    }

    function calculateCurrentDate() {
        let tmpArray = [];
        for (let i = 0; i < daysForwardInCalender; i++) {
            let addedDay = new Date();
            addedDay.setDate(addedDay.getDate() + i);
            tmpArray.push(addedDay);
        }
        return tmpArray;
    }
}

export function setDateString(inDate, inMonth, inWeekDay) {
    dateInNumbers.date = inDate;
    dateInNumbers.month = inMonth;
    dateInNumbers.weekDay = inWeekDay;
    dateString = dateInNumbers.date + " / " + dateInNumbers.month + "-" + dateInNumbers.weekDay;
}