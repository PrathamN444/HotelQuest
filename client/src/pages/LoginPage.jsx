import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../components/UserContext";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function loginUser(ev){
        ev.preventDefault();
        const {data} = await axios.post("/login",{
            email, password
        });
        setUser(data);
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/"} />
    }

    return (
        <div className="mt-4 grow flex flex-col justify-around">
            <div className="mb-56">
                <form className="flex flex-col max-w-md mx-auto" onSubmit={loginUser}>
                    <h1 className="font-bold text-xl p-3 text-center">Welcome to HotelQuest</h1>
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
                    <button className="bg-red-400 p-1 m-1 rounded-2xl text-white w-full">Login</button>
                    <div className="text-center py-3 text-gray-700">
                        don't have an account , 
                        <Link className="text-black font-bold" to={"/register"}> Register first</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
