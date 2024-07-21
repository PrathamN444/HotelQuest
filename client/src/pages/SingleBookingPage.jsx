import { useParams } from "react-router-dom";
import PlacePhotos from "../components/PlacePhotos";
import { useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import AccoutPage from "./AccoutPage";

const SingleBookingPage = () => {

    const {id} = useParams();

    const [bookingInfo, setBookingInfo] = useState(null);

    useEffect(() => {
        axios.get("/bookings").then(response => {
            const foundBooking = response.data.find(({_id}) => _id === id);
            if(foundBooking) {
                setBookingInfo(foundBooking);
            }
        })
    }, [id]);

    if(!bookingInfo){
        return '';
    }

    console.log(bookingInfo);

    return (
        <div>
            <AccoutPage />
            <div className="-mt-12">
                <h1 className="font-semibold text-3xl pl-3">{bookingInfo.place.title}</h1>
                <a href={"http://maps.google.com/?q="+bookingInfo.place.address} target="_blank" className="text-xl pl-3">{bookingInfo.place.address}</a>
                <div className="bg-gray-200 p-4 rounded-2xl shadow-md my-7 flex justify-between items-center w-1/2">
                    <div className="pl-5">
                        <h2 className="font-semibold text-lg ">Booking Info :</h2>
                        <h2 className="mt-1">Booking name : {bookingInfo.name}</h2>
                        <div className="mt-1 inline-block mr-1">Booking for {differenceInCalendarDays(new Date(bookingInfo.checkOut), new Date(bookingInfo.checkIn))} days |</div>
                        <div className="inline-block">{format(parseISO(bookingInfo.checkIn), 'MMMM')} {format(parseISO(bookingInfo.checkIn), 'd')} to {format(parseISO(bookingInfo.checkOut), 'MMMM')} {format(parseISO(bookingInfo.checkOut), 'd')}</div>
                    </div>
                    <div className="font-semibold text-2xl mt-2 bg-red-500 px-5 py-8 rounded-2xl text-white">Total cost : ₹{bookingInfo.totalPrice}</div>
                </div>
                <PlacePhotos placeInfo={bookingInfo.place}/>
                <div className="my-8 shadow-lg p-5 border rounded-lg">
                    <h2 className="font-semibold text-xl mb-2">About the place</h2>
                    {bookingInfo.place.description}
                </div>
            </div>
        </div>
    );
}

export default SingleBookingPage;