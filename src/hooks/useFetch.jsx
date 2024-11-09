import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountries = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCountries();
    }, []);
   
    return { countries, error, loading };
}

