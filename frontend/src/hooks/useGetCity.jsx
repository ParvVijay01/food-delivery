import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCity() {
    const dispatch = useDispatch()
    const apikey = import.meta.env.VITE_GEOAPIKEY
    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("Positon --> ",position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
        
        console.log("result",result);
        
    })
}, [])}

export default useGetCity;
