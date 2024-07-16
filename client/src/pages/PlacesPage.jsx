import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AccoutPage from "./AccoutPage";

const PlacesPage = () => {
    
    const [places, setPlaces] = useState([]);
    
    useEffect(() => {
        axios.get("/places").then(response => {
            setPlaces(response.data);
        });
    }, [])
    

    return (
        <div className="">
            <AccoutPage />
            <div className="-mt-16">
                <div className="text-center">
                    <Link to={"/account/places/new"} className="bg-red-400 py-2 px-5 inline-flex gap-1 rounded-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Add new places
                    </Link>
                </div> 
                <div className="mt-8 flex flex-col gap-3">
                    {places.length > 0 && places.map(place => (
                        <div key={place} className="flex gap-6 bg-gray-100 p-4 rounded-lg shadow-md">
                            <div className="w-60 h-60 flex shrink-0 ">
                                <img className="object-cover rounded-lg" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Link className="font-bold text-xl cursor-pointer" to={"/account/places/" + place._id } >{place.title}</Link>
                                <p className="text-sm">{place.description}</p>
                            </div>
                        </div>
                    ))}    
                </div> 
            </div>
        </div>
    );
}

export default PlacesPage;