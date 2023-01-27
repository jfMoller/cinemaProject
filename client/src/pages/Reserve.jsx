import React, { useState, useEffect } from 'react';
import '../styles/reserve.css'
import '../styles/home.css'

function Seats() {
    const [seats, setSeats] = useState([]);
    const [message, setMessage] = useState('Select your seat');

    // Initialize the seats state variable
    useEffect(() => {
        const newSeats = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                let occupied = false;
                if (i * 8 + j + 1 <= 13) {
                    occupied = true;
                }
                let plusSeat = false;
                if (i === 3) {
                    plusSeat = true;
                }

                newSeats.push({ id: i * 8 + j + 1, seat: j + 1, row: i + 1, occupied: occupied, selected: false, available: true, plusSeat: plusSeat });
            }
        }
        setSeats(newSeats);
    }, []);

    const handleClick = (event) => {
        let element = event.target;
        let updatedSeats = [...seats];
        let selectedSeat = updatedSeats.find(seat => seat.id === parseInt(element.id));

        if (!selectedSeat.occupied) {
            selectedSeat.selected = !selectedSeat.selected;
            setSeats(updatedSeats);

            let selectedSeats = updatedSeats.filter(seat => seat.selected === true && seat.plusSeat === false);
            let selectedSeatsCount = selectedSeats.length;

            let selectedSeatsPlus = updatedSeats.filter(seat => seat.selected === true && seat.plusSeat === true);
            let selectedSeatsPlusCount = selectedSeatsPlus.length;

            setMessage(`You have selected ${selectedSeatsCount + selectedSeatsPlusCount} seats ${(selectedSeatsCount * 10) + (selectedSeatsPlusCount * 12)}$`);
        }
    }

    return (
        <section>

            <div id='showcaseSeat' className="seatsContainer">
                <p>Available</p>
                <div id='showcaseSeat1' className="seat occupied"></div>
                <p>Selected</p>
                <div id='showcaseSeat2' className="seat selected"></div>
                <p>Plus seat</p>
                <div id='showcaseSeat3' className="seat occupied"></div>
                <p>Occupied</p>
                <div id='showcaseSeat4' className="seat occupied"></div>
            </div>

            <div className="screen"></div>
            <div className="seatsWrap">

                {seats.map((seat) => (
                    <div key={seat.id} className={`seat ${seat.occupied ? 'occupied' : seat.selected ? 'selected' : seat.plusSeat ? 'plusSeat' : 'available'}`} id={seat.id} onClick={handleClick}></div>
                ))}
            </div>

            <br />
            <div className="message"> {message} </div>
            <br />
            <button className="btn">Buy</button>

        </section>
    )
}

export default Seats;