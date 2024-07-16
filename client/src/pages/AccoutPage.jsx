import { useContext, useState } from "react"
import { UserContext } from "../components/UserContext"
import { Navigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const AccoutPage = () => {
    const {user, ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    const {pathname} = useLocation();
    const subpage = pathname.split('/')?.[2];


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
        let classes = "py-2 px-6 border rounded-full shadow-md inline-flex gap-2 " ;
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
            <nav className="w-full flex justify-center mt-8 gap-10 mb-32">
                <Link to={"/account/profile"} className={stylingClasses('profile')} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                    Profile 
                </Link>
                <Link to={"/account/places"} className={stylingClasses('places')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clipRule="evenodd" />
                    </svg>
                    Accommodations
                </Link>
                <Link to={"/account/booking"} className={stylingClasses('booking')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                    Bookings
                </Link>
            </nav>

            {subpage === 'profile' && (
                <div className="flex flex-col items-center gap-3 text-lg" >
                    <div className="">Welcome {user.name} !</div>
                    <div>This is your profile section</div>
                    <div className="">Logged in as {user.name} [ {user.email} ]</div>
                    <button onClick={logoutUser} className="border rounded-full bg-red-400 text-white py-2 px-6 mt-3">Logout</button>
                </div>
            )}
            {/* {subpage === 'places' && (
                <PlacesPage />
            )} */}
        </div>
    )
}

export default AccoutPage;
