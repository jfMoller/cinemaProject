import "../styles/tickets.css"
import "../styles/movies.css"
import "../styles/home.css"

import { useEffect, useRef, useState } from "react";
import { movieArray } from "../components/MovieData.jsx";
import MovieList from "../components/MovieList.jsx";

let dates = [];
const daysForward = 21;
let dateString = null;
let dateInNumbers = [{ date: null, month: null, weekDay: null }];

let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function () {
    { dates = [] }
    const [open, setOpen] = useState(false);
    const [movies] = useState(movieArray);

    let calenderRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!calenderRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });


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

    return <section id="calenderSection" className="calender">
        <div className="wrap">

            <div id="selectedDate">{dateString}</div>
            <hr />
            <h2 id="buyTicketsTitle">Buy Tickets</h2>
            <hr />
            <div id="calender-box" ref={calenderRef}>

                <div id="btn" onClick={() => { setOpen(!open) }}>Pick a Date</div>

                <div className={`calender-dropdown-trigger ${open ? 'active' : 'inactive'}`}>
                    {calculateCurrentDate()}
                    <ul onClick={() => { setOpen(!open) }}>
                        {dates.map((item) =>

                            <div className="calender-list" key={item.id}>
                                <div onClick={function (e) { setDate(item.day, item.month, returnDayName(item.dayName)) }}>
                                    {item.day} / {item.month} - {returnDayName(item.dayName)}
                                </div>

                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        <div id="top-movies">
            <MovieList movies={moviesOnDate()} />
        </div>
    </section>
}

function setDate(inDate, inMonth, inWeekDay) {
    dateInNumbers.date = inDate;
    dateInNumbers.month = inMonth;
    dateInNumbers.weekDay = inWeekDay;
    dateString = dateInNumbers.date + " / " + dateInNumbers.month + "-" + dateInNumbers.weekDay;
}

function calculateCurrentDate() {
    for (let i = 0; i < daysForward; i++) {
        let today = new Date();
        let dateLimit = new Date(new Date().setDate(today.getDate() + i));
        let object = {};
        object.day = dateLimit.getDate();
        object.month = dateLimit.getMonth() + 1;
        object.year = dateLimit.getFullYear();
        object.dayName = dateLimit.getDay();
        object.id = i;
        dates.push(object);
    }
}

function returnDayName(inIndex) {
    return daysInWeek[inIndex];
}