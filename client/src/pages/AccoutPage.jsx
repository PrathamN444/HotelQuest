import { useContext, useState } from "react"
import { UserContext } from "../components/UserContext"
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const AccoutPage = () => {
    const {user, ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    let {subpage} = useParams();

    async function logoutUser() {
        await axios.post("/logout");
        setRedirect(true);
        setUser(null);
    }

    if(redirect){
        return <Navigate to={"/"} />
    }

    if(!ready){
        return "Loading account page..." ;
    }

    if(!user && ready && !redirect){
        return <Navigate to={"/login"} /> 
    }

    function stylingClasses(type = null){
        let classes = "py-2 px-8 border rounded-full shadow-md " ;
        if(type === subpage){
            classes += "bg-red-400 text-white" ;
        }
        else{
            classes += "bg-gray-200 hover:bg-gray-300" ;
        }
        return classes;
    }

    return (
        <div className="">
            <nav className="w-full flex justify-center mt-8 mb-36 gap-10">
                <Link to={"/account/profile"} className={stylingClasses('profile')} > Profile </Link>
                <Link to={"/account/places"} className={stylingClasses('places')}> Accommodations </Link>
                <Link to={"/account/booking"} className={stylingClasses('booking')} > Bookings </Link>
            </nav>

            {subpage === 'profile' && (
                <div className="flex flex-col items-center gap-3 text-lg" >
                    <div className="">Welcome {user.name} !</div>
                    <div>This is your profile section</div>
                    <div className="">Logged in as {user.name} [ {user.email} ]</div>
                    <button onClick={logoutUser} className="border rounded-full bg-red-400 text-white py-2 px-6 mt-3">Logout</button>
                </div>
            )}
        </div>
    )
}

export default AccoutPage;
