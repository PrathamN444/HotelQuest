import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccoutPage from "../pages/AccoutPage";

const AddPlaceForm = () => {

    const {id} = useParams();
    console.log(id);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [uploadLink, setUploadLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [otherInfo, setOtherInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if(id){
            axios.get("/places/"+id).then(response => {
                const {data} = response;
                setTitle(data.title);
                setLocation(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setOtherInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
            })
        }
        else{
            return;
        }
    }, [id]);

    async function addPhotosByLink(ev){
        ev.preventDefault();
        if(uploadLink){
            const {data} = await axios.post("/upload-by-link", {link : uploadLink});
            setAddedPhotos(prev => {
                return [...prev, data];
            });
            setUploadLink('');
        }
    }

    async function uploadPhotoFromDevice(ev){
        const files = ev.target.files;
        const filesData = new FormData();
        for(let i=0; i<files.length; i++){
            filesData.append('photos', files[i]);
        }
        const {data} = await axios.post("/upload", filesData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
        setAddedPhotos(prev => {
            return [...prev, ...data];
        });
    }

    function handlePerks(ev){
        const {checked, name} = ev.target;
        if(checked){
            setPerks([...perks, name]);
        }
        else{
            setPerks([...perks.filter(selectedPerk => selectedPerk !== name)]);
        }
    }

    async function saveMyPlace(ev){
        ev.preventDefault();
        const placeData = {title, location, addedPhotos, description, perks, otherInfo, checkIn, checkOut, maxGuests};
        if(id){
            await axios.put("/places", {
                id, ...placeData
            });
        }
        else{
            await axios.post("/places", placeData);
        }
        setRedirect('/account/places');
    }

    if(redirect){
        return <Navigate to={redirect} /> ;
    }

    function deletePhoto(ev, link){
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== link)]);
    }

    function setAsMainPhoto(ev, link){
        ev.preventDefault();
        setAddedPhotos([link, ...addedPhotos.filter(photo => photo !== link)]);
    }

    return (
        <div>
            <AccoutPage/>
            <form onSubmit={saveMyPlace} className="-mt-16">

                <h2 className="text-xl inline-block mr-1 mt-2">Title</h2>
                <p className="text-gray-500 text-sm inline-block">( Your hotel name should be short and catchy to attarct people. )</p>
                <input type="text" placeholder="Enter hotel name : (eg. Sunroof Residency)" value={title} onChange={ev => setTitle(ev.target.value)}
                    className="m-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md" 
                />

                <h2 className="text-xl inline-block mr-1 mt-2">Location</h2>
                <p className="text-gray-500 text-sm inline-block">( Address to your place. )</p>
                <input type="text" placeholder="Address" value={location} onChange={ev => setLocation(ev.target.value)}
                    className="m-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md" 
                />

                <h2 className="text-xl inline-block mr-1 mt-2">Photos</h2>
                <p className="inline-block text-sm text-gray-500">( more = better )</p>
                <div className="flex gap-2">
                    <input type="text" value={uploadLink} onChange={ev => setUploadLink(ev.target.value)} placeholder="Add photos using a link .....jpg" className="mt-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md"/>
                    <button onClick={addPhotosByLink} className="bg-gray-300 border rounded-2xl px-4 hover:shadow-md">Add&nbsp;photo</button>
                </div>

                <div className="mt-2 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {addedPhotos.length > 0 && addedPhotos.map((link) => (
                        <div key={link} className="h-32 flex relative">
                            <img className="rounded-2xl w-full object cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                            <button onClick={(ev) => deletePhoto(ev, link)} className="absolute bottom-1 right-1 text-white bg-black p-1 rounded-xl bg-opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <button onClick={(ev) => setAsMainPhoto(ev, link)} className="absolute bottom-1 right-10 text-white bg-black p-1 rounded-xl bg-opacity-50">
                                {link === addedPhotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                  
                                )}
                                {link !== addedPhotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
                    <label className="h-32 cursor-pointer border bg-transparent p-7 rounded-2xl text-gray-500 text-xl border-gray-500 hover:shadow-md flex items-center justify-center gap-2">
                        <input type="file" multiple className="hidden" onChange={uploadPhotoFromDevice}/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Upload
                    </label>
                </div>

                <h2 className="text-xl inline-block mr-1 mt-2">Description</h2>
                <p className="inline-block text-sm text-gray-500">( Details about your place )</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="m-2 p-2 ml-0 border border-gray-500 rounded-lg w-full hover:shadow-md size-auto h-40" />

                <h2 className="text-xl inline-block mr-1 mt-2">Perks</h2>
                <p className="inline-block text-sm text-gray-500">( select the benefits from below )</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
                    <label className="border p-2 flex items-center gap-3 rounded-xl m-2 cursor-pointer">
                        <input type="checkbox" checked={perks.includes('wifi')}  name="wifi" onChange={handlePerks}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                        <span>Wifi</span>
                    </label>
                    <label className="border p-2 flex items-center gap-3 rounded-xl m-2 cursor-pointer">
                        <input type="checkbox" checked={perks.includes('parking')} name="parking" onChange={handlePerks}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        <span>Free parking on premises</span>
                    </label>
                    <label className="border p-2 flex items-center gap-3 rounded-xl m-2 cursor-pointer">
                        <input type="checkbox" checked={perks.includes('pets')} name="pets" onChange={handlePerks}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        <span>Pets allowed</span>
                    </label>
                    <label className="border p-2 flex items-center gap-3 rounded-xl m-2 cursor-pointer">
                        <input type="checkbox" checked={perks.includes('ac')} name="ac" onChange={handlePerks}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span>Air conditioning</span>
                    </label>
                    <label className="border p-2 flex items-center gap-3 rounded-xl m-2 cursor-pointer">
                        <input type="checkbox" checked={perks.includes('tv')} name="tv" onChange={handlePerks}/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M19.5 6h-15v9h15V6Z" />
                            <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
                        </svg>
                        <span>TV</span>
                    </label>
                    <label className="border p-2 flex items-center gap-3 rounded-xl m-2 cursor-pointer">
                        <input type="checkbox" checked={perks.includes('radio')} name="radio" onChange={handlePerks}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                        <span>Radio</span>
                    </label>
                </div>

                <h2 className="text-xl inline-block mr-1 mt-2">Other info</h2>
                <p className="inline-block text-sm text-gray-500">( Rules and regulations for the stay )</p>
                <textarea value={otherInfo} onChange={ev => setOtherInfo(ev.target.value)} className="m-2 p-1 ml-0 border border-gray-500 rounded-lg w-full hover:shadow-md size-auto h-24" />

                <h2 className="text-xl inline-block mr-1 mt-2">Check in & Check out time</h2>
                <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-1">
                        <span>check in</span>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00 PM" className="border rounded-xl border-gray-500 p-1"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>check out</span>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00 AM" className="border rounded-xl border-gray-500 p-1" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>Max no of guests</span>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="0" className="border rounded-xl border-gray-500 p-1"/>
                    </div>
                </div>

                <button className="bg-red-400 mt-8 mb-1 mx-auto py-2 px-10 rounded-full ">Save My Place</button>
            </form>
        </div>
    );
}

export default AddPlaceForm;