import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import PlacePhotos from "../components/PlacePhotos";

const HotelPage = () => {

    const {id} = useParams();
    const [placeInfo, setPlaceInfo] = useState(null);

    useEffect(() => {
        axios.get(`/places/${id}`).then(response => {
            setPlaceInfo(response.data);
        })
    }, [id]);

    if(!placeInfo) return '';

    return (
        <div className="mt-10  -mx-20 px-36 py-5 bg-gray-100">
            <h1 className="font-semibold text-3xl">{placeInfo.title}</h1>
            <a href={"http://maps.google.com/?q="+placeInfo.address} target="_blank" className="text-xl">{placeInfo.address}</a>
            <PlacePhotos placeInfo={placeInfo} />
            <div className="my-8">
                <h2 className="font-semibold text-xl mb-2">About the place</h2>
                {placeInfo.description}
            </div>
            <div className="grid grid-cols-2 mb-8 gap-12">
                <div className="py-3 flex flex-col gap-3">
                    <div className="mb-8">
                        <div className="font-semibold text-lg">Hosted by {placeInfo.owner}</div>
                        <div>5 years hosting</div>
                    </div>
                    <div>
                        <div className="font-semibold text-lg">
                            Timings & Room size :
                        </div>
                        <div>
                            check in : {placeInfo.checkIn}<br/>
                            check out : {placeInfo.checkOut}<br/>
                            maximum guests allowed : {placeInfo.maxGuests}
                        </div>
                    </div>
                </div>
                <BookingForm placeInfo={placeInfo}/>   
            </div>
            <div className="mb-8">
                <h2 className="font-semibold text-xl">More about the place</h2>
                <p>{placeInfo.extraInfo}</p>
            </div>
            <div>
                <h2 className="font-semibold text-xl">What this place offers</h2>
            </div>
        </div>

    );
}

export default HotelPage;