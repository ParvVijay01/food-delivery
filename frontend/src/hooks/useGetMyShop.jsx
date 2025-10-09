import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

function useGetMyShop() {
 
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchShop = async () => {
      try {
        
        const result = await axios.get(
          `${serverUrl}shop/get-my-shop`,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        dispatch(setMyShopData(result.data))
                  
      } catch (error) {
        console.log("Failed to fetch user:", error);
         // Clear user data in Redux when there's an error
      } 
    };
    fetchShop();
  }, []); 
}

export default useGetMyShop;
