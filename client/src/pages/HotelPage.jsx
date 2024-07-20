import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const HotelPage = () => {

    const {id} = useParams();
    const [placeInfo, setPlaceInfo] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        axios.get(`/places/${id}`).then(response => {
            setPlaceInfo(response.data);
        })
    }, [id]);

    if(!placeInfo) return '';
    
    if(showAllPhotos){
        return (
            <div className="min-h-screen bg-white absolute inset-0">
                <div className="fixed p-8">
                    <button onClick={() => setShowAllPhotos(false)} className="flex border gap-1 px-4 py-2 rounded-2xl bg-red-400 text-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        Back
                    </button>
                </div>
                <div className="p-8 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5">
                    {placeInfo.photos.length > 0 && placeInfo.photos.map(photo => (
                        <div key={photo} className="flex">
                            <img className="object-cover " src={"http://localhost:4000/uploads/"+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>  
        );
    }

    return (
        <div className="mt-10  -mx-20 px-36 py-5 bg-gray-100">
            <h1 className="font-semibold text-3xl">{placeInfo.title}</h1>
            <a href={"http://maps.google.com/?q="+placeInfo.address} target="_blank" className="text-xl">{placeInfo.address}</a>
            <div className="relative">
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 mt-4">
                    <div onClick={() => setShowAllPhotos(true)} className="cursor-pointer">
                        {placeInfo.photos?.[0] && (
                            <img className="aspect-square object-cover rounded-l-xl" src={"http://localhost:4000/uploads/"+placeInfo.photos[0]} alt="" />
                        )}
                    </div>
                    <div onClick={() => setShowAllPhotos(true)} className="cursor-pointer">
                        {placeInfo.photos?.[1] && (
                            <img className="aspect-square object-cover " src={"http://localhost:4000/uploads/"+placeInfo.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {placeInfo.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/"+placeInfo.photos[2]} alt="" />
                            )}
                        </div>
                    </div>
                    <div onClick={() => setShowAllPhotos(true)} className="cursor-pointer">
                        {placeInfo.photos?.[3] && (
                            <img className="aspect-square object-cover rounded-tr-xl" src={"http://localhost:4000/uploads/"+placeInfo.photos[3]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {placeInfo.photos?.[4] && (
                                <img className="aspect-square object-cover relative top-2 rounded-br-xl" src={"http://localhost:4000/uploads/"+placeInfo.photos[4]} alt="" />
                            )}
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-5 right-5 bg-white text-black border rounded-xl border-black py-1 px-3 font-semibold bg-opacity-60 flex gap-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                        </svg>
                        Show all photos
                    </button>
                </div>
            </div>
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