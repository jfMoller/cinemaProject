import "../styles/tickets.css"
import "../styles/movies.css"
import "../styles/home.css"

import {useEffect, useRef, useState} from "react";
import {movieArray} from "../components/movie-data.js";
import MovieList from "../components/MovieList.jsx";
import {CalenderBox} from "../components/CalenderBox.jsx";
import {DisplaySelectedDate} from "../components/DisplaySelectedDate.jsx";
import {daysForwardInCalender} from "../components/Constants.js";
import {returnDayName} from "../components/Utilities.jsx";

let dateString = null;
let dateString2 = null;
let dateInNumbers = [{date: null, month: null, weekDay: null}];
let compareDate;
let dateStringArray = [];
let compareDateArray = [];

export default function () {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
/*    const[buttons, setButtons] = useState([
        {text:"start date", buttonID: 1},
        {text:"end date", buttonID: 2 }
    ])*/

    const buttons = [
        {text:"start date", buttonID: 1},
        {text:"end date", buttonID: 2 }
    ]

    let calenderRef = useRef();
    //this part will handle clicking outside the dropdown menu, so it closes
/*    useEffect(() => {
        let onClickOutside = (e) => {
            if (!calenderRef.current.contains(e.target)) {
                setOpen(false);
                setOpen2(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        }
    });*/

    return <section className="calender">
        <div className="wrap">
            <h2>Buy Tickets</h2>
            <hr/>
            <CalenderBox btn={buttons[0]} calRef={calenderRef} open={open} openDatePicker={openDatePicker} calculateCurrentDate={calculateCurrentDate}/>
            <CalenderBox btn={buttons[1]} calRef={calenderRef} open={open2} openDatePicker={openDatePicker} calculateCurrentDate={calculateCurrentDate}/>
            <hr/>
            <DisplaySelectedDate dateString={dateStringArray[0]}/>
            <DisplaySelectedDate dateString={dateStringArray[1]}/>
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
                for(let k = 0; k < compareDateArray.length; k++) {
                    if (movieArray[i].date[j] === compareDateArray[k]) {
                        tmpArray.push(movieArray[i]);
                    }
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

export function setDateString(inDate, inBtn) {
    compareDateArray.push(inDate.getDate());
    /*compareDateArray[0] = inDate.getDate();*/
    /*compareDate = inDate.getDate();*/
    let tmpString = inDate.getDate() + " / " + (inDate.getMonth() + 1) + " - " + returnDayName(inDate.getDay());
    dateStringArray.push(tmpString);
    console.log("dateStringArray.length: " + dateStringArray.length);
    console.log("compareDateArray.length: " + compareDateArray.length);
    console.log("inBtn: " + inBtn.text);
/*    console.log(("date: " + inDate.getDate() + " month: " + (inDate.getMonth() + 1) + "day: " + returnDayName(inDate.getDay())))*/
    /*dateString = inDate.getDate() + " / " + (inDate.getMonth() + 1) + " - " + returnDayName(inDate.getDay());*/
}

export function resetDateArray(){
    dateStringArray = [];
}

export function resetCompareArray(){
    compareDateArray = [];
}