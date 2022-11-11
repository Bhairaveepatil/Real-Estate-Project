import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Basic_info from "./components/Add properties/Basic_info"
import React from "react";
import PropertyDetails from "./components/Add properties/PropertyDetails_info"
import GeneralInfo from "./components/Add properties/General_info";
import LocationInfo from "./components/Add properties/Location_info";
import Property from "./components/Property/Property";
import Protected from "./components/Protected/Protected";
import Error404 from "./components/Error/Error404";


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/" element={<Protected><Property/></Protected>}></Route>
      <Route path="/basicinfo" element={<Basic_info></Basic_info>}></Route>
      <Route path="/propertydetails" element={<Protected><PropertyDetails/></Protected>}></Route>
      <Route path="/generalinfo" element={<Protected><GeneralInfo/></Protected>}></Route>
      <Route path="/locationinfo" element={<Protected><LocationInfo/></Protected>}></Route>
      <Route path="*" element={<Error404/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App