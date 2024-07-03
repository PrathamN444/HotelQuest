import { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser(ev){
        ev.preventDefault();
        axios.post("/register", {
            name, email, password
        });
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
                    <Link className="text-center py-2" to={"/login"}>Already have an account</Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;