import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    setError("Failed to call api");
                    setLoading(false);

                }
                const result = await res.json();
                setData(result.data);
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };
        fetchData();
    }, [url]);
    return {
        data,
        error,
        loading
    }
}

export default useFetch;