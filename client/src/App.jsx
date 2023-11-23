
// import './App.css'

import { Route,Routes } from "react-router-dom" 
import Indexpage from "./pages/Indexpage"
import Loginpage from "./pages/Loginpage"
import Layout from "./Layout"
import Registerpage from "./pages/Registerpage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
// import Accountpage from "./pages/Accountpage"
import Profilepage from "./pages/ProfilePage"
import Placespage from "./pages/PlacesPage"
import PlacesForm from "./components/PlacesForm"
import PlacePage from "./pages/PlacePage"
import BookingsPage from "./pages/BookingsPage"
import BookingPage from "./pages/BookingPage"

axios.defaults.baseURL="http://127.0.0.1:4000"
axios.defaults.withCredentials=true;


function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Indexpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
        <Route path="/account" element={<Profilepage/>}/>
        <Route path="/account/places" element={<Placespage/>}/>
        <Route path="/account/places/new" element={<PlacesForm />} />
        <Route path="/account/places/:id" element={<PlacesForm />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
        <Route path="/place/:id" element={<PlacePage/>}/>
        {/* <Route path="/account/places element={<Accountpage/>}/> */}
      </Route>
    </Routes>
    </UserContextProvider>
   
  )
}

export default App
