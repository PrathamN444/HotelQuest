import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="mt-4 grow flex flex-col justify-around">
        <div className="mb-56">
            <form className="flex flex-col max-w-md mx-auto">
                <h1 className="font-bold text-xl p-3 text-center">Welcome to HotelQuest</h1>
                <input 
                    type="email" 
                    placeholder="username@email.com" 
                    className="m-2 p-2 border border-gray-500 rounded-2xl w-full"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="m-2 p-2 border border-gray-500 rounded-2xl w-full"
                />
                <button className="bg-red-400 p-1 m-1 rounded-2xl text-white w-full">Login</button>
                <Link className="text-center py-2" to={"/register"}>Create new account</Link>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
