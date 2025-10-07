import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";

function useGetCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${serverUrl}user/current`,
          { withCredentials: true }
        );

        console.log("Current user:", result.data);
        setUser(result.data);     
        setError(null);           
      } catch (error) {
        console.log("Failed to fetch user:", error);
        setError(error.response?.data?.message || "Failed to fetch user");
        setUser(null);
      } finally {
        setLoading(false);        
      }
    };
    fetchUser();
  }, []);

  return { user, loading, error };  
}

export default useGetCurrentUser;
