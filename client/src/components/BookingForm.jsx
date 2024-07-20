import { useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import PropTypes from 'prop-types';

const BookingForm = ({placeInfo}) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');

    let days = 0;
    let totalPrice = 0;

    const placePrice = Number(placeInfo.price.replace(',', ''));

    if(checkIn && checkOut){
        days = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        totalPrice = days * placePrice;
    }

    return (
        <div className="bg-white shadow-lg p-5 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ₹{placeInfo.price} / per night
            </div>
            <div className="border border-gray-400 rounded-2xl mt-6">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in : </label>
                        <input type="date" className="cursor-pointer border border-gray-400 py-1 px-3 rounded-xl"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l border-gray-400">
                        <label>Check out : </label>
                        <input type="date" className="cursor-pointer border border-gray-400 py-1 px-3 rounded-xl"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="p-3 border-t border-gray-400 rounded-b-2xl flex items-center justify-center gap-3">
                    <label className="">No of guests :</label>
                    <input type="number" placeholder="1 Guest" className="cursor-pointer border border-gray-400 rounded-xl p-1"
                        value={numberOfGuests}
                        onChange={(ev) => setNumberOfGuests(ev.target.value)}
                    />
                </div>
            </div>
            <button onClick={() => {}} className="bg-red-500 mt-6 py-1 px-4 rounded-xl w-full text-white shadow-md text-lg">Book My Stay</button>
            <div className="text-center text-gray-500 my-2">You won't be charged yet</div>
            <div className="text-center text-lg font-semibold mt-3">
                {days > 0 && (
                    <div>Total price for {days} nights ({placePrice} * {days}) = ₹ {totalPrice} <span className="font-normal text-sm"> (excluding taxes)</span></div>
                )}
                {days === 0 && (
                    <div>Book for a day at ₹{placeInfo.price}<span className="font-normal text-sm"> (excluding taxes)</span></div>
                )}
            </div>
        </div>
    );
}

BookingForm.propTypes = {
    placeInfo : PropTypes.array,
};

export default BookingForm;