import {Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import AccoutPage from "./pages/AccoutPage";
import AddPlaceForm from "./components/AddPlaceForm";
import PlacesPage from "./pages/PlacesPage";
import HotelPage from "./pages/HotelPage";
import BookingsPage from "./pages/BookingsPage";
import SingleBookingPage from "./pages/SingleBookingPage";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true; 

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account" element={<AccoutPage/>} />
          <Route path="/account/profile" element={<AccoutPage/>} />
          <Route path="/account/places" element={<PlacesPage/>} />
          <Route path="/account/places/new" element={<AddPlaceForm/>} />
          <Route path="/account/places/:id" element={<AddPlaceForm/>} />
          <Route path="/account/booking" element={<BookingsPage/>} />
          <Route path="/account/booking/:id" element={<SingleBookingPage/>} />
          <Route path="/places/:id" element={<HotelPage />} /> 
        </Route>    
      </Routes>
    </UserContextProvider>
    
  )
}

export default App;
