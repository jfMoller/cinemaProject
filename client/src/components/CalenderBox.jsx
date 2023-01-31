import {PickADateButton} from "./PickADateButton.jsx";
import {IsDropDownActive} from "./IsDropDownActive.jsx";

export const CalenderBox = ({banana, open, openDatePicker, calculateCurrentDate}) => (
    <div id="calender-box" ref={banana}>
        <PickADateButton handleClick={openDatePicker}/>
        <IsDropDownActive open={open} openDatePicker={openDatePicker} calculateCurrentDate={calculateCurrentDate}/>
    </div>
);