import { Link, useParams } from "react-router-dom";
import AddPlaceForm from "../components/AddPlaceForm";

const PlacesPage = () => {

    const {action} = useParams();

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link to={"/account/places/new"} className="bg-red-400 py-2 px-5 inline-flex gap-1 rounded-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Add new places
                    </Link>
                </div>  
            )}
            {action === 'new' && (
                <div className="-mt-24">
                    <AddPlaceForm />
                </div>
            )}
        </div>
    );
}

export default PlacesPage;