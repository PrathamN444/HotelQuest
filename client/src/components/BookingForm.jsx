import { useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import PropTypes from 'prop-types';
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingForm = ({placeInfo}) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [redirect, setRedirect] = useState(null);

    let days = 0;
    let totalPrice = 0;

    if(checkIn && checkOut){
        days = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        totalPrice = days * placeInfo.price;
    }

    async function BookMyStay(){
        const data = {checkIn, checkOut, numberOfGuests, name, phoneNo, totalPrice, place: placeInfo._id};
        const response = await axios.post("booking", data);
        const bookingId = response.data._id;
        setRedirect(`/account/booking/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} /> ;
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
                <div className="p-3 border-y border-gray-400 flex flex-col  justify-center gap-1">
                    <label className="">No of guests :</label>
                    <input type="number" placeholder="1 Guest" className="cursor-pointer border border-gray-400 rounded-xl p-1"
                        value={numberOfGuests}
                        onChange={(ev) => setNumberOfGuests(ev.target.value)}
                    />
                </div>
                <div className=" m-2">
                    <div className="flex flex-col gap-1 p-1">
                        <h2>Your full name</h2>
                        <input type="text" placeholder="Booking name" className="border rounded-xl border-gray-400 py-1 px-2"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <h2>Mobile no :</h2>
                        <input type="tel" placeholder="+91 ----- ----- " className="border rounded-xl border-gray-400 p-1 "
                            value={phoneNo}
                            onChange={(ev) => setPhoneNo(ev.target.value)}
                        />
                    </div>
                </div>
            </div>
            <button onClick={BookMyStay} className="bg-red-500 mt-6 py-1 px-4 rounded-xl w-full text-white shadow-md text-lg">Book My Stay</button>
            <div className="text-center text-gray-500 my-2">
                {days < 0 && (
                    <p>Chose the check in and check out dates correctly.</p>
                )}
                {days >= 0 && (
                    <p>You won't be charged yet</p>
                )}  
            </div>
            <div className="text-center text-lg font-semibold mt-3">
                {days > 0 && (
                    <div>Total price for {days} nights (₹{placeInfo.price} * {days}) = ₹ {totalPrice} <span className="font-normal text-sm"> (excluding taxes)</span></div>
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