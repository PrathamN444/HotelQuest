import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../components/UserContext";

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function registerUser(ev){
        ev.preventDefault();
        const {data} = await axios.post("/register", {
            name, email, password
        });
        setUser(data);
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/"} />
    }

    return (
        <div className="mt-4 grow flex flex-col justify-around">
            <div className="mb-48">
                <form className="flex flex-col max-w-md mx-auto" onSubmit={registerUser}>
                    <h1 className="font-bold text-xl p-3 text-center">Welcome to HotelQuest</h1>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        className="m-2 p-2 border border-gray-500 rounded-2xl w-full"
                    />
                    <input 
                        type="email" 
                        placeholder="username@email.com" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        className="m-2 p-2 border border-gray-500 rounded-2xl w-full"
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="m-2 p-2 border border-gray-500 rounded-2xl w-full"
                    />
                    <button className="bg-red-400 p-1 m-1 rounded-2xl text-white w-full">Create an account</button>
                    <div className="text-center py-3 text-gray-700">
                        Already have an account , 
                        <Link className="font-bold text-black" to={"/login"}> Login Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;