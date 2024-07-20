import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(response => {
      setPlaces(response.data);
    })
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-x-6 gap-y-8">
      {places.length > 0 && places.map(place => (
        <Link key={place} className=" " to={"/places/" + place._id}>
          <div className=" flex bg-gray-500 rounded-2xl">
            <img src = {"http://localhost:4000/uploads/" + place.photos[0]} className="object-cover aspect-square rounded-2xl" alt="" />
          </div>
          <div className="mt-1 px-1">
            <h3 className="font-bold truncate">{place.address}</h3>
            <h2 className="text-sm truncate">{place.title}</h2>
            <h2>₹{place.price} per night</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage;
