import { useEffect, useState } from "react";
import AccoutPage from "./AccoutPage";
import axios from "axios";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const BookingsPage = () => {

    const [allBookings, setAllBookings] = useState(null);

    useEffect(() => {
        axios.get("bookings").then(response => {
            setAllBookings(response.data);
        })
    }, [])

    console.log(allBookings);

    return (
        <div>
            <AccoutPage/>
            <div className="-mt-14">
                <h2 className="font-semibold text-3xl text-center mb-6 border py-3 shadow-md rounded-xl bg-gray-100">Upcoming Stays</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {allBookings && allBookings.map(booking => (
                        <div key={booking} className="">
                            <Link to={`/account/booking/${booking._id}`} className="flex gap-4 bg-gray-200 my-4 p-5 rounded-2xl shadow-lg">
                                <div className="w-40 h-40">
                                    {booking.place.photos[0] && (
                                        <div className="flex">
                                            <img src={"http://localhost:4000/uploads/"+booking.place.photos[0]} alt="" className="object-cover aspect-square "/>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="font-semibold text-xl truncate">{booking.place.title}</h2>
                                    <h2>{booking.place.address}</h2>
                                    <div className="mt-3 inline-block mr-1">Booking for {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} days |</div>
                                    <div className="inline-block">{format(parseISO(booking.checkIn), 'MMMM')} {format(parseISO(booking.checkIn), 'd')} to {format(parseISO(booking.checkOut), 'MMMM')} {format(parseISO(booking.checkOut), 'd')}</div>
                                    <h2 className="mt-2">Booked for {booking.name}</h2>
                                    <div className="font-semibold text-xl mt-2">Total cost : ₹{booking.totalPrice}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BookingsPage;